---
description: WCAG 2.2 AA accessibility rules for this codebase — color contrast, keyboard operability, accessible names, and semantic-first ARIA. Auto-load when building or reviewing interactive UI (board cells, buttons, counters), fixing a11y issues, or auditing contrast.
paths: src/**/*.tsx,src/**/*.ts
argument-hint: [component or violation]
---

# WCAG Accessibility Patterns

WCAG 2.2 AA is the target. Four principles: **Perceivable · Operable · Understandable · Robust** (POUR). Automated tools catch ~30% — always verify manually with keyboard and a screen reader.

---

## Perceivable

### Text contrast ratios (SC 1.4.3 / 1.4.11)

- Normal text (< 18pt / < 14pt bold): **4.5:1 minimum**
- Large text (≥ 18pt / ≥ 14pt bold): **3:1 minimum**
- UI components and focus indicators: **3:1 minimum**
- Disabled UI components are exempt — but only when actually disabled.

### `opacity` compounds with the background — compute the effective color

```
effective = alpha × foreground + (1 - alpha) × background
```

When dimming text/icons with `opacity`, check the effective contrast against the real background, not the token's nominal contrast.

### Don't encode meaning with color alone

A revealed cell's number, a flag, or a mine must be distinguishable without relying on color (shape, text, or symbol too) — colorblind users and grayscale displays still need to read the board.

---

## Operable

### Keyboard: never remove focus indicators

```css
/* ✗ — removes all focus styling */
button:focus {
  outline: none;
}

/* ✓ — visible on keyboard focus only */
button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

Every interactive element (cell, reset face, difficulty control) must be reachable and operable by keyboard alone. Tab order follows DOM order.

---

## Understandable

### Every interactive control needs an accessible name

A clickable cell rendered as a `<div>`/`<span>` with only a background image has no name. Give it one:

```tsx
// ✗ — icon-only control, no accessible name
<div onClick={reveal} />

// ✓ — native button + label
<button onClick={reveal} aria-label={`cell row ${y} column ${x}`} />
```

Decorative emoji/icons that duplicate a labelled control get `aria-hidden="true"`.

---

## Robust

### Semantic-first, ARIA second

Use native HTML before reaching for ARIA. ARIA never fixes broken semantics — it annotates correct structure.

```tsx
// ✗ — div with click handler: no keyboard, no role
<div onClick={open}>New game</div>

// ✓ — native button, keyboard-ready for free
<button onClick={open}>New game</button>
```

### Hiding content

| CSS                  | In layout | In a11y tree |
| -------------------- | --------- | ------------ |
| `display: none`      | ✗         | ✗            |
| `visibility: hidden` | ✓         | ✗            |
| `opacity: 0`         | ✓         | ✓            |

Use `aria-hidden="true"` on purely decorative SVG/emoji so they don't pollute the a11y tree.

---

## Anti-patterns

- Relying solely on automated tools — they miss ~70%.
- Using ARIA to patch non-semantic HTML instead of fixing the HTML.
- Removing focus indicators for aesthetics.
- Encoding state with color only.
- Interactive `div`/`span` (cells, faces) without a role + accessible name + keyboard handler.

If wcag names a file, read it and apply the rules. Otherwise apply to the code being discussed.
