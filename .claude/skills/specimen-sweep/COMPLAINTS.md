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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-22 (71 fixed, 0 skipped)
- Swept: every one of the 71 flagged was a real held drag; zero false positives, the
  highest-yield entry in this ledger. Laws the sweep proved twice over, worth keeping
  when the detector is re-pointed at new rounds: (a) capture the PRESSED element even
  when the move/up listeners are on `root`, because captured events retarget to the
  capture target and still bubble, so a root listener keeps firing while capturing root
  itself would swallow presses that were never drags; (b) the capture line goes at the
  TOP of the handler when early returns decide WHICH thing was grabbed, but AFTER the
  guard that decides whether a drag starts at all, since capturing a declined drag
  swallows events for nothing; (c) the rule extends past position: any flag cleared only
  by pointerup needs the capture that guarantees pointerup arrives (drag-handle left
  `selecting` set on a release outside root, turning a later hover into a selection).
  Severity ranks by listener placement: down+move+up all on one small element breaks
  after ~2px (haptic-feedback, minimap, pull-to-refresh, infinite-canvas, swipe-actions),
  while root-listening demos only lose the release. OPEN DECISION for the user: two of
  three shards recommend a kit `capturedDrag(el, {onMove, onEnd})` helper after writing
  the same five lines 71 times (it would make the pointercancel pairing structural
  rather than remembered); the third argues call sites differ too much to share. Kit was
  frozen for the sweep, so nothing was built.
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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-22 (0 fixed, 10 skipped: detector noise)
- Swept: ALL TEN were false positives, verified by measuring the live shadow DOM rather
  than by eye (every specimen button computed `display: flex` with a non-zero gap, icon
  and label tops within 0.8px, single-line heights 26.8 to 31.5px). The only real defect
  was ever light-dismiss, fixed 2026-08-19. The detector greps `${icon(...)}Label` inside
  a button and never checks the class list, but four kit classes already supply the flex
  context and three are routinely co-classed onto `.sp-button` for exactly this:
  `.sp-menu-item`, `.sp-row`, `.sp-chip`, `.sp-icon-button`. Rewrite the detector to skip
  buttons carrying any of those before ever re-raising this. The positive authoring rule:
  prefer adding `sp-row` to a `.sp-button` over stating inline-flex, and state it inline
  only when the button needs its own direction or sizing. Deliberate icon-over-label
  tiles (share-sheet, swipe-actions) are a stacked layout, not a broken line, and the kit
  `.sp-button` class needs NO change.
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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-23 (7 fixed, 73 skipped; 80 flagged)
- 2026-08-23 sweep: 80 flagged and the overwhelming majority were honest labelling, so
  the shortlist was cut mechanically instead of by judges: strip the documented (c)
  environment bucket, then grep for the actual offense SHAPE, a CONTROL whose data-part or
  on-screen label names a simulation. That is a zero-token filter and it left seven.
  Rewritten: long-press and jiggle-mode (Simulate-a-hold buttons, now real `hold`),
  spring-loading (Simulate-a-hover, now `moveTo` + `wait` with data-hover-driven on the
  header), nudge and range-select (Simulated Shift/modifier, now `withKey`),
  pressure-sensitivity (Light/Medium/Firm picker, now hold LENGTH under a touch scope),
  fling (Simulate-a-throw, and see the vocabulary growth below). Four that LOOKED like
  offenders are legitimate and were confirmed one by one rather than trusted: access-key
  already reads a real altKey (only its focus ring is simulated), pointer-lock cannot call
  requestPointerLock because it would take the reader's real cursor away from the embedding
  page, yellow-fade-technique simulates someone else's edit ARRIVING (not input), and
  first-rule-of-aria already presses real keys, its "keys simulated" caption being about
  synthesized events not firing a browser's default activation, which IS its comparison.
- 2026-08-22: BUCKET (b) IS RESOLVED, so nothing in this entry waits on a primitive any
  more. The >2-contact half was built (see fake-touch above, STAGE_NEWS law 41) and
  screen-curtain moves out of (b): its VoiceOver three-finger triple tap is now performable
  as `{ tap: { fingers: 3, count: 3 } }`, so its segmented off/on picker is a state picker
  law 18 bans. The DEVICE MOTION half was resolved the other way, by RULING rather than by
  building: a shake is read from a sensor rather than made by a pointer or a key, so it
  belongs to the environment carve-out beside a network failure, a server delay or a
  permission state (SPEC §8). shake-to-undo keeps its labelled control and motion-actuation
  keeps its configuration segments; both had comments framing this as a player DEFICIENCY
  awaiting a primitive, and both now cite the carve-out instead. The test is what the input
  IS, not whether the stage could synthesize an event for it. Also settled: multi-touch is
  no longer in (b) either, being the new primitive's first consumer.
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
  (b) NEEDS A PRIMITIVE, add to the backlog and wait: multi-touch (>2 contacts);
      the gaze persona landed 2026-08-19 (`data-gaze`: mouse events dressed as an
      eye with pinch-close activations, law 27; look-and-pinch rewritten as first
      consumer, its "labelled simulation" caption retired); the two-contact pinch landed 2026-08-19 (`pinch`
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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-23 (11 fixed, 79 skipped; 90 flagged)
- 2026-08-23 sweep: 90 flagged, judged in three batches of 25. Most were false positives
  and the judges were right to be strict, because a segmented control choosing a
  CONFIGURATION (density, layout-margins, thumb-zone, target-spacing, rotor, wipe) is not
  simulated input. Two buckets of real work came out. GESTURE REWRITES, all four of which
  cited a blocker that no longer existed: pressure-sensitivity, semantic-zoom (picker
  standing in for a pinch), stories ("a script cannot hold anything down", when `hold` is
  the step whose whole point is holding), sticky-hover ("a tap cannot be scripted as a
  tap"). PERSONA ONLY, where the gesture was already performed with a real drag or dblclick
  but the surface was never marked data-touch, so the ghost drew an arrow on a specimen
  whose subject is a finger: tap, double-tap, edge-swipe, predictive-back, pull-to-refresh,
  plus fling. TWO WERE MISSED BY JUDGES and found by grepping for stale blocker claims
  instead (`cannot be scripted`, `no touch step`, `player cannot`), which is the cheaper
  and more reliable instrument for this complaint: sticky-hover and tap. **Run that grep
  first next time.** A judge reads a demo's comment as its rationale, so a comment that
  confidently explains why a control is necessary reads as a justification even when the
  constraint it cites was lifted months ago.
- 2026-08-22: THE LAST BLOCKER IS GONE. Contact counts up to three now exist (SPEC §7-8,
  STAGE_NEWS law 41): `tap`, `scrub` and `pinch` each carry a `fingers` count, 2 by default
  and 3 at most, with the contacts evenly spaced so the outermost pair still carries the
  stated scale and an odd third rides the centre. The kit side is `contactTap` and
  `contactScrub` (renamed from the twoFinger* pair, no aliases kept) plus a new
  `contactCount` for a term whose claim IS the count. A reader on a mouse stands in for a
  pair with Ctrl and for three with Ctrl+Shift, and `reader: false` withholds that mapping
  where the platform swallows the gesture before any document sees it. Four contacts were
  deliberately NOT built: the unauthored pool has no term that needs them, so that waits
  exactly as three did. multi-touch was rewritten as the first consumer and PROVEN with
  audit() before anything else was authored on it (law 37): its two-contact pinch zooms to
  exactly 1.90 and a three-contact spread of 1.6 leaves the zoom untouched, which is the
  term (a surface distinguishing counts) demonstrated rather than asserted. Every prior
  consumer re-audits clean: magic-tap, escape-gesture, pinch-to-zoom, rotate-gesture.
  So the entry is now sweepable in full, and what remains is the ordinary bucket work.
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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-22 (15 fixed, 13 skipped)
- Swept: 15 anchors stripped to paintless boxes (hit-slop and hit-testing from the clean
  list; brushing, dead-zone, drag-autoscroll, drag-threshold, fling, lasso-selection,
  marking-menu, mouse-gesture, orbit, pointer-lock, quasimode, resize-handle, smart-guides
  from the multi-complaint batch); radial-menu and ripple were already compliant. The
  precise discriminator, found independently by two fixers and worth building into the
  detector: DOES ANY CHOREOGRAPHY STEP NAME IT? Every genuine offender was a `moveTo`
  target; every legitimate dashed shape was either measured by the demo's own code or was
  the article's geometry (target-spacing's WCAG circles, alpha-compositing's stencil,
  magnetic-button's attraction radius, ghost-click's hit-tested point, carousel and
  page-indicator dots). Part naming is the secondary tell: `press-point`, `grip-end`,
  `drop-dot`, `mark-outside` were all paint. Four recipe refinements the fixes taught:
  (a) A CAPTION IS PART OF THE MARKER, so copy that named the paint has to be reworded to
  name the term's own geometry instead of the pointer's itinerary, and an unpainted anchor
  may never be named in UI copy; (b) preserve the anchor's CENTRE, not just its offsets
  (resize-handle's ring sat above its box centre, so the replacement kept the -50%
  translate or the ghost's aim point would have moved); (c) an anchor's NEIGHBOURS can
  carry the annotation (pointer-lock's dot was dressed as a legend swatch, and the
  sentence beside it only parsed as its caption); (d) invisible anchors do not belong in
  `.sp-context`, since that register neutralizes scenery paint and claims paint that no
  longer exists. Removing the marks exposed two bugs hiding behind them: drag-threshold's
  "8 px" label sat on top of the card's own text, and smart-guides' 224px nowrap readout
  was cutting its sentence off at the frame edge (now 304px).
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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-22 (8 fixed, 53 skipped; 61 flagged after the detector was repaired)
- Detector was BROKEN at first run and is now fixed: it appended a trailing slash, so
  every page 404'd under `trailingSlash: 'never'` and it reported all 1065 specimens as
  offenders ("no [data-subject] found by probe"). It now requests `/<slug>`, asserts
  `response.ok()`, and waits for `vd-stage`, so that failure can never masquerade as
  findings again. Real count: 61 (53 orphaned highlight, 6 canvas-sized, 2 iframe).
- Swept: 8 subjects moved, each verified with Identify in the browser and re-snapshotted.
  breakout (wide figure to the tinted band it draws for the track), containing-block
  (positioned badge to the resolved box, travelling with the resolution), easing (whole
  scene to a new `tracks` wrapper, which RESTORES the withdrawn Identify control),
  first-line-indent (3-line paragraph to a new 26x18 indent trace), layout-margins
  (content column to a paintless band on the margin strip), overscroll (canvas-sized
  scroller to the 432x26 edge glow), point-size (the ink "Hamburg" to a body box one em
  tall, since the article's whole claim is that the size is the body and NOT the height of
  anything visible), river (the column to its `trace-rivered` overlay, pulled in to the
  channel's own 24x85 extent). The 53 skips carry the load-bearing lesson: AN ORPHANED
  HIGHLIGHT IS NOT EVIDENCE OF A MISPLACED SUBJECT. Paint on PEER INSTANCES of the term
  (the other kerned pair, the second sidenote, the linked view answering a brush) is the
  comparison, and the answer is to keep the subject on one instance, never to climb to the
  container holding them all; conformance-level's 3px marks are scope, chart's legend
  swatch must keep the bar colour or it stops being a legend. What DOES convict is paint
  the demo uses to draw the feature itself while the ring sits on the thing carrying it.
  Two corollaries: "the term is a property of this run or this surface" is the same wrong
  test as "a thing this element has" whenever the specimen already draws that property as
  a box (if the specimen draws it, ring the drawing); and when a subject moves onto a
  state-dependent element, `data-pose` MOVES WITH IT, so the measured state attribute the
  pose reads must be written to the new subject in the same pass, with a travelling
  subject set via `flag(el, 'data-subject', ...)` beside the paint rather than as literal
  markup. A whole-scene subject is sometimes just a missing wrapper (easing had no element
  between `.sp-app` and its rows); worth checking wherever a subject covers ~100%.
  Left flagged for a future round: word-spacing, where the only narrower element would be
  one tinted gap, which names a word space rather than the spacing of a run.
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

- Queued: 2026-08-19 · Status: SWEPT 2026-08-22 (88 fixed, 7 skipped)
- Swept: 95 flagged, 88 stilled or trimmed, 7 judged legitimate. Option (a) throughout;
  option (b) was never needed, NO demo.ts was touched, and no subject snapshot moved, so
  the whole complaint turned out to be choreography-only. The repair is mechanical and
  LOSSLESS: turn each pointless `moveTo` into an `assert` on the same part and keep the
  wait that followed it, so the pass keeps its pacing, gains claims, and loses the ghost.
  Do NOT merely delete the steps: the asserts must name the parts the tour used to visit,
  or the script silently loses coverage the hover was incidentally providing. Stilling
  found claims the tours had walked straight past (ascender and descender each have a
  tinted band that IS the term and neither was ever asserted), so this pass left the
  scripts stronger, not quieter.
- THE JUDGE QUESTION, corrected. Kit `[data-hovered]` paint EXISTING is not sufficient to
  make a hover legitimate; the test is whether that hover paint is THE TERM'S OWN CLAIM.
  A generic affordance (a table row tint, a button brightening) lights up under the ghost
  without demonstrating anything, and the exemption is per-ELEMENT, not per-script: a tour
  of six static parts does not become legitimate because one stop happens to be a button
  (retro-web-design's `guestbook` went too). Exactly these kit classes have visible
  `[data-hovered]` paint: `sp-button` (plus --ghost/--quiet), `sp-icon-button`,
  `sp-table tbody tr`, `sp-day`, `sp-chip-remove`, `sp-nav-item`, `sp-menu-item`. These
  have NONE: `sp-checkbox`, `sp-switch`, `sp-chip`, `sp-segment`, every text class. That
  is what makes "hover the preselected checkbox" theater and "hover the nav item" honest.
  Where a legitimate hover is KEPT, assert the mirrored state attribute
  (`{ assert: '[data-part=play][data-hovered]' }`) rather than bare visibility, which
  makes the difference reviewable in the script text without opening demo.ts.
  The offender's own comment is usually the tell: nearly every one carried a line like
  "a poster answers no pointer, so the cursor reads it motif by motif", admitting the
  hover causes nothing.
- Detector misses to fix before re-running: a `pointerenter` handler attached in a LOOP
  over `part(root, key)` is invisible to it (dwell-activation was flagged though its hover
  IS the input). Borderline call left as authored: dark-pattern, whose `decline-quiet` is
  an `.sp-button` overridden inline to transparent, so its brightness hover is weak.
- Demo-growth candidates, stilled honestly now but each missing a real second state:
  figure (nothing shows what breaks when a caption is divorced from its content), heading
  (no state flattening the level treatments), lorem-ipsum (the two cards are posed side by
  side rather than switched, hiding the reflow), e-ink-aesthetic (a page turn that actually
  leaves ghosting behind), drop-cap (the same opening without the sunk letter; divider
  already does this correctly and is the model), system-font (`system-ui` beside a named
  stack), sans-serif and serif (identical mirrored comparisons that could share one richer
  specimen), sentence-case (the same screen in title case, a new mode axis).
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

## stage-geometry

- Queued: 2026-08-20 · Status: queued
- 2026-08-22: NOT swept (out of the scope the user chose), and the detector was found
  BROKEN by the same trailing-slash bug as subject-granularity: it requested `/<slug>/`,
  which 404s under `trailingSlash: 'never'`, so every specimen died on the 20s
  `waitForFunction` for `vd-stage` and all 1065 came back `probe-error`. Now fixed (bare
  `/<slug>` plus a `response.ok()` guard) and confirmed on a subset, where it reproduces
  the very findings this entry recorded at queue time (modifier-key's legend shifting
  17px, plus signifier, orphan and combobox). The queue-time counts (434/887, 1428
  findings) were therefore real but predate the config change; a full run on an IDLE
  machine is needed to refresh them, since a loaded box is what produced the 20s
  timeouts. Note also that ~100 specimens were edited by this sweep, so the next run
  measures a changed corpus. One finding spotted in the subset and left alone as out of
  scope: point-size reports 57px of content in a 53px box on [word].
- Rule: geometry is part of the claim, at every state the choreography visits,
  not just at mount. The stage body clips its overflow, so an element that
  escapes it is silently amputated, never merely ugly. A container must hold its
  content: content wider or taller than its box either spills onto neighbours
  (overflow visible) or is cut (hidden/clip), and neither is acceptable unless
  the clipping viewport or the truncation IS the design. Elements must not
  overlap neighbours they do not mean to. Single-line controls (.sp-button,
  .sp-chip, .sp-tab in row orientation) hold one line in every state:
  white-space nowrap, flex 0 0 auto, room sized for the widest state (measured
  once on mount when only runtime knows it). And per SPEC §5, a state change
  must not move or resize parts that did not change themselves (no incidental
  layout shift). Size every box for its largest content at its real rendered
  size, not for whatever state was on screen while authoring.
- Detector: detectors/stage-geometry.mjs (recall-tuned; runs under NODE, not
  bun: it drives Playwright chromium through a full stage.audit() play per
  specimen, sampling geometry every ~220ms so state-dependent breakage is
  caught, with 2+-consecutive-sample persistence to drop transition transients.
  Self-hosts a build+preview on 4323; --base-url reuses a running server,
  --no-build previews the existing dist, --slugs=a,b,c reruns a subset).
  Checks: escape (painted element leaves the stage clip box), spill-x/-y
  (content exceeds a non-scroller box; designed ellipsis exempt), wrap
  (single-line control folded; flex-column stacks exempt), wrap-row (a
  flex-wrap row actually broke onto lines), overlap (content-bearing elements
  intersect substantially; ~abs marks positioned elements for fast judging),
  layout-shift (a data-part moved or resized 3px+ between stable states while
  its own attributes, text, and ancestor attributes held still). At queue time:
  434/887 specimens flagged, 1428 findings — spill-y 473/259 slugs, overlap
  532/137, spill-x 218/126, layout-shift 141/64, wrap 52/14, wrap-row 12/12,
  escape 0 (the 320px stage discipline held). Precision is deliberately loose:
  sampled findings split into real catches (modifier-key's legend shifts 17px
  and its frame cuts 11px of content; signifier, orphan, combobox shift
  likewise) and judge-skip classes (popover-arrow's popover floats over the
  seat map BY DESIGN, pull-to-refresh's rows move because pulling is the term,
  zoom/rotate canvases are designed clipping viewports, signature-pad's stamp
  overlays are designed layering). Expect heavy judging: batch per the skill,
  20-40 specimens per judge, findings grouped by slug. Judge question per
  finding: is this geometry the term's own claim
  or designed presentation (a viewport a zoom pans inside, a badge or stamp
  overlaid by design, honest ellipsis truncation, a marquee mid-travel), or an
  accident a reader would call broken?
- Recipe: escape → inset or shrink the offender; demos build to ~476×310 inside
  the 320px-tall stage (law 7), and absolute decorations stay inside the root.
  spill (overflow visible) → widen the box, shorten the copy, or reserve the
  widest state's room. spill (hidden/clip) → content is being cut: give it
  room, or make truncation honest (ellipsis) only where truncation is fair.
  wrap → inline-flex + gap + white-space nowrap on the control, widen its row.
  overlap → find the source (usually a spill or an unreserved absolute) and fix
  that. layout-shift → SPEC §5: reserve the room, measure once on mount,
  contain a size change to the control that owns it. These fixes change
  rendering, so fixers do the visual pass on 4321; shard per the skill when a
  check's offender list exceeds ~25.
- Verify: rerun the detector on touched slugs (--slugs=... --no-build) until
  each finding is fixed or judged designed; choreography e2e pass over touched
  slugs; the eye on 4321 for a sample per shard. After the sweep, consider
  promoting the auditor into a permanent e2e pass so this backlog never
  regrows.

## hover-takeover

- Queued: 2026-08-20 · Status: SWEPT 2026-08-22 (10 fixed, 17 skipped)
- Swept: `data-hover-driven` added to tilt-effect (perspective field), hover-lift (three
  cards), marquee (strip), explore-by-touch (screen), focus-follows-mouse (both panes),
  hoverable-dismissible-persistent (bare span trigger), cursor-follower, magnetic-button,
  pointer-lock (viewport), spotlight-hover (card). THE MARKING IS INERT ON AN INTERACTIVE
  ELEMENT, because the stage's dwell already fires on a[href], button, input, select,
  textarea and [tabindex]: dwell-activation and hover-intent are genuine hover-only terms
  that need nothing, since their surface is already a button. So the rule belongs on
  NON-INTERACTIVE surfaces (a scene, a field, a card, a span) and the detector should skip
  demos whose hover surface is a control. A sharper test than "can the reader take over":
  CAN THE GHOST CONTRADICT THE READER? An unmarked hover-only demo lets the ghost's
  synthetic pointerleave stomp the reader's own hover, unpausing a marquee the reader is
  still pointing at or dropping a lifted card under the cursor.
- SNAPSHOT SURPRISE, contrary to what this entry predicted: `data-hover-driven` appears
  INSIDE the recorded subject selector, so marking a surface that happens to be the
  subject rewrites `<slug>-subject.txt` (explore-by-touch, focus-follows-mouse, hover-lift,
  marquee, pointer-lock all changed). The attribute is still inert to the script; only the
  snapshot text moves. Expect and read those diffs next time.
- Rule: takeover must match the term's own input. A demo operated by hovering
  alone (a dock that bulges, a proximity glow, a spotlight or tilt that follows
  the pointer) marks that surface `data-hover-driven`, which makes a reader's
  150 ms dwell there take the stage over without a click (SPEC §7, STAGE_NEWS
  law 33): the honest operation of such a term is the reader's own pointer, not
  a spectator's view of the ghost's. `data-gaze` scopes are hover-driven
  implicitly (looking is hovering). This is NOT for every demo: where hover
  merely decorates a click (a button glow) or gates a control's reveal, the
  default click/dwell-on-interactive rule stands, so a pointer passing across
  the stage never hijacks the show. The stage mechanism shipped 2026-08-20;
  dock-magnification is the first consumer.
- Detector: detectors/hover-takeover.ts (recall-tuned: demo.ts with
  pointermove/enter/over listeners, no pointerdown listener of its own, no
  pressureHold/pinchSpread wiring, not already marked). At queue time: 26/887
  flagged. Judge question per slug: is hovering alone this demo's interaction
  (a visible, term-central response with no button held)? If yes, which element
  is the hover surface (the element whose listener drives the response, usually
  the container the moves are read from)?
- Recipe: add `data-hover-driven` to the hover surface (the listening
  container, not each hot child) and one doc-comment sentence saying hovering
  is the term's interaction. No wiring changes: the stage's dwell does the
  rest. Skip judged-decorative slugs and note them.
- Verify: takeover + choreography passes over touched slugs (the attribute is
  inert to the script); the hand on 4321 for a sample: hover the surface during
  attract, confirm takeover within a beat without a click, confirm the response
  follows the real pointer, leave and confirm attract resumes.

## replay-continuity

- Queued: 2026-08-20 · Status: SWEPT 2026-08-22 (8 fixed, 48 skipped)
- Swept: all 8 fixes were choreography-only (recipe 1), so no demo.ts and no subject
  snapshot changed: compositor-animation (the canonical case, Replay pressed at ~1500ms
  inside a 2750ms run's own stall window, now at ~4100ms with a `data-thread=busy` assert
  earning the wait), audio-description, frame-rate, jank, layout-thrashing,
  ken-burns-effect (a 4880ms drift clicked at ~1330ms), stepped-animation, stories.
  THE PLAYER'S REAL STEP COSTS, checked against src/stage/player.ts because two shards
  disagreed: CURSOR_TRAVEL_MS 550 + STEP_GAP_MS 350, so a `moveTo` costs 900ms and a
  `click` a further 350ms, with LOOP_PAUSE_MS 1400 of grace before the remount. An opening
  `wait: 600` therefore fires its click at ~1250ms, not 600ms, which is how a 1.6s mount
  run collides with a script that looks comfortably clear. Three more laws: the number to
  beat is the demo's SETTLE timeout (lead + duration + settling beat), not the animation
  duration, and a 60 to 70ms lead hidden in a transition shorthand is exactly the margin a
  "wait 3000 for a 3000ms run" script loses; "a run" means ANYTHING the demo scheduled on
  its clock that has not reached its terminal state, since audio-description had no
  animation at all and it was a 7400ms CUE CHAIN the remount cut; and for a self-advancing
  demo the tail is bounded by the dwell itself, so `dwell + a beat` is always safe and
  needs no phase measurement. Verification note for the next sweep: `audit()` REMOUNTS the
  specimen, so a sampling probe must re-read `stage.specimenRoot` every sample or it
  reports a detached tree frozen mid-run, which reads as a false teleport.
- Rule: an animation run has ONE owner at a time, and a script never cuts a run
  the reader can see (SPEC §8, STAGE_NEWS law 34). Three collisions produce the
  teleport the complaint names: (a) the demo autoplays a run on mount AND the
  script clicks Replay on a fixed early beat, so the click lands mid-run and
  the movers snap back to zero under the reader's eye (compositor-animation:
  mount starts a 2670 ms run, the script replays at ~1300 ms, inside the run's
  own stall window); (b) the script ends while a run it started is still
  mid-flight, so the attract loop's remount cuts the animation instead of a
  rest state; (c) the demo re-arms its own run on its clock AND the script
  also replays it, so the two drift in phase and restart each other. The loop
  remounting at a LANDED state is not an offense: a scene reset at rest reads
  as a reset, not a jump.
- Detector: detectors/replay-continuity.ts (recall-tuned: every demo with a
  replay/restart/again/run/play-named part, plus whether mount calls the same
  handler the control fires). At queue time: 53/887 flagged, 26 of them
  collision-prone (mount autoplay through the replay handler), mostly the
  motion category. Judge question per slug, reading demo.ts and
  choreography.ts together: can the script's replay click land while a run is
  mid-flight, and does the script's tail outlast every run it starts?
- Recipe: prefer the choreography-only fix — open the script with a wait that
  outlasts the mount run (duration + transition lead + a settling beat) so
  Replay is pressed at rest, and end with a wait that covers the last run's
  landing. Where waiting out the mount run makes the loop unreasonably long,
  drop the mount autoplay instead so the scripted Replay names the only run:
  the mount state becomes an honest rest (reduced motion then lands or rests
  deliberately, per the demo's judgment), and the subject snapshot may change
  — that diff is a claim, read it. A self-looping run (c) loses either its
  self-loop or its scripted replay, never keeps both.
- Verify: choreography pass over touched slugs; the eye on 4321 watching one
  full attract loop per touched demo for teleports (a mover snapping backward
  is the failure; the deliberate stall-payoff jump in compositor-animation's
  scripted mover is the term, not a bug).

## loop-persistence

- Queued: 2026-08-20 · Status: SWEPT 2026-08-22 (33 declared, 6 skipped)
- Swept SECOND, exactly as this entry instructed, and the ordering paid: stilling 88
  scripts in the cursor-theater pass first dropped this list from 105 to 39, because a
  wait/assert-only script on a clock-free demo persists AUTOMATICALLY with no marking.
  Of the 39 survivors (all of whose hover had just been judged honest), 33 now declare
  `data-loop="keep"` and 6 keep remounting. Every declaration was verified by double play
  in the live page, then again by the real suite: 476 targeted e2e tests passed with zero
  failures and no snapshot drift.
- THE LAW THIS TAUGHT, and it is the subtle one: THE PASS-BOUNDARY LEAVE IS NOT A LEAVE
  FOR THE CONTAINER. `player.#hover(null)` dispatches `pointerleave` on the last hovered
  ELEMENT only, and enter/leave do not bubble. So a demo that resets on a CONTAINER'S
  `pointerleave` while its script parks the ghost on an aim mark INSIDE that container
  never receives its reset, and cannot declare however symmetric the handler pair looks.
  The test is not "is the reset symmetric" but "does the element the ghost is standing on
  when the pass ends own the reset". tilt-effect proved it empirically: declared, probed,
  lap 2 failed on `[data-part=sheen], expected hidden`, declaration removed. Corollary,
  and it pairs with the hover-takeover entry: the `data-hover-driven` field pattern (aim
  marks inside the field) ends mid-response BY CONSTRUCTION, so those demos keep
  remounting.
- Skips worth knowing: magic-tap, accessible-name, dwell-activation and magnetic-button
  are latches or leave a changed readout. Note that the double-lap gate would NOT have
  caught dwell-activation or magnetic-button (every assert still passes on lap 2), which
  is exactly why the rule names counters, readouts and revealed surfaces rather than
  trusting a green second lap.
- OPEN DECISION for the user, the one slug left undeclared for a reason: holy-grail-layout
  passes all three behavioural tests but its `data-subject` sits on the `.sp-app` root
  itself (a whole-scene subject), and `describeSubject` in e2e/harness.ts skips only
  class, style, id and data-subject, so declaring there would rewrite its committed
  snapshot to `div.sp-app[data-loop=keep]`. `data-loop` is stage bookkeeping and arguably
  not part of what a specimen identifies as, so the honest fix is to add it to that skip
  set, which would also let any future whole-scene-subject demo declare. Not done: it
  changes what every subject snapshot records, which is the user's call.
- Detector bug FIXED during the sweep: it matched the bare substring `clock.`, so prose
  ending a sentence with "takes no clock." reported as clock ARMED and three static
  posters (afrofuturism, constructivism, digital-collage) plus material-3-expressive and
  retro-film-aesthetic arrived pre-labelled as phase-lock refusals. Now anchored to
  `clock.setTimeout` / `clock.clearTimeout`.
- Rule: the attract loop remounts the demo between iterations because mount is
  the only universal reset for closure state, but a remount rebuilds the tree
  under a reader inspecting it in devtools and restarts ambient animation. Two
  persistence paths now exist (SPEC §7, STAGE_NEWS law 35): a wait/assert-only
  script on a demo that never arms its clock persists AUTOMATICALLY (no marking
  needed), and a demo whose pass ends at its mount state may declare
  `data-loop="keep"` on its root, which audit() verifies by playing the script
  twice with no remount between (a dirty second lap fails with a "second lap"
  marker in the choreography pass). Never declare it on a demo that
  self-animates on its clock unless the script is phase-free: a still script's
  waits assume the cycle starts at mount (tabular-figures is the canonical
  refusal, caught by the gate on day one). Resume after user mode always
  remounts. First consumer: dock-magnification (hover in, hover away, the row
  rests flat).
- Detector: detectors/loop-persistence.ts (hover-only scripts: steps are
  moveTo/wait/assert only, the likeliest to be symmetric; reports clock use).
  At queue time: 103/887 flagged. ORDER MATTERS against cursor-theater (93
  overlapping hover tours): sweep cursor-theater FIRST, which stills most of
  these scripts into the automatic bucket (waits and asserts only, no marking);
  then judge the survivors, whose hover is honest, for the declaration. Judge
  question per surviving slug: does every hover the script performs undo on
  leave (sticky-hover and hover-intent style latches and counters do NOT), and
  if the clock is armed, is the script phase-free?
- Recipe: add `data-loop="keep"` to the demo's root element and one doc-comment
  sentence saying the pass ends at its mount state. No other changes: the
  ghost's trailing leave at each pass boundary settles symmetric hover on its
  own. The double-lap audit is the proof; a red second lap means the demo was
  misjudged — remove the declaration rather than bending the demo.
- Verify: choreography pass over touched slugs (now two laps each for
  declaring demos); the eye on 4321: watch two full attract iterations, the
  tree persists (inspect an element, it survives the loop), and the demo's
  second pass looks identical to its first.

## settle-blind release recognizers

- Queued: 2026-08-23 · Status: queued
- Rule: a demo that judges a pointer RELEASE (a throw, a fling, a swipe past a velocity
  threshold) must judge it the way a recognizer does, on the samples that are recent AT
  THE MOMENT OF RELEASE. A demo that instead prunes its sample buffer as each move
  ARRIVES keeps pre-settle samples alive, so a scripted drag that deliberately came to
  rest before lifting still reads as a throw and still coasts. That is the opposite of
  the claim: the whole point of a settled drag is that it hands over nothing.
- Found while building `drag`'s `release` field (SPEC §8, STAGE_NEWS law 42). fling
  filters by the clock at release and is correct. momentum-scrolling prunes on arrival
  and coasts either way, while its own comment claims it judges "the way real momentum
  scrollers judge a throw", so the claim is currently a little false.
- Detector: detectors/settle-blind-release.ts (source scan, no dev server). At queue time
  3/1065 flagged, which is the whole population: fling (correct, filters at release, and
  its script already throws), momentum-scrolling (prunes on arrival), edge-swipe (no clock
  filter found, and it may judge by distance rather than speed, so judge before fixing).
  Question per slug: at release, does it filter by the current clock, or reuse a buffer
  pruned during movement?
- Recipe: filter at release (`now - sample.t <= WINDOW`), then script the two strokes
  as separate steps, a plain `drag` for the hand that stopped and
  `{ drag: { to, release: 'moving', ms } }` for the throw, and let the demo's own
  recognizer tell them apart. fling is the reference.
- Verify: choreography pass; the eye on 4321 confirms the settled stroke stops dead and
  the thrown one carries.
