[![License: Prosperity Public License](https://img.shields.io/badge/license-Prosperity%203.0-blue.svg)](https://licensezero.com/licenses/prosperity-3.0)

# Minesweeper

A faithful remake of the classic Windows Minesweeper, built with React, TypeScript, and
Vite. Play it at **[minesweeper.is](https://minesweeper.is/)**.

Choose Beginner, Intermediate, Expert, or a custom board, flag suspected mines, and clear
the field without detonating one.

## Monorepo layout

This repository is a pnpm + Turborepo monorepo:

- `apps/web` — the React + TypeScript + Vite app (`@minesweeper/web`)
- `workers/api` — AWS Lambda API (`@minesweeper/api`), currently a skeleton
- `packages/` — reserved for shared code

Run `pnpm <script>` from the repo root (delegates through Turborepo), or target one package
with `pnpm --filter @minesweeper/web <script>`.

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

Run from the repo root:

- `pnpm dev` — start the Vite dev server
- `pnpm build` — type-check and build for production (output in `apps/web/build`)
- `pnpm lint` — ESLint (`--max-warnings 0`)
- `pnpm test` — run the Vitest suite
- `pnpm test:coverage` — tests with coverage

## Tech stack

React 19 · TypeScript · Vite · TanStack Query · Zustand · MSW · Vitest.

## License

[Prosperity Public License 3.0](https://licensezero.com/licenses/prosperity-3.0).
