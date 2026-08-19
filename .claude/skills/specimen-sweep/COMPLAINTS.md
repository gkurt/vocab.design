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

## uncaptured-drag

- Queued: 2026-08-19 · Status: queued
- Rule: a demo that holds a drag (pointerdown, then pointermove tracking until
  pointerup) must capture the pointer, or a real reader's drag dies the moment
  the pointer leaves the element: moves stop arriving, the release lands
  elsewhere, and the demo strands mid-drag. The fix is
  `if (event.isTrusted) el.setPointerCapture(event.pointerId)` in the pointerdown
  handler — the isTrusted guard is MANDATORY, because a synthetic pointer (the
  attract player's) has no active pointer to capture and the call THROWS,
  killing the handler mid-run and breaking the scripted drag that worked before
  the fix. Touch pointers capture implicitly on pointerdown's target, so the
  guard costs them nothing. While captured, boundary events stop firing (the
  pointer counts as over the capture target), so leave-based cleanup no longer
  fires mid-drag; a drag must end on pointerup AND pointercancel. Deliberate
  end-on-leave semantics for a press (pressureHold's hold, which is positional)
  is not an offense: this rule is about drags, where position is the payload.
- Detector: detectors/uncaptured-drag.ts (recall-tuned: raw down+move+up
  listeners in demo.ts, no setPointerCapture). At queue time: 72/849 flagged,
  the whole drag family (sliders, scrubbers, drag-and-drop, swipes, panners).
  Judge question per slug: is the pointermove a HELD drag (down starts it, up
  ends it), and does state track the pointer between them? Hover trackers and
  press-only demos flagged by accident are skips.
- Recipe: add the guarded capture line to the pointerdown handler; confirm the
  move/up listeners live on (or above) the capturing element; add pointercancel
  beside pointerup where missing; delete leave-handlers that existed only to
  paper over the missing capture (they no longer fire mid-drag anyway). With 72
  offenders, shard into parallel batches per the skill (~25 each); the recipe,
  not shared context, keeps shards consistent. Sweep-time option worth deciding
  once: a small kit helper (capturedDrag in src/kit) demos wire instead of raw
  listeners, which would also carry the pointercancel discipline — weigh it
  against 72 mechanical one-line edits.
- Verify: choreography + takeover passes over touched slugs (the script path is
  unaffected — which is exactly why CI never saw the bug); the hand on 4321 for
  a sample per shard: start a drag, leave the element, keep dragging, release
  outside; state must track throughout and release cleanly.

## bare-icon-buttons

- Queued: 2026-08-19 · Status: queued
- Rule: `.sp-icon` is display block, so an icon interpolated bare into a
  non-flex `.sp-button` breaks its label onto a second line (STAGE_NEWS law 20
  carries the authoring rule). An icon-and-label button states
  `display: inline-flex; align-items: center; gap: 6px` inline, or wraps the
  icon in a flex span.
- Detector: detectors/bare-icon-buttons.ts. At queue time: 9/849 flagged
  (accessibility-trait, action-sheet, disclosure, floating-action-button,
  icon-button, long-press, popover, progressive-disclosure, swipe-actions);
  light-dismiss was the discovery case, fixed 2026-08-19. Judge question: does
  the button actually render icon and label on one line (a kit class may
  already flex it), and is the two-line render ever deliberate?
- Recipe: add the inline-flex style to the button (the light-dismiss fix);
  alternative worth deciding at sweep time: make `.sp-button` itself
  inline-flex with a gap in the kit, which fixes the class everywhere but
  needs the visual pass over every flagged specimen plus a spot-check of
  text-only buttons.
- Verify: the eye on 4321 (this is a paint bug; e2e cannot see it); choreography
  pass over touched slugs for regressions.

## input-simulation

- Queued: 2026-08-19 · Status: queued
- Rule: the vocabulary grows before a demo fakes it (SPEC §8, STAGE_NEWS law 18).
  A control that impersonates INPUT (a "Simulate a hold" button, a switch standing
  in for a gesture the player could perform) is banned: the script performs the
  gesture with a real step, or the term waits for the primitive it needs.
  Simulation stays legitimate for ENVIRONMENT: viewport widths, system
  preferences (prefers-contrast, color schemes), network failures and delays,
  permission prompts, vision simulations, and the spec-sanctioned simulated focus
  (`data-sim-focus`) that must never be real. The word "simulated" on a legit
  specimen is honest labelling, not an offense.
- Detector: detectors/input-simulation.ts (recall-tuned: /simulat/, sim-named
  parts, "pretend", "labelled simulation" in demo.ts). At queue time: 70/849
  flagged, most legitimate. Judge buckets per slug:
  (a) REWRITE NOW, primitive exists: long-press, spring-loading, jiggle-mode
      (hold-countdown sims the `hold` step replaces), pressure-sensitivity
      (hold + pressure ramp); nudge, range-select, access-key, and any other
      simulated-modifier controls (the `withKey` scope landed 2026-08-19, laws
      23-24; modifier-key rewritten as its first consumer the same day, and
      signature-pad's drag gained via waypoints as the path drag's first
      consumer). force-touch, hold-to-confirm, and key-repeat
      (the `holdKey` step's first consumer, plus its focusability bug) already
      rewritten 2026-08-19.
  (b) NEEDS A PRIMITIVE, add to the backlog and wait: multi-touch (>2 contacts),
      look-and-pinch (gaze); the two-contact pinch landed 2026-08-19 (`pinch`
      step + pinchSpread + Ctrl+drag takeover; pinch-to-zoom rewritten as first
      consumer) and rotation joined it the same day (the step's `turn`,
      pinchSpread's second signal; rotate-gesture rewritten as first consumer,
      its sim buttons and drawn fake fingers deleted — laws 21 and 26);
      shake-to-undo (device motion: decide at build time whether synthesized
      devicemotion is honest or sensor input counts as environment).
  (c) ENVIRONMENT, skip: simulated viewports (breakpoint, container, fluid-*,
      mobile-first, responsive-web-design, the-fold), system preferences and
      schemes, color-vision-deficiency, captcha, foit/web-font, magic-link,
      permission-priming, widget, and every data-sim-focus mention.
  Overlaps fake-touch: dedupe at sweep time, one rewrite per specimen.
- Recipe: bucket (a) follows the hold-to-confirm rewrite shape (delete the sim
  control, script the real gesture, keep the demo's own wiring); bucket (b) terms
  are logged as `needs stage primitive: <what>` and left alone; bucket (c) is
  untouched.
- Verify: choreography + takeover passes over touched slugs; captions that named
  the simulation must be reworded with the control's removal.

## fake-touch

- Queued: 2026-08-19 · Status: queued · Prerequisite MET for single-contact
  (2026-08-19: data-touch persona, hold step with pressure ramp, fingertip disc,
  pressureHold in src/kit/touch.ts) AND for the two-contact pinch and rotate
  (2026-08-19: `pinch` step with scale and turn, pinchSpread reporting both,
  Ctrl+drag takeover mapping with a mirrored second disc; pinch-to-zoom and
  rotate-gesture rewritten as first consumers). Only gestures past two contacts
  still wait; every other offender is sweepable now.
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
  offenders (long-press, multi-touch, pinch-to-zoom, rotate-gesture, double-tap,
  shake-to-undo...), 'gesture-based' entries already perform the gesture (drag or
  hold) and may only need the touch persona; force-touch and hold-to-confirm were
  rewritten 2026-08-19 as the primitive's first consumers; known
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
  holographic-foil was rewritten 2026-08-19 at the user's request (option b: the
  three-angle poster and its hover tour became one card on a draggable orbit).
- Recipe: per offender, either (a) delete the pointless `moveTo`s, leaving waits
  and asserts that still prove the mount state (add asserts if the script would
  end up empty; an assert-only script is legal and still loops), or (b) grow the
  demo's honest state axis and choreograph that instead. Option (b) needs the
  visual pass; option (a) does not.
- Verify: choreography pass over touched slugs; subject snapshots must not change
  under option (a).
