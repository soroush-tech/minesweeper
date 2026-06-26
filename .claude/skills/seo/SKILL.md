---
description: Document metadata and heading-structure conventions — one h1, sequential heading levels, headings only for headings, and the index.html title/meta. Auto-load when editing page markup, headings, or index.html.
paths: src/**/*.tsx,index.html
argument-hint: [page or component]
---

# SEO / Document Structure

Headings describe structure, not visual emphasis. Search engines and screen readers both rely on them. Same markup serves both.

---

## One `<h1>`, at the start of main content

Exactly one `<h1>`, opening the main content. No headings before it.

```tsx
// ✓
<h1>Minesweeper</h1>
<h2>How to play</h2>
```

## Descend sequentially — never skip a level

After `<h1>` comes `<h2>`, then `<h3>`. Don't jump `h2 → h4`.

## Heading markup only for headings

Use `<h1>`–`<h6>` _only_ when the text is a heading. Never use a heading tag to make text large or bold — style a real element instead.

```tsx
// ✗ — heading tag for visual weight
<h3>You win!</h3>

// ✓ — style a non-heading element
<p className="status">You win!</p>
```

## `index.html` head

Keep a meaningful `<title>` and a `<meta name="description">`. The title is the single most important on-page SEO signal — it should name the app, not say "Vite + React".

---

If seo names a file, read it and apply the rules. Otherwise apply to the markup being discussed.
