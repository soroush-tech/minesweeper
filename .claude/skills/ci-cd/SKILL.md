---
description: GitHub Actions CI/CD for this repo — the single deploy.yml that builds and deploys to GitHub Pages, reads Node from .nvmrc, detects the package manager, and deploys only on push to main. Use when editing or debugging .github/workflows/**.
paths: .github/workflows/**
---

# CI/CD (GitHub Actions)

## One workflow: `deploy.yml`

| File         | Name                   | Trigger                                                         |
| ------------ | ---------------------- | --------------------------------------------------------------- |
| `deploy.yml` | Deploy to GitHub Pages | `push` to `main`, `pull_request` to `main`, `workflow_dispatch` |

Two jobs: **`build`** (always) → **`deploy`** (push only).

## Build / deploy split

- `build` runs on every trigger so PRs are validated, but only **uploads the Pages artifact** (`actions/upload-pages-artifact`) when `github.event_name == 'push'`.
- `deploy` is gated `if: github.event_name == 'push'` and `needs: build`. PRs never deploy.

```yaml
- name: Upload artifact
  if: github.event_name == 'push'
  uses: actions/upload-pages-artifact@v3
  with: { path: ./build }

deploy:
  if: github.event_name == 'push'
  needs: build
```

The Vite build output directory is **`./build`** — keep the artifact `path` in sync with `vite.config.ts` if it changes.

## Node version comes from `.nvmrc`

Never hard-code the Node version. The `read-node-version` step reads `.nvmrc` into `$GITHUB_ENV`; `setup-node` consumes `${{ env.NODE_VERSION }}`.

## Package-manager detection

The `detect-package-manager` step picks `yarn` (if `yarn.lock`) else `npm`, and exposes `manager` / `command` / `runner` as step outputs. Install and build use those outputs — don't hard-code `yarn`/`npm`:

```yaml
- run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
- run: ${{ steps.detect-package-manager.outputs.runner }} npm run build
```

## Required Pages config — don't remove

```yaml
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: 'pages', cancel-in-progress: false }
```

`pages: write` + `id-token: write` are required by `actions/deploy-pages`. `cancel-in-progress: false` lets an in-flight deploy finish rather than being cancelled by a newer push.

## Defaults

- **Runner:** `ubuntu-latest`.
- **Caching:** `setup-node` with `cache: ${{ ...outputs.manager }}`.
- **Secrets vs vars:** tokens/keys → `secrets`; non-sensitive config → `vars`.

If the task names a workflow file, read it and apply these rules. Otherwise apply to the workflow being discussed.
