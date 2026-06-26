Create or update a skill based on the current conversation.

The first word of `$ARGUMENTS` is the skill name (kebab-case). The rest is an optional note about what to add or change.

---

## Step 1 — Detect mode

Check whether `.claude/skills/$0/SKILL.md` already exists.

- **Exists** → **update** mode: read the current file, then go to Step 3.
- **Does not exist** → **create** mode: go to Step 2.

---

## Step 2 — Determine frontmatter (create only)

Decide the correct frontmatter based on what the skill does:

**`description`** — one sentence: what the skill does + when Claude should auto-load it. Put the key trigger phrase first.

**`paths`** — set only if the skill is scoped to specific files. Use glob patterns:

- All TypeScript → `**/*.ts,**/*.tsx`
- Workflows → `.github/workflows/**`
- Omit for project-wide knowledge.

**`argument-hint`** — short label shown in autocomplete, e.g. `[filename]`.

**`disable-model-invocation: true`** — add only if this is a manual workflow with side effects (deploy, commit). Reference knowledge should NOT have this.

**`user-invocable: false`** — add only if users should never call it directly (pure background context).

---

## Step 3 — Write content

- **Reference skills** (conventions, patterns, style guides): state the rule + one ✗/✓ code pair. No prose explaining why — the example shows it.
- **Task skills** (step-by-step actions): numbered steps, imperative verbs, no explanation.
- Keep SKILL.md under 500 lines.
- Every line is a recurring token cost — cut anything that doesn't change Claude's behavior.
- Use examples drawn from this codebase (board/cell/reveal/grid) where helpful.
- End reference skills with: `If $ARGUMENTS names a file, read it and apply the rules. Otherwise apply to the code being discussed.`

**Update mode**: add the new rule or change to the appropriate section. Do not touch unrelated rules. Remove any rule made obsolete by the change.

---

## Step 4 — Write the file

For **create**: create `.claude/skills/$0/` and write `.claude/skills/$0/SKILL.md`.

For **update**: write the updated `.claude/skills/$0/SKILL.md`.

Confirm what was created or changed. If a new `paths` scope was set, mention which files will trigger it.
