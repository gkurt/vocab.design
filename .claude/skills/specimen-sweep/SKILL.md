---
name: specimen-sweep
description: Queue specimen-wide nitpicks into a complaint ledger, and run the one consolidated sweep over existing specimens when the user says the list is complete. Use when the user voices a complaint that applies across existing specimens ("add this to the sweep list", "another nitpick"), or asks to run the specimen sweep.
---

# Specimen sweep: queue cheaply, sweep once

The user accumulates specimen complaints and fixes them in ONE consolidated pass.
Never fix old specimens piecemeal when a new rule lands: ship the rule (SPEC,
STAGE_NEWS law, validate gate where mechanical) so new rounds comply, queue the
backlog here, and wait for the user to call the sweep.

The whole design serves one budget rule: **tokens scale with offenders, never with
the corpus.** No agent may read every specimen. Detectors (scripts) find candidates
for free; agents only ever read shortlisted files.

Files in this skill directory:

- `COMPLAINTS.md` — the ledger: one entry per complaint (rule, detector, fix
  recipe, status)
- `detectors/*.ts` — one runnable detector per mechanical complaint; run from the
  repo root with bun; each prints a worklist of `slug<TAB>evidence` lines.
  Browser-probe detectors are `.mjs` run with node instead (bun cannot launch
  Playwright chromium) and need the user's dev server on 4321; they are still
  scripts, still zero tokens.

## Entry point 1: queue a complaint (default, cheap, do this any time)

1. Append an entry to `COMPLAINTS.md` in the documented format. Capture the rule
   as a self-contained excerpt (2-6 sentences): at sweep time the fixer gets THIS
   TEXT, not SPEC.md, so it must stand alone.
2. Write the detector NOW, while the complaint is fresh:
   - Mechanical or over-approximable: a bun script in `detectors/`, tuned for
     recall (false positives are fine; a judge or the fixer filters). Run it once
     to sanity-check and record the current offender count in the entry.
   - Genuinely unmechanizable (pure taste): mark the entry `detector: judge` and
     write the one question a judge should answer per specimen. These are the
     expensive ones; say so to the user when queueing.
3. If the complaint implies a new authoring rule, ship that rule in the same
   change (SPEC section, STAGE_NEWS law in the authoring-round skill, validate
   gate if mechanically checkable) so the backlog stops growing.
4. Do NOT fix anything. Commit the queue change.

## Entry point 2: run the sweep (only when the user says the list is complete)

Preconditions match the authoring-round skill: clean tree on main, the USER runs
the dev server on 4321 (HEAD-check it; never start/stop one), bun cannot launch
Playwright chromium (browser probes run under node), and ad-hoc Playwright needs
`ASTRO_PREVIEW_BACKGROUND=1`.

1. **Detect (scripts, ~zero tokens).** Run every detector; merge output into one
   worklist grouped by complaint. Report counts to the user before spawning
   anything: this is the moment to renegotiate scope if a complaint caught
   hundreds.
2. **Judge (only fuzzy complaints).** For `detector: judge` entries and low-precision
   detector output, batch the shortlist into a few agents (20-40 specimens each,
   low effort) that answer ONLY fix/skip per slug with a one-line reason. Judges
   read the specimen files, never SPEC; their prompt is the entry's rule text.
3. **Fix (one agent per complaint).** Each fixer gets: the entry's rule text and
   fix recipe, its offender list (paths, not contents), the relevant STAGE_NEWS
   laws only, and the round conventions that still bind (DemoClock timers, no
   measuring after style writes, data-part selectors, kit frozen, no static
   checks, probe scripts under node against the user's 4321, never left at repo
   root). Fixers run in parallel when their offender sets do not overlap;
   sequence any two complaints that touch the same files. A fixer does the visual
   pass only if its fix changes rendering. Shard a fixer whose offender list
   exceeds ~25 specimens into parallel batches carrying the same recipe; the
   recipe, not shared context, is what keeps shards consistent.
4. **Verify (one agent, once).** `bun validate`, `bun typecheck`, `bun check`,
   fixing failures; the three pre-existing Biome warnings are off-limits
   (candidates.json size, two noDescendingSpecificity in src/kit/motion.css).
5. **e2e (main session).** Targeted first, over touched slugs only:
   `ASTRO_PREVIEW_BACKGROUND=1 bunx playwright test -g "\s(slug-a|slug-b): "`.
   Review any changed subject snapshots deliberately (a sweep that changes what a
   specimen identifies as is making a claim; read the diff). Then ONE full
   `bun run test:e2e` before the commit.
6. **Commit once**: `Sweep specimens: <short complaint list>`. Mark every swept
   entry in `COMPLAINTS.md` with the date and final offender count in the same
   commit. Report per complaint: offenders found, fixed, judged-skip, plus any
   new law a fix taught.

## Why this shape (token economics)

A naive sweep (one agent per specimen, or agents grepping the corpus themselves)
reads ~700 specimens' worth of files through a model. This shape reads: nothing
(detectors) + shortlists (judges, only for fuzzy complaints) + offenders (fixers,
grouped so the pattern is learned once per complaint, not once per file). Gates
run once; e2e compute is wall-clock, not tokens, but still runs targeted-first
because a full pass costs 15+ minutes per iteration and failures come in batches.
