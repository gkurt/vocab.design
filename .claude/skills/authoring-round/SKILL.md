---
name: authoring-round
description: Run one vocab.design authoring round, up to 6 new terms per category (54 at full width, fewer as categories empty), from roster selection through briefs, parallel author agents, gates, e2e, and commit. Use when asked to author a round/batch of terms, "do another round of 6 per category", or to continue filling the candidate pool.
---

# Authoring round: 6 terms per category

One round takes the site up to 54 terms forward: roster from the pool, briefs with
demo hints, one parallel author agent per category plus one verify agent, then
e2e centrally, then a single commit. Eleven rounds have run this way; the process
below is the distilled shape, including every failure mode they taught.

**A round is 6 per category only while every category still has 6.** The pool is
now uneven and draining unevenly: interaction was exhausted before round 16, and
round 16 emptied color and aesthetic (1 candidate each) while authoring 6 apiece
elsewhere, for 38 terms across 8 agents. Take the whole of a nearly-empty category
rather than skipping it, size the agent list to the categories that still have
terms, and tell a 1-term agent it has one term so it does not pad. Check the real
shape with `pool-remaining.ts` before promising the user a number.

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
2. Pick 6 per category, or the whole remainder where fewer are left. Selection
   principles, in priority order:
   - **Pay prose IOUs**: grep recent articles for "enumerated separately" and named
     cross-references to unauthored terms; an on-site article that NAMES a candidate
     is a debt the candidate's article repays by linking back.
   - Prefer head/core priority; take tail terms when they complete a family or pair.
   - **Build contrast pairs into one round** (fake-urgency/fake-scarcity,
     frame-rate/jank): round-mates get told to contrast each other in one sentence
     each way, and the demos must look different.
   - Avoid near-duplicates of existing specimens (a demo that would look like an
     existing one is a smell even when the term is distinct).
   - **Rotate and >2-contact terms wait**: the stage speaks single-contact touch
     (data-touch persona, hold step, pressure; STAGE_NEWS law 17) and the
     two-contact pinch (pinch step, pinchSpread, Ctrl+drag takeover; law 21), so
     pressure, long-press, tap, swipe, and pinch terms are authorable. Rotate and
     gestures past two contacts stay out of rosters until the vocabulary grows
     them (the fake-touch entry in the specimen-sweep ledger tracks it).
3. **Collision-check every pick AND its likely aliases** against
   `src/content/terms/` (`name:` lines catch both term names and alias names).
   A candidate whose name is already an alias of an existing term is DEAD: swap it
   and note nothing. Claimed aliases a surviving pick must not take become fences
   in its brief hint.

   This is now the highest-value step in the roster, not a formality. Do it as a
   script over the whole pool rather than per pick: slugify every alias name in
   every term file into a claimed-slug map, then test each candidate slug against
   it. Round 16 found **19 dead candidates in a 214-term pool**, and they cluster
   in exactly the wrong place: both of accessibility's core candidates
   (landmark-region, tab-order) and two of motion's three head/core
   (shared-element-transition, layout-animation). Priority is no defence.
   Also eyeball the survivors for near-duplicates the slug test cannot see: a
   candidate whose *display name* equals an existing term's name is just as dead
   (motion's `reduced-motion` is the on-site `prefers-reduced-motion`), and the
   pool's own `notes` field often flags merge candidates. The dead list is worth
   reporting to the user, since `candidates.json` still carries them.

   Round 17 found 20 dead this way, then found **four more the slug test cannot
   see and one that escaped the roster entirely**. Two failure modes to add to the
   sweep, both cheap:
   - **Affix variants.** A candidate that is an existing term plus or minus a
     trailing noun shares no slug with it: `back-to-top-button` against the
     published `back-to-top`. This one reached an author agent, which refused it
     as a duplicate and cost the round a slot. Test each candidate slug with its
     trailing `-button`, `-bar`, `-menu`, `-view`, `-pattern` stripped, and with
     the existing slugs' own affixes added.
   - **Definition duplicates.** Read the DEFINITION of the nearest existing term,
     not just its name. `bulk-action-bar` died because bulk-actions' definition
     already says "a bar that appears once a selection exists and reports its
     count"; `session-timeout` died to timeout-warning, `slash-command-menu` to
     slash-command, `color-alone` to use-of-color. Four picks, all with distinct
     slugs, all already written. Grep the candidate's own definition keywords
     against existing definitions before promising the pick.

## 2. Briefs (main session, ~30 min)

Copy `make-briefs-template.ts` to a scratch directory, fill `PLAN` with the round's
slugs and hints (hint anatomy is documented in the template; drop the key for any
category with no terms left), set `OUT` to an absolute scratch path, run it with
bun from the repo root. It hard-fails on any
slug already on site or missing from the pool.

## 3. Author + verify (agents, ~30-45 min)

Copy `workflow-template.js`, fill the placeholders:

- `BRIEFS`: the absolute path from step 2.
- `CATEGORY_GUIDANCE`: per-category exemplars, IOUs, and alias fences (anatomy
  documented in the template). This is where roster knowledge becomes agent
  knowledge; skimping here costs e2e failures later.
- Never trim `STAGE_NEWS`; append new laws as rounds teach them, and mirror any
  mechanically-checkable new law into `scripts/validate-terms.ts` as a gate.

Run it with the Workflow tool if available (one author agent per stocked category, in parallel, then the
verify agent). Without a Workflow tool, run the same prompts as parallel subagents
and the verify prompt as one subagent after all authors return. Authors do their
own visual pass against the user's dev server; the verify agent runs
validate/typecheck/biome once and fixes what fails. Nobody runs e2e but you.

**Refused terms** (STAGE_NEWS law 18): an author who finds a term needs input or
stage machinery the player does not have returns it unauthored with
`needs stage primitive: <what>` instead of faking it with a simulation control.
Collect these in the report, tell the user (building the primitive is a main-session
or dedicated-session job, like `hold` and the touch persona were), and keep the term
out of rosters until the primitive lands. Faking the player is exactly what the
fake-touch sweep is un-doing; never mint new offenders.

**Spend-limit interruption recovery** (has happened twice): inventory which slugs
have all three files (`terms/<slug>.mdx`, `demos/<slug>/demo.ts`,
`demos/<slug>/choreography.ts`), then relaunch a finish variant: per-category
agents get only their REMAINING slugs, are told which batch-mates are DONE (read
them for idiom, do not rewrite), treat partial files as drafts from their earlier
self, and run the visual sweep over the WHOLE category batch (dead agents may not
have visually checked their own later terms; the sweep has caught real overflow
bugs in "complete" specimens every time). The verify agent then gates the whole round.

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
   - a mid-flight assert on an element that is fading OUT (STAGE_NEWS law 28). The
     tell is an identical claim passing inbound and failing outbound, so it reads
     as flake rather than as a rule; it is not one, and widening the window cannot
     fix it. Claim the exit through something that stays visible.
   - an assert whose meaning does not match the element's (STAGE_NEWS law 29): a
     cumulative claim aimed at a "last event" readout. Look for its twin while
     fixing it, an assert that passes for a reason the demo's state axis never
     touched, which is invisible precisely because it is green.
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
