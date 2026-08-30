# vocab.design — Specification

A linked visual dictionary of design and UI vocabulary: every term defined, demonstrated
live, connected to its aliases and neighbors, and phrased so that both people and AI
agents can use it.

**Thesis.** Working with AI agents is mostly about knowing the vocabulary and using it
correctly. People who can say "segmented control" get one in one prompt; people who say
"those connected buttons where one is selected" iterate five times. The site closes that
gap — exhaustively, not selectively.

**Strategy.** Exhaustive coverage (500–1,000 terms across components, layouts, patterns,
interactions, motion, typography, color, surfaces, aesthetics, accessibility) and superior
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
created: 2026-08-21              # first published; the feed orders by this
modified: 2026-08-21             # content last changed; the sitemap's lastmod
definition: >-                   # the dictionary line, ≤ 200 chars, one sentence
  A short, self-dismissing message that appears at the edge of the screen to
  confirm an action or report a status.
aliases:
  - name: snackbar
    source: material             # optional: which vocabulary uses this name
tags: [messaging]                # cross-cutting facets, closed enum, see §2.5
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
exhibit: true                    # optional: cleared for the front page's carousel (§3)
useWhen: >-                      # the situation this word is for; powers "Which word?"
  a passing confirmation that cleans up after itself
```

### 2.2 Categories

`component` · `layout` · `pattern` · `interaction` · `motion` · `typography` · `color`
· `surface` · `aesthetic` · `accessibility`. One category per term: a term is one kind of
thing. Cross-cutting membership is expressed through relations and tags (§2.5), never
through a second category.

Three of them describe how a thing looks rather than what it is, so the line between
them is worth stating outright, because a term that could be filed in any of the three
will be filed in a different one by every author who meets it:

- **`color`** answers *which colour it is*: hues, palettes, roles, contrast, schemes.
- **`surface`** answers *what its edges, depth and finish look like*: the radius, the
  bevel, the shadow, the grain, the gloss. A value you set.
- **`aesthetic`** answers *which named look it is citing*: a period, a movement, a
  scene, with a set of moves that come with the name. A look you cite, not a value you
  set.

`surface` was carved out of `aesthetic` on 2026-08-26, because the property half of that
category was never a named style with a period and had nowhere else to go. `color` and
`typography` had always been property categories, so the two axes with enough property
terms already had homes and the shape-and-finish axis did not: its terms were being
filed by whichever facet was most salient to the author that day, which split families
across categories (`corner-radius` in `aesthetic` against `concentric-corner-radius` in
`layout`). A family may still straddle the color/surface line honestly: `elevation` is
depth and `surface-tint` is the colour a raised plane takes, so they are two kinds of
thing that relations join, not one kind split in half.

Both dates are authored, not derived. Reading them off git mtimes would look
self-maintaining and then lie: a rename, a reformat, or a squashed history rewrites
mtimes without a word of the entry changing, and the sitemap would ask for a recrawl of
a thousand pages that say exactly what they said before. So `modified` is bumped by
whoever changed the content, and `bun validate` holds it at or after `created`. A stub
carries dates like anything else: the day it was published as a stub is the day it
entered the dictionary.

### 2.3 Relations and the stub policy

Relations reference slugs. CI fails if a referenced slug has no file. The escape valve
is **stubs**: a stub entry has only `name`, `slug`, `category`, `definition`, and
`status: stub`. Stubs render as real pages (definition + "entry in progress"), so
internal links never 404 and every named concept is searchable from day one. Writing a
relation to a term that doesn't exist yet means creating its stub in the same change.

A stub is debt, not a resting state, and it outranks the unauthored pool: by the time
anyone looks, six to nine published articles are already linking to it on the strength
of a definition with no article behind it. `bun validate` prints the count on every run
and the roster tool lists them as their own work item, because the site's first 24 stubs
survived 21 authoring rounds by being invisible to both: none had a record in the
candidate pool, and the roster filtered by filename, so a stub read as already authored.
Clear them in a promotion round before authoring new terms.

Prose links are held to the same promise. `bun validate` rejects a markdown link to an
internal path that is neither a term slug, an alias slug (which redirects), a tag facet,
nor one of the site's own routes. Prose links and `relations` are the two ways a reader
crosses the graph, and only one of them is schema-checked: a prose link is plain markdown,
so a typo builds clean and ships a 404 unless the gate catches it.

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

### 2.5 Tags (cross-cutting facets)

**Naming.** The reader-facing word is **tag**, everywhere on the site: "By tag" on the
front page, "All tags" in the search filter, `tag` in the eyebrow above `/tags/{tag}`.
It matches the URL, the frontmatter field and the Pagefind filter key, all of which said
`tag` all along, so the site no longer carries two words for one thing. **Facet** survives
as the INTERNAL name only, for the enriched object `facets()` returns (a tag plus its
label, blurb and members) and in this document, where the distinction from a category is
the thing being described. Never reintroduce it into a page, a component, or any
user-visible string.

`tags` is a closed enum in `src/lib/schema.ts` beside `CATEGORIES`, with one blurb per
tag in `src/lib/tags.ts`. A category answers *what kind of thing is this*, and a term
has exactly one; a facet answers *what concern does this serve*, and a term may have
several. Every facet has a page of its own at `/tags/{tag}` and is a filter on the search;
the front page lists the broad ones (§3, and the display floor below).

The enum is COLLISION CONTROL, not curation. Terms are authored by parallel agents with no
shared feedback loop, and freeform tagging gets `mobile`, `mobile-first`, `small-screen`
and `touch-first` invented for one concern inside a single round. What the enum buys is
that a second author reaches for the name the first one used. Adding to it is therefore an
ordinary authoring move rather than a schema ceremony: name the tag, write its blurb, tag
the terms that belong to it.

The front page carries the categories in the same breath, because they are the grouping a
reader looking for a facet will reach for first: a category is a filing decision rather
than a concern that cuts across, and seeing both lists side by side is what says so.

One rule gates existence, and it is low: **a facet collects at least three terms**, or it
is a note rather than a grouping. Stubs carry no tags at all (§2.3). Nothing caps how many
tags a term wears, and no rule asks a facet to span categories.

Both of those were rules once, and both were mistakes worth recording. The 4-tag cap never
bound: at its deletion the corpus had four terms wearing three tags and none wearing four.
The cross-category rule was worse than inert. It was meant to stop a subcategory posing as
a concern, but the facets that matter most are single-category (every dark pattern is a
`pattern`, every responsive layout pattern a `layout`), so its most important instances
were exemptions, and a rule whose flagship case needs an exemption is misspecified.

The floor of 8 did the real damage, together with the category rule. For an agent authoring
one term, reaching for an existing tag was cheap and coining a new one meant finding eight
members across two categories in the same pass, which is a whole-corpus job inside a
per-term job. So "no tag" became the cheapest rule-abiding move and won by default: 604 of
1,124 terms, published ones, carried no `tags` key at all. The gates did not produce a
curated taxonomy, they produced a mostly untagged corpus.

**The display floor.** A tag needs `CHIP_FLOOR` members (8, the old membership floor kept
at the one place it was ever doing work) before the front page advertises it as a chip.
Below it a tag still exists, still has its page, still filters the search and is still
reached from every term that wears it. Splitting existence from display is what lets the
membership floor sit at three without the front page becoming eighty chips reading "3".
A term-named facet is exempt and is always named, because a reader looking up
`responsive web design` is looking up a term and the front page is where terms are listed.

**Tagging is a corpus pass, not a per-term decision.** The tag set is decided against the
whole vocabulary at once and then applied, for the same convergence reason the enum exists:
a tag invented while authoring one term is a tag chosen without knowing who else wants it.
A round that adds terms tags them from the enum as it stands; growing the enum is its own
pass over everything.

**Term-named facets.** Three facets are also terms, with a definition, an article and a
specimen of their own: `dark-pattern`, `microinteraction`, `responsive-web-design`.
`TERM_TAGS` in `src/lib/tags.ts` is the list. A reader hunting the facet list for "dark
pattern" has no way to know whether the site filed the deceptive patterns as a tag or as
a relation, and should not have to: it is both. What makes this affordable rather than
duplicative is that only ONE of the two halves is stored.

- **Membership is derived, never declared.** A term is in a term-named facet when its own
  `variantOf` or `partOf` names it (`FAMILY_EDGES`): its kinds, and the parts of one. So
  the fact is recorded once, joining is an authoring decision rather than a tagging one,
  and the two records cannot drift.
  `bun validate` rejects a term that declares one in frontmatter.
- **Both pages carry the members, grouped differently.** `/tags/{tag}` groups by
  category, like any facet, and carries a bridge to the term ("also a term", with the
  definition and specimen on its page). The term's own page groups the same members by
  the relation that joins them, `Variants` and `Contains`, which is the one cut the facet
  page cannot show. Those two groups then leave its Related rail, since a page stating
  the same edges twice is real duplication where two orderings of a list are not. The
  listing is out of the search index for the reason Related is: seventeen member names on
  one page would make it compete for each of them.
- **A member wears the facet as a chip**, in the line carrying its category and its
  declared tags, linking to `/tags/{tag}`. It reads as its word (`dark pattern`) rather
  than as a slug, which is the whole of the visible difference from an ordinary facet.

**The membership floor does not apply to a term-named facet**, and this is the point of
the distinction rather than an exception to it: a name that is itself a defined term is the
concept, not a filing convenience, and its members are counted from relations nobody edits
for tagging's sake.

Two rules replace it, and `bun validate` enforces both. A term-named facet must
actually collect members, so the list cannot slide into being signage for words a reader
might mistake for a facet. And **a family of 8 or more must BE a term-named facet**,
which is the display floor read from the other side: a grouping that size would be
advertised on the front page if it were a tag, so it has to be one. That gate matters because a family grows when an
authoring round adds a member and never when someone edits the enum.

Contrast is not membership, which is why skeuomorphism is not one of the three: every one
of its neighbours contrasts with it rather than being a kind of it, so its page
discriminates in the Which word? table instead of listing, and a facet that collects
nothing is not a facet.

A facet may stand in for a term that does not exist yet (`gamification`,
`perceived-performance`), which is a debt rather than a design: when the term is authored,
its members move to `variantOf` and the tag becomes term-named in the same change.

**The accessibility filing rule.** Accessibility is the one topical category among
kind-categories, kept deliberately. A term that exists BECAUSE of accessibility files
under `accessibility`; a term that merely affects it files under its kind and carries
the `a11y` tag. The tag therefore collects the ones that would otherwise be missed,
not the category's own members.

## 3. Site architecture

- **Astro 6** static site, content collections over `src/content/terms/`.
- **Tailwind CSS v4** for chrome styling; specimen kit uses its own plain CSS (§5).
- **Zero JS by default.** Interactivity ships as custom elements, progressively
  enhanced; no framework runtime on term pages. The chrome's own budget is two small
  scripts on every page (the theme toggle plus the header's stuck flag, and the search
  modal's opener), and the search itself loads on the first open.
- **Client-side navigation**, over the platform's own view transitions (see below).
- **Bun** for tooling, `bun test` for unit tests, **Playwright** (`e2e/`) for
  choreography execution and smoke tests.
- **Search**: Pagefind at build time.
- **Deploy**: GitHub Pages at the apex `vocab.design` (registered at Vercel, four A records
  to GitHub's Pages IPs, `public/CNAME` carrying the domain in the artifact). Two paths:
  the Actions workflow on every push to `main`, and `bun run deploy`, which publishes a
  local build through the `gh-pages` branch and keeps working when the Actions budget does
  not.

### URL scheme

Every page has exactly one spelling and it carries no trailing slash. That costs a build
setting (`build.format: 'file'`, so `/toast` is a real 200 rather than a redirect to
`/toast/`) and it buys one URL per document across the canonical tag, the sitemap, the
JSON-LD, the search results and the analytics. The root is the one place two spellings
survive, and they are the same URL by definition: the home page's canonical is
`https://vocab.design/`, the sitemap normalises it to the empty path, and RFC 3986 says
those are equivalent. Under that format Astro reports
`Astro.url.pathname` as the file name (`/toast.html`) and Pagefind indexes files, so
`canonicalPath()` in `src/lib/url.ts` is what everything naming a page goes through.

- `/{slug}` — term page, top level (`vocab.design/bento-grid`).
- Aliases: static redirect pages (`/snackbar` → `/toast`) with `rel=canonical`;
  the alias also appears in the target page's title metadata and on-page "also called".
- `/` — the front page IS the directory. It carries one live specimen, the nine
  categories, every facet broad enough to advertise (§2.5), and the name of every term A to
  Z in columns, so the whole vocabulary is reachable in one scroll from the one URL
  everyone already has. There is no
  `/browse` and no `/tags` index: a directory page above a directory page is a click that
  says nothing, and the front page had nothing better to spend its length on. `/browse`
  is nevertheless published, as a redirect here: Google indexed the URL before the site
  was announced and ranks it above every other page, so it must not answer with a 404.
- `/tags/{tag}` (one facet, as the same cards, grouped by category; three of them are also
  terms, and carry a bridge to `/{tag}`, §2.5).
- `/browse/{category}` (that category, as cards with a live preview and a definition, plus
  the facets it reaches into).
  Both live under a prefix whose index does not exist, which is deliberate: the prefix is
  what keeps a category or a facet from competing with the term namespace at the root, and
  it stays spent in `src/lib/routes.ts` for exactly that reason.
- `/glossary` (the A–Z letter index) · `/glossary/{letter}` (every term AND alias under
  that letter, aliases shown resolving to their term; the non-alphabetic bucket is
  `/glossary/other`).
- `/rss.xml` (the newest 100 entries, ordered by `created`; the archive is `/glossary`).
- `/paths.json` (every slug the site answers to, so the 404 page and the search box can
  both correct a misspelling without downloading the 870KB `/terms.json`).
- `/random` (a term the reader did not choose, which is the one way into a dictionary that
  browsing and searching cannot offer: both of those need you to already have a word in
  mind). The pick is made in the browser, because a page rendered at build time would name
  the same term until the next deploy, and it uses `location.replace` so Back from the term
  returns where the reader came from rather than dealing them another one. The slugs ship
  with the page rather than being fetched from `/paths.json`, which carries every alias and
  display name and costs 45KB gzipped to answer a question about slugs alone. `noindex` and
  out of the sitemap, because what it answers is different every time.
- `/404` (the one page nobody links to: it reads the URL that missed and suggests the
  nearest headwords, which GitHub Pages serves for any unknown path).
- `/specimen/{slug}` · `/capture/{slug}`: not pages. The first is the inside of a
  specimen `<iframe>` (§6), the second is the set a share image is photographed on (§10).
  Both are unlinked, `noindex` and out of the sitemap, and both namespaces are spent in
  `src/lib/routes.ts` so no term slug can shadow one.
- `/search` (Pagefind, the one thing on the site that needs JavaScript). It works in dev
  too, against the last build's index, which a dev-only integration serves out of
  `dist/pagefind/`. Also the fallback for the two deleted directories: a category or a
  facet is a filter there, so the listing they offered is still a URL.

The sitemap is an allowlist, not a dump of what was built. It carries the terms and the
pages that list them, and nothing else: not the alias redirects, which are four fifths of
the built pages and every one of them a redirect rather than a document; not the specimen
frames (§6); not the capture set the share images are shot from (§10); and not `/search`,
which is a tool. `lastmod` on a term is its `modified`
day, and on a listing page the newest `modified` in the dictionary, because that is when
the listing last said something different. A new top-level route has to be named in
`src/lib/routes.ts` to be listed, which is the trade for never listing junk.

### Navigation

Navigation is client-side, over the platform's own view transitions: a link swaps the
document rather than reloading it, so the chrome is never rebuilt, the fonts and the
stylesheets are never re-parsed, and the page cross-fades instead of blinking white. A
dictionary is read by following links, which is the whole argument for it. Prefetching
comes with it, on hover and focus, which on a dictionary is a good bet: hovering a headword
is most of the way to reading it. Both are refused for a reader on a metered or slow
connection, and no animation runs at all for a reader who asked for no motion.

Two things are the site's own furniture and hold still across the swap: the header, which
sits in the same place on every page and is named so the transition matches it rather than
fading it, and the reader's own choices on the root element (the theme, and which modifier
the search chord is spelled with), which are re-stated inside the swap, before the new page
is painted.

**A card becomes the page it names, and gives it back.** A listing card already carries the
things a term page opens with, so moving between them is not a cut: the headword travels
from the card's line to the headline, the definition from the card's small print to the
standfirst, the picture grows from the card's frame to the full stage, and the card's own
bordered surface spreads out into the page's ground, while everything else cross-fades. The
term page names its four (`term-headword`, `term-definition`, `term-specimen`, and
`term-card` for the block the surface becomes) because it has exactly one of each; the card
side cannot, because a name has to be unique in a document and a listing is up to 207 cards.
So the names are written onto ONE card and taken off when the animation is over, which is
also what stops a navigation that never arrived from leaving a name behind to collide with
the next one.

Every one of those names carries the term's SLUG, which is what keeps the morph honest: a
name only ever matches its own term. Named by ROLE instead, the four match between any two
term pages, and the reader watches one headword being bent into a different word, its
definition stretched from two lines to four, and its specimen sliding to wherever the taller
definition pushed it. A headword is not a shape; it is a claim, and the entry next door is a
different one. With the slug in the name two terms share nothing, so each page's parts fade
on their own and the crossing reads as a page turning, which is what it is.

It goes both ways. Going to a term page it is the card the reader clicked. Coming back it is
the card for the term being left, named after the swap but before the incoming page is
photographed, which is the first moment the new page is real enough to MEASURE: so the
return trip runs only when the card is actually on screen, which is what makes Back feel
like a return without flinging the headword off the bottom of the page when the term sits at
30,000px down a list of 207. The front page's row is deliberately not part of the return
trip: its cards are shuffled and the row is positioned by script that runs after the
incoming page is photographed, so a card measured then is not where it will be a frame
later.

What interpolates is the BOX, not the thing in it, which is a rule with two consequences
worth writing down. A headline that fills its column is a box eight times wider than the
word inside it, so the card's line arrives stretched across the whole measure; the headword
is set to its own width instead, which changes nothing at rest and makes the move very
nearly a plain scale. And the card being photographed has the reader's pointer on it by
definition, and their focus too, since they clicked its link: it is marked while it wears
the names so it is photographed as it looks at REST, because an accent border in the still
is a hover frozen into a shape on its way to being a page with no border at all.

Two of the browser's defaults are overruled. The quarter of a second it animates in is
tuned for a photograph sliding into place; this page is mostly type, and type cross-fading
is legible for about as long as it takes to read that it is cross-fading, so every group
runs at 160ms. And transition groups are painted in the order their names were first seen,
which puts anything further down the document over the header: nothing about a z-index at
rest carries into the transition tree, so the header states its place there too, or an
expanding card travels over the wordmark instead of under it.

A cross-fade between two OPAQUE boxes is translucent in the middle, each at half strength,
so the page a card is opening into would flicker past under the card's own ground. The
boxes that really are opaque (a card, its picture, and the two blocks they become) say so
with a transition class, and their two sides are added rather than stacked.

Three URLs stay the browser's, and each for a reason of its own. `/random` replaces itself
with a term, so a client-side navigation there would be a document fetched to be thrown
away. The 3,888 alias pages are meta refreshes with no chrome, so they never carry the
router in the first place and the browser is handed the click. And a specimen's own frame
(§6) is a document inside a page, never navigated to.

**What client-side navigation costs, and it is not paid in the chrome.** One document lives
for the whole visit, so a module body runs ONCE: re-inserting a script the browser has
already imported does not run it again. Anything that reaches into the document therefore
has to be *per-page* rather than per-import: read the DOM when the page arrives, and give
up what was registered when it leaves, or the first page's listeners answer for a tree
nobody can see and the page in front of the reader has nothing wired to it. `onPage()` in
`src/lib/on-page.ts` is the one way that is expressed, and its first run is the browser's
own load, unchanged and no later than it ever was. The rule holds for the whole chrome, for
the listings, and for analytics, which has to say a page was read because the tag only
counts the first one (§10).

The specimen stage needs none of this, and that is not luck: `<vd-stage>` already tore
itself down on disconnect, because a listing evicts previews as they scroll away (§7). A
custom element that is honest about its own teardown is portable to a swapped document for
free.

### Liveness in the listings

A page that lists terms shows the demonstrations, not just their names. Two mechanisms,
one rule: **exactly one specimen animates per page** (§7), because a page where six things
move at once is a page nobody reads.

**The front page's carousel.** A row of specimens under the hero at half size, one of
them centred and playing. When that one finishes a pass the row moves over by one card
and the card that has left goes round to the back, so the row has no first card and no
last one and cannot be scrolled to an end: it is the listing's rotation turned on its
side, obeying the same two rules (§7). The stage changes hands only at a pass boundary,
and never before a specimen has had four seconds. A reader at the row stops it where it
is, and it moves on at the next boundary after they leave.

Only the middle card is being shown. The rest of the row stands back, faded, and the row
dissolves at the column's edges instead of being cut off square: what is out there is more
row, not a card someone has sliced. The fade is exactly as wide as the peek, so a column
too narrow to show one fades nothing at all.

Where the row SITS is stated in CSS and never written by the script. The row has to open
centred: one that opens flush left and is centred a frame later has told the reader that the
first thing they saw was wrong, and a reader with no JavaScript is left looking at a row
that never gets its offer. The offset that centres the second card and the width of the
edge fade are both a share of the window, which CSS can say and re-answer on a resize by
itself, so there is no second copy of the arithmetic to drift from the first. What is left
for the script is the two things CSS cannot say: the specimen's scale, which is a length
divided by a length, and whether the peek is wide enough to be a target, which is a
decision rather than a measurement.

A card at the edge is an offer rather than a destination. Clicking one brings it to the
middle instead of leaving the page, which is what lets a reader who has spotted something
look at it properly before deciding: the row goes round the other way for a card on the
left, and the same way it was already going for one on the right. Once a card is in the
middle it is a link like any other, and a modified or middle click always belongs to the
browser, so opening a term in a new tab works wherever its card sits.

A column with no peek has nothing at its edges to reach for, and a phone is exactly that
column: one card, edge to edge, its neighbours entirely off screen. There the row grows a
pair of steps, drawn over the picture's own left and right edges, doing precisely what
clicking a neighbour does. They are shown only while the peek is gone, because with one on
screen the neighbour itself is the control and covering it would take away the modified
click that opens a card in a new tab. They are real buttons, so the row can also be
stepped from the keyboard.

Which dozen terms are in the row is decided at build time, because the site is static and
every reader is served the same HTML. The order is the only thing the script decides: it
shuffles the row during parse, before the deferred module upgrades anything, so the front
page opens on a different specimen every time without ever rendering one term and then
replacing it with another. The dozen are taken at a stride across the vocabulary rather
than as a slice of it, since the list is alphabetical and a slice is twelve terms that
begin with the same two letters. Every pick moves with the build's day number, so the row
turns over between deploys instead of being frozen on whichever terms sort first.

What it draws from is the pool flagged `exhibit: true` (§2.1) whenever anything is
flagged, and the vocabulary itself when nothing is. The flag is curation and nothing else:
it is set by hand after watching the demonstration play, it is off by default, and it is
the only editorial judgement in the frontmatter. But an empty pool is not a reason for the
front page to show nothing, and a site whose whole claim is that every term has a specimen
can afford to open one at random; flagging a single term is what narrows the row to the
flagged ones. `bun validate` refuses the flag on a term with no demo or with an unfinished
article, and `terms.json` omits it, since it is a fact about this site's front page rather
than about the word.

Only the middle of the row is alive: the centred card, its two neighbours, and the one
about to slide in. That is four mounted demos for a dozen terms, and the rest of the row
is markup waiting its turn.

**A dozen cards, but not a dozen terms.** A reader who stays past four specimens is sent
more: a page of `/specimens/{n}.json` is fetched and the cards that have already had their
turn are re-lettered with it, off screen and unmounted, so the row keeps going round with
something new in it rather than coming back to the top. The page ships only its dozen, so
a reader who leaves in the first minute never fetches anything at all.

Paged, and dealt rather than cut. The whole pool as one file is 69KB gzipped against a
20KB front page, which is a lot to spend on something nobody may watch; a page of sixty is
five, and sixty specimens is about ten minutes of carousel, so in practice one fetch is
all there ever is. The pool is dealt into the pages one term at a time, for the same
reason the built dozen are taken at a stride: cut instead, a page would be sixty terms
beginning with the same letter. A page is picked at random and shuffled again on arrival,
because the files are static and two readers watching the same carousel should not be
watching the same programme. Each entry carries its own link, built with the rest of the
site's links rather than assembled in the browser from a base (§10).

**Cards in a listing.** `/browse/{category}` and `/tags/{tag}` render each term as a card:
one bordered object, the preview flush at its top with a hairline where the words begin,
then the headword, the other spellings, the dictionary line. The boundary is drawn rather
than implied, because a framed picture reads as a thing in its own right: a headword
merely sitting under one belongs to whichever neighbour is nearer, and on a two-column
grid of ragged card heights that is not reliably the term it names. Two columns,
because a specimen is authored against the term page's full column and the preview keeps
that box and scales it, so nothing is re-authored and nothing clips: two across is a
halving, the largest reduction that still reads as a demonstration rather than as a
texture. The preview is a way in to the term rather than a specimen to operate: a link
covers it, so a card never takes the stage over from attract, and the demo is driven on
its own page where it has a control bar and room to be read. The card holding the stage
says so with three small bars in its corner, drawn as soft ink on the picture rather than
as a chip over it: it annotates the frame and must not become the first thing in it. It is
also the card's one control, since hovering or focusing it points the term out inside the
specimen, which is the identify affordance a term page keeps in its control bar.

The cost is bounded by the same scheduler that keeps the motion calm. A category page can
carry 196 cards, so specimens mount as they approach the viewport, evict as they leave, and
never exceed eight at once; every one of them stands at its first frame, and one of them
plays. A card's box is stage-shaped and empty until its specimen arrives, which is also
what a reader with no JavaScript sees, so the grid holds its shape either way.

**The stage goes round.** Which card plays is a rotation down the page, not a fixed pick:
the stage passes from specimen to specimen in document order, over the cards on screen and
no others. It moves on when the specimen holding it reaches the end of a pass of its
choreography and has been playing for at least four seconds. Both halves are load-bearing.
The pass boundary is what stops a demonstration being cut off mid-sentence, and it is the
only moment the stage may change hands, so a short script simply plays again until its
four seconds are up rather than being a flicker on the way past. A specimen that never
reaches a boundary (no choreography, or a chunk still loading) is moved on by the same
four-second clock, so nothing can stall the page.

Everything is decided by what a reader can see. A card is in the rotation while at least
three quarters of it is showing, which is a floor for arriving as well as for leaving: a
card creeping in at the bottom edge cannot take the stage before it is really there, and
scrolling a quarter of the playing card away hands the stage on at once, without waiting
for a boundary. A demonstration half out of the frame is one the reader has already left.
The stage goes to the topmost card that qualifies, on arrival at a page and after every
scroll. It does not interrupt a demonstration that is still on screen to greet a newcomer,
because a scroll brings several cards in at once and the rotation is already on its way to
them. And it only ever hands over to somewhere: at a scroll position where nothing
qualifies, the card holding the stage keeps it rather than the page going still.

The reader's pointer outranks all of it. Hovering or focusing a card gives it the stage at
once and it keeps it until the pointer leaves, however long that is; the rotation then
carries on from that card rather than from wherever it had got to, so a reader who stops
to watch one term is taken onward from there instead of back. Nothing rotates at all under
reduced motion, where no specimen plays: passing the stage around would be four seconds of
remounting, once per card.

Search is a page and a modal, from one implementation. The page is where a search is
addressable: `?q=` in the URL, so a search is a link someone can send, a tab someone can
keep, and a result set that survives a reload. The modal is where a search is an
interruption: you are reading an article, a word in it is not the word you wanted, and
the answer should not cost you your place on the page. It is wide (56rem against the
48rem reading column) because a result is a headword, a category and a sentence of
excerpt, and the reading column wraps every one of them.

The nav link is the same link either way. It points at `/search`, and the modal is what a
plain left click does instead: a modified click, a middle click, or no JavaScript at all
still opens the page, in a new tab when that is what was asked for. `/` and Cmd/Ctrl+K
open the modal too, and the chord is printed beside the word in the header rather than
left to be discovered. The modal never touches the address bar, because it is a guest on
someone else's page, and it carries the typing out to `/search?q=` for a reader who
decides they want the page after all.

Both carry the same two filters, **category** and **facet**, each defaulting to All. They
are native `<select>`s over the two closed enums (§2.2, §2.5) rather than Pagefind's own
`filters()`, so the row renders with the page instead of after a round trip, and they are
what makes the deleted directories no loss: a facet with no query typed is that facet's
listing, ranked by nothing and paged like any other result set. On `/search` they join the
query in the URL (`?q=&category=&tag=`), so a narrowed search is still a link someone can
send; in the modal they ride out to the page on the same parameters.

The index carries them without a second pass: `data-pagefind-filter` for the category on
the term article, and one for each facet on the chip that already names it, since an
explicit filter value ignores the element's own text and repeated keys aggregate into a
list. Derived membership (§2.5) therefore filters correctly for free, because the chips
are derived.

Only term pages are indexed. `data-pagefind-body` on the term article is what does it:
marking a body anywhere makes Pagefind index only marked pages, so the alias redirects,
the front page, the listings and the unlinked `/specimen` and `/capture` documents fall
out without a single exclusion rule. Inside a term page the headword is weighted 10, its aliases 8, and
the definition and `useWhen` 6, while the specimen and the Related list are ignored: a
specimen's labels are the loudest nonsense in the index, and the Related list is nothing
but other terms' names, which would make every page match every neighbour's word.

A search that did not find the words that were typed is retried, and the reader is told
either way.

First as a misspelling, because the thing a reader types here IS a name and a name is a
thing you can get one letter wrong. `skeumorphism` is not a failed search, it is a
successful one with a vowel in the wrong place, and the site already answered that slip
at the other door: the same typing in the URL bar reaches the 404 page, which suggests
the term. So the search box reads the same `/paths.json` through the same matcher
(`src/lib/nearest.ts`). The whole query is tried first as one headword, so a two-word
term survives a typo in either half, and then word by word, which is what catches a word
that is common here without being a term of its own (`typograhpy`: no term is slugged
`typography`, it is a category).

The correction is deliberately narrower than the 404's suggestions, because a suggestion
costs a glance while a correction runs a search on the reader's behalf: an edit budget
scaled to the length of the word (nothing under four characters, where `tab`, `nav` and
`lab` are all one edit apart), transposition counted as the single slip it is, no answer
at all when two terms are equally close, and nothing for a word that is merely a prefix
of a longer one, because that reader is still typing.

**A result count cannot tell you a search failed.** Pagefind matches the last word of a
query loosely, so a typo comes back looking like a success: `tost` returns 1,060 results
topped by "Back to top", `accordian` returns four topped by "Morphing control", and
neither is what anyone asked for. What actually matched is legible only in the excerpt,
where `<mark>` surrounds it, so that is what both the correction and the reader's own
eyes go by. It is also the test that keeps a reader who was right from being corrected:
`grip` marks `grip,` in Column resizer, so the corpus really does have that word, while
`paralax` marks `P.` in Pilcrow, so it does not.

Then the query is retried without its vaguest words, because Pagefind ANDs every term and
a reader describing a thing they cannot name types a sentence. "what do you call the
little grip dots" matches no page as an AND; the search scores each word by how many
pages it hits alone, keeps the most selective few, and says which words actually ran.

Misspellings are not content. There is no field for them and there will not be one:
typos are unbounded and the dictionary is 4,923 spellings, so the finite side is the one
worth writing down. A slip that shows up in the analytics hundreds of times
(`search_corrected`, §10) is a spelling readers actually believe in, and that one earns a
real alias.

Categories live under `/browse/` rather than at the top level, which is a deliberate
departure from an earlier draft of this section. Terms own the root namespace, so a
category page at `/{category}` competes with it: `/aesthetic` is already an alias of
`vaporwave`, and `color`, `motion`, `pattern` and `layout` are all plausible future term
names that would silently shadow a category route. Two dynamic routes at the root would
also collide in Astro. The glossary is sliced by letter for size: 1,076 terms plus 3930
aliases is 4,923 entries, which is a 440KB page as one list.

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
- **The header is sticky and recedes when it can.** It is borderless while the page is at
  rest, so at the top of a document there is no bar at all, and it takes a single hairline
  under it the moment anything has scrolled beneath, because type over type is the one thing
  a header must never be. A thin rule and nothing else: a blurred band under a header is a
  gradient the reader has to look past, and on a page whose whole job is to be read it costs
  more than the edge it hides. Whether the page has scrolled is the one fact CSS cannot ask
  for, so `[data-stuck]` comes from the chrome's own script; the rule is stylesheet. The
  paper ground underneath is NOT conditional, and the reason is worth stating: it is the
  body's own colour, so painting it always looks exactly like painting nothing over a page
  at rest, while a header with no ground is a header with someone else's type showing
  through it the moment there is anything behind it, which under client-side navigation
  (§3) is every swap. It is an
  `IntersectionObserver` on a few pixels pinned to the top of the document rather than a
  scroll listener, because the question is about layout and the observer answers it from
  layout: it is right however the page came to be where it is, a reader's wheel, a
  restored scroll position, a link to an anchor, or a reflow that moved the ground.
- **The scrollbar is part of the page.** It is painted from the chrome's own palette
  (`scrollbar-color`: the muted ink at just over half strength, on a transparent track, so
  the gutter reads as paper), which means it flips with the theme by itself, because the
  token does. Left to the operating system it is a light strip down the side of a dark page:
  the last piece of chrome that never got the theme. The property is INHERITED and
  inheritance crosses into a shadow root, so the stage's canvas resets it (§6): a specimen's
  scroller is the specimen's, painted from `--sp-*` where the kit provides one and by the
  platform otherwise, and never from the page's palette. The bar is ALWAYS there
  (`overflow-y: scroll`), so nothing is ever laid out against a width that is about to
  change: a short page and a long one have the same column, which under client-side
  navigation (§3) is the difference between a swap and a jolt. Deliberately the blunt way of
  saying that rather than `scrollbar-gutter: stable`, because a reserved gutter is room the
  TOP LAYER does not cover: a modal's backdrop stops at the edge of it and leaves an undimmed
  band down the side of a dimmed page, and widening the backdrop to `100vw` does not reach it
  either. Stopping the page scrolling under the modal takes the bar away with it, so its room
  is handed straight back as padding on the root, which is inside the box the paper paints and
  inside the viewport the backdrop covers. That is also why the paper is stated on the root
  rather than on `body`, whose box stops where the padding begins.

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
  Narrowest means the feature's own extent, not its canvas. "The term is a thing
  this element has" is the wrong test: it justifies any container up to the page
  (a river is a thing a paragraph has, a paragraph is a thing a column has). When
  the term names a feature inside an element (a channel of aligned spaces, a gap,
  a stroke), the subject is the element that traces the feature. A demo that draws
  or highlights the feature already has that element; a feature with no element of
  its own is given one, an overlay sized to its extent, rather than ringed by
  proxy. A subject invisible in the current state is no objection: identify
  summons what is off stage (§6).
  Reaching for the top-level wrapper is a claim that the whole scene is the term,
  not a default: it withdraws identify (§6), so a demo that grabs the wrapper out
  of convenience loses the affordance that would have pointed at the right thing.
  A demo's own instrumentation is never part of the term. A Replay button, a
  "make the next request fail" switch, and the heading above a list are scenery
  the specimen needs in order to be watchable, and they belong outside the
  subject. Instrumentation for the *choreography* goes further than scenery: an
  element that exists so the script can aim at a coordinate (an anchor for a tap
  that must land inside an invisible region) gets a `data-part` and no paint at
  all. The ghost cursor is the stage's own annotation; dashed rings marking its
  stop points annotate the script, not the term, and read as UI the term never
  had. A demo that wants to teach where input can land draws the region (the
  term's geometry) or says it in a caption, never the stop points. Scenery is wrapped in the `.sp-context` register: accent remaps to a
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
- **A demo measures in its own pixels.** A specimen is authored against 720x320, which
  is exactly the reading column, and it is shown smaller in two places: a listing card
  at half size (§3), and a term page on a screen too narrow for the column, where the
  stage scales the whole box down rather than let the demo be cut off at both edges.
  Inside a scaled subtree `getBoundingClientRect` reports the page's pixels while every
  length the demo writes back is read as the specimen's, so anything positioned from a
  measurement lands at a fraction of the distance, and a printed measurement is a
  fraction of the number. A demo that measures therefore asks `#src/kit/measure.ts` for
  `localBox`, `localSize`, `localPoint` or the `displayScale` behind them, rather than
  subtracting two client rects. The same holds for what a measurement is compared
  against: a length the demo declares is in specimen pixels, so a threshold, a fold line
  or a detent measured off a client rect mixes the two spaces and moves as the page
  scales. `offsetLeft`/`offsetWidth` are already in specimen pixels
  and need nothing. A ratio of an element against itself (a pointer's position along its
  own track) needs nothing either, since the scale cancels; a distance in pixels does
  not, and a pointer drag is the case that bites: a phone is a scaled stage a reader can
  really put a finger on, so a drag measured off `clientX` moves what it drags at a
  fraction of the finger's speed.
- **The specimen fits its stage.** The stage body clips its overflow, so an element
  that escapes it is silently amputated, never merely ugly. The same holds one level
  down: a container holds its content (content larger than its box either spills onto
  neighbours or is cut, and neither is acceptable unless the clipping viewport or the
  truncation is itself the design), nothing overlaps a neighbour it does not mean to,
  and a single-line control (a button, a chip, a tab) stays one line in every state.
  These are claims about every state the choreography visits, not the mount state
  alone: size each box for its largest content at its real rendered size, measuring
  once on mount when only runtime knows it. The box a demo composes against never
  changes: a column too narrow for it (a phone) is answered by the stage scaling the
  whole 720x320 picture down, never by giving the demo less room, so a specimen is
  authored once and cut off nowhere.
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

### 5.1 Comparison switches

Nearly half of all specimens carry an `<sp-segmented>` that swaps what the scene is
showing. Three jobs hide behind one control, and only the first is a comparison: a
**counter-example** (the term against the thing it is defined against), a **variant**
(two states that are both the term, light and dark, split and unified), and a
**parameter** (a value the term varies over, 300px and 440px). A variant or a parameter
needs no more than a name. A counter-example needs the reader to know which side is the
word they came for.

**A mode switch is the exhibit's control, not the mock product's, and placement is what
says so.** Drawn inside the demo it becomes part of the fiction: 154 of them ended up in
a simulated application's own title bar, sitting in one row with an invented brand at
equal weight, so `Marrow` and `Riverside Arena` and `As shipped` all read as furniture of
the same imaginary product. No wording fixes that, and a legend inside the pill made it
worse by adding a third competing word to the product's chrome. So the control moves out:
a demo marks its switch `data-stage-mode` and the stage draws it in the **strip** (§6), in
chrome rather than kit.

What labels it depends on which of the three jobs it is doing. A **counter-example** IS the
headword, so the headword names it: `Drip pricing: With | Without` cannot be spelled
differently by the next author, ordered differently, or left ambiguous about which side is
the word, because no author writes it. A **variant** or a **parameter** is not the word, so
it keeps its own `data-axis`: `Theme: Light | Dark`, `Width: 300px | 440px`. Naming those
after the headword would be a lie, and keeping them apart is also what lets one specimen put
two switches on the strip without both claiming to be the term.

The demo keeps the element and every listener on it, hidden; the stage's control forwards
to it, and follows it, so a reader's click, the attract script's click and the demo's own
code all reach the mode the same way.

Two attributes survive on the control, and neither is drawn any more:

- **`data-axis`** is the tablist's accessible name. An author's own `aria-label` outranks
  it, since a name has no width to answer to ("Scope" in the control, "Search scope" in
  the tree).
- **`data-term`** names the segment the headword points at. It is the same claim
  `data-pose` already makes to the stage, and `bun validate` refuses to let the two
  disagree. Nothing paints it: a dot beside a label teaches a reader nothing they can
  learn, while a pair that names itself does.

**Order is baseline, then change.** Every switch reads left to right as without, then
with. That puts the term FIRST when the term is a defect (a deceptive pattern) and
SECOND when the term is a feature something turns on (`hyphenation: auto`,
`text-wrap: balance`, oldstyle figures). The rule was already unanimous across the
corpus before it was written down.

**The deceptive-pattern family spells its pair one way: `With | Without`.** The enum
exists for the same reason the tag enum does. Nineteen specimens had reached for twelve
spellings (`Made honest`, `Made plain`, `All in`, `One click`, `Even-handed`, `Lined up`,
`Asked exactly`), because a switch label is invented by whoever is authoring that term and
read by nobody who has seen the others. `As shipped | Made fair` replaced those and was
itself wrong: release jargon on one side and a moral verdict on the other, neither of
which answers "with what?". The headword answers it, which is why the labels can be two
plain words. The specific claim lives in the verdict, drawn in the strip directly above the
switch that produced it.

**Anything that is not in the fiction is chrome.** The switch was the first case and not the
only one. A **verdict** ("the advertised 42.00 won the click. Each step adds a fee nobody can
decline") is the site's reading of the state, not the product's: no checkout says that about
itself, so printed inside the mock in the mock's own type it is one more line the reader has
to work out is not part of the scene. It is also an artifact of the mode, which is why it is
drawn immediately above the control that changed it. An **announcement** moves for the
opposite reason: a screen reader's speech is not the product's chrome either, and a demo that
prints it into a panel of its own makes the load-bearing half of an accessibility specimen
look like a feature of the mock. Both are marked in the demo and drawn by the stage
(`data-stage-verdict`, `data-stage-announce`), and both reserve their room whatever the
current state says, so changing modes never moves the page.

**A verdict is defined by what it does, not by what it is called.** The first pass moved the
36 elements named `verdict` and left 204 specimens carrying the identical thing under
`caption`, `note` or `legend`: `owned-element` keys a `CAPTION` record to its switch and reads
"Same DOM, adopted tree", which is a verdict however it is spelled. The test is two questions.
Does the specimen have a mode switch, and does this prose CHANGE with it? Prose that answers
to the exhibit's own control is the exhibit talking. Prose that never changes is a different
complaint with a different answer: the term's article usually already says it, better and at
length, so it is deleted rather than moved.

**And a verdict is not the whole of it: the rule governs every word a specimen paints.** Two
passes chased this through part names (`verdict`, then `caption`/`note`/`legend`) and both
under-counted, because the corpus does not keep its voice in named parts. A sweep that read
what is actually on screen, by mounting all 1,124 capture pages and collecting the painted
text, found 3,655 strings, of which 1,268 were the site talking, across 662 specimens.
`bubble-toolbar` instructed the reader from a bare `sp-label` ("Select a run to summon it;
click anywhere else to send it away"). `coach-mark` printed "No scrim, no Next, no counter
that matters", which names three things absent from the scene and never introduced, and
labelled the button that re-arms its beacon "New teammate", asking the reader to infer a
whole fiction to explain a control that only puts the beacon back. Instrumentation says what
it does. The recurring shapes are an instruction to the reader, commentary on what to notice,
a comparison with what is not there, a sentence teaching the term, and an annotation of the
exhibit rather than of the product. The default answer is deletion.

The counter-rule is the instrument test, and it is what saves real fiction from a sweep like
this: **a readout stays inside the frame when the demo DRAWS the thing that produces it.**
`scrollbar-color` prints "3.17:1 clears 3:1" beside the swatches it measured, `drag-threshold`
prints "0 px travelled, 8 px needed" against the dashed ring it drew, and `pointer-cancellation`
heads its two identical buttons "Acts on press" and "Acts on release" because that pair is the
comparison's only legend. Sixty-three such strings survived the sweep as second-judge calls.

**Whatever the stage lifts out of a specimen has to be hidden on every stage, not just the
ones that draw the replacement.** A listing card has no control bar and no strip, and the
sync returned early when it found none, so verdicts and mode switches went on being drawn
inside the specimen on the front page, `/browse` and `/tags`, while every term page looked
right. The sources are hidden before that decision now. Any future lane inherits the rule.

**An announcement that is the subject moves too, and identify follows it out.** The strip's
copy is the one on screen, so `subject()` prefers it and the ring is drawn around the lane,
or around a word inside it: `pronunciation` rings the respelled token, `role-description` the
role, `set-size-and-position` the "247 of 500". That works because the lane MIRRORS the
source's markup rather than its text, cloning the children so a span marked `data-subject`
survives the crossing. Announcement children carry inline styles and no kit classes, which is
what lets them look like themselves in chrome; a specimen whose live region is a panel of
kit-classed product UI is not an utterance and does not move (`atomic-live-region`'s flight
card, `busy-state`'s results panel, `streaming-announcement`'s assistant reply are each a real
surface that updates, and the instrument test keeps them where they are).

**`data-identify` is `data-pose`'s sibling, for parameters.** A pose says "these are the states
in which the subject is still the term", which only a counter-example has; `data-identify` says
"this is the state in which the term is legible", which a parameter has. Every one of
`verbosity`'s three levels really is verbosity, but a ring around "Star" at the low setting is a
ring around a name, and a name is what every control announces. So it mounts at High, declares
`data-identify="[data-level=high]"`, and identify resets there from wherever attract left it.
The two are kept apart because `bun validate` reads a pose naming one segment as a claim about
which side is the headword, and for a parameter that is a lie. A demo declares one or the other,
never both.

**A readout stays in the frame only when the demo draws the thing that produces it.** This is
the test, and it is not about wording: restyling the author's voice to look like product UI is
how the invented brand names happened. `braille-display` draws the pin array, `key-sequence`
draws the kbd chips and the timeout meter its line reports, `inline-validation` prints into
the field's own slot with `aria-describedby` pointing at it, and `containing-block` reads
"Containing block: the card", a legend naming a box the figure draws. Those are instruments,
and their output is fiction. A label asserting an instrument nobody can see is not: "Screen
reader, polite queue" over a scene with no screen reader in it is a stage direction wearing a
product's clothes. Either draw the instrument or give the text to chrome.

## 6. Specimen stage

`<specimen-stage>` is the one chrome component that hosts demos: a clearly bounded
frame that reads as "exhibit space". It owns the caption, the controls (identify,
view-source, and a play control, pinned right, that reads "Playing" behind a pause
glyph while attract owns the stage, stops the script when clicked, and reads "Play"
behind a play glyph otherwise), the isolation mode
(shadow root or iframe), and the attract-mode player. Written once; demos never reimplement any of it. Specimens follow
the page theme: the stage syncs the kit's light/dark tokens to the chrome's; there is
no per-stage theme control.

**The strip is the exhibit's own row**, between the specimen and the control bar. It holds
three lanes, drawn top to bottom in the order the reader needs them: what the specimen SAYS
(`data-stage-announce`, with a speaker that pulses when the words change, and it is the real
live region since the demo's own element is hidden and so out of the accessibility tree),
what the current state AMOUNTS TO (`data-stage-verdict`, no speaker and no live region, since
it is prose rather than speech), and then the mode switch (§5.1), which sits under the verdict
because the verdict is what it just did. Every lane reserves its room from mount, so no lane
resizes as the specimen changes state. A mirror carries the source's own `data-*` across, so a
choreography that asks for `[data-part=verdict][data-state=offset]` finds it in the strip and
never falls through to the hidden original. It is deliberately INSIDE the annotation overlay rather than in the control bar below it,
because the ghost cursor is drawn on that overlay: a choreography can therefore travel
down onto a control in the strip and press it, by the same `data-part` the demo's own
hidden segment carries. The player searches the strip first, so a script says "press the
mode switch" without knowing where the stage chose to draw it. A strip control's box is in
page pixels while everything else the player aims at is in the specimen's, so the player
converts at the point it aims and keeps one coordinate space, which is what lets a travel
that begins in the specimen and ends on the strip interpolate without a jump. A specimen
with nothing to put there gets no row at all.

Being outside the specimen cuts both ways: every takeover signal is registered on the
surface, so a control in the strip has to claim the stage and give it back itself. A press
there is intent exactly as a press inside the demo is, and the pointer leaving the strip
is the reader leaving exactly as leaving the specimen's edge is. Without the first, attract
plays on over a reader and the next pass undoes the choice they just made; without the
second, one press keeps the stage in user mode for the rest of the visit and the
demonstration never plays again.

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

The stage has one further mode and it has no reader at all: **capture**, the stage on a
`/capture/{slug}` page, which holds the pose for a camera (§10). It is the same element
doing the same work, minus everyone to do it for: no control bar, no attract loop, and
nobody to hand the demo over to. It poses on mount, fades the canvas around the subject
in place of the ring and the pin, and says `data-capture-ready` when the picture is ready
to take. Marking it on the stage rather than reimplementing the pose in a script is the
point: a share image that summoned its subject differently from identify would be a
picture of a specimen the site does not have.

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
  entering it, ANY key pressed inside it, a >150 ms hover on an interactive element,
  or a wheel/touch gesture that actually scrolls specimen content. Every keydown
  claims the stage, not just the first, because a reader holding a key is mid-gesture
  for as long as they hold it: if attract resumes underneath them its own scripted
  keyup lands in the demo and ends the hold, so a quasimode flickers on and off once
  per pass. For the same reason the pointer LEAVING a specimen does not hand the stage
  back while a keyboard reader is still inside it: they have not left, and keys like
  Shift do not auto-repeat, so there would be no second keydown to re-claim it. The
  test for that is `:focus-visible` rather than focus, because a click focuses what it
  presses: reading focus alone, a reader who poked a button once and moved on would
  hold the stage for the life of the page and the specimen would never play again.
  A demo whose term is *operated by hovering* (a dock that bulges, a glow that follows
  the pointer) marks that surface `data-hover-driven`: a dwell there is intent too, so the reader's own pointer takes
  the stage without a click, which is the term's honest operation. A `data-gaze` scope
  is hover-driven by definition — looking is hovering. The marking is for surfaces
  where hovering alone is the interaction, never for demos where hover merely
  decorates a click.
- **Loop persistence.** The attract loop remounts the demo between iterations, because
  mount is the only universal reset for state that lives in a demo's closures. Two
  cases keep their tree instead, which is what lets a reader inspect a specimen in
  devtools without the node they picked being rebuilt under them, and lets ambient
  animation run unbroken: a script of waits and asserts only, on a demo that never
  armed its clock (a self-animating demo is phase-locked to its mount, so a still
  script's timings assume the cycle starts there); and a demo declaring
  `data-loop="keep"`, the claim that its pass ends at its mount state. The declaration
  is verified, not trusted: the smoke test plays a persistent demo's script twice with
  no remount between, so a dirty second lap fails CI instead of looping brokenly on
  the page. The ghost dispatches its trailing leave at each pass boundary, so
  symmetric hover state settles before the next lap. Resuming after user mode always
  remounts: a reader's input is unconstrained. **The gesture that takes over is not spent
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
  would contradict the enter the browser has just sent. A demo must survive the
  takeover it invites: one that holds a drag captures the pointer on a **trusted**
  pointerdown (`if (event.isTrusted) el.setPointerCapture(event.pointerId)`), so a
  reader's drag keeps reporting after the pointer leaves the element. The guard is
  mandatory — the player's synthetic pointers cannot be captured and the call
  throws — and a captured drag ends on pointerup and pointercancel, never on
  pointerleave, which does not fire while capture holds. The scripted path never
  needs capture (events dispatch on the element directly), which is exactly how the
  missing line hides from CI.
- **Continuous play**: attract loops for as long as the stage is on screen, with a
  beat between plays. Motion never outlives attention: off-viewport stages are fully
  paused, and reduced-motion visitors get no attract at all.
- **Touch**: no hover exists — takeover is tap; attract resumes after the same idle
  beat once interaction stops.
- **Touch persona (scripted)**: touch is a first-class input, not a mouse pointer in
  disguise. A demo marks a touch-native surface (or its whole scene) with
  `data-touch`; any step whose target sits inside that scope performs as touch: the
  ghost becomes a fingertip contact disc (floating translucent between targets,
  pressed into contact for taps, holds, and swipes), dispatched pointer events carry
  `pointerType: 'touch'`, and no hover is dispatched or mirrored — a finger that is
  not pressing is not there at all. A tap wraps its press in the compatibility
  over/enter and out/leave pair, exactly as a browser does.
  **Hover inside a touch scope arrives only from a tap, and then it sticks.** No
  hover ever comes from travel, for the script or for a reader: the kit guards every
  one of its `:hover` rules with `:not([data-touch], [data-touch] *)`, so inside a
  touch scope hover paint is attribute-only, and `:active` stays unguarded because a
  finger really does press. What a real device does leave behind is a hover stranded
  by a tap, so the stage lands `data-hovered` on the tapped element and leaves it
  until a tap somewhere else (`TouchHover`), claiming only what the demo's own
  handlers did not set and releasing only what it claimed. One `click` listener
  serves both hands, since the player dispatches a real bubbling click for its `click`
  step, so the script and the reader cannot disagree; a multi-contact `tap` is a
  gesture rather than a place a hover could rest, and strands nothing. This is the
  sticky-hover bug, and it belongs to every touch specimen rather than to one term:
  a demo inside a touch scope must never wire `pointerenter` to repaint hover, which
  would hand a reader the one thing a finger cannot do. During a `hold` the
  disc's inner fill swells with the reported pressure, which climbs at a finger's
  rate (full force at 900 ms): a brief hold is a light press, a long one bottoms
  out. Right and middle clicks stay
  mouse gestures even inside a touch scope; a choreography on a touch surface has no
  business with them. For real readers the mapping runs the other way:
  `pressureHold` in `src/kit/touch.ts` turns a held mouse button (or pressureless
  touch) into the same rising force signal the scripted ramp produces, on the demo's
  own clock, so one wiring answers the script, a finger, and a mouse. The reader's
  pointer is dressed to match: inside a touch scope the kit hides the native cursor
  and the stage draws the real pointer as the same disc (`TouchMirror`), pressing
  into contact and swelling at the same rate, so taking over does not swap a finger
  for an arrow. Real fingers are never mirrored, and an iframe's events cannot be
  (none escape the frame), which is acceptable while no touch term is
  document-scoped. The pinch is in the vocabulary: the `pinch` step (§8) spreads or
  closes twin contacts about its target, drawn as twin discs on the ghost, and a
  demo wires `pinchSpread` from `src/kit/touch.ts` on its gesture surface — one
  scale signal whether the two pointer streams come from the script or from real
  fingers, with a reader's mouse mapped on via **modifier+drag**: the pressed point is
  one contact and a virtual second contact mirrors it across a centre just beside
  the press, so dragging outward opens the pinch and dragging back closes it.
  TouchMirror draws that mirrored contact as a second disc using the same geometry
  the kit hands the demo, so the picture and the computed scale can never disagree
  (and no force fill during a pinch: it is a spread, not a press). A trackpad
  pinch arrives as a ctrl+wheel event, not as pointers, and stays the demo's own
  to wire; the script performs it as a `wheel` step inside a `withKey` Control
  scope (§8). Rotation rides the same pair: the `pinch` step's `turn` rotates the
  contacts, `pinchSpread` reports (scale, turn) so a demo uses the half it names,
  and a modifier+drag swinging around the mirror centre turns the pair for a mouse.
  Two more gestures ride the same contacts, and both are them doing something
  other than spreading. The `tap` step (§8) taps them with no travel, `count`
  times, and a demo wires `contactTap` from the kit: one signal for the script,
  real fingers, and a reader's **modifier+tap** — the no-travel half of the same
  mapping a pinch's drag claims, which is why one element never wires both. The
  `scrub` step sweeps them sideways and back, and `contactScrub` in the kit counts
  the reversals rather than matching a shape, so a scripted scrub, real fingers and
  a reader's modifier+drag swept side to side all arrive as one signal. These gestures
  are PORTRAYED as themselves, on the same principle as the rest of this persona:
  that assistive technology consumes the real versions natively and hands a web
  page nothing is a fact for the term's article, not a reason the stage may dress
  the gesture as something else.
- **Contact counts**: `tap`, `scrub` and `pinch` each carry a `fingers` count, two
  by default and **three at most**. The contacts sit evenly along the gesture's
  axis, so the outermost pair always carries the stated scale and an odd third
  rides the centre, which is where the ghost draws its third disc and where a
  reader's third contact appears. A count is never one, because a single touch tap
  is a `click` inside a touch scope, and never more than three, because no term
  needs it: a demo that would need four contacts waits, exactly as three did.
  A reader on a mouse stands in for the contacts by holding MODIFIERS, and what
  carries the meaning is how many rather than which: **any one modifier** makes the
  pointer a pair, **any two** make it three, and leaning on more asks for three
  rather than a gesture that does not exist. Ctrl, Alt, Shift and Meta are
  interchangeable, because a mouse has no way to put a second finger down and a
  reader should not have to remember which key was anointed; `readerContacts` in
  the kit is the single definition, read by the drawn discs and by every handler,
  so the picture and the count can never disagree. The count itself is readable
  through `contactCount` for a
  term whose claim IS the count rather than any one named gesture. Where the
  platform swallows the gesture before any document sees it, a demo declares
  `reader: false` so no mouse mapping is offered: portraying the contacts is
  honest, but handing a reader a mapping for a handler that cannot work on real
  hardware is the fake §8 forbids, and the article's prose carries the rest.
  Nothing in a demo ever paints its own fingers; the stage draws every contact,
  so drawn dots are double vision.
- **Gaze persona (scripted)**: a `data-gaze` scope is the touch persona's opposite
  temperament. Events stay exactly a mouse's — hover included, because looking IS
  hovering — and only the dress changes: the ghost is an eye resting where the
  reader looks (iris on the hotspot), and an activation is drawn as the hand's
  pinch, finger and thumb arcs closing on the point the eyes hold. No kit rule
  hides the native cursor and nothing is mirrored: a reader has no eye tracker,
  so their own pointer plays the eyes in takeover, which is the honest mapping.
  A demo inside a gaze scope wires plain pointer and click handlers and needs
  nothing else. Gaze is designed for looking and committing (moveTo, click);
  a gaze demo that needs drags or holds is a reason to design their gaze dress
  first, not to ship them wearing the mouse's.

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
- **One scheduler per page** decides which stage may play: on a listing page one card
  animates and the rest hold their first frame; on a term page the hero stage plays.
  IntersectionObserver-gated; off-screen stages are fully paused. The scheduler grants
  the stage; what a listing controls is which stages ASK for it, by moving `data-hold`
  from one card to another (`src/components/previews.ts`). A held stage is mounted and
  still: it stops any run, restores a clean mount, and gives the claim back. A stage
  taken out of the document is discarded rather than parked, and giving up its claim on
  the way out is what keeps a scrolling list from stranding the stage on a player nobody
  can reach.
- **A pass boundary is announced, and a listing rotates on it** (§3). The player says so
  between one pass of the script and the next; a listing takes the hold there, which is
  what lets the stage move down the page without cutting a demonstration in half. It is
  the player's only outward signal about the script's shape, and nothing inside a stage
  listens to it.

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
  `middleClick`, `drag` (held press to a target, optionally through `via` waypoints:
  one continuous stroke tracing the polyline, which is what lets a gesture, a lasso,
  or a signature be one stroke instead of several, and a waypoint written as
  `{ at, dwell }` STOPS there for that many ms, dispatching nothing while it waits,
  because a pointer holding still is what emits no events and that pause is what a
  spring-loaded container or any drag-and-dwell target listens for, its own clock
  counting it out; the dwell is semantics rather than tempo, so reduced motion
  collapses the travel around it but never the pause; `release` says how the contact
  leaves, the default `rest` settling for a beat at the destination before lifting
  and `moving` lifting the instant the travel ends, which is the difference between
  a hand that stopped and a throw, since the moves are linear in time and a demo
  reading the stroke's last samples gets a real release speed from one and an honest
  zero from the other; `ms` sets the travel's duration, mere tempo for a settled drag
  but semantics for a thrown one, because distance over time IS the speed handed
  over; `button: 'right'` holds the RIGHT button for the whole stroke instead of the
  left, which is the only way to perform a gesture a browser reads off that button,
  every event reporting button 2 and the right bit in `buttons`, the ghost drawing
  its right arc, and the release followed by the `contextmenu` a real right button
  fires, so a pad that must refuse the menu is actually asked to; it stays a mouse
  gesture inside a touch scope exactly as `rightClick` does, and middle waits until a
  term needs it), `withKey` (hold a key across the
  enclosed steps: keydown as the scope opens, keyup as it closes, the chip held for
  the duration; Shift, Control, Alt, and Meta stamp their flag on every event
  dispatched inside, so a click becomes a Ctrl+click and a drag a Shift+drag; scopes
  nest for chords, and the scope closes even on a cancelled run, so a held key can
  never leak), `hold` (press-and-hold for N ms), `pinch` (touch contacts
  about the current target: one pointerdown per contact with its own pointerId,
  moves, one pointerup each — `scale` spreads or closes them, the OUTERMOST
  separation ending at exactly that ratio of where it began and never exceeding
  the stage's span, and `turn` rotates them by that many degrees clockwise, either
  alone or both together), `tap` (the contacts tapped on the target with no travel,
  `count` times — a magic tap is two of two, VoiceOver's screen curtain three of
  three), `scrub` (the contacts swept sideways and back `reps` times with a
  downward drift, one continuous press throughout), each carrying an optional
  `fingers` count (two by default, three at most, never one: see §7),
  `press` (key), `holdKey`
  (hold a key for N ms: one keydown, the typematic delay, then `repeat: true`
  keydowns at a steady rate until the keyup, the chip counting them as
  "ArrowRight ×12"), `type` (text), `scroll`, `wheel` (a short burst of real
  WheelEvents at the target, the total delta split across them: the input
  counterpart of `scroll`, which moves a scroller's position directly and fires
  no events — a demo that listens for wheel is spoken to with `wheel`, and a
  trackpad pinch, ctrl+wheel by browser convention, is a wheel inside a `withKey`
  Control scope), `wait`, `assert`. Nothing
  demo-specific. `hold` ends with
  pointerup and never a click — a long press is not a tap, and a demo that wants the
  tap scripts one; under the touch persona (§7) its pointermove events carry a
  pressure climbing at a finger's rate (full force at 900 ms), so the hold's length
  chooses the depth reached — the signal a force-driven demo reads. `pinch`'s `ms`
  is animation, not semantics — the scale is stated, so reduced motion collapses
  the move, unlike `hold`, whose length IS the depth it reaches. `scrub`'s
  `ms` is animation on the same terms; `tap`'s `count` is semantics, since
  a single tap of the contacts is not the gesture a double tap is, and `fingers` is
  semantics everywhere, since the count is what a surface distinguishes.
  **The vocabulary grows before a demo fakes it.** A term whose honest demonstration
  needs input the player cannot perform is a reason to grow the player — as press
  duration grew `hold` and pressure grew the touch persona — never to ship a control
  that impersonates the input (a "simulate the hold" button, tabs for pressure
  levels). A demo is not authored until the input it needs exists. Simulation
  controls remain legitimate only for conditions no input could ever perform: a
  network failure, a server delay, a permission state. **Device motion belongs to
  that carve-out.** A shake is read from a sensor rather than made by a pointer or a
  key, so a labelled control driving it is the legitimate kind of simulation and not
  a costume worn by an input; shake-to-undo and motion-actuation are settled on those
  terms rather than waiting for a primitive. The line is what the input IS, not
  whether the stage could technically synthesize an event for it.
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
- **An animation run has one owner.** A script never cuts a run the reader can see:
  where the demo autoplays a run on mount, the script presses Replay only at rest
  (its opening wait outlasts the mount run), or the demo skips the mount autoplay so
  the scripted Replay names the only run. The script's tail outlasts every run it
  starts, so the loop's remount lands on a settled scene rather than cutting one
  mid-flight; and a demo that re-arms its run on its own clock does not also get
  scripted Replays. A replay clicked mid-run teleports the movers to zero under the
  reader's eye, which reads as the specimen breaking, not as the term.
- **A still term ships a still script.** Choreography exists to demonstrate state, and
  some terms have exactly one: most aesthetics, much of typography, a layout whose
  whole claim is visible at rest. Those specimens script waits and asserts only. The
  asserts keep every CI duty (the script remains the smoke test, attract still runs,
  identify-mid-attract still has a moment to interrupt), while the stage simply rests
  on the specimen, as it always has under reduced motion. What a still term never gets
  is cursor theater: a hover with no visible consequence demonstrates nothing, and
  pointing at parts in sequence is the identify pin's job, not the cursor's. The test
  cuts both ways, and the demo answers first: before a script goes still, ask whether
  the term honestly has a second state the demo is failing to show (a column count
  that reflows, a comparison worth posing). A pointless hover is as often an
  under-built demo as an over-built script.
- The player dispatches real synthesized pointer/keyboard events inside the demo root,
  animating the ghost cursor between targets and popping key chips for keyboard steps.
  `moveTo` carries hover with it (enter/leave land when the cursor arrives), since
  hover is input a tooltip or a menu genuinely responds to, and `scroll` is animated by
  the player rather than by `scroll-behavior`, which is unreliable and would let a step
  silently do nothing. The coordinates between two hovers are input too: while the
  cursor travels, the player streams interpolated `pointermove` events (one per
  animation frame, the coalesced rate a real mouse arrives at; `buttons: 0`, so a
  sweep never reads as a drag) onto the deepest element containing both endpoints,
  eased to track the drawn ghost, so a demo that answers continuous pointer position (a
  dock bulging under the pointer, a glow that follows it) responds along the whole path
  rather than snapping between stops. Hover itself stays discrete at the endpoints, and
  no sweep is streamed under the touch persona (a finger that is not pressing is not
  there) or under reduced motion (travel collapses, and the sweep with it).
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
  (which ripples the click's arc, letting go from full size rather than snapping back
  to half of it), middle click pulses paired up/down carets, and wheel scrolling
  ripples carets in the scroll direction.
  Every one of these marks is a hairline alive for half a second, which is far less
  ink than a colour chosen for body text and borders carries, so they are drawn in
  `--vd-signal` rather than `--vd-accent`: the same rust in the light scheme, and a
  brighter orange in the dark one, where a thin bright stroke on a dark ground reads
  dimmer than the same stroke inverted. They are also lit rather than merely coloured,
  with a paper halo that cuts them off whatever they landed on and a signal-coloured
  bloom that gives the mark presence, and the ripple holds its brightest frame a beat
  AFTER it appears: peaking on the opening frame spent the whole of the opacity while
  the ring was at its smallest, which is what made a click read as a faint thread
  instead of as a landing.
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
- **Share images**: one per term, and the term's own specimen is the picture (below).
- **Icons**: `public/favicon.svg` is the drawing (the wordmark's serif v on an accent
  tile, the one letter that survives 16 pixels), and `bun run icons` rasters the two
  files an SVG cannot cover: `favicon.ico`, which a browser asks for before it has
  parsed any HTML and which a static host otherwise answers with the 404 page, and
  `apple-touch-icon.png` at 180, without which iOS puts a screenshot of the page on a
  home screen. `theme-color` is declared twice, scoped to the system preference so it
  is right with no JavaScript, and both are re-stated by the theme toggle for a reader
  who has overridden their system.
- Sitemap, RSS feed of newly published terms.

### Share images

A term's share image is its specimen, photographed in the pose identify holds: the
subject summoned, the demo's clock frozen, and the rest of the canvas faded back around
it. A dictionary entry whose whole claim is "here is the thing, live" would be
misrepresented by a text card with the headword set large on a coloured field, which is
what the rest of the web ships. The picture is the demo.

The annotation is deliberately not identify's ink. No accent ring, because a border is
read as chrome once it is the only mark on a still. No subject pin, because the caption
already prints the headword. No scrim, because identify's dark sheet outside the ring
photographs as a rectangle of dead pixels with a hole in it. What is left is light: the
subject at full strength, everything else faded toward the stage's own ground, with a
floor under the fade so the surrounding UI stays readable as context. A whole-scene
subject (§5) fades nothing, which is the honest picture of "all of it".

**The strip (§6) is not in the picture.** It is the exhibit's furniture around the
specimen, and a still has no use for any of it: the mode switch cannot be pressed, and
the announcement and verdict lanes are the site's own voice under a picture whose caption
band already speaks in that voice. Drawn, the strip also pushed the caption band off the
bottom of the 420px frame, so every term with a verdict was photographed with its own
headword cropped in half. A capture therefore draws no strip at all, and the sources it
would have lifted out stay hidden, exactly as they are on a listing card.

A subject that lives in one of those lanes is then not on the canvas to be pointed at
(`pronunciation`, `magic-tap`, `role-description`, `verbosity`,
`presentational-children`). Light aimed at where it used to be would circle empty ground,
so the picture stops pointing: the whole canvas takes the fade evenly and reads as one
specimen rather than as a spotlight on nothing. The cost is real and accepted, and it is
about those five terms rather than about the fade: their share image no longer shows the
utterance that IS the term.

The frame is 1200x630 with the specimen above and a caption band under it carrying the
category, the headword, and the site's name. Dark, because a share image cannot follow
the reader's theme and social clients are mostly dark. A page with no specimen (the
directory, the glossary, a category or facet listing, /search, the 404) falls back to one
site card.

An alias redirect carries the term's card too, `og:url` included, because an alias is
what a reader reaches for and therefore what they paste, and no preview crawler follows a
client-side meta refresh. Sharing `/snackbar` and sharing `/toast` produce the same
picture and both are attributed to `/toast`.

The set is shot from real pages: `/capture/{slug}` renders the frame at 800x420 CSS
pixels, `bun run og` photographs it at a device scale of 1.5, and the PNGs are committed
under `public/og/`. Those pages are unlinked, `noindex`, and out of the sitemap; they are
a set, not documents. Reduced motion is emulated for the reason the identify stills use
it: attract never runs, kit animation is off, and a script-driven demo jumps to its end
state, so the shutter falls on the same moment every time.

Nothing gates the images. A demo can change under its own picture and no check will say
so, which is the trade for a set this size costing no CI: re-shoot a term whose demo you
edited, and re-shoot all of them after a change to the kit.

### Measurement

Analytics belongs in this section because on a dictionary it is a discoverability
instrument, not a growth one. The question worth money here is not how many people came,
it is **which words they reached for and did not find**: a query that lands on nothing, or
only lands after the search throws half of it away, is a missing alias or a missing term,
and that is the same reading list the pipeline (§11) works from.

Google Analytics 4, loaded only when `PUBLIC_GA_ID` is set at build time. That variable is
the whole gate: unset ships nothing at all, which is what every build except the deploy
does, and setting it is a deliberate act by whoever ran the build. Two refusals are built
into the loader and checked before a single byte is fetched, both of them the reader's
rather than ours: Global Privacy Control and Do Not Track. There is no consent banner
because there is nothing to consent to beyond this: no advertising signals, no user-ID, no
cross-site anything.

What is measured, beyond the page views the tag collects on its own:

| Event | Says |
| --- | --- |
| `search` | a settled query that found something: `results`, whether the top hit's **headword** contains what was typed (`names_result`), how many words the salvage pass had to drop (`dropped_words`), `surface` (page or modal), and the `category` / `tag` it was narrowed to when either filter was off All |
| `search_no_results` | nothing matched, even after correcting the spelling and dropping words |
| `search_distant` | it only matched after dropping words, with `ran` (what actually ran) |
| `search_corrected` | it only matched once respelled, with `corrected` (what actually ran). A misspelling that recurs is a spelling readers believe in, and the answer to that one is an alias |
| `search_result_click` | which result was taken, and at what `position`: position IS the relevance test |
| `search_abandoned` | results were shown and nobody took one, reported when the modal closes or the page goes away |
| `search_open` | the modal was opened, and how: nav, `/`, or Cmd/Ctrl+K |
| `relation_click` | a graph edge was crossed, by `relation` kind (`which-word`, `contrast`, `variant-of`, `variants`, `part-of`, `contains`, `see-also`, `prose`, `category`) |
| `alias_hit` | which alias a reader arrived by, handed from the redirect page to the term page |
| `nav_click` | a header link was taken, by `to`: a path for the internal ones, a host for the two outbound. Search is absent on purpose, since it already reports itself as `search_open`, and so is the wordmark, which only ever means "go home" |
| `page_not_found` | a URL the dictionary does not answer, with the headword it was `asked` for and how many suggestions came back: zero suggestions is a word we do not have, a suggestion taken is a word we have under another spelling |
| `not_found_recovered` | which suggestion the reader took, so the guessing can be judged |
| `page_view` | for every page after the first. The tag counts a view when it starts up, which under client-side navigation (§3) is once per visit rather than once per page: a reader who read six terms would otherwise be a reader who read one |
| `page_type`, `term_category` | on every event, because terms live at the root: the URL cannot say what kind of page it is, and never says a term's category. Both are read off the root element, which is also what makes the tag's own bootstrap identical on every page and therefore run exactly once |

A query is only reported once it has stood still for a beat, so the property collects
searches a reader meant rather than the prefixes of words ("k", "ke", "keb"). A filter with
an empty box is browsing rather than asking, so it reports nothing: there is no query to
have failed. The filters ride along on the three query events, which is what makes a
failure legible in the only way that matters here, since "nothing for *grabber* in
accessibility" is a different reading list from "nothing for *grabber*".

A build that carries an ID measures wherever it is served, localhost included, which is how
the wiring gets checked before a deploy. Those hits carry `debug_mode`, so they arrive in
DebugView labelled as a test rather than looking like traffic.

The reading of it is a script rather than a dashboard, because GA4 exposes no API for its
own Explorations, report collections or dashboards, and a report nobody can diff is a report
nobody maintains. `bun run analytics` asks the whole list and prints it, which also means the
questions themselves are reviewable in a pull request.

It reads Search Console in the same breath, because on-site search and Google search are the
same question from two sides. GA says which words a reader typed into our own box and did not
find; Search Console says which words they typed into Google before arriving, and an
impression with no click there is a word we rank for and answer badly. Both lists resolve to
the same action: write the term, or record the alias.

`page_not_found` is the same signal as a failed search arriving by a different door, and
often a better one: a reader who types `/skeleton-loader` into the address bar has told us
the alias we are missing in the plainest possible way.

Two honest limits. `names_result` is false for an alias hit ("snackbar" finds Toast, whose
headword does not contain it), so read it as a lead rather than a failure. And Pagefind
matches loosely enough that a true zero is rare, which makes `search_abandoned` and a deep
`search_result_click` the more reliable "did not find it" signals.

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

**CI gates on every PR**: Zod schema validation · relation integrity + symmetry + stub
existence · tag membership floors and cross-category reach · demo subject marking
(`data-subject`) · no global timers in a demo · the stage-escape rules · unit tests ·
Biome · typecheck · build. All of it is static and runs in about two minutes.

**Gates that run only when asked** (`.github/workflows/e2e.yml`, manual): choreography
execution with asserts · identify subject snapshots · identify mid-attract · takeover
reaching the posed specimen · the reduced-motion guard. This suite is the project's
strongest gate and it is deliberately off the automatic path: a full pass is roughly 45
minutes over 1,076 specimens, which is the entire Actions budget on a private repo. It
is scoped by `grep` for a single specimen, or run in full before a release. The identify
contact sheet is uploaded whenever it runs. Pipeline entry points live in `scripts/`.

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
