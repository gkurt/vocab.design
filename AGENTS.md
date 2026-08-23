# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

**Read [SPEC.md](SPEC.md) first** — it is the canonical design document for the whole
project (content model, design systems, specimen stage, attract mode, pipeline). Any
change that contradicts SPEC.md needs the spec updated in the same PR.

## Commands

```bash
bun run dev        # Astro dev server (port 4321)
bun run build      # Static build to dist/, then the Pagefind index into dist/pagefind/
bun run build:nosearch  # Astro only, for when the index is not what you are iterating on
bun run test       # Unit tests (bun test)
bun run test:e2e   # Specimen smoke tests: builds, serves on 4322, plays every choreography
bun run test:e2e:new  # Same suites, only for demos without a committed subject snapshot
bun typecheck      # astro sync + type check (TypeScript 7, native tsc)
bun validate       # Content gates: schema, relations, symmetry, prose links, stubs, demo files
bun run lint       # Lint
bun run format     # Format
bun run fix        # Lint + format + autofix
bun run checks     # Everything: check + typecheck + test + validate + test:e2e
```

**Nothing runs the e2e suite automatically. Do not run it unless asked.** A full pass is
roughly 45 minutes over 1,057 specimens, which is the whole GitHub Actions budget on a
private repo, so it is not in `ci.yml`: it lives in `.github/workflows/e2e.yml`, manual
only, with a `grep` input for scoping it to one specimen. `ci.yml` keeps the static
gates and finishes in about two minutes.

This means the specimen gate only runs when a human asks for it, so be honest in
reports: say the static gates passed, and do not imply a choreography was executed when
it was not. Commit on `bun validate`, `bun typecheck`, `bun check`, `bun run test`.
Review what a new specimen identifies as by READING
`e2e/__snapshots__/<slug>-subject.txt`, which costs nothing and catches the mistakes
that matter most (a whole-scene subject, a pose the mount state fails).

The one case that genuinely needs a local run is a brand-new specimen, because its
subject snapshot does not exist until a run writes it: `bun run test:e2e:new` plays only
those and takes a couple of minutes. Ask before starting it rather than assuming.
`bun run test:e2e:update` rewrites snapshots after a deliberate change to what a specimen
identifies as; read the diff before committing it. Either needs a browser once:
`bunx playwright install chromium`. Both build the site and preview it on 4322, so they
never collide with `bun run dev`.

One environment trap bites agents only. Astro 7.2 force-backgrounds `astro preview`
when the am-i-vibing package detects an agentic environment: the server forks off,
prints its pid as JSON, and the foreground process exits, so Playwright reports
`Process from config.webServer exited early` and runs no tests at all.
`playwright.config.ts` therefore sets `ASTRO_PREVIEW_BACKGROUND=1` on its webServer,
which is the documented opt-out; set the same variable by hand for any ad-hoc
`bunx playwright test` or `astro preview`. Piped through a buffering pipeline the failure
reads as a HANG with an empty log rather than as an error, because the orphaned preview
server holds the inherited stdout handle open long after Playwright has gone.

That orphan is worse than a stale process, because Astro's preview lock is global rather
than per-port: one stray server makes every later `astro preview` refuse to start on any
port, so an unrelated gate fails with a confusing "no server at ..." instead of a message
about the real cause. A run killed partway (a tool timeout, a Ctrl-C) is the usual way to
strand one. `bunx astro preview stop` clears it, and `ps ax | grep "astro preview"` shows
whether one is stranded.

Prefer these scripts over ad-hoc commands. Do not prefix them with `bun run` when
a bare alias exists (`bun check`, `bun typecheck`) — those are whitelisted for
agent use.

## Project Structure

```
SPEC.md                     # Canonical design doc — read first
src/lib/schema.ts           # Zod v4 term schema (single source of truth): CATEGORIES, TAGS, SYSTEMS
src/lib/terms.ts            # getTerms() — the ONE way to read the collection (see gotcha below)
src/lib/tags.ts             # facets() and families(): tag blurbs, head terms, membership derived
src/lib/categories.ts       # one blurb per category, for the browse pages
src/lib/glossary.ts         # the A-Z entry list: every term AND every alias, sliced by letter
src/lib/slug.ts             # slugify for terms and aliases
src/content/terms/          # One MDX file per term, frontmatter per schema
src/content/demos/<slug>/   # demo.ts (mount fn) + choreography.ts per term
src/kit/kit.ts              # Specimen kit stylesheet, assembled and adopted into shadow roots
src/kit/*.css               # tokens · layout · controls · surfaces · motion (--sp-* only)
src/kit/icons.ts            # Shared inline SVG icon set
src/kit/motion.ts           # prefersReducedMotion(): the gate a scripted animation asks itself
src/kit/touch.ts            # pressureHold(): one force signal for script, finger, and held mouse
src/kit/parts.ts            # part()/partsOf()/flag(): the data-part lookup demos share
src/kit/segmented.ts        # <sp-segmented>, <sp-combobox>: kit primitives that carry state
src/kit/combobox.ts         #   (written once against ARIA APG, reused by every demo)
src/stage/                  # <vd-stage>, attract player, scheduler, choreography types
src/stage/visible.ts        #   isRevealed (summon) vs isSeen (assert): see gotcha below
src/stage/clock.ts          #   DemoClock: the only timer a demo may use, so a pose can stop it
src/stage/surface.ts        #   the two isolation modes behind one shape; nothing above it branches
src/stage/frame.ts          #   what a `demo: iframe` specimen document publishes to its stage
src/stage/touch-hover.ts    #   hover in a touch scope: a tap strands one, travel never does
src/styles/                 # Chrome: global.css (--vd-* tokens, Tailwind theme), stage.css
src/pages/                  # index, [slug] (terms + alias redirects), [slug].md, terms.json, llms.txt
src/pages/rss.xml.ts        #   the feed: newest 100 by `created`, linked from every page's head
src/pages/tags/             #   /tags + /tags/[tag] (a facet) + /tags/[head-term] (to its family)
src/pages/browse/           #   /browse (names by category) + /browse/[category] (with definitions)
src/pages/glossary/         #   /glossary (letter index) + /glossary/[letter] (terms and aliases)
src/pages/search.astro      #   /search: the search as a page (Pagefind, built post-Astro)
src/components/SearchPanel.astro # the search itself, rendered as the page or in the modal
src/components/SearchDialog.astro #  the modal in the chrome: <vd-search-dialog> + <dialog>
src/components/SearchDialog.ts #   opens it, and lazy-loads the search on the first open
src/components/SiteSearch.ts #  <vd-search>: fetches dist/pagefind/ at runtime, never at build time
src/components/Analytics.astro #  the GA4 loader: nothing at all without PUBLIC_GA_ID
src/components/analytics.ts #   chrome wiring: relation clicks and the alias handoff
src/lib/track.ts            #   track(): the one way anything talks to analytics
src/lib/page-type.ts        #   what kind of page a path is (terms live at the root)
src/lib/search-signals.ts   #   what "found the right thing" means, and its tests
src/integrations/           # pagefind-dev: serves dist/pagefind/ under `astro dev` (dev only)
src/pages/specimen/[slug]   #   the iframe document: one per iframe term, unlinked, out of the sitemap
scripts/validate-terms.ts   # Content gates run by `bun validate`
playwright.config.ts        # e2e runner: builds, previews on 4322, four passes over every specimen
e2e/*.e2e.ts                # Choreography · identify snapshots · identify mid-attract · takeover · reduced-motion guard (SPEC §8)
e2e/harness.ts              #   specimen discovery, stage helpers, subject description
e2e/__snapshots__/          #   committed: what each specimen identifies as
e2e/__artifacts__/          #   generated: identify stills + the contact sheet
```

`/search` works under `bun run dev`, against the index from the last `bun run build`:
`src/integrations/pagefind-dev.ts` serves `dist/pagefind/` at `/pagefind/*` in dev only.
So dev search is real but as stale as the last build, which matters when you have just
edited a term and it is still findable at its old text. Rebuild to refresh; the middleware
resolves per request, so a build finishing while dev runs is picked up without a restart.
A fresh clone has no index at all and `/search` says so.

The search has two homes and one implementation. `SearchPanel.astro` renders `<vd-search>`
either as `/search` (`variant="page"`) or inside the chrome's modal (`variant="dialog"`),
and the two differ in exactly two ways: the page owns the address bar (`data-sync-url`,
so a search is a shareable link and survives a reload) while the modal leaves it alone,
and the modal carries a link out to `/search` whose `?q=` follows the typing. `/search`
itself renders no modal, because the page already is one.

The nav trigger stays a real `<a href="/search">` marked `data-search-open`:
`SearchDialog.ts` intercepts a plain left click and leaves a modified or middle click to
the browser, so "open search in a new tab" works and the link still works with no JS at
all. That script is the only one the chrome ships on every page besides the theme toggle
(750 bytes gzipped), and it pulls `SiteSearch.ts` in on the first open, so a reader who
never searches never downloads the search. `/` and Cmd/Ctrl+K open it; `/` inside any
field stays a slash.

**Gotcha**: Escape inside the modal is handled in script, not left to `<dialog>`. A
`type="search"` input eats the first Escape to clear itself, so the platform's own close
only happens on the second press, which makes the footer's "Esc to close" a lie exactly
once per search.

## Analytics

GA4, and only when `PUBLIC_GA_ID` is set at build time (SPEC §10). No ID means not one
byte ships, which is every build except the deploy: the ID comes from the repository
variable `PUBLIC_GA_ID`, read in `.github/workflows/deploy-pages.yml`. `window.gtag`
exists only when the loader's refusals all pass (GPC, Do Not Track, any localhost), so
`track()` from `#src/lib/track.ts` is a no-op in dev, in a fork, and for a reader who
opted out. Call it unconditionally; never branch on whether analytics is on.

What is measured and why is SPEC §10. The short version: the searches that FAIL are the
point, because a query that finds nothing (or only finds something after the salvage pass
throws half of it away) is a missing alias or a missing term.

To check the wiring against the real property, build with the ID and serve it:

```bash
PUBLIC_GA_ID=G-... bun run build     # then serve dist, e.g. bunx astro preview
```

Setting the variable IS opting in, so there is nothing else to switch on. Hits from
localhost carry `debug_mode`, which puts them in GA's DebugView labelled as a test rather
than as traffic. The reader's own refusals (GPC, Do Not Track) are never waivable.

The report itself is code, not a console: `bun run analytics` (`scripts/analytics-report.ts`)
asks the questions that matter through the Data API and prints them, GA and Search Console
side by side, because they are one question from two sides: GA says what readers typed into
OUR search and did not find, Search Console says what they typed into GOOGLE before
arriving, where an impression with no click is a word we rank for and answer badly. `--now` reads
realtime, which is how you check that wiring works at all; a bare number of days changes
the window; `--json` for piping. Auth is the `vocab-analytics` service account impersonated
through your own `gcloud auth application-default login`, so no key file exists anywhere.
GA4 has no API for dashboards, Explorations or report collections, so anything built in the
console cannot be reviewed or diffed: put questions worth keeping in the script.

**Gotcha**: a new event parameter is invisible in the GA UI until it is registered as a
custom dimension (Admin > Custom definitions). The data is collected either way, so a
missing report is a settings problem, not a code one.

**Gotcha**: Search Console is a separate property (`sc-domain:vocab.design`) verified by a
DNS TXT record on the domain. Deleting that record unverifies it and silently drops access.
The `vocab-analytics` service account is an owner, which is why the report can read it; its
data lags two to three days and has no realtime equivalent, so `--now` skips it.

**Gotcha**: the realtime API is a different schema, not a different date range: it does not
know `customEvent:` dimensions at all, only built-ins like `eventName`. And the core
reporting API lags by hours (a freshly registered custom dimension, by up to two days), so
"no rows" right after firing an event is processing, not a broken query. Realtime is the
only immediate check.

**Gotcha**: `gtag.js` hijacks `dataLayer.push` once it loads, so reading `window.dataLayer`
is NOT a reliable way to see what was sent. Verify by replacing `window.gtag` with a
recorder instead.

**Gotcha**: an alias page redirects in 0ms and carries no tag, so the alias is handed to
the term page through `sessionStorage` (written before the meta refresh, read and cleared
by `analytics.ts`, and only credited when the target slug matches `data-term`). That
script is emitted only when a measurement ID is set.

**Gotcha**: Pagefind's index does not exist at Astro build time, so `<vd-search>` must
reach it through a dynamic `import()` of a computed specifier marked `/* @vite-ignore */`.
A literal path gets resolved and bundled, which fails the build. Both URLs are resolved
in `search.astro` by `pageUrl` and passed as attributes, never assembled in the element
from a base: `pageUrl('')` returns `/`, so `${base}/pagefind/pagefind.js` builds
`//pagefind/...`, a protocol-relative URL that quietly fetches `http://pagefind/`. The
whole class of bug only shows up in production, where the site is served from a subpath.

**Gotcha**: Astro validates collection entries against a derived JSON schema but does
NOT apply Zod output transforms — defaults never materialize on `getCollection()`
data. Always read terms via `getTerms()` from `#src/lib/terms.ts`, never
`getCollection('terms')` directly.

**Gotcha**: adding a field to `termSchema` while `bun run dev` is running poisons
`.astro/data-store.json`. The content layer captures the collection schema at server
start, so a term file edited afterwards is re-parsed with the OLD schema, Zod strips the
new key, and the entry is saved with a FRESH digest. Restarting does not help: the
digests match, so nothing re-parses, and the field reads as absent (or as its default)
in dev while `bun run build` is perfectly correct. The tell is a page that renders
zeroes or empty lists for the new field in dev only. Delete `.astro/data-store.json`
and restart; `bun validate` and `bun run build` never see this because they parse the
files themselves. A date field fails louder than most (`Invalid input: expected date,
received Date`) because a `Date` built in Vite's SSR realm is not `instanceof Date` in
ours, which is why `day` in `src/lib/schema.ts` rebuilds the value instead of checking
its type.

**Gotcha**: a demo's timers must come from the `DemoClock` its `mount(root, clock)`
is handed, never from the global scope. Identify's pose is the live specimen with
that clock frozen, not a copy of it, which is what lets the click that ends the pose
land on the control the reader aimed at instead of on a tree the stage just rebuilt.
A bare `setTimeout` is invisible to the pose and outlives its own mount; `bun validate`
rejects one. The clock speaks `setTimeout`/`clearTimeout` only, so a demo that needs
`requestAnimationFrame` is a reason to grow `src/stage/clock.ts`, not to reach past it.

**Gotcha**: `src/stage/visible.ts` exports two visibility tests and they are not
interchangeable. `isRevealed` is identify's: on stage *or on its way*, where a live
fade counts (so a summon does not sit out a fade) but an element parked at opacity
zero does not (so a pose never rings a subject the reader cannot see). `isSeen` is an
`assert`'s: could a reader see it, opacity included, resting or not. Reach for the one
that matches the question being asked.

**Gotcha**: never measure (`getBoundingClientRect`, `getComputedStyle`) synchronously
after a style write; mount in the state you measure. A write to a transitioned property
reads back as the old value until the transition ends, and which properties transition
is not the demo's call alone: kit classes carry their own, and kit rules outrank inline
styles. The stack demo's mount-time rhythm measurement was corrupted exactly this way,
and now mounts in the state it measures (`src/content/demos/stack/demo.ts`). Under
reduced motion the kit sets `transition: none !important` on everything
(`e2e/reduced-motion.e2e.ts` guards it), so writes do land synchronously there, but
that is the accessible path, not the common one: a measurement belongs at mount, on
the mounted state, or a frame after the write. The flip side of `none`: `transitionend`
never fires under reduced motion, so nothing may ever wait on it.

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
  An animation run has one owner (SPEC §8): a script presses Replay only at rest
  (its opening wait outlasts any mount-time run) and its tail outlasts every run
  it starts, so neither the click nor the loop's remount cuts a run mid-flight.
  The attract loop remounts between iterations, with two exceptions that keep the
  tree (SPEC §7): a wait/assert-only script on a demo that never armed its clock
  persists automatically, and a demo whose pass ends at its mount state may declare
  `data-loop="keep"`, which the smoke test verifies by playing the script twice
  with no remount between. Self-animating demos are phase-locked to their mount
  and never persist undeclared.
  A keyboard-driven demo must be drivable by a real keyboard: its control carries
  `tabindex="0"` so a reader's keys can reach it (the script needs no focus, but
  the reader does). Making it focusable is half the job: a key the demo claims must
  have its default refused, or the reader drives the demo and scrolls the page at
  the same time (space, the arrows, Home, End, PageUp, PageDown all scroll). Refuse
  per key rather than globally, so Tab still moves focus, and never refuse a key
  whose default IS the thing being demonstrated: space on a real button activates
  it, which is the whole of first-rule-of-aria. Synthesized keys scroll nothing, so
  this defect is invisible to the choreography and to CI.
  A drag-driven demo must survive a real drag: capture the pointer on a trusted
  pointerdown (`if (event.isTrusted) el.setPointerCapture(event.pointerId)` — the
  guard is mandatory, synthetic pointers cannot be captured and the call throws),
  and end the drag on pointerup and pointercancel, never pointerleave (boundary
  events do not fire while capture holds). The scripted drag needs no capture,
  which is exactly how the missing line hides from CI.
  A drag can also DWELL at a waypoint: a `via` entry written as `{ at, dwell }` stops
  there for that many ms and dispatches nothing while it waits, because a pointer
  holding still is what emits no events, and that pause is what a spring-loaded
  container or any drag-and-dwell target counts out on its own clock. It is semantics
  rather than tempo, so reduced motion collapses the travel around it, never the pause.
  A drag also says how it lets go. `release: 'rest'` (the default) settles for a beat
  before lifting, so a demo judging the stroke's last samples honestly measures no
  speed; `release: 'moving'` lifts mid-travel, which is a throw, and `ms` is the
  travel's duration, so distance over time is the speed handed over. A thrown drag
  must state its `ms` and `bun validate` holds it to 80-1200 ms, because a throw the
  player makes too slowly is one a recognizer correctly reads as a hand at rest.
  A drag also says which button it holds: `button: 'right'` holds the right one for
  the whole stroke, which is what a gesture read off the right button needs (every
  event reports button 2, the ghost draws its right arc, and the release is followed
  by the `contextmenu` a real right button fires, so a pad that must refuse the menu
  is asked to). It stays a mouse gesture inside a touch scope, as `rightClick` does.
  A term whose whole claim is visible at rest ships a still script, waits and asserts
  only: a hover with no visible consequence is cursor theater, not choreography
  (SPEC §8). The vocabulary grows before a demo fakes it: input the player cannot
  perform is a reason to grow the player, never to ship a control that impersonates
  the input; a demo is not authored until the input it needs exists (SPEC §8).
  `bun run test:e2e` plays each script through the real attract player, so a demo must
  answer synthesized events: nothing may depend on a browser's own default activation
  (`<summary>`, a `<label>` for an input, a form submit). An `assert` is judged the
  moment the script reaches it, with no retry, so give a claim room rather than time it
  to the edge of a transition. Demos never import anything from `e2e/`. A small control
  whose artwork the cursor would cover (a morphing glyph) may carry `data-aim`, which
  parks the ghost cursor just inside its bottom-right corner instead of its centre;
  events land there too, so a demo that resolves input by coordinate must not opt in.
- **Synthesized input does not light up CSS state.** Attract's events never trigger
  `:hover` or `:active`, so kit primitives that answer a pointer carry an attribute
  spelling beside the pseudo-class (`data-hovered`, `data-pressed`, `data-open`). The
  player mirrors its own pointer into those spellings (hover rests, a press flashes, a
  drag holds), claiming only attributes the demo's handlers did not set and releasing
  only what it claimed, so controls light up under the ghost cursor without any demo
  wiring. The ghost also streams interpolated `pointermove` events while it travels
  between hover targets (`buttons: 0`, never a drag; not under touch or reduced
  motion), so a demo whose term is continuous pointer response listens for moves on
  its container and reads coordinates; a move listener that should only act mid-press
  gates on its own pointerdown state, never on merely receiving a move.
  Inside a `data-touch` scope, hover comes only from a tap and then it sticks: no hover
  arrives from travel for the script or for a reader, since every kit `:hover` rule is
  guarded with `:not([data-touch], [data-touch] *)` and hover paint there is
  attribute-only (`:active` stays unguarded, because a finger really does press). The
  stage lands `data-hovered` on the tapped element and leaves it until a tap elsewhere
  (`src/stage/touch-hover.ts`), claiming only what a demo's handlers did not set. So a
  demo inside a touch scope must never wire `pointerenter` to repaint hover: that hands
  a reader the one thing a finger cannot do.
  A surface operated by hovering alone (a dock that bulges, a glow that follows) also carries
  `data-hover-driven`, which makes a reader's dwell there take the stage over without
  a click (SPEC §7); gaze scopes have this implicitly. A specimen sets the attribute itself only for a state shown with no pointer
  on it (a states row, a posed comparison). Real focus is the exception that stays
  simulated (`data-sim-focus`, SPEC §7).
- **Touch is a persona, not a costume** (SPEC §7-8). A surface marked `data-touch`
  makes every step targeting it perform as touch: fingertip disc instead of the
  arrow, `pointerType: 'touch'` on events, NO hover dispatched or mirrored (never
  rely on `data-hovered` inside a touch scope). The `hold` step presses for N ms;
  under the touch persona its `pressure` climbs at a finger's rate (full force at
  900 ms), so the hold's length chooses the depth, and it ends with pointerup, never
  a click. Demos answering pressure wire `pressureHold` from `#src/kit/touch.ts`
  (pass the DemoClock), which turns a real reader's held mouse button into the same
  force signal; the stage likewise draws the reader's own pointer as the disc inside
  a touch scope (the kit hides the native cursor there), so demos never wire cursor
  styles on touch surfaces. The `pinch` step spreads, closes, or turns twin
  contacts about its target (end/start separation exactly its `scale`, rotation
  exactly its `turn` in degrees; `ms` is animation, so reduced motion collapses
  it, unlike `hold`). A gesture-driven demo wires `pinchSpread` from
  `#src/kit/touch.ts`: one (scale, turn) signal for the script's two contacts, a
  real two-finger gesture, and a reader's mouse via Ctrl+drag (a mirrored virtual
  second contact the stage also draws; dragging outward scales, swinging around
  the centre turns); anchor the response at the centre `onStart` reports.
  Trackpad pinch arrives as ctrl+wheel and is the demo's own to wire;
  the script performs it as a `wheel` step inside a `withKey` Control scope.
  Two further two-contact gestures exist: `twoFingerTap` taps the pair with no
  travel (`count` times, and a magic tap is two), and `twoFingerScrub` sweeps it
  sideways and back. Demos wire `twoFingerTap` or `twoFingerScrub` from
  `#src/kit/touch.ts`; a reader taps the pair with Ctrl held and scrubs with a
  Ctrl+drag swept side to side, so the no-travel half of the Ctrl mapping is the
  tap and the travelling half is the pinch, and one element never wires both.
  Both gestures are portrayed as themselves even though assistive technology
  consumes the real ones natively and hands a page nothing: that fact belongs in
  the term's article, never in a costume.
  A `data-gaze` scope is the opposite temperament: events stay exactly a mouse's
  (hover included, looking IS hovering) and only the dress changes — the ghost
  is an eye, activations draw as a closing pinch, and a reader's own pointer
  plays the eyes (no mirror, no hidden cursor). Designed for looking and
  committing; gaze drags and holds are undesigned, so a demo needing them waits.
  Gestures past two contacts do not exist yet; terms needing them wait.
- **Demos have no stylesheet.** A demo is `innerHTML` plus inline styles, so anything
  needing a pseudo-element, a keyframe, a media query, or a state-attribute rule has
  to be a kit class. That is the test for whether something belongs in `src/kit/`:
  paint a demo can state inline stays in the demo (the look is that term's own claim),
  while structure, state, and animation the demo cannot express go in the kit.
- **Scripted animation gates itself.** `motion.css` cannot reach an `element.animate`
  keyframe set, so a demo that animates in script asks `prefersReducedMotion(root)`
  from `#src/kit/motion.ts` and jumps to the end state instead of playing the move.
- **No incidental layout shift**: a specimen changing state must not move the parts
  that did not change (SPEC §5). Reserve the room a revealed element will take,
  measuring it once on mount if that is the only way to know it. When the size change
  is itself the term, contain it: widening a control is fair, growing its row or
  pushing what is below is not. The same discipline sideways (SPEC §5): the stage
  body clips, so nothing visible may leave it; a container holds its content rather
  than spilling or cutting it (unless the viewport or truncation is the design); and
  a single-line control (button, chip, tab) stays one line in every state — size for
  the widest state, not the one on screen while authoring.
- **Subject and context**: every demo marks the element the term names with
  `data-subject`, on the narrowest element that term actually names, and wraps scenery in
  `.sp-context` (accent goes neutral, elevation drops). Narrowest means the
  feature's own extent, not its canvas: a demo that draws or highlights the
  feature marks the traced element, and a feature with no element of its own gets
  one (SPEC §5); identify summons subjects the current state hides. Never add emphasis styling to
  the subject — the stage draws all annotation (pin, identify spotlight) itself.
  A demo whose states include a counter-example the subject itself passes through
  (dark-pattern's fair checkout) declares the honest condition as a selector in
  `data-pose` on the subject (`data-pose="[data-mode=deceptive]"`); identify refuses to
  pose a state that fails it and plays on, or resets to the mount state, which must
  satisfy it. Prefer designing states so the subject never stops being the term;
  `data-pose` is for demos where the dishonest state is pedagogically required.
  Demo instrumentation (a Replay button, a "make it fail" switch) is scenery, never
  subject; an element that exists only so the choreography can aim at a coordinate
  carries a `data-part` and no paint at all (SPEC §5). Marking the top-level wrapper claims the whole scene is the term and
  **withdraws the identify control** (SPEC §5–6), so reach for it only when no
  narrower element is the answer; `e2e/__snapshots__/<slug>-subject.txt` records
  which way each specimen went.
- Term relations are validated for integrity and symmetry in CI; a relation to a
  nonexistent term requires creating that term's stub in the same change. A stub is
  debt with a deadline, not a resting state (SPEC §2.3): it is a published page that
  other articles already link to, so it outranks the unauthored pool and gets cleared
  in a promotion round. Symmetry is exempt while either side is a stub, which means
  promoting one activates every symmetric edge pointing at it: the promoted file has to
  declare them all back in the same change. `contrastWith`
  answers a discrimination test (SPEC §2.3): an edge earns its place when someone
  describing one term could reach for the other term's word, not when the two merely
  look alike. Hubs stay at eight contrasts at most, or the Which word? table drowns.
- **Tags are a closed enum, and they arrive complete** (SPEC §2.5). `bun validate` holds
  every facet to 8+ members spanning 2+ categories, and every term to at most 4 tags.
  A facet applied to 80% of its family is worse than no facet, so tagging a few terms
  mid-round is not a partial contribution, it is a regression: grow the facet in one
  pass over the whole family or leave it alone. Where the family name is itself
  vocabulary (dark pattern, microinteraction) there is no tag: the head term's members
  declare `variantOf` and its page derives the family.
- **A family groups like a facet and reads like a term** (SPEC §2.5). Storing it in
  relations rather than in a tag is invisible to a reader, so a family behaves like a
  facet anyway: the head term's page carries the listing (grouped `Variants` and
  `Contains`, which then leave the Related rail), `/tags/{head-term}` redirects there,
  and a member shows the family as a chip beside its facets. All of it is derived from
  the members' own `variantOf`/`partOf` by `familyOf`/`memberOf` in `src/lib/tags.ts`,
  so joining a family is an authoring decision and costs none of the four tags. A family
  of 8 or more must be registered in `HEAD_TERMS`, which `bun validate` enforces: that is
  the facet floor read from the other side, and the list would go stale silently without
  it. Prose links the term (`/dark-pattern`), never the redirect.
- **Two isolation modes, one shape.** `src/stage/surface.ts` is the only file that knows
  whether a specimen lives in a shadow root or in a document of its own; everything
  above it reads `Surface`. `demo: iframe` generates `/specimen/<slug>/`, which imports
  the demo *inside* the frame so kit custom elements register in the registry that
  document can see. It is the expensive mode, not the safe one: reach for it only when
  the term's subject genuinely is document scope (`document.startViewTransition`, the
  page's own focus order, the document scroller), and never merely to get more room.
  Two things are drawn across the boundary and both go through `Surface.offset()`: the
  identify ring and the ghost cursor. Anything else new that measures a specimen from
  the page has to do the same.

## Key Conventions

- **Runtime**: Bun. **Language**: TypeScript (strict, ESNext, `nodenext` modules).
- **Formatting**: Biome — 2-space indent, single quotes, 140 char line width, LF.
- **Imports**: use `.ts` extensions in source imports (`verbatimModuleSyntax` is on).
  Internal modules use the `#*` subpath alias (e.g. `import { env } from '#src/env.ts'`).
- **Zod**: always `import * as z from 'zod/v4'` — never bare `zod` or `zod/v3`. Enforced by Biome.
- **Editorial**: never use em-dashes in site content, UI copy, or docs prose. Use a
  comma, colon, period, or parentheses instead (SPEC §2.4; `bun validate` enforces it
  for term content). A site named in article prose is a markdown link to that site
  (`[easings.net](https://easings.net)`), never a bare domain; `bun validate` rejects
  bare domains and raw URLs in prose.

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

None. This is a deployed site, not a published package: no release tooling. `main` deploys
to GitHub Pages at the apex `vocab.design`.

Two deploy paths exist and only one costs Actions minutes.
`.github/workflows/deploy-pages.yml` is the normal one, on every push to `main`.
`bun run deploy` is the fallback: it builds locally and force-pushes `dist/` as a single
orphan commit to `gh-pages`, which GitHub's own Pages build picks up. That build keeps
working when your workflows cannot (it is not billed against the repository's Actions
budget), which is why it exists.

**Gotcha**: the branch flow needs `.nojekyll` at the root or Jekyll drops every path
starting with an underscore, which is all of `_astro/`. The site deploys and every
stylesheet and script 404s. `bun run deploy` writes it; a hand-made branch must too.

**Gotcha**: pointing the Pages source at a branch does not build anything. Only a PUSH to
that branch does, so switching the source and then waiting looks exactly like a broken
deploy. `gh api /repos/gkurt/vocab.design/pages` shows which source is live; switching back
to the workflow is `-f build_type=workflow`.

**Gotcha**: `dist/CNAME` (from `public/CNAME`) is what keeps the custom domain across a
branch deploy. `bun run deploy` refuses to publish without it.
