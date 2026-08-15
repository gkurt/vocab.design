# vocab.design — Specification

A linked visual dictionary of design and UI vocabulary: every term defined, demonstrated
live, connected to its aliases and neighbors, and phrased so that both people and AI
agents can use it.

**Thesis.** Working with AI agents is mostly about knowing the vocabulary and using it
correctly. People who can say "segmented control" get one in one prompt; people who say
"those connected buttons where one is selected" iterate five times. The site closes that
gap — exhaustively, not selectively.

**Strategy.** Exhaustive coverage (500–1,000 terms across components, layouts, patterns,
interactions, motion, typography, color, aesthetics, accessibility) and superior
discoverability (every alias is a search query we answer; machine-readable for agents).
No gimmick differentiators. The closest existing site, uiterms.com, has 64 terms, no
cross-linking, and no agent angle; the tail is wide open.

## 1. Principles

1. **Exhaustive over curated.** The long tail ("what's the word for the little grip
   dots?") is the product. Head terms are table stakes.
2. **Every alias is a search query.** Aliases are first-class data, not footnotes —
   they drive canonicalization, redirects, SEO, and the implementations table.
3. **Specimens are platonic.** Demos show the *concept* of a toast, not Material's or
   Apple's toast. No component libraries, no brand aesthetics in demos.
4. **Demos are illustrations, not production code.** Stated on every page. Production
   pointers live in the implementations table.
5. **Longevity beats convenience.** Demos are built on the native web platform (many
   terms *are* platform features: `<dialog>`, `popover`, scroll-snap, view transitions).
   A reference site cannot afford dependency churn across 500 demos.
6. **Accessibility is credibility.** A site defining "focus trap" and "skip link" must
   itself be exemplary: keyboard-first, reduced-motion aware, semantic.
7. **Agents are an audience.** Machine-readable term data (JSON-LD, llms.txt, raw
   markdown endpoints) is core plumbing, not an add-on.
8. **Chrome and specimen never share a visual language.** The reader must always know
   where the site ends and the exhibit begins — especially when the term is "card".

## 2. Content model

One term = one MDX file in `src/content/terms/<slug>.mdx`. Frontmatter is validated by
a Zod v4 schema (`src/lib/schema.ts`); the MDX body is the article (usage notes,
disambiguation prose, history, common misnomers).

### Frontmatter schema (canonical shape)

```yaml
name: Toast                      # headword, display form
slug: toast                      # kebab-case, unique, = filename
category: component              # exactly one, see §2.2
status: published                # stub | draft | published
definition: >-                   # the dictionary line, ≤ 200 chars, one sentence
  A short, self-dismissing message that appears at the edge of the screen to
  confirm an action or report a status.
aliases:
  - name: snackbar
    source: material             # optional: which vocabulary uses this name
relations:
  contrastWith: [tooltip, banner, alert-dialog]   # symmetric, CI-enforced
  variantOf: []                                   # directed: this is a variant of X
  partOf: []                                      # directed: this appears inside X
  seeAlso: [optimistic-ui]                        # symmetric, CI-enforced
implementations:
  - system: material             # from the tracked-systems registry, §9
    name: Snackbar
    url: https://m3.material.io/components/snackbar
sources:
  - title: "ARIA APG: alert pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
demo: inline                     # none | inline | iframe (see §6)
useWhen: >-                      # the situation this word is for; powers "Which word?"
  a passing confirmation that cleans up after itself
```

### 2.2 Categories

`component` · `layout` · `pattern` · `interaction` · `motion` · `typography` · `color`
· `aesthetic` · `accessibility`. One category per term; cross-cutting membership is
expressed through relations, not multiple categories.

### 2.3 Relations and the stub policy

Relations reference slugs. CI fails if a referenced slug has no file. The escape valve
is **stubs**: a stub entry has only `name`, `slug`, `category`, `definition`, and
`status: stub`. Stubs render as real pages (definition + "entry in progress"), so
internal links never 404 and every named concept is searchable from day one. Writing a
relation to a term that doesn't exist yet means creating its stub in the same change.

`contrastWith` is held to a discrimination test: an edge earns its place when a person
describing one term could plausibly reach for the other term's word, not when the
components merely look alike. Keep the set small. The graph's value is discrimination,
not connectivity, and at 500+ terms a loose criterion drowns every page in relations.

Symmetry: `contrastWith` and `seeAlso` are symmetric — CI fails unless both sides
declare the edge (stubs are exempt until promoted, since they carry no relations).
`variantOf`/`partOf` are directed; reverse listings ("variants of this", "found
inside") are derived at build time, never stored.

`useWhen` (a phrase naming the situation the word is for) powers the generated
**"Which word?" table** on each term page: this term's row plus one row per
`contrastWith` neighbor that carries its own `useWhen`. Each phrase is written once
and reused by every neighbor's table; neighbors without one stay in the Related
list, so nothing silently disappears. Stubs may carry `useWhen`; published terms
must (enforced by `bun validate`).

### 2.4 Editorial style

- **No em-dashes, ever, in published writing**: definitions, articles, useWhen
  phrases, UI copy, README. They are widely read as a tell of AI-generated text, and
  this site's credibility depends on not reading as AI output. Use a comma, colon,
  period, or parentheses instead. Enforced on term content by `bun validate`.
- **A site named in prose is a link to that site.** A reader told about
  deceptive.design or easings.net deserves an anchor, not a string to retype;
  write `[deceptive.design](https://www.deceptive.design)`. Bare domains and raw
  URLs in article prose are rejected by `bun validate` (code spans exempt).

## 3. Site architecture

- **Astro 6** static site, content collections over `src/content/terms/`.
- **Tailwind CSS v4** for chrome styling; specimen kit uses its own plain CSS (§5).
- **Zero JS by default.** Interactivity ships as custom elements, progressively
  enhanced; no framework runtime on term pages.
- **Bun** for tooling, `bun test` for unit tests, **Playwright** (`e2e/`) for
  choreography execution and smoke tests.
- **Search**: Pagefind at build time.
- **Deploy**: GitHub Pages via Actions, custom domain `vocab.design`.

### URL scheme

- `/{slug}` — term page, top level (`vocab.design/bento-grid`).
- Aliases: static redirect pages (`/snackbar` → `/toast`) with `rel=canonical`;
  the alias also appears in the target page's title metadata and on-page "also called".
- `/browse` (all, grouped by category) · `/{category}` · `/glossary` (A–Z) · `/search`.

## 4. Chrome design system

Register: **publication, not app** — closer to a type foundry specimen site than a
docs site. The chrome must recede so specimens read as the content.

- **Type**: a text serif for headwords and definitions (dictionary voice), a sans for
  UI/meta (house default: Geist Variable), mono for code and kbd. Working serif
  candidate: Source Serif 4 Variable — revisit during visual design.
- **Color**: near-monochrome ink/paper neutrals plus exactly one accent. Light and dark
  themes from day one (`prefers-color-scheme` + explicit `data-theme` override).
- **Dictionary conventions**, used functionally: large headword; italic
  part-of-speech-style category tag (*component*, *motion*); "also called:" alias line
  styled like pronunciation variants; cross-references as the visible link apparatus.
- **Tokens**: CSS custom properties under `--vd-*`, mapped into Tailwind v4 `@theme`.

## 5. Specimen kit

The demos' own miniature design system. It exists to (a) keep 500+ agent-written demos
looking like one collection, (b) keep specimens platonic, (c) replace the effort a
component library would save — without the branding or churn.

- **Tokens** under `--sp-*`, deliberately distinct from chrome tokens: different
  neutral temperature, sans-only type at a smaller scale, one radius, one shadow. This
  token wall is what enforces Principle 8.
- **~15 primitives** as kit classes, plus vanilla-TS custom elements where a primitive
  carries state, composed inside demos: app/window
  frame, button, input, avatar, text row, list item, menu item, card shell, plus a
  small inline SVG icon set. Demos compose from the kit and nothing else.
- **Subject and context registers.** Every demo marks the element the term names
  with `data-subject`, on the **narrowest** element that the term actually names.
  Reaching for the top-level wrapper is a claim that the whole scene is the term,
  not a default: it withdraws identify (§6), so a demo that grabs the wrapper out
  of convenience loses the affordance that would have pointed at the right thing.
  A demo's own instrumentation is never part of the term. A Replay button, a
  "make the next request fail" switch, and the heading above a list are scenery
  the specimen needs in order to be watchable, and they belong outside the
  subject. Scenery is wrapped in the `.sp-context` register: accent remaps to a
  chroma-free neutral and elevation drops to none, while contrast and type stay
  untouched — context must read as *quiet*, never as *disabled* (grey-out is
  itself UI vocabulary). The subject is styled normally — full kit palette, no
  added emphasis — so the palette alone localizes the subject in every static
  screenshot without the specimen lying about how the pattern looks. Genuinely
  whole-scene subjects skip the context register entirely: a term like easing,
  demonstrated by three timings run side by side, is the comparison itself, and
  there is no part of it that could be dimmed without dimming the term.
- **Isolation**: shadow DOM by default; `demo: iframe` for document-level behaviors
  that shadow DOM can't honestly demonstrate (skip link, focus trap, view transitions,
  scroll-driven animation). A frame is not the safer choice, it is the more expensive
  one: a second realm, a second coordinate space, and its own copy of the type. Reach
  for it only when the term's subject genuinely is document scope, and say in the
  demo's own words why.
- **No incidental layout shift.** A specimen changing state must not move the parts
  that did not change: reserve the room a revealed element will occupy rather than let
  it shove its neighbours around. A demonstration is watched, often on a loop, and
  content jumping under the eye reads as the specimen being broken rather than as the
  term doing its work. Where the reserved size can only be known at runtime, the demo
  measures it once on mount. Where taking up room *is* the term (hidden text getting
  its layout back), the change stays where it belongs: it may widen the control that
  owns it, but the line that control sits in, and everything below, holds still —
  usually by keeping the new content out of the cross axis rather than by moving it
  somewhere it would not really live.
- **Hard demos** (combobox-class accessibility) are implemented properly once, in the
  kit, and reused — never re-derived per demo.
- **Budgets**: no network requests, no timers while idle, small enough to inline.
- **The stage owns the clock.** A demo's only timer is the one `mount()` is handed.
  The stage freezes it to pose the specimen and stops it on remount, neither of which
  it can do to a timer taken from the global scope: that one keeps running under a
  pose, dismisses the subject mid-inspection, and outlives the mount that set it.
  `bun validate` rejects a bare `setTimeout` in a demo.
- **The stage cannot be escaped.** A demo never calls an API whose effect reaches past
  the exhibit frame: `requestPointerLock()` captures the reader's real pointer,
  `showModal()` paints over the page, and `document.startViewTransition()` is
  document-scoped and belongs to `demo: iframe` specimens alone. Simulate the effect
  inside the frame and say so in a comment. A demo also never waits on `transitionend`
  (it never fires under reduced motion; time the settle on the clock), and a demo that
  animates in script asks `prefersReducedMotion` first. All enforced by `bun validate`,
  which likewise rejects a choreography selector whose unquoted attribute value starts
  with a digit (invalid CSS that only fails at play time).

## 6. Specimen stage

`<specimen-stage>` is the one chrome component that hosts demos: a clearly bounded
frame that reads as "exhibit space". It owns the caption, the controls (identify,
view-source, and a play control, pinned right, that reads "Playing" behind a pause
glyph while attract owns the stage, stops the script when clicked, and reads "Play"
behind a play glyph otherwise), the isolation mode
(shadow root or iframe), and the attract-mode player. Written once; demos never reimplement any of it. Specimens follow
the page theme — the stage syncs the kit's light/dark tokens to the chrome's; there is
no per-stage theme control.

**Reset is formalized as destroy-and-remount.** Demos must be cheaply re-creatable from
initial state; no demo ships custom cleanup logic.

**Both isolation modes are built, behind one internal shape** (`Surface`), so nothing
above it asks which one it is driving. `demo: iframe` loads a generated specimen
document, one per such term, never linked and never in the sitemap. The demo module is
imported *inside* that document rather than injected into it, because a custom element
registry, `document`, and `document.activeElement` all belong to a realm: a kit
primitive defined from outside would register where the frame cannot see it, and a term
about the page's own focus could not be about the page it is in. What the frame costs
is paid in two places and nowhere else. The kit reads `:host` and `:root` for the same
stage attributes, since a document has no host. And the overlay is chrome in the page
while the specimen measures itself against a viewport of its own, so the stage converts
between the two coordinate spaces for exactly the two things drawn across the boundary:
the identify ring and the ghost cursor. A framed specimen also loads its own copy of the
kit typeface, because a font face is declared per document.

The stage also owns **subject annotation** — curator's ink drawn *over* the specimen,
never styling inside it:

- **Specimen pin**: a museum-style label bearing the headword, drawn beside the
  `data-subject` element. It belongs to identify, not to attract: a label that appears
  unbidden mid-play is chrome talking over a demonstration the viewer is already
  reading, and it competes with the ghost cursor for the same attention.
- **Identify control**: a caption affordance that, on hover or tap, dims everything
  except the subject (overlay scrim with a cutout) and shows the label. It works in
  user mode, on touch, and under reduced motion — the universal layer for subjects the
  context register can't distinguish (a skeleton screen is grey by definition).
  It asks *which part of this is the term*, so a stage whose subject is the whole
  scene does not offer it at all: the ring would trace the frame it already sits
  inside and the label would repeat the headword printed above the stage, and an
  affordance that resolves to "all of it" reads as a broken one. The stage decides
  this once, on mount, and removes the control; the rest of the caption bar is
  unchanged, so the play control keeps its place. If the subject is not on
  stage when identify engages (a toast that hasn't fired, text clipped to a pixel by
  the very technique the term names), the stage **summons** it:
  the choreography is fast-forwarded — no cursor, waits dropped — until the subject
  appears. On stage means being the term, not merely being visible: a demo whose
  states include a counter-example (dark-pattern's fair checkout, keyboard-trap's
  escapable widget) declares the honest condition as a selector in `data-pose` on the
  subject, and a state that fails it keeps the summon playing, since a ring around the
  fixed version would identify the opposite of the term. Prefer designing states so
  the subject never stops being the term (dark-mode's segmented picks the derivation,
  not the scheme, for exactly this reason); `data-pose` is for the demos where the
  dishonest state is pedagogically required. The exception is a wait the script itself marks as load-bearing, by
  following it with a `visible` assert: that beat is often the only reason the subject
  exists at all (a tooltip lives behind its hover delay), so it is polled, capped, and
  left the instant the subject shows. Identify is a hover affordance and has to settle
  at the speed of one, which is why every other beat is skipped outright. While identify is held the stage holds a **pose**: the
  summoned specimen with its clock frozen, so the demo's own timers cannot dismiss the
  subject mid-inspection. A pose is a stop, not a copy. The specimen stays the live one,
  listeners and all, which is what lets the click that ends the pose land on the element
  the reader aimed at rather than on a tree the stage has just replaced (SPEC §7). The
  stage says when it is holding one, on the host as `data-posed`. Releasing identify
  (or any real interaction) starts the clock again. Identify **borrows** the stage rather than taking it: attract is
  suspended, not ended, so the play control keeps reading "Auto-playing" throughout
  and the loop picks up again on release. A pose is only ever taken while the summon
  that produced it still owns the demo; if attract has already resumed, the pose is
  abandoned rather than freezing the live specimen out of its own run.

## 7. Attract mode

Demos play themselves (arcade "attract mode") with visible synthesized input — a ghost
cursor and key HUD chips — until the user takes over. Formalized so no demo reinvents it:
**the demo never knows it is being played.**

### State machine (owned by the stage)

```
idle ── enters viewport & scheduler grants ──▶ attract (loops continuously)
attract ── user intent ──▶ user
user ── pointer gone + idle ~1.2s ──▶ reset (remount) ──▶ attract
any ── leaves viewport ──▶ paused; re-entering resumes
```

- **User intent** (takeover): a click or tap anywhere in the specimen, keyboard focus
  entering it, a >150 ms hover on an interactive element, or a wheel/touch gesture
  that actually scrolls specimen content. **The gesture that takes over is not spent
  taking over**: state is handed to the user as it stands, and the click that woke a
  posed specimen still reaches the control it was aimed at. Waking is a thaw, never a
  remount, for exactly this reason. Merely passing the pointer over the stage,
  or scrolling the page while the stage happens to sit under the pointer, never takes
  over — which is why the scroll test is whether the gesture moves the specimen's own
  scroller, not whether it landed on the stage. Script halts immediately, ghost cursor
  fades, demo state is handed over as-is. The dwell is watched from inside the
  specimen's shadow root: hover events do not cross the shadow boundary when both ends
  of the move are inside it, so a stage listening from outside would only ever hear the
  pointer arrive in the specimen and never see it land on a control. The ghost also lets go of whatever it was
  hovering, since a pointer that no longer exists cannot still be over a control —
  unless the real pointer has landed inside that same control, where a synthetic leave
  would contradict the enter the browser has just sent.
- **Continuous play**: attract loops for as long as the stage is on screen, with a
  beat between plays. Motion never outlives attention: off-viewport stages are fully
  paused, and reduced-motion visitors get no attract at all.
- **Touch**: no hover exists — takeover is tap; attract resumes after the same idle
  beat once interaction stops.

### Non-negotiables

- **Attract mode never moves real focus.** Scripted keyboard steps simulate focus
  visually (`data-sim-focus` attribute styled by the kit) plus the key HUD. Only user
  mode touches real focus. (A scripted `.focus()` would hijack the keyboard of someone
  scrolling past — the worst possible bug on a site that defines "focus trap".)
- **`prefers-reduced-motion` disables attract entirely.** The stage instead rests on
  the posed specimen — the summoned state identify shows, subject on stage — and the
  play control (always "▶ Play" here, since attract never runs) plays a single
  scripted pass on request. Interacting wakes the live demo; after the idle beat it
  returns to the pose. This is where a pose is the resting state rather than a moment
  inside identify, so it is also where waking must not cost the reader their click.
- **One scheduler per page** decides which stage may play: on index pages only the
  centered or hovered stage animates (others hold their first frame); on a term page
  the hero stage plays. IntersectionObserver-gated; off-screen stages are fully paused.

## 8. Choreography

A declarative script colocated with each demo — data, not a program:

```ts
// src/content/demos/toast/choreography.ts
export default steps([
  { moveTo: '[data-part=save-button]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=toast]', state: 'visible' } },
  { wait: 2200 },
  { assert: { selector: '[data-part=toast]', state: 'hidden' } },
])
```

- **Step vocabulary** (complete, small): `moveTo`, `click`, `dblclick`, `rightClick`,
  `middleClick`, `drag`, `press` (key), `type` (text), `scroll`, `wait`, `assert`.
  Nothing demo-specific.
- **Targets are `data-part` attributes only** — a stable semantic contract that
  survives restyling. Never classes or tag structure. An `assert` may qualify a part
  with a state attribute (`[data-part=seg-day][aria-selected="true"]`), which is how a
  choreography proves state it cannot see; `hidden` covers absent as well as invisible.
- **Scripted input reaches a state; it never flips one.** A pass can be interrupted,
  fast-forwarded by a summon, or resumed at any point, so a step whose effect depends
  on the state it finds can demonstrate the opposite of the term. Demos therefore give
  their surfaces an explicit open and an explicit dismissal (choose an item, Apply,
  Escape, click outside) instead of a trigger that toggles. A toggle is right where the
  toggling *is* the term (a chip, a disclosure, a reveal), because there the script
  drives both directions itself and the demonstration is the flip.
- The player dispatches real synthesized pointer/keyboard events inside the demo root,
  animating the ghost cursor between targets and popping key chips for keyboard steps.
  `moveTo` carries hover with it (enter/leave land when the cursor arrives), since
  hover is input a tooltip or a menu genuinely responds to, and `scroll` is animated by
  the player rather than by `scroll-behavior`, which is unreliable and would let a step
  silently do nothing.
  Synthesized events never light `:hover` or `:active`, so the player also mirrors its
  own pointer into the kit's attribute spellings: `data-hovered` rests on the element
  under the ghost cursor, and `data-pressed` flashes through a click and holds through
  a drag. The mirror claims an attribute only when the demo's own handlers did not set
  it, and releases only what it claimed, so a demo that manages these attributes as
  part of its subject matter (the hover and pressed-state specimens) is never fought
  over them. A demo therefore needs the spellings only for a state shown with no
  pointer on it at all (a states row, a posed comparison), never to repaint its own
  controls under attract.
  Input kinds are disambiguated at the cursor: left click ripples a left arc, right
  click a right arc, a held drag closes the cursor into a grab hand until release
  (which ripples the click's arc), middle click pulses paired up/down carets, and
  wheel scrolling ripples carets in the scroll direction.
  The pointer rests on an element's centre, unless the element carries `data-aim`,
  which parks it just inside the bottom-right corner instead: on a small control the
  cursor is the biggest thing on it, and a morphing glyph would perform entirely
  underneath the arrow. The dispatched coordinates move with the drawn cursor, so an
  opted-in element's events land at its corner, not its centre — a demo that resolves
  input by coordinate should not opt in. `type` lands its characters
  one at a time, at a typist's cadence, into a HUD chip that grows with them: one
  `input` event per character, so a demo that answers each keystroke is demonstrated
  against the gesture a person actually makes. Summon keeps the single-event paste
  (it fast-forwards), and reduced motion lands the whole string at once.
- `assert` steps are invisible to viewers and load-bearing in CI.

**The choreography is also the demo's smoke test.** CI (Playwright, in `e2e/`) executes
every choreography headlessly against the built site, fails on any false `assert`, and
uploads screenshots as review artifacts. Every agent-authored demo therefore ships
with a machine-checkable proof that it behaves like the term it demonstrates. The
runner also asserts that exactly one `data-subject` exists after mount and captures
the identify/spotlight state as a screenshot artifact — a reviewer sees not just that
the demo runs, but *what it claims the term is*.

The runner drives **the real attract player**, through a single seam on the stage
(`<vd-stage>.audit()`), rather than sending Playwright's own input. Synthesized events
are not browser input: they do not trigger default activation behaviours, so a demo
built on `<summary>` or a `<label>`, or on any other click the browser handles itself,
would work perfectly under a real cursor and go still in attract mode. Testing the path
that ships is the only way that failure is ever seen, and it drives both isolation
modes through the same seam, so a framed specimen is graded exactly as hard as an
inline one. Four runs, for four questions:

- **Choreography**, at full speed with motion on. Cursor travel and the beats between
  steps are what the demo is timed against; a tooltip has to be given its hover delay.
- **Identify**, under `prefers-reduced-motion: reduce`. Attract never runs, the stage
  rests on the posed specimen, and kit animation is off, so every still is of the same
  moment rather than of whenever the shutter fell. Each specimen contributes a committed
  text snapshot of its subject's shape (tag, kit classes, and the state attributes it
  carries when the spotlight lands) plus a still; the stills are collected into one
  contact sheet, so what all the specimens claim can be read in a single pass.
- **Identify mid-attract**, with motion on. Reduced motion always poses the mount
  state, so it can never catch the live class of bug: a subject transparent when the
  spotlight lands, or a pose of a state the subject's `data-pose` calls dishonest.
  This run lets attract own the stage, holds identify at one mid-script moment, waits
  out the summon (and then one beat more, because a pose settles the instant a reveal
  begins and its fade deserves the same room any claim gets), and holds the settled
  pose to the specimen's word: one subject, a real box, visible ink, `data-pose`
  satisfied, the pin bearing the headword.
- **Takeover**, also under reduced motion, where the stage rests on a pose. One quick
  click on the posed subject, with no pause between arriving and pressing so the hover
  dwell cannot wake the demo first, and one question: did the click reach an element
  the pose actually held? Nothing recorded means the stage ate the gesture; an element
  the pose never contained means it rebuilt the demo underneath the reader.

`assert` and identify ask different questions about visibility, and the stage keeps them
apart. Identify's summon asks *is the subject on stage, or on its way?* and answers true
the instant a reveal begins, because a hover affordance cannot wait out a fade; "on its
way" means a fade actually running, not a resting state, so a subject parked at opacity
zero (a scrim in its "none" state) keeps the summon playing rather than posing a ring
around nothing. An `assert` asks *could a reader see this?* and does consult opacity,
because a row still waiting its turn in a stagger occupies its space and shows nothing.
Neither treats a box clipped to a pixel as present.

## 9. Implementations & sources

Libraries and design systems appear **as data, not as demo tooling**. Tracked systems
registry (initial): `aria-apg`, `material`, `hig`, `fluent`, `carbon`, `polaris`,
`radix`, `base-ui`, `shadcn`. Each implementation row: system, the system's name for
the concept, and a docs URL.

- The term page renders an implementations table under the statement: *"Specimens
  illustrate the concept; for production use, start here."*
- Implementation names feed the alias model (Material's "snackbar" is both an alias
  and an implementation row) and answer the codebase-specific question ("say
  `ToggleGroup` in a Radix codebase").
- **Link checking runs on a weekly schedule, not per-PR** — external link rot must
  never block a merge.

## 10. Discoverability

- **Aliases** → static redirects + on-page/metadata presence (§3).
- **JSON-LD**: every term page emits `DefinedTerm` within a site-wide
  `DefinedTermSet`.
- **Agents**: `llms.txt` at the root; every term also served as raw markdown at
  `/{slug}.md`; full dataset export at `/terms.json`.
- **OG images** generated per term at build (headword + category + definition line).
- Sitemap, RSS feed of newly published terms.

## 11. Content pipeline & CI gates

Agent-driven, human-reviewed, in four stages:

1. **Enumerate** — parallel sweeps over source types (ARIA APG, platform HIGs, design
   system docs, NN/g, ui-patterns, community vernacular), looping until consecutive
   rounds surface nothing new.
2. **Canonicalize** — agents propose merge/alias decisions; **a human approves the
   taxonomy**. This is the highest-judgment step.
3. **Author** — one agent per term writes entry + demo + choreography against schema
   and templates.
4. **Verify** — separate agents fact-check definitions against cited sources; CI runs
   the mechanical gates.

**CI gates on every PR**: Zod schema validation · relation integrity + symmetry +
stub existence · choreography execution with asserts · demo subject marking
(`data-subject`) · no global timers in a demo · identify subject snapshots ·
takeover reaching the posed specimen · Biome · typecheck · build.
The identify contact sheet is uploaded on every run. Pipeline entry points live in
`scripts/`.

## 12. Pilot: 20 terms

Chosen to stress-test every hard part; if these pass, the remaining ~500 are easier.

| Term | Category | Stress-tests |
| --- | --- | --- |
| Modal dialog | component | densest contrast cluster; head-term quality control |
| Popover | component | contrast edges; alias (flyout) |
| Drawer | component | aliases (off-canvas, side panel) |
| Toast | component | alias with source (snackbar/material) |
| Tooltip | component | tooltip/popover/hover-card confusion triple |
| Chip | component | canonical alias merge (tag, pill, token) |
| Kebab menu | component | alias family + variantOf (meatball); tail SEO |
| Hamburger menu | component | usage-notes editorial section |
| Scroll spy | pattern | tail term; interactive demo |
| Segmented control | component | the founding-thesis poster child |
| Combobox | component | hardest demo; fact-check against ARIA APG |
| Optimistic UI | pattern | temporal demo (simulated server round-trip) |
| Empty state | pattern | contrast with zero state (stub) |
| Progressive disclosure | pattern | abstract concept — what "demo" means |
| Skeleton screen | pattern | partOf/variantOf edges (shimmer, spinner stubs) |
| Stagger | motion | pure animation demo |
| Easing | motion | comparative demo (curves side by side) |
| Glassmorphism | aesthetic | CSS-technique demo; aesthetics category probe |
| Leading | typography | designer/developer alias split (line-height) |
| Visually hidden | accessibility | demoing the invisible; sr-only alias |

## 13. Non-goals

- Not a component-library showcase or comparison site.
- No accounts, comments, or CMS — git is the CMS; PRs are the editorial workflow.
- No prompt marketplace; agent guidance stays one `useWhen` phrase per term.
- No ads.

## 14. Licensing

Code is MIT. Term content — definitions, articles, and demo compositions as published —
is CC BY 4.0.

## 15. Open decisions

- **Serif choice** for the chrome (§4) — decide during visual design of the chrome.
- **OG image generation** approach (build-time satori vs. prerendered endpoint).
