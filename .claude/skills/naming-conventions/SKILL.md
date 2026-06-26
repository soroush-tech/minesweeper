---
description: JavaScript and TypeScript naming conventions — variables, booleans, functions, classes, React components, constants, privates. Auto-load when naming or reviewing identifiers in .ts/.tsx files.
paths: '**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# Naming Conventions

## Variables — camelCase

```ts
// ✗
var first_name = 'Robin'
var FIRSTNAME = 'Robin'
var val = 'Robin'

// ✓
var firstName = 'Robin'
```

## Booleans — is / are / has prefix

```ts
// ✗
var visible = true
var equal = false

// ✓
var isVisible = true
var areEqual = false
var hasMine = true
```

## Functions & Methods — camelCase + verb prefix

```ts
// ✗
function name(firstName, lastName) { … }

// ✓
function getName(firstName, lastName) { … }
```

Common verbs: `get`, `set`, `fetch`, `create`, `update`, `delete`, `calculate`, `reveal`, `handle`, `is`, `has`.

Function names describe **what the function does**, not what it blocks or how it works internally.

```ts
// ✗ — describes the implementation detail
const minusOne = (cell) => cell[0] === -1

// ✓ — describes the function's purpose
const isMine = (cell) => cell[0] === -1
```

## Classes — PascalCase

```ts
// ✗
class mineField { … }

// ✓
class MineField { … }
```

## React Components — PascalCase

```tsx
// ✗ — camelCase start
function board(props) { return <div>…</div> }

// ✗ — redundant "Component" suffix
function BoardComponent(props) { … }

// ✓ — PascalCase, concise
function Board(props) { … }
```

Use descriptive, meaningful names. The JSX usage already makes it a component — don't append a redundant `Component` suffix.

## Constants — UPPER_SNAKE_CASE

```ts
// ✗
const secondsInDay = 86400

// ✓
const SECONDS_IN_DAY = 86400
```

Use `UPPER_SNAKE_CASE` for truly fixed, non-reassignable values. Mutable module-level variables stay camelCase.

## Private — \_ prefix

```ts
// ✓ — signals internal use only
class Foo {
  _computeName(first, last) {
    return `${first} ${last}`
  }
}
```

Unused destructured params also use `_` prefix (`{ size: _size }`).

## Avoid

- `snake_case` for variables or functions
- `kebab-case` in identifiers (`first-name` is a syntax error)
- Single-letter or cryptic names (`val`, `tmp`, `x`) outside loop counters / grid coordinates
- Adding a comment to explain what a name means — rename instead

If the arguments name a file, read it and apply these rules. Otherwise apply to the code being discussed.
