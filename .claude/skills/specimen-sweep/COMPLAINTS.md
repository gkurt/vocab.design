# Specimen sweep ledger

One entry per complaint. The sweep runs ONCE, when the user says the list is
complete; until then entries only accumulate. Entry format:

```
## <kebab-slug>                     (## marks an entry; keep one per complaint)
- Queued: <date> · Status: queued | swept <date> (<n> fixed)
- Rule: self-contained excerpt a fixer can act on without reading SPEC.
- Detector: detectors/<slug>.ts (recall-tuned) | judge: <the one question>
- Recipe: how a fixer repairs an offender, concretely.
- Verify: what proves the fix (which e2e pass, what the eye checks on 4321).
```

## subject-granularity

- Queued: 2026-08-19 · Status: queued
- Rule: the subject is the feature's own extent, not its canvas (SPEC §5,
  STAGE_NEWS law 15). "The term is a thing this element has" is the wrong test;
  it justifies any container up to the page (a river is a thing a paragraph has).
  When the term names a feature inside an element (a channel of aligned spaces, a
  gap, a stroke, a band), `data-subject` goes on the element tracing that
  feature: a demo that draws or highlights the feature marks the drawn overlay
  (river marks its `trace-rivered` overlay, not the paragraph), and a feature
  with no element of its own is given one sized to its extent. A subject the
  current state hides is legal: identify summons what is off stage. Moving a
  subject changes the committed snapshot in `e2e/__snapshots__/<slug>-subject.txt`;
  that diff is the point, read it.
- Detector: detectors/subject-granularity.mjs (browser probe, node, needs the
  user's dev server on 4321; recall-tuned shortlist for a judge). Flags
  (a) orphaned highlight: inline `--sp-accent` paint outside both the subject and
  `.sp-context`, the demo highlighting a thing the ring does not cover; and
  (b) canvas-sized subject: subject box at 60%+ of the specimen's area. Judge
  question per flagged slug: does the term name a visual feature narrower than
  the ringed element, and can an existing or new element carry it honestly?
  Offender count pending: 4321 was down at queue time; run the probe and record
  the count here when the dev server is next up. Known offender: river.
- Recipe: move `data-subject` to the feature-tracing element, or add a tightly
  sized overlay for the feature and mark that; the vacated container usually
  stays plain (it is neither subject nor scenery). Update nothing else; identify
  summons hidden subjects, and `data-pose` only if the feature is dishonest in
  some state. Run the identify + identify-motion passes on touched slugs and
  review every subject-snapshot diff deliberately.
- Verify: identify and identify-motion passes over touched slugs; each snapshot
  diff shows the narrower subject; the eye confirms the ring on 4321 hugs the
  feature.

## cursor-theater

- Queued: 2026-08-19 · Status: queued
- Rule: a still term ships a still script (SPEC §8, STAGE_NEWS law 14). A `moveTo`
  whose target has no visible consequence (no `data-hovered` styling, no handler,
  nothing revealed or asserted from the hover) is cursor theater and demonstrates
  nothing; pointing at parts in sequence is the identify pin's job, not the
  cursor's. A choreography for a term whose whole claim is visible at rest becomes
  waits and asserts only. Before going still, ask whether the term honestly has a
  second state the demo fails to show (a count that reflows, a comparison worth
  posing): a pointless hover is as often an under-built demo as an over-built
  script. Growing the demo is in scope when the term plainly has that state;
  otherwise still the script.
- Detector: detectors/cursor-theater.ts. Recall-tuned: flags hover-only `moveTo`
  steps (no input step AND no assert before the next `moveTo` or end), and marks
  scripts that are pure hover tours (no input steps at all). Tooltips and menus
  that assert what the hover reveals do not flag. At queue time: 93/849 specimens,
  mostly typography/aesthetic; pure hover tours are the majority.
- Recipe: per offender, either (a) delete the pointless `moveTo`s, leaving waits
  and asserts that still prove the mount state (add asserts if the script would
  end up empty; an assert-only script is legal and still loops), or (b) grow the
  demo's honest state axis and choreograph that instead. Option (b) needs the
  visual pass; option (a) does not.
- Verify: choreography pass over touched slugs; subject snapshots must not change
  under option (a).
