---
description: JavaScript and TypeScript coding conventions for this project. Use when writing or reviewing any .ts/.tsx file, or when the user asks about code style or conventions.
argument-hint: [filename]
paths: '**/*.ts,**/*.tsx'
---

## Rules

### Extract the varying part — never repeat surrounding structure

When a conditional changes only one part of a value, extract that part. Never repeat the template.

```ts
// ✗
const label = isMine ? `cell ${index} contains a mine` : `cell ${index} contains nothing`

// ✓
const content = isMine ? 'a mine' : 'nothing'
const label = `cell ${index} contains ${content}`
```

Applies everywhere: template literals, object spreads, JSX props — anywhere the surrounding structure is identical across branches.

---

### Destructure instead of repeated property access

When a variable's properties are used more than once, destructure at the top instead of accessing them repeatedly.

```ts
// ✗
function update(board: Board) {
  if (board.end) throw new Error('Game is over')
  return board.field.map(...)
}

// ✓
function update(board: Board) {
  const { end, field } = board
  if (end) throw new Error('Game is over')
  return field.map(...)
}
```

---

### Barrel `index.ts` files use `export *`, never named re-exports

Every `index.ts` that exists solely to re-export a module must use `export *`. Named re-exports require manual upkeep and silently omit new exports until someone notices.

```ts
// ✗ — named re-export: new exports must be added by hand
export { Board } from './Board'

// ✓ — wildcard: all exports picked up automatically
export * from './Board'
```

---

### `react-refresh/only-export-components` — extract, never disable

When a file mixes React components with non-component exports (helpers, factories, plain functions) and triggers `react-refresh/only-export-components`, move each non-component export into its own colocated file. Never suppress with `eslint-disable`. (Plain `const` exports are allowed by this repo's `allowConstantExport` setting; functions are not.)

```ts
// ✗ — Board.tsx: mixes component + helper, would need eslint-disable
export function formatBoard(...) { ... }
export function Board(...) { ... }  // component

// ✓ — helper moved next to the component
// formatBoard.ts  → exports only formatBoard
// Board.tsx       → exports only Board
```

Name each file after what it exports. Keep all files in the same directory.

---

### A render closure that captures a hook instance and grows past trivial becomes a colocated component

An inline `renderX` function inside a component is fine while it stays a few lines. Once it closes over a hook/instance value (so it can't move to `utils.ts`) **and** its return is a self-contained, nameable unit of UI, extract it into a sibling component. The inline closure is re-created every render, can't be unit-tested in isolation, and inflates the parent until it reads as internals rather than layout + composition.

```tsx
// ✗ — inline render closure: captures `changeBoard`, grown to a cohesive UI block
function Board() {
  const { changeBoard } = useBoard()
  const renderRow = (row: Cell[]) => /* many lines using changeBoard */
  return <>{field.map(renderRow)}</>
}

// ✓ — colocated component, instance passed as prop, unit-testable
// Row.tsx
export function Row({ changeBoard, row }: RowProps) { /* ... */ }
// Board.tsx
{field.map((row, y) => <Row key={y} changeBoard={changeBoard} row={row} />)}
```

Trigger: it captures something component-local (so `utils.ts` is out) **and** the render body is a cohesive UI unit. A short formatter or one-line wrapper stays inline. This is a threshold, not a hard rule.

---

### Pure helpers go in `src/utils/`, one per file

A function with no React or component dependency belongs in `src/utils/helperName.ts` with a co-located `helperName.test.ts` — never inlined in a component, never duplicated across modules. Promote a component-local helper to `src/utils/` once a second module needs it.

---

If `$ARGUMENTS` names a file, read it and report violations with corrected code. Otherwise apply to the code being discussed.
