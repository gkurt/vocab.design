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
bun run og         # Share images: shoot every specimen missing one (SPEC §10)
bun run icons      # Rasters favicon.ico + apple-touch-icon.png from public/favicon.svg
bun run lint       # Lint
bun run format     # Format
bun run fix        # Lint + format + autofix
bun run checks     # Everything: check + typecheck + test + validate + test:e2e
```

**Nothing runs the e2e suite automatically. Do not run it unless asked.** A full pass is
roughly 45 minutes over 1,076 specimens, which is the whole GitHub Actions budget on a
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
src/lib/tags.ts             # facets(): tag blurbs, CHIP_FLOOR, the three facets that are also terms
src/lib/categories.ts       # one blurb per category, for the browse pages
src/lib/glossary.ts         # the A-Z entry list: every term AND every alias, sliced by letter
src/lib/exhibit.ts          # the front page's carousel: its pool, and the dozen this build shows
src/lib/slug.ts             # slugify for terms and aliases
src/content/terms/          # One MDX file per term, frontmatter per schema
src/content/demos/<slug>/   # demo.ts (mount fn) + choreography.ts per term
src/kit/kit.ts              # Specimen kit stylesheet, assembled and adopted into shadow roots
src/kit/*.css               # tokens · layout · controls · surfaces · motion (--sp-* only)
src/kit/icons.ts            # Shared inline SVG icon set
src/kit/motion.ts           # prefersReducedMotion(): the gate a scripted animation asks itself
src/kit/measure.ts          # localBox/localSize/localPoint: geometry in the specimen's own px
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
src/stage/highlight.ts      #   the share still's annotation: subject at full strength, rest faded
src/styles/                 # Chrome: global.css (--vd-* tokens, Tailwind theme), stage.css
src/pages/                  # index (ONE live specimen, then THE directory: categories, facets, A-Z), [slug]
                            #   (terms + alias redirects), [slug].md, terms.json, llms.txt
src/pages/rss.xml.ts        #   the feed: newest 100 by `created`, linked from every page's head
src/pages/specimens/[page].json.ts # what the front page's carousel pulls once a reader stays
src/pages/tags/             #   /tags/[tag], one page per cross-cutting facet (no directory index)
src/pages/browse/           #   /browse/[category] (with definitions); the front page is the directory
src/pages/browse.astro      #   /browse itself: a redirect to the front page, not an index
src/pages/tags.astro        #   /tags likewise; the front page lists the broad facets
src/pages/random.astro      #   /random: picks a slug in the browser and replaces itself
src/pages/glossary/         #   /glossary (letter index) + /glossary/[letter] (terms and aliases)
src/pages/search.astro      #   /search: the search as a page (Pagefind, built post-Astro)
src/components/Carousel.astro #  the front page's row of specimens: markup, shuffled during parse
src/components/TermCards.astro #  the listing card: a scaled live preview, headword, definition
src/components/previews.ts  #   which cards mount a specimen, and which single one plays
src/components/card-morph.ts #  a card's surface, headword, definition and picture become
                            #   the page's; every name carries the term's slug
src/components/carousel.ts  #   the front page's rotation: one card centred, the row going round
src/components/preview-stage.ts # the stage a card shows: scaled, no controls, one badge
src/components/SearchPanel.astro # the search itself, rendered as the page or in the modal
src/components/SearchDialog.astro #  the modal in the chrome: <vd-search-dialog> + <dialog>
src/components/SearchDialog.ts #   opens it, and lazy-loads the search on the first open
src/components/SiteSearch.ts #  <vd-search>: fetches dist/pagefind/ at runtime, never at build time
src/components/Analytics.astro #  the GA4 loader: nothing at all without PUBLIC_GA_ID
src/components/analytics.ts #   chrome wiring: relation clicks, the alias handoff, swapped page views
src/lib/track.ts            #   track()/pageView(): the one way anything talks to analytics
src/lib/on-page.ts          #   per-page wiring: a module body runs once, a page does not
src/lib/page-type.ts        #   what kind of page a path is (terms live at the root)
src/lib/search-signals.ts   #   what "found the right thing" means, and its tests
src/lib/nearest.ts          #   the nearest spelling to what was typed: 404 and search share it
src/integrations/           # pagefind-dev: serves dist/pagefind/ under `astro dev` (dev only)
src/pages/specimen/[slug]   #   the iframe document: one per iframe term, unlinked, out of the sitemap
src/pages/capture/[slug]    #   the share image's set: the stage at 800x420, posed, no controls
src/pages/capture/site-card #   the one fallback card, for every page with no specimen
public/og/                  #   committed: 1,076 share images plus site.png, shot by `bun run og`
public/favicon.svg          # the icon, and the source the other two are rastered from
scripts/icons.ts            # `bun run icons`: favicon.ico (16+32) + apple-touch-icon.png
scripts/validate-terms.ts   # Content gates run by `bun validate`
scripts/og-images.ts        # `bun run og`: shoots the capture pages into public/og/*.png
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

Both carry two filters, category and facet, each defaulting to All and each rendered from
its closed enum rather than from Pagefind's `filters()`. A filter with an empty box is a
listing of that facet, which is what replaced the deleted `/browse` and `/tags` indexes.
`/browse` and `/tags` still resolve, as redirects to the front page (Google ranks
`/browse`), and both are kept out of the sitemap by `REDIRECTS` in `src/lib/routes.ts`,
along with `/random`, which names a different term on every visit.
The index side is two attributes on the term page: `data-pagefind-filter` for the category
on the article, and one per facet on the chip that already names it, since an explicit
value ignores the element's own text and repeated keys aggregate into a list.

**Gotcha**: `dialog[data-search-dialog]` must state its `display` under `[open]`. A closed
`<dialog>` is `display: none` by UA default, and an unconditional `display: flex` beats
that, which renders the whole search panel inline at the foot of every page in the chrome.

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

## Share images

Every term page's `og:image` is its own specimen, photographed in the pose identify holds
(SPEC §10). `/capture/{slug}` is the set: the same `<vd-stage>` in capture mode, laid out
at 800x420 with a caption band, posing on mount and fading the canvas around the subject
instead of ringing and pinning it. `bun run og` shoots those pages at a device scale of
1.5 into `public/og/{slug}.png`, which the build copies through untouched.

```bash
bun run og                     # every specimen with no image yet, plus the site card
bun run og --build             # build first (needed after any source change), then shoot
bun run og toast dark-mode     # just these, always re-shot
bun run og --force             # the whole set: 1,077 images, about 40 seconds
```

The images are COMMITTED (86MB over 1,077 files) and nothing gates them. That is the
deliberate trade for a set this size costing no CI minutes, and it puts two obligations on
whoever edits a demo:

- **A new specimen needs a shot**, in the same change. A term page names `/og/{slug}.png`
  whether or not the file is there, so an unshot term ships a broken link preview.
- **An edited demo needs a re-shot**, in the same change (`bun run og --build <slug>`).
  No check will ever tell you the picture is of last week's demo.

The pose comes from the stage rather than from the script: capture mode calls the same
`enterPose` identify does, so a share image cannot summon its subject differently from the
site. What differs is only the annotation (`src/stage/highlight.ts`).

**Gotcha**: the shooting needs a BUILT site (`dist/capture/*.html`), because the script
serves `dist/` itself rather than driving `astro preview`: Astro's preview lock is global
and a stranded server breaks every later gate (see the e2e note above). `--build` runs the
build for you; without it you are photographing whatever was built last, which after an
edit is the old demo.

**Gotcha**: reduced motion is emulated, exactly as the identify stills do it, so the
shutter always falls on the same moment. A demo that animates in script therefore
photographs in its END state. If a still looks like it skipped the demonstration, that is
why, and the fix is the demo's reduced-motion path, not the camera.

**Gotcha**: a demo whose content overflows the stage body is clipped in its picture too,
because the capture frame is 344px tall against the term page's 320px and no taller. The
still is not lying; go and look at the term page.

**Gotcha**: JPEG is not smaller here (measured: q88 came out level with PNG or larger).
The dotted stage ground and the fade's gradients are exactly what JPEG spends bits on, so
PNG stays.

**The icon set** is the same shape of asset and the same trade. `public/favicon.svg` is
the drawing; `bun run icons` rasters `favicon.ico` (16 and 32, PNG-in-ICO) and
`apple-touch-icon.png` (180, opaque, since iOS masks it and transparent corners under
that mask are a gamble). Edit the SVG and re-run it; nothing checks that the three agree.
The Apple icon is the only one deliberately drawn over an opaque ground.

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

Header links carry `data-nav` and report as `nav_click` through `to`, the parameter the
relation events already use, so counting a new link needs no new custom dimension in GA.
Two are deliberately unmarked: Search reports itself as `search_open`, and the wordmark
only ever means "go home". `/random` is the one link whose click IS the only record of it,
since the page replaces itself before any tag could load.

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

A search that did not find the words typed is retried before it is reported: as a
misspelling, and then with its vaguest words dropped (SPEC §3). The spellings come from
`/paths.json` and the matching from `src/lib/nearest.ts`, the same pair the 404 page uses
to answer `/skeumorphism`, and the dictionary is fetched only for a search that matched
something other than what was typed, never on load. Misspellings are never content: there
is no frontmatter field for them, because typos are unbounded and the vocabulary is not.
A typo that recurs in the analytics (`search_corrected`) earns a real alias, which is a
different thing with its own page.

**Gotcha**: Pagefind's result count does not tell you whether a search found anything a
reader asked for. The last word of a query is matched loosely, so `tost` returns 1,060
results (it matched `to`) and `accordian` returns four (it matched `according`): a typo
looks exactly like a success. The only readable evidence of what matched is the `<mark>`
in the excerpt, which is what `matchedTyping` in `src/lib/search-signals.ts` reads. Any
future feature that needs to know whether the corpus contains a word has to ask the same
way, and has to keep the same exemption: a marked word that merely starts with what was
typed is a reader mid-word, not a slip.

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

**Gotcha**: a script that reaches into the document must be wired PER PAGE, not per
import. The router swaps documents inside one realm, so a module body runs once for the
whole visit: re-inserting `<script type="module" src>` does not re-run a module the
browser's module map already holds. A `document.querySelector` at module scope is
therefore the FIRST page's element for the rest of the session, its listeners answer for
a tree nobody can see, and the page the reader is looking at has nothing wired to it.

Use `onPage()` from `#src/lib/on-page.ts`: read the DOM inside the callback, and register
everything against the `AbortSignal` it hands you (`addEventListener(..., { signal })`,
and `signal.addEventListener('abort', ...)` for observers, timers and in-flight fetches).
Its first run is synchronous, so first-load timing is exactly what it was before the
router existed; later runs are on `astro:page-load`, and the teardown is on
`astro:before-swap`.

Two exemptions, and they are narrow. A module whose body only calls
`customElements.define` is realm-level and correct as it is: the new document's elements
upgrade on insertion, which is why `specimen-stage.ts` needed no change at all. And a
custom element wires in `connectedCallback` rather than through `onPage`, but if it
listens on `document` or `window`, it MUST give that up in `disconnectedCallback`, or
every navigation leaves another handler behind reaching for a detached tree
(`SearchDialog.ts` is the worked example).

Nothing tests any of this. The e2e suite drives `page.goto`, which is a fresh document
every time, so a module that only works on the first page of a visit passes every gate we
have. The check is by hand: click from page to page and watch whether the thing still
answers.

**Gotcha**: the router listens for clicks on `document`, so anything else that wants to
intercept a link click has to get there first. Its script is in the head and a component's
is in the body, so in the bubble phase the router ALWAYS wins: it calls `preventDefault`
and swaps, and a handler that guards on `event.defaultPrevented` (as it should) then does
nothing at all. A listener on `document` therefore has to CAPTURE (`SearchDialog.ts`, or
the header's Search link opens /search as a page instead of the modal). A listener on an
element inside the document is already fine, because bubbling reaches it first: the
carousel's neighbour click prevents default on the track and the router stands down, which
is why clicking an edge card still slides the row rather than leaving the page.

**Gotcha**: scripts are re-run by TEXT, not by position. The router marks a script it has
already executed and skips it, keyed on `src` for an external one and on the source text
for an inline one. So an `is:inline` script with the same text on every page runs once for
the visit (the theme script relies on this, and re-applies itself from an
`astro:after-swap` listener instead), and one that has to run again on every visit to its
page needs `data-astro-rerun` (the carousel's shuffle). A script whose text merely happens
to VARY per page runs again on some navigations and not others, which is why nothing
per-page is baked into the analytics bootstrap any more.

**Gotcha**: `astro:after-swap` and `astro:page-load` are not interchangeable. After-swap
runs inside the transition's own DOM update, BEFORE the new page is captured for the
animation, so anything that would otherwise flash (the theme on the root element) has to
happen there. Page-load runs after the swap, after the new document's inline scripts, and
after the transition's first frame, which is where DOM wiring belongs. The root element's
attributes are wiped and re-applied from the incoming document by every swap, so anything
a script put there is lost unless it is re-stated in after-swap.

**Gotcha**: during a swap there is something behind everything. An element that looked
opaque only because nothing was ever under it is transparent at the one moment it matters:
the outgoing page is still being painted while the incoming one is at the top of its scroll.
The header had exactly this defect (its paper ground was conditional on `[data-stuck]`, and
a whole table of the previous page's type came through it), so the ground is now
unconditional. Any fixed or sticky chrome added later has to paint its own ground, and a
reader who reports "things appear over the header" is reporting this, not a z-index.

**Gotcha**: a z-index at rest means nothing during a transition. Transition groups are
painted in the order their names were first seen, so a named element further down the
document paints OVER the header however the two are stacked normally. The header states its
place in the transition tree itself (`::view-transition-group(chrome-header) { z-index: 2 }`
in `global.css`); anything else named that travels across the header has to be checked
against it.

**Gotcha**: a crossfade between two OPAQUE boxes is translucent in the middle. Each side is
at half strength, so half of whatever is behind them both shows through, which on a card
opening into a page means the outgoing listing flickering past under the card's own ground.
`mix-blend-mode: plus-lighter` on both sides adds them instead of stacking them. It is only
correct where both sides really are opaque, so it is opted into with `view-transition-class`
(`.vd-card`, `.vd-preview`, `.vd-solid`) rather than applied to everything: the names
themselves carry the term's slug and cannot be written down in a stylesheet.

**Gotcha**: a percentage in a `translate` is a share of THE ELEMENT BEING MOVED, not of what
it moves inside. The carousel's base offset is a share of the window, so it is `left` on a
relatively positioned track with the transform left for the slide (`stage.css`). The same
trap eats `--vd-carousel-card: min(360px, 100%)` if the track ever stops being exactly as
wide as its window: two hundred percents that look alike would stop being the same number.

**Gotcha**: `history.replaceState(null, ...)` breaks the Back button. The router keeps its
own bookkeeping in `history.state` (which entry this is, and its scroll position) and
returns early on a popstate with a null state, so the address bar goes back and the page
does not. Pass `history.state` through when rewriting the URL, as `SiteSearch.ts` does.

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
- **Navigation is client-side** (`<ClientRouter />` in `Base.astro`, SPEC §3), so ONE
  document lives for the whole visit and a module body runs ONCE. See the gotcha below
  before writing any script: this is the single most expensive assumption the codebase
  changed, and nothing in CI catches a violation of it.
- **Two design systems, deliberately walled off**: chrome tokens (`--vd-*`) vs specimen
  kit tokens (`--sp-*`). Demos compose kit primitives only — never chrome styles, never
  third-party component libraries. The wall has one hole that is not about tokens at all:
  an INHERITED css property set on the chrome's root reaches every specimen, because
  inheritance crosses a shadow boundary. `scrollbar-color` is the case in hand, reset on
  `[data-stage-canvas]` (`stage.css`) so a specimen's scroller is not painted in the page's
  palette. Anything else inherited and visible (`accent-color`, `color-scheme`,
  `caret-color`) has to be walled off the same way before it is set on the chrome.
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
- **A comparison switch says what it switches and which side is the term** (SPEC §5.1).
  An `<sp-segmented>` that swaps what the scene shows carries `data-axis` (what the
  control changes, drawn as a legend in the pill and used as the tablist's accessible
  name) and, when one state is the term and the other is the foil it is shown against,
  `data-term` (that state's segment value, which gets a quiet dot). `bun validate`
  refuses a `data-term` with no axis, one naming no real segment, and one contradicting
  the `data-pose` the stage already reads. Order is always baseline then change, which
  puts the term first for a defect and second for a feature, so position never carries
  the meaning. The deceptive-pattern family (anything `variantOf: [dark-pattern]`) spells
  its pair `As shipped | Made fair` and nothing else; the specific claim goes in the
  verdict line beside the switch. A variant switch (light/dark) or a parameter switch
  (300px/440px) takes an axis and no term, since neither side is the word.
- **Demos have no stylesheet.** A demo is `innerHTML` plus inline styles, so anything
  needing a pseudo-element, a keyframe, a media query, or a state-attribute rule has
  to be a kit class. That is the test for whether something belongs in `src/kit/`:
  paint a demo can state inline stays in the demo (the look is that term's own claim),
  while structure, state, and animation the demo cannot express go in the kit.
- **A demo measures in the specimen's own pixels** (SPEC §5). A specimen is shown at
  less than its authored size in two places: a listing card at half size, and a term page
  whose column is narrower than the authored 720 (a phone), where `<vd-stage>` measures
  the column and scales the whole box. Inside a scaled subtree a client rect is in the
  page's pixels while a written length is in the specimen's. So a demo that measures uses
  `localBox`/`localSize`/`localPoint` from `#src/kit/measure.ts` instead of subtracting
  two `getBoundingClientRect()` calls; `offsetWidth`/`offsetLeft` already are specimen
  pixels, and a ratio of an element against itself is scale-free. The tell is invisible
  at a desktop width and plain on a phone: an indicator at half the offset, a menu at half
  the pointer's distance, a readout printing half the px. The subtler half of the rule is
  the OTHER operand: a length the demo declares (a fold at 178px, a trigger 24px into a
  pane, a detent at 40px) is in specimen pixels, so comparing it against a client rect
  mixes the two spaces and the threshold silently moves. Measure the box, not the page.
  A DRAG is the case that bites,
  because a phone is the one scaled stage a reader really operates: `event.clientX` minus
  a remembered `clientX` is a page distance, and writing it back as a translate moves the
  thing at a fraction of the finger's speed (`src/content/demos/detent/demo.ts` reads the
  pointer through `localPoint` for exactly this reason).
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
- **"Tag" is the reader's word, "facet" is ours** (SPEC §2.5). Every user-visible string
  says tag, matching the URL, the frontmatter field and the Pagefind filter key. `facet`
  is the internal name for the enriched object `facets()` returns (a tag plus its label,
  blurb and members). Do not put it back on a page.
- **Tags are a closed enum, but the enum is collision control rather than curation**
  (SPEC §2.5). Parallel authors with no shared feedback loop invent `mobile`,
  `mobile-first` and `small-screen` for one concern in a single round; the enum is what
  makes the second author reach for the first one's word. Adding to it is an ordinary
  authoring move: name the tag in `src/lib/schema.ts`, write its blurb in
  `src/lib/tags.ts`, tag the terms. `bun validate` holds a tag to 3 members and no more:
  no per-term cap, no cross-category requirement (the flagship facets are
  single-category), and the old floor of 8 now governs only whether the FRONT PAGE
  advertises the tag as a chip (`CHIP_FLOOR`), not whether it may exist.
- **Growing the tag set is a corpus pass, never a per-term one** (SPEC §2.5). A tag
  invented while authoring one term is a tag chosen without knowing who else wants it,
  which is how 604 of 1,124 terms ended up with no `tags` key at all under the old gates.
  An authoring round tags from the enum as it stands; changing the enum is its own pass
  over the whole vocabulary.
- **Three facets are also terms** (SPEC §2.5): `dark-pattern`, `microinteraction`,
  `responsive-web-design`, listed in `TERM_TAGS` in `src/lib/tags.ts`. Membership is
  DERIVED from the members' own `variantOf`/`partOf` and never declared, so `bun validate`
  rejects a term carrying one in frontmatter; a member joins by authoring the relation.
  `/tags/{tag}` groups them by category and bridges to the term; the term's page groups the
  same members by relation (`Variants`, `Contains`), which then leave its Related rail. The
  membership floor is waived for these, because a name that is a defined term is the
  concept rather than a filing convenience (dark pattern's 17 members are all `pattern`).
  Two gates replace it: a term-named facet must collect members, and a family of 8 or more
  must BE one, which is the display floor read from the other side and the reason the enum
  cannot go stale as authoring rounds add members. Contrast is not membership, which is why
  skeuomorphism is not one of the three.
- **Liveness in the listings** (SPEC §3). The front page carries a CAROUSEL: a dozen
  specimens at half size, one centred and playing, the row moving over by one card at each
  pass boundary and the card that left going round to the back, so it never ends. Its
  dozen come from the terms flagged `exhibit: true` when any are flagged and from the
  vocabulary itself when none are, taken at a stride (an alphabetical slice is twelve terms
  starting with the same two letters) and shuffled during parse by an inline script. The
  neighbours are faded and the row dissolves at the column's edges; clicking one of them
  centres it (either way round) rather than following its link, which stays the browser's
  for a modified or middle click. Past four specimens the row FETCHES more, a page of
  `/specimens/{n}.json` (60 terms, ~5KB gzipped, 18 pages dealt rather than cut), and
  re-letters the cards that have had their turn while they are off screen. The page itself
  ships only its dozen, so a reader who leaves early fetches nothing.
  `/browse/{category}` and `/tags/{tag}` render cards whose preview is the real specimen,
  scaled from its authored 720x320 box, mounted only near the viewport (eight at most).
  All of it obeys the one rule the scheduler already had: exactly one specimen animates per
  page. `exhibit` is curation, set by hand after watching the demonstration; `bun validate`
  only refuses it on a term with no demo or an unfinished article, and it is the one
  frontmatter field `terms.json` withholds.
  A listing does not command the scheduler, it decides which stages ASK: `data-hold` on a
  stage means mounted and standing still, and moving it is how one card is granted the
  page. A stage removed from the document tears down and gives back its claim, which is
  what stops a scrolling list from stranding the stage on a discarded player.
  Which card holds it is a ROTATION in document order over the cards at least three
  quarters on screen (SPEC §3): the stage moves on at a pass boundary, once the specimen
  has had four seconds, so a short script loops rather than flickering past and a long one
  is never cut off. Scrolling a quarter of the playing card away moves it on immediately
  instead, but only ever to another card: with nothing else qualifying, the one holding
  the stage keeps it. The boundary arrives as a `vd-pass` event on the stage, which is the player's
  `onPass` host hook; a specimen that never reaches one (no script, a chunk still loading)
  is moved on by the same four-second watchdog. A pointer or focus on a card outranks the
  rotation and pins it there, and the rotation resumes FROM that card. Reduced motion does
  not rotate at all, since nothing plays and the churn would be pure remounting.
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
