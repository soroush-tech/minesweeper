# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavioral guidelines

### 1. Think before coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.

### 2. Propose before implementing

**Always present a plan and wait for confirmation before writing code.**

Cover: which files change, what changes in each, why. Then wait for explicit approval.

Exception: self-evident one-liners (typo fix, missing import).

### 3. Simplicity first

**Minimum code that solves the problem. Nothing speculative.**

- No features, abstractions, or error handling beyond what was asked.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 4. Surgical changes

**Touch only what you must. Clean up only your own mess.**

- Don't refactor, reformat, or "improve" adjacent code.
- Remove imports/variables/functions that YOUR changes made unused.
- Match existing style.
- If you notice unrelated dead code, mention it — don't delete it.

### 5. Goal-driven execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals: "Fix the bug" → "Write a test that reproduces it, then make it pass."

- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

### 6. Test coverage after implementation

**After any implementation, run `yarn test:coverage` and confirm the files you touched are exercised by tests.** Add or update co-located `*.test.ts(x)` for any logic you add or change.

## Critical conventions

- **Imports:** Relative paths between source files (no path alias is configured). `allowImportingTsExtensions` is on — match the neighboring file's style for whether the `.ts`/`.tsx` extension is written.
- **Pure logic lives in `src/utils/`:** one helper per file (`utils/helperName.ts`) with a co-located `utils/helperName.test.ts`. Promote a helper here once more than one component or module needs it.
- **Hooks:** Shared data hooks → `src/common/hooks/useX.ts`. The data-fetching layer is TanStack Query wrapped by `useCustomQuery` / `useBoardQuery` / `useBoardMutation` — reuse it, don't hand-roll `fetch`.
- **Components:** Grouped by area under `src/components/<area>/Name.tsx`; PascalCase one component per file. An area's barrel `index.ts` uses `export *`, never named re-exports.
- **API mocking:** The app talks to a mock backend via MSW (`src/service/mocks/`). Game logic runs in `src/utils/mineField.ts` against IndexedDB (`src/service/db/`). Route handlers live in `src/service/mocks/api/`.
- **Test placement:** Co-located `*.test.ts(x)` next to source, run by vitest (globals on, jsdom). Wrap React renders in `renderWithProvider` from `src/renderWithProvider.tsx`.
- **Lint:** `yarn lint` runs with `--max-warnings 0` — any warning fails. Prettier `printWidth` and ESLint `max-len` are both **100**.
- **Commits:** Prettier runs on staged files via the husky `pre-commit` hook (`pretty-quick --staged`).
- **License:** Prosperity-3.0. Keep the badge/headers intact.

## Quick checklist before pushing

1. `yarn lint`
2. `yarn test:coverage` — confirm touched files are covered
3. `yarn build`
