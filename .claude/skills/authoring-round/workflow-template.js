// Authoring-round workflow TEMPLATE (two phases: Author x9, Verify x1).
// Fill the ALL-CAPS placeholders (ROUND number, BRIEFS path, CATEGORY_GUIDANCE),
// then run it with a Workflow-style orchestrator, or lift batchPrompt()/verifyPrompt
// into whatever agent harness is available: the prompts are the contract, the
// orchestration is fungible. Authors run on Opus-class models, in parallel, each
// owning one category; the verify agent runs once after ALL authors finish.

export const meta = {
  name: 'author-6-per-category-rROUND',
  description: 'Round ROUND: 6 terms per category (54); authors write and visually verify on the running dev server, verify agent runs static gates once',
  phases: [
    { title: 'Author', detail: '9 category agents, 6 terms each, visual pass on localhost:4321, no static checks', model: 'opus' },
    { title: 'Verify', detail: 'one agent runs validate + typecheck + biome once and fixes failures', model: 'opus' },
  ],
}

const REPO = 'S:\\Work\\Personal\\vocab.design'
const BRIEFS = 'FILL: absolute path to this round\u2019s briefs JSON'

const BATCH_SUMMARY = {
  type: 'object',
  properties: {
    completed: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['completed', 'notes'],
}

const VERIFY_SUMMARY = {
  type: 'object',
  properties: {
    clean: { type: 'boolean' },
    fixed: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['clean', 'fixed', 'notes'],
}

// The accumulated laws. NEVER trim these; append new ones as rounds teach them.
const STAGE_NEWS = 'Stage facts newer than most exemplars: (1) the player MIRRORS its pointer into data-hovered/data-pressed on whatever it hovers, clicks, or drags, claiming only attributes your handlers did not set, so never wire pointerenter/leave listeners merely to repaint hover, and never assert data-hovered/data-pressed absence on an element the cursor is resting on at that moment. (2) `type` steps land one character at a time, one input event each, at 70 ms cadence. (3) A small control whose artwork the cursor would cover may carry `data-aim` to park the ghost cursor at its bottom-right corner; events land there too, so never on an element that resolves input by coordinate. (4) During a drag the cursor becomes a grab hand and the source holds pressed paint. (5) A subject whose states include a counter-example it itself passes through declares the honest condition as a selector in data-pose on the subject (see dark-pattern/demo.ts or confirmshaming/demo.ts); identify refuses to pose a state that fails it, and the MOUNT state must satisfy it. (6) A site named in article prose must be a markdown link to that site, never a bare domain or raw URL; the validate gate rejects violations. (7) The stage canvas is 320px TALL and about 476px wide: match sibling demos (frames typically 440-476 wide, under ~310 tall), never build to a 320px width. (8) TIMING LAW: an assert after a click is judged roughly 350 ms after the click lands, so never assert a mid-flight state of a move shorter than ~500 ms, aim asserts mid-window never at a window edge, and never assert visibility of an element INSIDE a popup the asserted action just closed (mirror the evidence onto the trigger). (9) SELECTOR LAW: an unquoted attribute value in a choreography selector must be a valid CSS identifier, so quote anything starting with a digit ([data-age="8-min"], never [data-age=8-min]); the validate gate now rejects this. (10) HAIRLINE LAW: the stage treats boxes thinner than ~2px as absent, so never assert visibility of a hairline (a vertical SVG line at rest, a 1px rule): aim the claim at the container that carries it, and draw deliberate guide lines at 2px or more. But CHECK THAT THE CONTAINER HAS A BOX, because the obvious wrapper usually does not: a group whose children are all position:absolute, or one held at height:0 so guides can overlay a line without shifting it, measures zero and is read as absent exactly like the hairline was. Round 15 lost two specimens to this, both by following the first half of this law. Claim the drawn element itself once it is 2px or more, and if the state you need lives on the zero-height wrapper, move that attribute onto something with a real box rather than asserting the wrapper. (11) MOUNT-FADE LAW: kit surfaces fade in from mount (the scrim takes 220 ms), so a choreography opens with a wait before its first asserts rather than judging at t=0. (12) The identify-mid-attract e2e pass (motion on) will press Identify at an arbitrary script moment: the subject must be honest at EVERY resting state, not just at mount. (13) NO MANUFACTURED EVENTS: the takeover pass counts the clicks that reach a specimen and requires exactly ONE, so a demo may never answer input by synthesizing more (`someButton.click()` inside a click handler fails it, even though the choreography passes). Drive a kit primitive through its own property instead: `<sp-segmented>` exposes a `value` setter that moves the thumb and fires `change`, so cast the part (`part(root, "mode") as HTMLElement & { value: string }`) and assign, as chevron/demo.ts does. (14) STILL SCRIPTS: a term whose whole claim is visible at rest (most aesthetics, much typography, some layouts) ships a choreography of waits and asserts ONLY. Never write cursor theater: a hover with no visible consequence (no data-hovered styling, no handler, nothing revealed) demonstrates nothing; pointing at parts in sequence is the identify pin’s job, not the cursor’s. Before going still, check whether the term honestly has a second state the demo should show instead (SPEC section 8). (15) SUBJECT GRANULARITY: "the term is a thing this element HAS" is the wrong subject test; it justifies any container up to the page. When the term names a feature inside an element (a channel, a gap, a stroke, a band), the subject is the element tracing that feature: a demo that draws or highlights the feature marks the drawn overlay, and a feature with no element of its own is given one sized to its extent, never its container by proxy. Identify summons a subject the current state hides, so a sometimes-invisible overlay is a legal subject. (16) INVISIBLE AIM ANCHORS: an element that exists so the script can aim at a coordinate (a tap that must land inside an invisible region) gets a data-part and NO paint: no dashed ring, no dot, nothing. The ghost cursor is the only visible pointer artifact; drawn stop-point markers annotate the script, not the term, and read as UI the term never had. To teach where input can land, draw the region (the term’s own geometry) or say it in a caption. (17) TOUCH PERSONA: mark a touch-native surface (or the whole scene) with data-touch, and every step targeting it performs as touch: fingertip disc instead of the arrow, pointerType "touch" on events, and NO hover dispatched or mirrored, so never rely on data-hovered inside a touch scope. The `hold: <ms>` step presses the current target for that long; under the touch persona its pointermove events carry pressure climbing at a finger’s rate (full force at 900 ms), so the hold’s LENGTH chooses the depth (450 ms is a light press, 900+ bottoms out), and it ends with pointerup, NEVER a click (script the tap separately if the demo wants one). A pressure-driven demo wires pressureHold from #src/kit/touch.ts with its DemoClock: one force signal for the script, a finger, and a real reader holding a mouse button. A touch gesture demonstrated by clicking state pickers (tabs for pressure levels) is banned. The pinch exists (law 21); rotate and gestures past two contacts do NOT exist yet, and terms needing them stay out of rosters. (18) REFUSE TO FAKE THE PLAYER: if a term’s honest demonstration needs input or stage machinery the player does not have (a gesture, a persona, a state the stage cannot hold), do NOT ship a simulation control or state picker in its place. Leave the term unauthored, return it in your notes as `needs stage primitive: <what>`, and move on; the primitive gets built first and the term comes back in a later round. A simulation control is legitimate ONLY for conditions no input could ever perform (a network failure, a server delay, a permission state). (19) HELD KEYS: `{ holdKey: { key, ms } }` holds a key with the OS repeat shape (keydown, ~500 ms typematic delay, then repeat:true keydowns every ~90 ms, keyup at release; the chip counts "Key ×N"), so key-repeat behaviour is performed, never simulated; demos read `event.repeat`. A held MODIFIER across other steps exists now (law 23). And a keyboard-driven demo must be drivable by a real keyboard: its control carries tabindex="0" so a reader can focus it and the real keys reach it (attract itself never moves real focus). (20) AIM CLEAR OF OVERLAYS: events dispatch on the moveTo’d ELEMENT, so a click "outside" a popover works even when the container’s centre sits under the popover, but the drawn cursor lands at that centre and reads as pressing the surface it is dismissing. Aim outside-clicks at a real element visibly clear of any open surface (a caption, a line of prose), never at a big container’s centre. Also: `.sp-icon` is display block, so an icon dropped bare into a non-flex button breaks its label onto a second line; state inline-flex + gap on the button. (21) PINCH: `{ pinch: { scale, ms? } }` spreads (scale > 1) or closes (scale < 1) twin touch contacts about the current target — two pointerdowns with distinct pointerIds, pointerType "touch", the separation ending at exactly `scale` times where it began; the ghost draws twin discs. `ms` is animation, not semantics (reduced motion collapses it — unlike hold, whose length IS the depth). A pinch-driven demo wires pinchSpread from #src/kit/touch.ts on its gesture surface, inside a data-touch scope: ONE scale signal for the script, a real two-finger pinch, and a reader’s mouse via Ctrl+drag (a virtual second contact mirrors the pointer, drawn by the stage; dragging down-right opens, back up-left closes). Anchor the response at the centre onStart reports: the content under the fingers stays under the fingers, which is usually the term’s whole claim. Trackpad pinch arrives as a ctrl+wheel event, not pointers, and is the demo’s own to wire beside it (see pinch-to-zoom/demo.ts for the full shape: anchored zoom math, pan clamped so the scene always covers its box). Rotation is still NOT in the vocabulary. (22) CAPTURE REAL DRAGS: a demo that holds a drag (pointerdown, pointermove tracking, pointerup) must capture the pointer or a reader’s drag dies at the element’s edge — moves stop arriving and the release lands elsewhere. Put `if (event.isTrusted) el.setPointerCapture(event.pointerId)` in the pointerdown handler; the isTrusted guard is MANDATORY because the attract player’s synthetic pointers have no active pointer to capture and the call THROWS, killing the handler and the scripted drag with it. End the drag on pointerup AND pointercancel, never on pointerleave (boundary events do not fire while captured). This bug is invisible to every e2e pass — synthesized events dispatch directly on the element — so only the takeover hand-check catches it; write the capture line from the start. (23) HELD MODIFIER SCOPE: `{ withKey: { key, steps: [...] } }` holds a key across the enclosed steps — keydown as the scope opens, keyup as it closes, the HUD chip held for the duration. Shift, Control, Alt, and Meta stamp their flag on EVERY event dispatched inside (clicks, drags, keys: a click becomes Ctrl+click, a drag Shift+drag), scopes nest for chords, and the scope closes even on a cancelled run so a held key never leaks. Demos read the real flags (`event.ctrlKey || event.metaKey` — both, never pick a platform) and may listen for the modifier’s own keydown/keyup to light a legend chip (modifier-key/demo.ts is the shape). A simulated-modifier control (a segmented "Ctrl held" picker) is banned per law 18. (24) PATH DRAG: `{ drag: { to, via: [...] } }` runs one continuous press through via waypoints — a polyline, not several strokes — so gesture strokes, lassos, signatures, and marking-menu swipes are performed as ONE stroke. Waypoints are invisible aim anchors (law 16: data-part, no paint). The cursor and the dispatched moves trace the same polyline, with 3 interpolated moves per leg; a demo that resolves the stroke geometrically gets a polyline through the waypoints, not a curve. (25) WHEEL VS SCROLL: `{ wheel: { y, x?, ms? } }` dispatches a short burst of real WheelEvents at the current target (total delta split across ~5 events, the shape a notch or trackpad flick arrives in); `scroll` moves a scroller’s position directly and fires NO events. A demo that LISTENS for wheel (a zoom surface, an overscroll edge, a wheel-adjusted control) is spoken to with `wheel`; a demo whose content merely needs to be somewhere else is scrolled with `scroll`. Modifier flags ride along, so a trackpad pinch (ctrl+wheel by browser convention) is a wheel inside a withKey Control scope — see pinch-to-zoom/choreography.ts. Event count survives reduced motion (a demo may count events); only the pacing collapses. Negative y wheels up / zooms in.'

const VISUAL_PASS = 'VISUAL PASS: the user is already running the dev server at http://localhost:4321 (confirm with a GET request before relying on it; Astro dev answers HEAD with nothing, so a HEAD probe reads as "server down"). After authoring each demo, load http://localhost:4321/<slug>/ (trailing slash: brand-new pages 404 without it; retry once on a transient miss right after an edit, HMR can race) headlessly and measure: nothing overflows the stage body or its own frame, no element escapes its container, reserved slots hold when you flip states, captions have room at their real rendered size. KNOWN QUIRK (also in AGENTS.md): bun cannot launch Playwright chromium on this machine, so run your probe script under node, importing chromium from @playwright/test. Do NOT start, stop, or restart any dev server or preview; do NOT run bun dev/build/test/validate/typecheck or any other repo script; if localhost:4321 is ever down, note it in your summary and continue WITHOUT the visual pass rather than launching anything. Never leave probe scripts or screenshots at the repo root.'

// FILL: one entry per category. Anatomy of good guidance: 3-6 exemplar demos by
// path (including LAST round's siblings of this round's terms), every IOU ("term X
// on site NAMED your term Y: link back"), every alias fence the collision check
// found ("do not claim Z, it belongs to W"), and any category-specific discipline
// (aesthetic: static poster tours, inset, inline paint; accessibility:
// data-sim-focus always; interaction: labeled-sim + real-wiring for gestures the
// player cannot make). The kit is FROZEN in every category.
const CATEGORY_GUIDANCE = {
  component: 'FILL',
  layout: 'FILL',
  pattern: 'FILL',
  interaction: 'FILL',
  motion: 'FILL',
  typography: 'FILL',
  color: 'FILL',
  aesthetic: 'FILL',
  accessibility: 'FILL',
}

function batchPrompt(category) {
  return [
    `You are authoring SIX terms for vocab.design (stage 3 of SPEC section 11), in ${REPO}. Category: ${category}. Your briefs are under the "${category}" key in the JSON at ${BRIEFS} (definition, useWhen, aliases, pre-filtered implementations, sources, demo hint per term).`,
    '',
    'Read ONCE before the first term: SPEC.md sections 2, 5, 6, 7, 8; AGENTS.md in full; src/lib/schema.ts (implementations enum is EXACTLY aria-apg, material, hig, fluent, carbon, polaris, radix, base-ui, shadcn); src/stage/choreography.ts; src/kit/*.css and src/kit/icons.ts.',
    STAGE_NEWS,
    `Category guidance: ${CATEGORY_GUIDANCE[category]}`,
    '',
    'Process terms ONE AT A TIME, each fully finished before the next:',
    `1. src/content/terms/<slug>.mdx: schema-valid frontmatter (status: published, category: ${category}, definition <= 200 chars, useWhen <= 90) + 2-4 paragraph article. NEVER use an em-dash anywhere. relations: ENTIRELY EMPTY (a consolidated graph pass runs at a later milestone); cross-references live in prose only. If an alias collides with an existing term or its aliases, drop the alias and note it. Check collisions by searching src/content/terms/ for the alias text, not by guessing.`,
    '2. src/content/demos/<slug>/demo.ts: mount(root, clock) composing kit primitives (omit clock only if unused); inline styles for dimensions, one-off placement, and paint the brief legitimizes. data-subject on the narrowest element the term names (whole-scene only where genuinely so; note the decision), inset from frame edges; scenery in .sp-context; data-part on scripted targets; timers only from DemoClock; reserve revealed space; never measure synchronously after a style write (mount in the state you measure). The kit is FROZEN.',
    '3. src/content/demos/<slug>/choreography.ts: data-part selectors only; state-qualified asserts; give every assert room after a transition (the judge does not retry); the demo must answer synthesized events; only a term whose flip IS the term may toggle.',
    '',
    VISUAL_PASS,
    '',
    'Static checks are NOT your job: do not run bun validate, typecheck, tests, builds, or lint; a dedicated verify phase runs them right after you finish. Be correspondingly careful with the schema and choreography as you write.',
    '',
    'TOKEN DISCIPLINE: one quick WebFetch per implementation URL; drop rows that do not verify; zero rows is legal. Nothing under e2e/. Keep returned notes to a sentence or two per term.',
    '',
    'Return via structured output: completed (slugs fully authored) and notes.',
  ].join('\n')
}

phase('Author')
const CATS = ['component', 'layout', 'pattern', 'interaction', 'motion', 'typography', 'color', 'aesthetic', 'accessibility']
const results = await parallel(CATS.map((c) => () =>
  agent(batchPrompt(c), { label: `batch:${c}`, phase: 'Author', schema: BATCH_SUMMARY, model: 'opus', agentType: 'general-purpose' })))
const authored = results.filter(Boolean).flatMap((r) => r.completed)
log(`authored: ${authored.length}/54`)

phase('Verify')
const verifyPrompt = [
  `You are the verify gate for a 54-term authoring round in ${REPO}. Nine parallel agents just wrote src/content/terms/<slug>.mdx and src/content/demos/<slug>/{demo.ts,choreography.ts} for these slugs: ${authored.join(', ')}. They ran NO static checks, so you run them all, once, and fix what fails.`,
  '',
  'Run in order, fixing failures between runs until each is clean:',
  '1. `bun validate` (content gates: schema, em-dashes, bare domains in prose, unresolved prose links, alias collisions, data-subject, bare timers, stage-escape APIs, transitionend waits, ungated script animation, invalid selectors, assert presence). Fix errors in the new files directly. An alias collision is fixed by dropping the alias.',
  '2. `bun typecheck`',
  '3. `bun check` (Biome). THREE warnings are pre-existing and must be left alone: candidates.json file size, and two noDescendingSpecificity warnings in src/kit/motion.css. Fix only NEW problems, with `bun run fix` for mechanical ones.',
  '',
  'Rules: read AGENTS.md first; fix in the spirit of the file you are fixing (match its idiom, do not gut a demo to silence a type error); never touch src/kit/, src/stage/, e2e/, or terms that predate this round (EXCEPTION: leave the authors\u2019 own prose-only cross-link edits to pre-existing articles alone if they pass the gates). Do not run e2e, builds, or dev servers: the main session handles those, and the user is running the dev server on 4321 (leave it alone). Report any stray files authors left at the repo root (screenshots, probe scripts) rather than committing around them.',
  '',
  'Return structured output: clean (all three gates green), fixed (one short line per fix), notes.',
].join('\n')
const verify = await agent(verifyPrompt, { label: 'verify:gates', phase: 'Verify', schema: VERIFY_SUMMARY, model: 'opus', agentType: 'general-purpose' })

return {
  batches: CATS.map((c, i) => ({ category: c, ...(results[i] ?? { completed: [], notes: 'agent failed' }) })),
  verify: verify ?? { clean: false, fixed: [], notes: 'verify agent failed' },
}
