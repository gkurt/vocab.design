---
name: authoring-round
description: Run one vocab.design authoring round, 6 new terms per category (54 total), from roster selection through briefs, parallel author agents, gates, e2e, and commit. Use when asked to author a round/batch of terms, "do another round of 6 per category", or to continue filling the candidate pool.
---

# Authoring round: 6 terms per category

One round takes the site 54 terms forward: roster from the pool, briefs with demo
hints, nine parallel author agents (one per category) plus one verify agent, then
e2e centrally, then a single commit. Ten rounds have run this way; the process
below is the distilled shape, including every failure mode they taught.

Files in this skill directory:

- `pool-remaining.ts` — lists the unauthored pool per category
- `make-briefs-template.ts` — briefs generator to copy and fill
- `workflow-template.js` — the two-phase agent orchestration to copy and fill

## 0. Preconditions

- Read SPEC.md and AGENTS.md first if this session has not.
- Clean git tree, on `main` (commits go directly to the current branch; never branch).
- The USER runs the dev server on port 4321. Confirm with a GET request to
  `http://localhost:4321/` (Astro dev answers HEAD with nothing, so a HEAD probe
  looks exactly like a server that is down). Never start, stop, or restart any dev server; if it is
  down, ask the user rather than launching one.
- Windows quirk: `bun` cannot launch Playwright's chromium (the pipe hangs).
  Repo scripts that drive a browser run under node; `bunx playwright test` is fine.
- Agent quirk: Astro 7.2 force-backgrounds `astro preview` when it detects an agent, so
  Playwright aborts with "webServer exited early" and runs nothing. `playwright.config.ts`
  now sets `ASTRO_PREVIEW_BACKGROUND=1`; set it by hand for any ad-hoc playwright run.
  Piped through a buffering pipeline this reads as a HANG with an empty log, because the
  orphaned preview holds stdout open. Run e2e detached to a log file and never under a
  tool timeout: the full suite is ~18 min and a 10 min cap kills it mid-run.

## 1. Roster (main session, ~15 min)

1. `bun .claude/skills/authoring-round/pool-remaining.ts` for the per-category pool.
2. Pick 6 per category. Selection principles, in priority order:
   - **Pay prose IOUs**: grep recent articles for "enumerated separately" and named
     cross-references to unauthored terms; an on-site article that NAMES a candidate
     is a debt the candidate's article repays by linking back.
   - Prefer head/core priority; take tail terms when they complete a family or pair.
   - **Build contrast pairs into one round** (fake-urgency/fake-scarcity,
     frame-rate/jank): round-mates get told to contrast each other in one sentence
     each way, and the demos must look different.
   - Avoid near-duplicates of existing specimens (a demo that would look like an
     existing one is a smell even when the term is distinct).
3. **Collision-check every pick AND its likely aliases** against
   `src/content/terms/` (`name:` lines catch both term names and alias names).
   A candidate whose name is already an alias of an existing term is DEAD: swap it
   and note nothing (the pool was canonicalized 2026-08-15; stragglers still happen).
   Claimed aliases a surviving pick must not take become fences in its brief hint.

## 2. Briefs (main session, ~30 min)

Copy `make-briefs-template.ts` to a scratch directory, fill `PLAN` with the 54
slugs and hints (hint anatomy is documented in the template), set `OUT` to an
absolute scratch path, run it with bun from the repo root. It hard-fails on any
slug already on site or missing from the pool.

## 3. Author + verify (agents, ~30-45 min)

Copy `workflow-template.js`, fill the placeholders:

- `BRIEFS`: the absolute path from step 2.
- `CATEGORY_GUIDANCE`: per-category exemplars, IOUs, and alias fences (anatomy
  documented in the template). This is where roster knowledge becomes agent
  knowledge; skimping here costs e2e failures later.
- Never trim `STAGE_NEWS`; append new laws as rounds teach them, and mirror any
  mechanically-checkable new law into `scripts/validate-terms.ts` as a gate.

Run it with the Workflow tool if available (9 author agents in parallel, then the
verify agent). Without a Workflow tool, run the same prompts as parallel subagents
and the verify prompt as one subagent after all authors return. Authors do their
own visual pass against the user's dev server; the verify agent runs
validate/typecheck/biome once and fixes what fails. Nobody runs e2e but you.

**Spend-limit interruption recovery** (has happened twice): inventory which slugs
have all three files (`terms/<slug>.mdx`, `demos/<slug>/demo.ts`,
`demos/<slug>/choreography.ts`), then relaunch a finish variant: per-category
agents get only their REMAINING slugs, are told which batch-mates are DONE (read
them for idiom, do not rewrite), treat partial files as drafts from their earlier
self, and run the visual sweep over the WHOLE category batch (dead agents may not
have visually checked their own later terms; the sweep has caught real overflow
bugs in "complete" specimens every time). The verify agent then gates all 54.

## 4. e2e and commit (main session, ~30 min)

1. `bun run test:e2e:new` — plays only specimens without a committed subject
   snapshot; first run fail-writes the new snapshots. Fix behavioral failures and
   re-run targeted until green. The failure taxonomy so far, most common first:
   - an assert timed to the edge of a state window (give it room, aim mid-window)
   - an assert on evidence inside a popup the action just closed (mirror onto trigger)
   - a mount-time assert with no room for kit fades (open with a wait)
   - invalid selector syntax and hairline subjects (now validate-gated)
   - an assert on a wrapper with no box: a group whose children are all absolutely
     positioned, or one held at `height: 0` to overlay without shifting, measures zero
     and reads as absent just like a hairline does
   - a demo that answers input by synthesizing more input (`btn.click()` inside a
     click handler): the choreography passes and the TAKEOVER pass fails, because
     it counts the clicks reaching the specimen and wants exactly one
2. **Review the new subject snapshots** (`e2e/__snapshots__/<slug>-subject.txt`):
   every one should be `scope: element` with a sensibly narrow subject; every
   `data-pose` carrier must mount in a state satisfying its pose (the attributes in
   the snapshot show both). A `whole scene` scope withdraws identify: verify the
   agent noted that decision deliberately.
3. One full `bun run test:e2e` (all passes: choreography, identify, identify-motion,
   takeover, reduced-motion). Never start with the full suite; it costs 15+ min.
4. Check for stray files (authors sometimes leave `shot-*.png` or probe scripts at
   the repo root); move them out, never commit them.
5. Commit everything as `Author an Nth round of 6 terms per category`. The tree
   must be clean after.

## 5. Report

Tell the user: terms count before/after (from `bun validate`'s summary), e2e check
count, behavioral failures found and how they were fixed (each is a candidate new
law for STAGE_NEWS), notable agent decisions (subject choices, dropped aliases,
deviations from briefs), and the remaining pool size. Remind about standing
deferred work if it has grown: the consolidated relations pass runs once, after
the pool is exhausted (see research/enumeration/canonicalize-notes.md, section
"Contrast edges for the relations pass").
