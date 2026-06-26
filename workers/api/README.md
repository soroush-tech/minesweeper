# @minesweeper/api

AWS Lambda API for minesweeper. **Skeleton only.**

## Status

This package currently contains a placeholder Lambda handler
(`src/index.ts`) and a unit test. The following are intentionally
deferred to a later round:

- **Runtime** — Hono + `@hono/aws-lambda` adapter vs. a plain
  `handler(event, context)`. No framework dependency is installed yet.
- **Lambda event/result types** — `@types/aws-lambda` will be added with
  the runtime decision.
- **Infrastructure-as-code / deployment** — SST, AWS SAM, Serverless
  Framework, or CDK. Nothing is wired up yet.

## Scripts

- `pnpm --filter @minesweeper/api test` — run unit tests (Vitest, node env)
- `pnpm --filter @minesweeper/api lint` — lint `src`
- `pnpm --filter @minesweeper/api build` — type-check (`tsc`)
