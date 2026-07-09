/mcp---
description: How to write git commits in this repo — Conventional Commits, the allowed types, scopes, and breaking-change notation. Use when committing work.

---

# Commit

## Conventional Commits format

Every commit follows the [Conventional Commits](https://www.conventionalcommits.org) structure:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Types — use only these

`fix`, `feat`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`.

| Type       | Use for                                                 | SemVer |
| ---------- | ------------------------------------------------------- | ------ |
| `feat`     | A new feature                                           | MINOR  |
| `fix`      | A bug fix                                               | PATCH  |
| `docs`     | Documentation only                                      | —      |
| `style`    | Formatting, whitespace — no code-behavior change        | —      |
| `refactor` | Code change that neither fixes a bug nor adds a feature | —      |
| `perf`     | Performance improvement                                 | —      |
| `test`     | Adding or correcting tests                              | —      |
| `chore`    | Maintenance that fits no other type                     | —      |

No other types. Things like CI, build, or deps are expressed as a **scope** on one of these types, never as the type itself.

### Scope

A scope in parentheses adds context: `feat(board): add win detection`. Use a scope for the area touched — e.g. CI changes are `chore(CI):`, **not** `ci:`.

### Breaking changes

Put `BREAKING CHANGE:` at the start of the body or footer (correlates with MAJOR). May also be flagged with `!` before the colon: `feat(api)!: change board response shape`.

### Examples

```text
feat(board): detect win when all non-mine cells are revealed
```

```text
fix(reveal): stop flood-fill from crossing flagged cells
```

```text
chore(CI): read node version from .nvmrc in the deploy workflow
```

## Closing an issue

If a commit resolves a GitHub issue, append the closing keyword to the **end of the subject line**:

```text
feat(board): add win detection - close #12
```

`close` / `closes` / `closed` all work; keep `#<number>` immediately after.

## Mechanics

- Pass multi-line messages via a file (`git commit -F <file>`).
- The husky `pre-commit` hook runs `pretty-quick --staged` (Prettier on staged files) — let it format; don't bypass it.
