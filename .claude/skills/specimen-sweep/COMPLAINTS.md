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

## fake-touch

- Queued: 2026-08-19 · Status: queued · Prerequisite MET for single-contact
  (2026-08-19: data-touch persona, hold step with pressure ramp, fingertip disc,
  pressureHold in src/kit/touch.ts). Pinch/rotate/multi-touch offenders still
  wait on a second contact; every other offender is sweepable now.
- Rule: touch is a first-class input, not a mouse pointer in disguise. A term
  whose subject is a touch gesture or touch-specific input (pressure, long-press,
  swipe, pinch, rotate, multi-touch) is demonstrated by PERFORMING the gesture,
  never by picking its outcomes from a control (force-touch clicking force-firm/
  force-deep buttons is the canonical offense). The ghost pointer wears a
  distinct touch graphic for these, specimens or parts are marked touch-native,
  and a reader on a mouse gets a simulated mapping (hold duration for pressure,
  drag for swipe) while a reader on a touch screen gets the real thing.
- Prerequisite build (design intent, decided at build time, amends SPEC §7-8):
  distinct touch ghost graphic (contact disc, two discs for pinch/rotate); gesture
  step vocabulary (tap, longPress with duration, swipe/fling, pinch, pressure
  ramp); a touch-native marker on demos or parts that switches the player's
  persona; synthesized PointerEvents with pointerType 'touch'; takeover mapping
  for mouse readers (hold = pressure); e2e passes inherit via the same audit seam.
  Until this lands the complaint CANNOT be swept: sequence it last or run it as
  its own follow-up sweep after the build.
- Detector: detectors/fake-touch.ts (recall-tuned: touch vocabulary in slug or
  frontmatter). At queue time: 58 flagged; 'state-picked' entries are the prime
  offenders (force-touch, long-press, multi-touch, pinch-to-zoom, rotate-gesture,
  double-tap, shake-to-undo, hold-to-confirm...), 'drag-based' entries already
  perform the gesture with a mouse and may only need the touch persona; known
  false positives (hover, icon-button, caret) mention touch incidentally. Judge
  question per slug: is the gesture itself the demonstration, and does the script
  perform it or pick its result?
- Recipe (post-build): rewrite state-picked demos so the gesture drives the
  states (the picker control goes or becomes inspection-only scenery); mark the
  demo or gesture surface touch-native; choreography performs the gesture with
  the new steps; keep an honest reduced-motion story (gates already exist).
  Subject snapshots may change; read the diffs.
- Verify: choreography + identify-motion + takeover passes over touched slugs;
  the eye confirms the touch graphic appears on touch-native parts and the
  mouse-hold simulation works in takeover on 4321.

## aim-markers

- Queued: 2026-08-19 · Status: queued
- Rule: choreography instrumentation is invisible (SPEC §5, STAGE_NEWS law 16).
  An element that exists so the script can aim at a coordinate (a tap that must
  land inside an invisible region) gets a `data-part` and NO paint: no dashed
  ring, no dot, nothing. The ghost cursor is the only visible pointer artifact;
  drawn stop-point markers annotate the script, not the term, and read as UI the
  term never had. Dashed geometry that draws the TERM (a slop region, marching
  ants, a drop zone, a minimum-target outline) is legitimate and stays; only
  markers of where the pointer will stop go. To teach where input can land, draw
  the region or say it in a caption.
- Detector: detectors/aim-markers.ts (recall-tuned). Signals: the dashed-ring
  style recipe in demo.ts, and choreography moveTo targets with marker-smelling
  names (dot-/aim-/tap-/mark-/spot-/point-). At queue time: 26/849 flagged; both
  signals fire on hit-slop, dead-zone, hit-testing, quasimode (near-certain);
  known false positives carousel and page-indicator (their dots ARE the term).
  Judge question per slug: is the flagged element a marker of the pointer's stop
  point, or the term's own geometry / real UI vocabulary?
- Recipe: keep the anchor element, its `data-part`, size, and position (events
  must land at the same coordinates; a demo resolving input by coordinate, like
  hit-slop's elementFromPoint, depends on this and must not gain `data-aim`);
  strip all paint (transparent border or none). Reword any caption that pointed
  the reader at the now-invisible marks (hit-slop's "Tap one of the three dots"
  readout and "Three taps, top to bottom" label). Choreography unchanged.
- Verify: choreography pass over touched slugs (asserts prove the taps still
  land); subject snapshots must not change; the eye confirms on 4321 that no
  stray rings remain and captions still make sense.

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
