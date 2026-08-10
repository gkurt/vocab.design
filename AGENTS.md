# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

**Read [SPEC.md](SPEC.md) first** — it is the canonical design document for the whole
project (content model, design systems, specimen stage, attract mode, pipeline). Any
change that contradicts SPEC.md needs the spec updated in the same PR.

## Commands

```bash
bun run dev        # Astro dev server (port 4321)
bun run build      # Static build to dist/
bun run test       # Unit tests (bun test)
bun run test:e2e   # Specimen smoke tests: builds, serves on 4322, plays every choreography
bun typecheck      # astro sync + type check (TypeScript 7, native tsc)
bun validate       # Content gates: schema, relations, symmetry, stubs, demo files
bun run lint       # Lint
bun run format     # Format
bun run fix        # Lint + format + autofix
bun run checks     # Everything: check + typecheck + test + validate + test:e2e
```

`bun run test:e2e` needs a browser once: `bunx playwright install chromium`. It builds
the site and previews it on 4322, so it never collides with `bun run dev`. Run
`bun run test:e2e:update` after a deliberate change to what a specimen identifies as,
and read the diff in `e2e/__snapshots__/` before committing it.

Do not put `[run] bun = true` back in `bunfig.toml`. It symlinks `node` to Bun for
package.json scripts and everything they spawn, which Playwright's test runner cannot
survive: its workers never report and `bun run test:e2e` hangs with no output at all.
Bun still runs `bun test` and `bun scripts/*.ts`; node-shebanged binaries get Node.

Prefer these scripts over ad-hoc commands. Do not prefix them with `bun run` when
a bare alias exists (`bun check`, `bun typecheck`) — those are whitelisted for
agent use.

## Project Structure

```
SPEC.md                     # Canonical design doc — read first
src/lib/schema.ts           # Zod v4 term schema (single source of truth)
src/lib/terms.ts            # getTerms() — the ONE way to read the collection (see gotcha below)
src/lib/slug.ts             # slugify for terms and aliases
src/content/terms/          # One MDX file per term, frontmatter per schema
src/content/demos/<slug>/   # demo.ts (mount fn) + choreography.ts per term
src/kit/kit.ts              # Specimen kit stylesheet, assembled and adopted into shadow roots
src/kit/*.css               # tokens · layout · controls · surfaces · motion (--sp-* only)
src/kit/icons.ts            # Shared inline SVG icon set
src/kit/parts.ts            # part()/partsOf()/flag(): the data-part lookup demos share
src/kit/segmented.ts        # <sp-segmented>, <sp-combobox>: kit primitives that carry state
src/kit/combobox.ts         #   (written once against ARIA APG, reused by every demo)
src/stage/                  # <vd-stage>, attract player, scheduler, choreography types
src/stage/visible.ts        #   isRevealed (summon) vs isSeen (assert): see gotcha below
src/styles/                 # Chrome: global.css (--vd-* tokens, Tailwind theme), stage.css
src/pages/                  # index, [slug] (terms + alias redirects), [slug].md, terms.json, llms.txt
scripts/validate-terms.ts   # Content gates run by `bun validate`
playwright.config.ts        # e2e runner: builds, previews on 4322, two passes over every specimen
e2e/*.e2e.ts                # Choreography smoke tests + identify snapshots (SPEC §8)
e2e/harness.ts              #   specimen discovery, stage helpers, subject description
e2e/__snapshots__/          #   committed: what each specimen identifies as
e2e/__artifacts__/          #   generated: identify stills + the contact sheet
```

**Gotcha**: Astro validates collection entries against a derived JSON schema but does
NOT apply Zod output transforms — defaults never materialize on `getCollection()`
data. Always read terms via `getTerms()` from `#src/lib/terms.ts`, never
`getCollection('terms')` directly.

**Gotcha**: `src/stage/visible.ts` exports two visibility tests and they are not
interchangeable. `isRevealed` is identify's: on stage *or on its way*, opacity ignored,
so a summon does not sit out a fade. `isSeen` is an `assert`'s: could a reader see it,
opacity included. Reach for the one that matches the question being asked.

## Architecture

- **Astro 6** static site, content collections, Tailwind v4 for chrome, zero JS by
  default; interactivity via vanilla-TS custom elements.
- **Two design systems, deliberately walled off**: chrome tokens (`--vd-*`) vs specimen
  kit tokens (`--sp-*`). Demos compose kit primitives only — never chrome styles, never
  third-party component libraries.
- **Choreographies double as tests**: every demo ships a declarative script the stage
  plays in attract mode and CI executes as a smoke test. `data-part` attributes are the
  only valid selectors in choreographies; an `assert` may qualify one with a state
  attribute (`[data-part=nav-install][data-current]`), and `state: 'hidden'` is
  satisfied by an absent element as well as an invisible one. Scripted input must
  reach a state rather than flip it (SPEC §8): a demo's trigger opens, and dismissal
  is explicit. Toggles are only for demos where the toggling is the term itself.
  `bun run test:e2e` plays each script through the real attract player, so a demo must
  answer synthesized events: nothing may depend on a browser's own default activation
  (`<summary>`, a `<label>` for an input, a form submit). An `assert` is judged the
  moment the script reaches it, with no retry, so give a claim room rather than time it
  to the edge of a transition. Demos never import anything from `e2e/`.
- **No incidental layout shift**: a specimen changing state must not move the parts
  that did not change (SPEC §5). Reserve the room a revealed element will take,
  measuring it once on mount if that is the only way to know it. When the size change
  is itself the term, contain it: widening a control is fair, growing its row or
  pushing what is below is not.
- **Subject and context**: every demo marks the element the term names with
  `data-subject`, on the narrowest element that term actually names, and wraps scenery in
  `.sp-context` (accent goes neutral, elevation drops). Never add emphasis styling to
  the subject — the stage draws all annotation (pin, identify spotlight) itself.
  Demo instrumentation (a Replay button, a "make it fail" switch) is scenery, never
  subject. Marking the top-level wrapper claims the whole scene is the term and
  **withdraws the identify control** (SPEC §5–6), so reach for it only when no
  narrower element is the answer; `e2e/__snapshots__/<slug>-subject.txt` records
  which way each specimen went.
- Term relations are validated for integrity and symmetry in CI; a relation to a
  nonexistent term requires creating that term's stub in the same change.

## Key Conventions

- **Runtime**: Bun. **Language**: TypeScript (strict, ESNext, `nodenext` modules).
- **Formatting**: Biome — 2-space indent, single quotes, 140 char line width, LF.
- **Imports**: use `.ts` extensions in source imports (`verbatimModuleSyntax` is on).
  Internal modules use the `#*` subpath alias (e.g. `import { env } from '#src/env.ts'`).
- **Zod**: always `import * as z from 'zod/v4'` — never bare `zod` or `zod/v3`. Enforced by Biome.
- **Editorial**: never use em-dashes in site content, UI copy, or docs prose. Use a
  comma, colon, period, or parentheses instead (SPEC §2.4; `bun validate` enforces it
  for term content).

## Coding Conventions

- Prefer colocation.
- Use TypeScript with strict typing. Avoid `any` unless absolutely necessary.
- When importing internal modules, use absolute imports starting with `#src/`. Also include file extensions.
- Always use top-level `import type` for type imports. Never use inline
  `import('./module.ts').Type` syntax in type annotations.
- Avoid verbose code comments; write self-explanatory code. Comments are acceptable for:
  - Explaining complex logic, workarounds, or decisions
  - Documenting public APIs (functions, classes, modules)
  - TODO/FIXME notes
  - When the user specifically asks for comments
- Prefer concise, clear code:
  - Prefer early returns to reduce nesting.
  - Prefer single-line `if` statements for simple conditions.
- If a file gets too long (e.g. >600 lines), refactor into smaller modules.
- Check for existing utilities/hooks/components before creating new ones. Avoid duplication.
- Remove dead and commented-out code; don't preserve old APIs unless asked.
- When moving or relocating code (functions, components, utilities), don't leave a re-export behind for backwards compatibility. Update every importer to point at the new location and delete the old definition, so there is a single source of truth.

## Documentation

When changing user-facing APIs or the content model, update all relevant docs in the
same change: SPEC.md, README.md, AGENTS.md, llms.txt. Documentation must not go stale.

## Releases

None. This is a deployed site, not a published package — no release tooling; `main`
deploys to GitHub Pages.
