---
description: How this project runs tests with Vitest — co-located test files, jsdom + globals, the renderWithProvider helper, MSW for API mocking, and the test / test:coverage commands. Use when writing or running tests, mocking the API, or checking coverage.
---

# Testing (Vitest)

## Setup

- Runner: **Vitest** with `globals: true` and `environment: 'jsdom'` (`vitest.config.ts`).
- `describe` / `it` / `expect` are global — no imports needed.
- Setup file: `setup/tests/vitest-setup.ts` (jest-dom matchers, MSW server lifecycle).
- Tests are **co-located** next to source as `*.test.ts(x)` (e.g. `src/utils/leftPad.test.ts`).

## Commands (`package.json`)

| Command              | Runs                                      |
| -------------------- | ----------------------------------------- |
| `yarn test`          | Vitest in watch mode                      |
| `yarn test:watch`    | Vitest in watch mode                      |
| `yarn test:ui`       | Vitest UI                                 |
| `yarn test:coverage` | `vitest run --coverage` (v8, single pass) |

## Rendering React components — always `renderWithProvider`

Components depend on the TanStack Query context. Wrap every render in `renderWithProvider` (`src/renderWithProvider.tsx`) so the `QueryClientProvider` and `StrictMode` are present.

```tsx
import { render, screen } from '@testing-library/react'
import { renderWithProvider } from '../../renderWithProvider'
import { Board } from './Board'

it('renders the board', () => {
  render(renderWithProvider(Board))
  expect(screen.getByRole(...)).toBeInTheDocument()
})
```

Query by role + accessible name (`getByRole(role, { name })`) over `data-testid` where possible — it asserts the a11y tree implicitly.

## Mocking the API — MSW

The backend is mocked with MSW. Request handlers live in `src/service/mocks/api/` and are registered through `src/service/mocks/handlers.ts` → `src/service/mocks/server.ts`. The server is started/stopped in the vitest setup file. To override a response for one test, use `server.use(...)` inside the test, not a new global handler.

## Pure logic — test directly

Game logic in `src/utils/` is pure — test it without rendering. One `*.test.ts` per helper, asserting inputs → outputs and edge cases (out-of-bounds, empty board, win/loss boundaries).

```ts
import { leftPad } from './leftPad'

it('pads to width', () => {
  expect(leftPad(7, 3)).toBe('007')
})
```

## Coverage

`yarn test:coverage` uses `@vitest/coverage-v8`. No global threshold is enforced in config — the standard (CLAUDE.md guideline 6) is that **every file you touch is exercised by a test**. Generate coverage with the relevant tests, then read the per-file table to confirm the lines you changed are covered.
