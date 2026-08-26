# Canonicalize worklist (stage 2 input)

Consolidated from the enumeration sweep agents' reports (2026-08-10) plus the merge
run, then largely RESOLVED by the canonicalize pass of 2026-08-15 (see below) and by
ten authoring rounds settling contested slugs as they were authored. What remains
live is marked; everything else is kept as the record of what was decided and why.

## Merge stats

- Round one: 866 records swept, 815 unique candidates, against 48 existing terms.
- Round two added 210 records, taking the pool to 1025 unique candidates.
- After the 2026-08-15 canonicalize pass the pool holds 966 records (six folded into
  existing terms, two added by splits), all slug-unique, with registry ids
  consolidated (css→mdn, uxpatterns-dev→uxpatterns, chrome→chrome-developers,
  tailwind-ui→tailwind-plus, framer-motion→motion; systems.json 114→110).
- The wishlist shaping (2026-08-15) took the pool to 969; the dataviz sweep
  (2026-08-18, below) to 983; the second wishlist run (2026-08-19, below) added
  5 more, to 981 (authoring rounds had consumed 7 records in between); the
  2026-08-25 wishlist sweep (below) added 5, taking the pool to 966, all five of
  which round 22 authored the same day; the 2026-08-26 sweep (below) added 3, so the
  pool is 969 records with 3 unauthored.

## RESOLVED: duplicate slugs

The merge run collapsed all 51 round-one cross-category duplicates to single records,
and authoring rounds 4-10 confirmed homes for the contested ones by publishing them:
pagination, inline-edit, coach-mark, captcha, typing-indicator, presence-indicator,
input-mask, comparison-table (component); swipe-to-dismiss, drop-indicator,
drag-to-reorder (pattern); momentum-scrolling, microinteraction,
selection-follows-focus (interaction); layout-shift, thumb-zone, baseline-grid
(layout); mesh-gradient, dithering, forced-colors-mode, apca (color). The
multi-select note resolved exactly as asked: multi-select is the form control,
range-select the shift-click gesture. Still-unauthored contested slugs keep the
merge run's homes, reviewed and confirmed 2026-08-15: zebra-striping and
expandable-row (component), drag-preview, scroll-hijacking and scrollytelling
(pattern), vibrancy (color), access-key (interaction), dynamic-type (typography).

Overshoot: the motion sense owns the slug. The typography sense (letterforms passing
the baseline or cap line) gets a disambiguation sentence in the existing overshoot
article at the relations pass, not its own term. DONE in the relations pass: the
article closes with a paragraph handing the static sense to baseline and cap-height.

## RESOLVED: merge calls (2026-08-15)

- empty-state / zero-state / no-results-state: all three KEPT. The lines are already
  drawn (container holds nothing / first-run teaching / a filter excluded everything)
  and empty-state's article draws them; zero-state remains a stub to promote.
- scroll-scrubbing: FOLDED. scroll-linked-animation carries the alias; scrubbing
  (media) already owns the gesture word.
- activity-bar: FOLDED into navigation-rail (aliases "activity bar", "icon rail").
- cross-document-view-transition: FOLDED into view-transition (aliases added).
- icon-button-label: DROPPED from the pool; it is a technique of accessible-name.
- focus-restoration: FOLDED into focus-management (aliases added); that article
  already teaches the return-on-close move. initial-focus stays its own term.
- flag-object: FOLDED into media-object (alias "flag object").
- cascader: SPLIT. "miller columns"/"column picker" removed from its aliases; a new
  layout candidate miller-columns carries the Finder-column browsing layout.
- blockquote: ADDED as a typography candidate (pull-quote's article already draws the
  passage-lifted vs quoted-from-source line; component.gallery distinguishes them).
- paywall / metered-paywall / feature-gate: all three KEPT as distinct (the wall, the
  metering strategy, the entitlement gate). Contrast edges recorded below.
- flip-animation absorbed layout-animation (alias); synthwave and flat-design-2 were
  authored as deliberate contrasts rather than folded, overriding the earlier lean;
  shared-element-transition folded into view-transition; damping authored as
  spring-animation's companion; motion-token authored against duration/easing;
  rubber-banding folded into overscroll; marquee-selection folded into
  lasso-selection.
- stepper vs step-indicator, focus-trap vs keyboard-trap, split-view vs list-detail,
  scarcity-indicator vs fake-scarcity, countdown-timer vs fake-urgency,
  smart-defaults vs preselected-opt-in: all KEPT as deliberate pairs; the contrast is
  the teaching, wired in prose and due as contrastWith edges.
- mostly-fluid / column-drop / layout-shifter: KEPT as three tail candidates (LukeW's
  canonical names); author together in one round with cross-links, no parent term
  (responsive-web-design is the umbrella).
- vibrancy: aliases "frosted glass" and "materials" removed from the record (they
  belong to glassmorphism); home stays color.

## RESOLVED: alias folds into existing terms (2026-08-15)

Applied (45 aliases across 26 terms), validate-clean. Notable rejections the
collision map caught, left where they are: "flashbar" (callout), "undo snackbar"
(undo), "autosuggest" (typeahead), "duration token" (motion-token), drawer's
off-canvas trio (off-canvas). Deliberately NOT added: "tab list" to
segmented-control (tabs territory), bare "menu" to dropdown, bare "anchor" to
table-of-contents, "radio button" to radio-group, "tag picker" to combobox
(tag-input territory). Bare "autocomplete" was the one contested alias left to the
relations pass, and it RESOLVED to combobox: ARIA's own autocomplete patterns are
combobox patterns, and the libraries shipping an Autocomplete ship a combobox with
suggestions. typeahead's article now says so and hands the third sense to
inline-autocomplete.

## RESOLVED: pool entries retired as already-folded aliases (2026-08-18)

Seven candidates removed from `candidates.json` (983 to 976). Each was a duplicate of a
term already on the site AND already carried as one of that term's aliases, so nothing was
lost: the names stay searchable and `[slug].astro` still redirects them. They were removed
rather than authored because writing them would have produced a second page for a concept
that already has one.

| retired | already an alias of |
| --- | --- |
| acrylic | glassmorphism |
| tone | lightness |
| contrast-color | on-color |
| dynamic-color | material-you |
| increased-contrast | prefers-contrast |
| peek | quick-view |
| rubber-banding | overscroll |

The alias membership was asserted per entry before removal, not assumed. This is what lets
colour, aesthetic and interaction read as genuinely exhausted after round 15 rather than
carrying three permanently unauthorable residues.

## Name collisions needing disambiguation prose (live, due when the second sense arrives)

Handled in the relations pass, where both senses were already published: chart-legend
vs fieldset's legend (both articles now carry the sentence), the three annotations
(chart-annotation names the other two, and bare "annotation" stays unclaimed), thumb
vs thumbnail (thumbnail hands the slider and scrollbar sense over, since it owns the
"thumb" alias), swimlane (content-shelf explains the borrowed name and the axis it
gets confused with). Handled in the stub-promotion round (2026-08-21), the second sense having arrived:
spinner vs spinbutton (spinner's article hands the spinbutton name to stepper, which
owns the alias). Still waiting on a second sense: timeline (no media-editor term),
gutter (no editor term), "ghost text" (no AI-completion term).

thumb (slider) vs thumbnail; timeline (event list, authored) vs timeline (media
editor); chevron/caret (component) vs caret (typography); gutter (grid) vs gutter
(editor); spinner vs spinbutton; swimlane (horizontal band, constantly misused for
the vertical column); "ghost text" (inline autocomplete vs AI completion);
layout-shifter (LukeW) vs layout-shift (CLS, authored); chart-legend vs fieldset's
"legend" alias (authored; both articles owe a sentence); chart-annotation vs
accessibility-annotation (handoff notes) vs ruby-annotation (typography), with bare
"annotation" deliberately unclaimed. Handled already:
multi-column-layout vs text-columns (both articles disambiguate), pull-quote vs
blockquote (article draws it), captions vs caption, focus-visible vs focus-ring,
neubrutalism spelling, Memphis vs Corporate Memphis, Windows Aero vs Frutiger Aero
(windows-aero candidate deliberately skipped), card-flip vs flip-animation (both
authored). Round-two flag on "cover and contain" as a view-progress-timeline alias
was checked and the record is RIGHT: cover/contain are view-timeline range names.

## Contrast edges for the relations pass (RESOLVED 2026-08-21)

All of the below are wired. The pass took every published term from 851-with-nothing
to zero: about 3,300 stored edges, mean degree 3.2, authored family by family rather
than term by term, with contrastWith held to the discrimination test and hubs capped
at eight (combobox, the most name-contested control in the corpus). dark-pattern was
implemented as the head term the category audit called for: seventeen deceptive
patterns declare variantOf and its page derives the family, so nothing is stored
twice. Kept as the record of what fed the pass:

- honest/deceptive pairs: countdown-timer↔fake-urgency,
  scarcity-indicator↔fake-scarcity, smart-defaults↔preselected-opt-in,
  social-proof↔fake-social-proof, input-mask↔forgiving-format (authored both ways in
  prose already).
- paywall↔metered-paywall↔feature-gate; empty-state↔zero-state↔no-results-state
  (partially wired); focus-trap↔keyboard-trap↔focus-management↔initial-focus;
  stepper↔step-indicator↔steps-left; halftone↔dithering; typeahead↔combobox
  (+ the contested "autocomplete" alias decision).
- badge↔achievement-badge, accordion↔expandable-row, hover-card↔quick-view,
  drawer↔mini-cart + help-drawer + off-canvas, combobox↔inline-autocomplete,
  scroll-spy↔reading-progress, segmented-control↔morphing-controls,
  banner↔cookie-consent-banner + hero, app-bar↔page-header + collapsing-toolbar,
  bento-grid/masonry↔card-grid + modular-grid + dashboard-grid,
  optimistic-ui↔offline-indicator, skeleton-screen↔layout-shift + aspect-ratio-box.

## Tags for the relations pass (SHIPPED 2026-08-21)

Shipped with the pass exactly as specified below: a closed `TAGS` enum in schema.ts
beside CATEGORIES and SYSTEMS, blurbs in src/lib/tags.ts, gated by `bun validate`
(8+ members, 2+ categories, at most 4 tags per term, none on stubs), with SPEC §2.5,
the term page, /tags, /tags/{tag}, llms.txt and terms.json updated in the same change.

The 23 that shipped, with member count and the number of categories each reaches:
a11y 12/3, ai 11/4, auth 16/3, commerce 23/3, dataviz 24/6, editorial 26/5,
forms 51/3, gamification 8/2, keyboard 28/3, media 26/6, messaging 20/4,
navigation 31/5, onboarding 15/2, perceived-performance 20/5, platform-registers
31/6, scroll 32/5, search 13/2, selection 14/6, tables 15/4, theming 21/3,
tokens 22/4, touch 40/5, web-platform 41/7. 480 of the 1033 published terms carry at
least one.

Three arrived that the candidate list below had not named: `scroll` (everything
downstream of a page being longer than a screen, the widest facet in the corpus after
touch), `editorial` (the vocabulary the page inherited from print), and `selection`
(marking what an action will apply to). `tables` stayed its own facet rather than
folding into dataviz, since a table is not a chart and only two terms sit in both;
`media` excludes messaging as the note asked; `auth` cleared the corollary with
component and accessibility members, not just pattern; `deceptive` stayed out, as
ruled, because dark-pattern carries that family through variantOf.

Two of the 23 are knowingly interim. The category audit ruled GAMIFICATION and
PERCEIVED PERFORMANCE head-term gaps (both are vocabulary worth a definition and a
specimen), and the head-term rule says a tag must not exist where a head term does.
Neither is in terms or in the pool, so `gamification` and `perceived-performance`
ship as facets to hold the ground. When either is authored, retire its tag in the
same change: the members declare `variantOf` the new head term instead, exactly as
the seventeen deceptive patterns do for dark-pattern. Pool both before the next
round that touches pattern.

One discoverability decision came out of review: readers will hunt the facet list for
the things that are deliberately NOT facets. `/tags` therefore ends with two more
sections, both gated by `bun validate`: the four head terms whose families live on
their own pages (dark-pattern, responsive-web-design, microinteraction, skeuomorphism,
each shown with its family size derived from incoming edges, and none of them allowed
to also be a tag), and the nine categories, linking to their groups on the front page.
A reader searching that page for "dark pattern" or "component" now lands somewhere.

The original framing, kept because the rules are the reusable part:

Decided 2026-08-18: the site gets cross-cutting tags, but they arrive with the
consolidated relations pass, not before, and never from round agents (same
consistency argument that keeps relations empty during rounds: a tag applied to 80%
of its family is worse than no tag). Implementation when the pass runs: a closed
enum in schema.ts beside CATEGORIES and SYSTEMS, validate-gated, with SPEC and the
term page updated in the same change. Target 15-25 tags, each earning its place by
collecting roughly 8+ terms.

The head-term-vs-tag rule: if the family name is itself vocabulary worth a
definition and a specimen (dark pattern, microinteraction, skeuomorphism), it is a
HEAD TERM and relations carry the family; a tag is only for a reader-facing facet
with no definition of its own. Corollary: a tag whose members all share one
category is just a subcategory and is a weak candidate; tags must cut across
categories to pay for themselves.

Candidate vocabulary (grow this list as rounds suggest members; assign at the pass):

- dataviz: chart, sparkline, gauge, stat, dashboard-grid, the three palette terms,
  use-of-color, sonification, plus the 14 records the 2026-08-18 dataviz sweep
  pooled (axis, chart-legend, reference-line, chart-annotation, error-bar,
  truncated-axis, dual-axis, direct-labeling, brushing, small-multiples,
  chart-aspect-ratio, chartjunk, data-ink-ratio, chart-description).
- forms: input-mask, forgiving-format, smart-defaults, stepper, combobox, fieldset,
  inline-edit, plus the validation/error family.
- navigation: navigation-rail, tabs, breadcrumbs, pagination, table-of-contents,
  app-bar, scroll-spy.
- touch: swipe-to-dismiss, thumb-zone, momentum-scrolling, overscroll,
  drag-to-reorder, pull-to-refresh.
- web-platform: view-transition, popover, dialog, forced-colors-mode,
  focus-visible, the invoker vocabulary when it lands.
- commerce: mini-cart, quick-view, paywall, metered-paywall, feature-gate,
  cookie-consent-banner, comparison-table.
- media: scrubbing, captions, media-controls, typing-indicator territory is NOT
  media (messaging); decide at the pass.
- tables: data-table, zebra-striping, expandable-row, treegrid,
  table-header-association; possibly folds into dataviz, decide at the pass.
- auth: magic-link, passkey, social-login, one-time-code-login,
  lazy-registration, honeypot-field, password-strength-meter, type-to-confirm,
  captcha; leans pattern-heavy, so it must show cross-category members at the
  pass or fall to the corollary.
- platform-registers: ten-foot-ui, ornament, menu-bar-extra, spatial-navigation,
  mobile-first; cross-category by construction (pattern, component,
  accessibility). Distinct from web-platform, which is web-API vocabulary.
- perceived-performance: skeleton-screen, optimistic-ui, lazy-loading,
  progressive-image-loading, list-virtualization, load-more, spinner and the
  progress family; cuts pattern, component, and motion. See the head-term gaps
  below: the phrase itself is vocabulary.
- a11y: terms filed under other categories that exist substantially for
  accessibility (roving-tabindex, focusable-scroll-region if it moves,
  touch-target); cross-category by construction. Pairs with the filing rule
  below.
- NOT tags (head terms carry these families): dark-pattern, microinteraction,
  skeuomorphism, responsive-web-design.

Category audit (2026-08-19), recorded so the pass inherits the reasoning: the
nine categories stand and none get split. Pattern's 97 decompose into topical
clusters (deceptive, auth, commerce, gamification, perceived-performance,
input assistance, paradigms) that are all one KIND, a named recurring flow;
topics overlap where kinds do not (drip-pricing is commerce AND deceptive,
infinite-scroll is pattern or anti-pattern by the reader), so topical splits
buy permanent boundary fights and tags or head-term relations carry the
granularity instead. Component is large but single-kind; tags subdivide it.
Resolutions from that audit under the standing rules:

- deceptive is NOT a tag: its members sit almost entirely inside pattern (the
  corollary calls that a subcategory) and dark-pattern is already ruled the
  head term, so relations carry the family.
- input assistance folds into the forms candidate (typeahead, did-you-mean,
  forgiving-format, smart-defaults join it); not its own tag.
- Head-term gaps the audit surfaced, neither in terms nor pool: GAMIFICATION
  (streak, leaderboard, endowed-progress, goal-gradient, steps-left orbit it
  with no head) and PERCEIVED PERFORMANCE (the skeleton-screen family's actual
  umbrella phrase). Both pass the head-term rule (vocabulary worth a definition
  and a specimen); pool them before the next round that touches pattern.
- Accessibility filing rule (the one topical category among kind-categories,
  kept deliberately): a term that exists BECAUSE of accessibility files under
  accessibility; a term that merely affects it files under its kind and gets
  the a11y tag at the pass. The corpus mostly follows this already
  (roving-tabindex sits in interaction); apply it at the pass rather than
  migrating now.

## Stub promotion (SHIPPED 2026-08-21)

All 24 stubs promoted to published in one round, so `bun validate` now reports 0.
They were not skipped by judgement, they fell through a seam: 22 were created by the
pilot commit `51a18b1` and 2 by the scaffold, purely as relation targets under
SPEC 2.3, all of them BEFORE the enumeration sweep existed, and **0 of the 24 ever
had a record in candidates.json**, so no round roster could contain one. Compounding
it, `pool-remaining.ts` built its exclusion set from FILENAMES, so a stub read as
already authored even if a record had been added later: the exact inverse of the
look-and-pinch trap recorded above, where the record outlived the file. The round
process never used the word "stub" and its report format tracked pool drain rather
than stub debt, so the "24 stubs" line printed by every validate run for two weeks
was nobody's task. Fixed at the source: `pool-remaining.ts` now reads frontmatter
status and prints a STUBS work list, and SKILL.md section 6 documents the promotion
round shape.

Roster notes worth keeping. All 24 survived the collision sweep as distinct terms and
none merged, but two needed the existing graph consulted before they held:
`zero-state` against empty-state (which reports an absence) and first-run-experience
(which happens once), and `semantic-color` against color-role (one system's named
slot) plus color-token, primitive-color-token and color-ramp. Both were already
declared as contrasts by terms authored later, which is what settled them. Three
menu terms landed in one round and stayed distinct by subject: overflow-menu is the
PANEL, meatball-menu and kebab-menu are their TRIGGERS, dropdown is the dropped panel
of a value control.

Mechanics that made 7 parallel agents safe on a shared graph: authors declared
relations only in their own files and never touched a neighbour's frontmatter, so
validate reported 46 one-sided symmetry errors by design and the main session closed
them centrally. Closure pushed `select` to nine contrasts, over the eight-contrast
hub cap, so radio-group's added `select` edge was dropped (its table already carries
checkbox, group-label, selection-card and segmented-control). Check the cap AFTER
closure, never before.

Tags were assigned centrally rather than by the agents, because these terms belong
to facets that had already shipped complete and omitting them is the regression the
"arrives complete" rule exists to prevent. Ten took tags, matched to how each facet
was applied to that term's own family: dropdown [forms]; radio-group
[forms, selection]; spinner and shimmer [perceived-performance]; aria-hidden
[web-platform]; focus-trap [keyboard]; skip-link [keyboard, navigation];
table-of-contents [navigation]; zero-state [onboarding]; semantic-color [tokens].
The other 14 stayed untagged because their nearest siblings are (banner was the close
call: toast carries messaging, but callout, status-message and cookie-consent-banner
do not, so it went untagged with the majority).

Implementation rows that failed verification and were dropped, worth not re-trying:
fluent Overflow and fluent Header/AppBar (JS-rendered storybook shells), fluent
Shimmer (SPA shell, and the Fluent 2 skeleton path 404s), polaris Banner and polaris
Spinner (both 301 to a generic docs index), carbon skip-to-content (404), and the
aria-apg "hiding semantics" page, which turns out to document the presentation role
rather than aria-hidden. Carbon's motion URL moved to /elements/motion/overview/.

## Known coverage gaps (follow-up sweeps)

- User wishlist (2026-08-15), shaped and pooled: abbreviation (typography, core,
  absorbing the abbreviation-expansion record), pixel-density (layout, core; DPI/PPI/
  retina as aliases), chamfer (aesthetic, tail; must disambiguate the bevel term),
  interface-metaphor (pattern, head; reshaped from "figures of speech", whose
  idiom/localization half belongs to plain-language).
- User wishlist (2026-08-19), shaped and pooled (5 records): cmyk (color, core;
  'subtractive color' left unclaimed for a possible additive/subtractive pair),
  natural-language-interface (pattern, core; 'conversational interface'
  deliberately not claimed, it is its own possible chat-shaped term),
  scroll-edge-fade (pattern, core; 'scroll shadow' left unclaimed, alias or
  variantOf at authoring time), ten-foot-ui (pattern, core; shaped from the
  wish "Game/Console UI": the game half is covered by diegetic-interface /
  fictional-user-interface / hud-panel, and 'console UI' is claimed by
  terminal-aesthetic as the other console, so the gap is the TV register; slug
  spells the number out per sixty-thirty-ten-rule), signed-distance-field
  (typography, tail; filed at the text-rendering angle, not raymarching).
  Considered and rejected (2026-08-19): raymarching. It names an algorithm, not
  an interface phenomenon; the looks its output reaches design as are covered
  (aurora-ui, mesh-gradient, hyperreal-3d), and its honest specimen would be a
  WebGL shader demonstrating rendering rather than interface. It belongs as a
  sentence in the future signed-distance-field article, not as a page.
- User wishlist (2026-08-20), one pooled, one resolved into a published term:
  transparency-checkerboard (color, tail; from the wish "Chequer/Checker",
  canonicalized to the alpha-indicating tool convention with checkerboard /
  chequerboard / transparency grid / alpha grid as aliases; both sources
  verified). Sense fences: the aesthetic motif stays prose inside vaporwave and
  acid-graphics per the digital-rain rule, and the alternating-content sense
  belongs to the pooled zigzag-layout, which gained the 'checkerboard layout'
  alias in the same pass. "Segmented input" turned out to be covered: published
  pin-input already carried 'segmented code input', now also carries the exact
  'segmented input' spelling, and the structured-format pool record ceded that
  alias (its note says why) so the future authoring round cannot collide.
- User wishlist (2026-08-25), shaped and pooled (5 records, pool 961 to 966):
  hydration (pattern, core; already load-bearing in ghost-click and
  flash-of-inaccurate-color-theme with no definition on site, filed at the design
  angle, the window where a page is painted but answers nothing; MDN has no
  glossary entry, checked 404, so the SSR entry is the platform source;
  progressive / selective hydration, islands and resumability left unclaimed),
  autofill (pattern, core; load-bearing in eight published articles, ALIAS FENCE
  never claim "autocomplete", which typeahead already rules overloaded and splits
  three ways, the attribute tokens staying with input-purpose and the SMS
  one-time-code sense with pin-input), speculative-loading (pattern, core; from
  the wish "Page prefetching / preloading", canonicalized to MDN's umbrella name
  because it is the only word holding preconnect, dns-prefetch, preload, prefetch
  and prerender together, with all four spellings as aliases; contrast is
  lazy-loading, and magic-link's mail-scanner prefetchers are the same mechanism
  biting a design), labor-illusion (pattern, core; from the wish "Fake loading
  bars", taking the researched headword and aliasing the vernacular after
  endowed-progress's precedent; NOT a fake-* dark-pattern sibling, the finding is
  that readers preferred the slower transparent search, so the dishonest bar is
  the article's failure mode; "operational transparency" left unclaimed as the
  honest half's own possible record; name keeps the cited title's American
  spelling, "labour illusion" carried as an alias), overloaded-command (pattern, tail;
  from the wish "Overloaded element", which was ambiguous, so the record claims
  the one sense with a named source, NN/g 2011, two Home buttons meaning
  different things). OPEN QUESTION for the human: if "Overloaded element" meant
  one control carrying several actions by input type (tap vs long press vs
  secondary click, covered only piecewise today) or nested interactive elements
  (axe's nested-interactive, a card that is a link with buttons inside), those are
  separate unpooled records. All eight source URLs verified live 2026-08-25 except
  the three read from search listings (MDN SSR glossary, react.dev hydrateRoot,
  web.dev rendering-on-the-web); MDN Glossary/Hydration confirmed absent.
  ALL FIVE AUTHORED the same day, in round 22, which empties the pool: five records
  pooled and five published, so `pool-remaining.ts` now prints nothing at all and the
  next round has to be a wishlist or a sweep before it can be a round.
  REJECTED the same day, by the human: scandinavian-design (shaped, pooled, then
  pulled). It was the roster gap between mid-century-modern and minimalism on
  paper, but it is not a look an interface reaches for under that name, and the
  record would have been a furniture-and-lighting story with no honest
  implementation to point at. Do not re-pool it from a later aesthetic sweep;
  hygge and japandi stay unclaimed for the same reason.
- User wishlist (2026-08-26), shaped and pooled (3 records, pool 966 to 969):
  concentric-corner-radius (layout, core; from "Concentric border radius", filed as
  the nesting rule rather than as a look, inner equals outer less the padding, with
  Apple's WWDC25 word "concentricity" and SwiftUI's ConcentricRectangle as the
  platform hook and the HIG row recorded verified:false because the page is
  JS-rendered), color-coding (color, core; the encoding scheme itself, fenced against
  four neighbours that each own a piece of it, and flagged as the one a canonicalize
  pass might still fold into categorical-palette), trace-viewer (component, core;
  nested spans on one time axis, which clears the dataviz rule that chart TYPES stay
  out because it is an interface pattern rather than a chart, with flame graph and
  flame chart left unclaimed as their own possible record and 'waterfall view' as the
  alias since masonry holds 'waterfall layout'). All slugs and every proposed alias
  checked against the 1,070 published terms and their aliases: no collisions. Five of
  the six source URLs verified live 2026-08-26; the two Apple pages resolve without a
  body, as every HIG row in this file does.
  TWO GAPS NAMED, DELIBERATELY NOT POOLED, because they were not asked for: there is
  no corner-radius term at all (squircle and chamfer both lean on border-radius with
  nothing to link to, and neither corner-radius nor border-radius is claimed as slug
  or alias), and syntax-highlighting is neither a term nor a candidate.
- User request (2026-08-20), pooled: press-drag-release (interaction, tail; the
  one-gesture menu tracking where pressing opens, dragging travels, releasing
  commits). Canonicalized to the Mac menu-tracking name; "sticky menus" is the
  named CONTRAST (the Mac OS 8 two-click mode), used in the article and never
  claimed as an alias. WCAG 2.5.2 pointer cancellation is the standards hook
  (up-event commit); HIG menus source verified on URL resolution only. Demo is
  performable with the existing drag step; the demo side needs pointerdown-open
  plus pointerup-commit wiring with the law-22 capture guard.
- Pool hygiene (2026-08-19): removed the stale look-and-pinch record (the term
  was authored and published while the record stayed behind; its `demo: none`
  note aged out the same day the gaze persona landed). If a roster collision
  ever smells like this again, check the terms directory before trusting the pool.
- Creative-coding probe (2026-08-19): the domain proved already ~90% mined (its
  looks are aesthetics, its defects color terms, its motions motion terms), so
  no domain sweep. Two gaps pooled: identicon (component, core; generative art
  that is pure interface, deterministic by seed so the specimen is stable by
  construction) and vignette (aesthetic, tail; the article must draw the scrim
  boundary, functional vs compositional). Algorithm layer stays out per the
  raymarching rule: perlin/simplex as algorithms, voronoi, flow fields, boids,
  L-systems, marching squares, feTurbulence. A third gap pooled the same day:
  particle-background (motion, core), the umbrella artifact for the
  agent-driven animated background, carrying boids, flocking, constellation,
  plexus, and starfield as aliases after gooey-effect's precedent of aliasing
  the implementation; digital rain deliberately excluded (its own icon, in the
  terminal and cyberpunk family, still unpooled).
- Dataviz sweep (2026-08-18), shaped and pooled: 14 interface-facing records
  spanning six categories (see the dataviz tag above for the list). Scope decision:
  chart TYPES stay out of the pool; the authored chart head term carries the
  encoding choice, per its own record notes. Rejected as already covered:
  pattern-fill (use-of-color alias), heatmap-scale (sequential-palette alias),
  number ticker (count-up-animation), tabular figures (authored). All 22 source
  URLs verified live 2026-08-18; datawrapper and eagereyes URLs recorded at their
  post-redirect canonical forms. Honesty terms (truncated-axis, dual-axis) carry
  data-pose specimen notes; hairline and drag laws noted where they bite
  (reference-line, brushing).
- Named gaps with no record anywhere: oversized typography / big type; millennial
  beige / sad beige; plain elevation as its own term; the HTML invoker vocabulary
  (invoker commands / commandfor / interest invokers / dialog closedby, Baseline
  2025-12) belonging with dialog/popover; APG's "disclosure widget" phrase; "top
  shelf" (tvOS) as new layout or content-shelf alias; Blueprint's "entity title" as
  a page-header alias.
- Round-one unrecorded stragglers now mostly authored (magnetic-button,
  cursor-follower still pending, fill-mode authored, terrazzo/low-poly authored or
  pooled); editorial/magazine style authored as editorial-web-design; sci-fi HUD
  authored as fictional-user-interface.
- welie.com is dead (SEO spam); never source it. ui-patterns deep links use
  inconsistent slug casing; deceptive.design per-type pages 504'd at sweep time.
- Deliberate omissions stand: ~90 pure cognitive-bias names, VPAT/ACR/ACT/POUR
  policy vocabulary, block formatting context.

## Registry notes (live residue)

- deque rows mirroring WCAG criteria should point at w3.org Understanding pages;
  postcss row actually cites csstools; angular row cites @angular/cdk; uikit is
  Apple UIKit, never getuikit.com; goodui's 12 rows point at the site root and need
  per-idea URLs or removal before those candidates are authored.
- Paid or gated, marked: every-layout, tailwind-plus, mui-x, adobe-fonts,
  illustrator. maintained:false: wired-elements, wicg.
- 1 row still unverified (HIG tint color, JS-rendered); tanstack and embla rows
  resolve root URLs.

## Attributions to verify before publishing

Olia Lialina for "vernacular web" (verified in the r9 vernacular-web article); CSS
`corner-shape: squircle` support; the two HIG aesthetic rows marked verified on URL
resolution only (JS-rendered pages).
