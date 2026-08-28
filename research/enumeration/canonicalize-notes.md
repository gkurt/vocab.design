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
  which round 22 authored the same day; the 2026-08-26 sweeps (below) added 3 and then
  3 more, to 972, all of which round 23 authored, emptying the pool completely; the
  second 2026-08-26 wishlist sweep (below) added 5, to 977, and the parked-items sweep
  the same day (below) added 33, taking the pool to 1,010 records with 38 unauthored,
  the largest unauthored backlog since round one, all 38 of which round 24 authored the
  same day, emptying the pool again; the 2026-08-28 wishlist sweep (below) added 8, taking
  the pool to 1,018 records with those 8 unauthored, which is what pool-remaining.ts now
  prints. That count is the length of candidates.json, which is APPENDED to and never
  regenerated: see the pipeline gotcha filed with the 2026-08-28 entry before running
  scripts/merge-enumeration.ts.

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
  THE SAME DAY, at the user's word, three more pooled (969 to 972): the two gaps this
  sweep had only NAMED, corner-radius (aesthetic, head; filed with its siblings
  squircle and chamfer, which both define themselves against a border-radius the site
  never had, while its concentric partner stays in layout as a nesting rule) and
  syntax-highlighting (color, core; the canonical instance of colour coding, so
  variantOf rather than a fresh contrast, fenced against code-editor whose own
  definition already lists syntax colouring as an editor feature, and carrying
  'semantic highlighting' as an alias that is the obvious later split), plus one the
  user added, diff-viewer (component, core; split versus unified is the term's own
  axis and the demo's main move, with three-way merge and blame left unclaimed as
  neighbouring components rather than aliases). All three checked clean against every
  term slug, name and alias; MDN border-radius and both VS Code pages verified live,
  the Material shape page recorded verified:false as another JS-rendered shell.
  Pool 972, six unauthored, which became round 23, authored the same day: the pool is
  empty again, and pool-remaining.ts prints nothing.
- User wishlist (2026-08-26, second run), shaped and pooled (5 records, pool 972 to
  977, and the first records in the pool since round 23 emptied it):
  node-graph (component, core; from the wish "Node graph / flowchart", which is TWO
  things, so the record claims the editable one, nodes wired by lines where the wiring
  is the content, and deliberately does NOT claim "flowchart" as an alias because the
  read-only diagram sense, a chart rendered from text, Mermaid and diagram-as-code, is
  a separate record with a different subject and claiming the spelling here would fence
  it out; React Flow's Handle and Blender's colour-coded socket are the two vocabularies,
  and the socket refusing an invalid wire is the design content; handle/port, edge
  routing and auto-layout left unclaimed),
  autoplay (pattern, core; load-bearing in SIX published articles with no definition
  anywhere on site, lottie, flashing-content, captions, video-player, lightbox and
  audio-control, whose definition line is written against it; ALIAS FENCE, never claim
  "autoplay audio" (audio-control) nor "pause button" or "carousel pause control"
  (pause-stop-hide), because those two terms are the REMEDIES anchored to WCAG 1.4.2
  and 2.2.2 while this is the behaviour and its permission regime; canonicalized on
  MDN's definition, playback begun without the reader specifically asking, and the
  specimen note warns that synthesized events grant no user activation, so a demo must
  portray the refusal rather than lean on a media element's real policy),
  scheduler (component, core; from "Google Calendar style Scheduler component",
  canonicalized to the libraries' umbrella name, MUI X ships a Scheduler whose
  components are Event Calendar and Event Timeline, with FullCalendar's "time grid" and
  the plain "week view" as aliases; DOUBLE FENCE, the published calendar term is
  deliberately the MONTH grid and owns "month view", "date grid", "mini calendar", and
  "timeline" in scheduler libraries means the resource-rows view, which is neither the
  site's timeline nor this record and belongs to an unpooled gantt-chart; agenda view,
  recurring event, time-zone display and drag-to-create left unclaimed),
  preview-text and bulletproof-button (both pattern, core and tail, from the vaguest
  wish, "Something about email HTML?"). That wish turned out to name a whole uncovered
  MEDIUM rather than a term: 1,076 published terms and not one mail word, and the
  registry held 110 systems with no mail source either. Two words earn a page on their
  own strength and are pooled; the rest are named and left for the human. preview-text
  takes Litmus's own distinction (preview text is what the INBOX prints, preheader is
  what shows at the top of the mail BODY, and the two are conflated everywhere), with
  preheader as the alias so the conflated search lands, and its specimen is a still
  script, two inbox rows at rest, one authored and one scraped, because the scraped
  default is how "View this email in your browser" ends up as the pitch.
  bulletproof-button is Campaign Monitor's coinage, buttons.cm still emitting VML in an
  Outlook conditional comment, and it carries an HONESTY FENCE: never mock a named
  client's chrome, never impersonate Outlook (SPEC 1), so the demonstration is one
  construction under two capability regimes side by side, fill honoured and fill
  refused. MAIL WORDS LEFT UNCLAIMED, for the human before any is pooled: dark mode in
  mail, table-based layout, hybrid/fluid-hybrid coding, the unsubscribe link (its
  dishonest end is already roach-motel), transactional versus marketing mail, double
  opt-in, alt text used as copy for blocked images. Print is the other medium with no
  words at all; noted, not pooled.
  All five slugs and all eighteen proposed aliases checked against the 1,076 published
  terms and every alias they claim (5,162 claimed spellings): no collisions. Every
  source URL verified live 2026-08-26, eleven of them, and the Blender manual answers
  200 to curl while refusing a bot fetch, which is worth knowing before someone marks
  it dead. THREE SYSTEMS ADDED to systems.json (110 to 113), because a candidate must
  not reference an id the registry does not hold: xyflow (React Flow, MIT, 38.1k stars,
  10.97M weekly), fullcalendar (MIT core with paid Premium plugins, 20.6k stars), and
  litmus (free-docs; the testing product is paid, the guides are not). Trust numbers
  read from the GitHub and npm APIs on 2026-08-26. The whole pool's implementation rows
  now resolve against the registry with no dangling ids.
- PARKED ITEMS SWEEP (2026-08-26), shaped and pooled (33 records, pool 977 to 1,010).
  The human was shown every item this file had ever named and left undecided, and
  approved all of them except the hydration family, on the grounds that hydration reads
  as an engineering problem rather than a design one. So this entry is the answer to a
  backlog rather than to a wish, and every item it does NOT pool is listed at the end.
  The 33, by family:
  GRAPH (4, all siblings node-graph named and refused hours earlier): flowchart
  (component, core; the read-only sense, claiming 'diagram as code' too, since the
  modern fact about a flowchart is that nobody positions it), node-port (component,
  tail; headword qualified because bare 'handle' belongs to drag-handle and 'pin' is
  scroll-pinning's alias, with Blender's typed colour-coded socket as the design
  content), edge-routing (layout, tail), graph-layout (layout, tail; NAMING FENCE, the
  node world says 'auto layout' but Figma owns that spelling for the flex-like frame and
  that meaning is far more searched, so this record takes the graphviz-era name and
  FIGMA'S AUTO LAYOUT IS NOW A NAMED UNPOOLED RECORD of its own).
  SCHEDULER (4, siblings scheduler named): agenda-view (component, core; carrying the
  trap that FullCalendar v3 used 'agenda' for the day-and-hour GRID before renaming it
  timeGrid, while Google renamed its LIST from Agenda to Schedule, so the word points at
  two things depending on library and year), gantt-chart (component, core; clears the
  dataviz chart-TYPES rule the way trace-viewer did, an interface rather than an
  encoding, and it had been named by two separate fences before it was pooled),
  recurring-event (pattern, core; RFC 5545 RRULE as the shared vocabulary, the
  this-event / this-and-following / all dialog as the design content), time-zone-display
  (pattern, tail; THE WEAKEST HEADWORD IN THE SWEEP, said plainly, nobody speaks it, so
  local time / secondary time zone / time zone selector are all carried as aliases and
  renaming it later costs no search terms).
  DEVELOPER VIEWS (3, siblings trace-viewer and diff-viewer named): flame-graph
  (component, core; Gregg's flame-graph-versus-flame-chart distinction IS the article,
  and 'waterfall view' stays trace-viewer's), three-way-merge (component, tail; four
  regions in one screen, three read and one written, which is a layout problem before it
  is a code one), blame-view (component, tail; alias is 'annotate view', never bare
  'annotation', per this file's earlier decision).
  MAIL (9, taking the medium from two words to eleven): subject-line and sender-name
  (pattern, core and tail; with the already pooled preview-text these are the three
  fields of the inbox row, and Litmus's anatomy piece treats them as one composition,
  which is the frame), dark-mode-email (pattern, core; distinct from the published
  dark-mode because the CLIENT answers the preference for you and may fully invert your
  call to action, so the craft is defensive: mid-tones survive, near-black dodges the
  hardcoded flip, transparent logos need a plate), table-based-layout (layout, core;
  FENCED against data-table, and role='presentation' is the accessibility content that
  earns it a page here rather than in a mail handbook), fluid-hybrid (layout, tail;
  responsive design solved WITHOUT the tool it is named after, no media query at all,
  with ghost tables for Outlook, and a canonicalize question about whether it should be
  a derived member of the responsive-web-design facet), unsubscribe-link (pattern, core;
  the honest counterpart to roach-motel and confirmshaming, and the mechanism has left
  the mail body since clients now draw their own button from the List-Unsubscribe
  header), double-opt-in (pattern, core; the same mechanism as magic-link put to a
  different purpose, with single opt-in as the named contrast and not an alias),
  transactional-email (pattern, core; a legal and a design distinction at once, and the
  cross-sell smuggled into a receipt is where it touches dark-pattern territory),
  styled-alt-text (pattern, tail; FENCED against the published alt-text, and the tension
  is that one string serves a blocked image and a screen reader at once; 'image
  blocking' was considered as the headword and rejected because the design decision is
  the fallback, not the client's setting).
  MEDIUM CORRECTION, so it does not propagate: print is NOT 'a medium with no words at
  all', as this file said earlier today. page-break, orphan, cmyk, point-size, ink-trap
  and halftone are all published. What was missing is one record, print-stylesheet
  (pattern, core), the decision of what a page BECOMES on paper, fenced against
  page-break, which owns where the cut falls.
  THE REST (12): hidden-gesture (interaction, core, and it is THE ANSWER TO THE
  2026-08-25 'overloaded element' OPEN QUESTION, at an angle: the site already covers
  each input piecewise and nested-interactive got published, so what was missing was the
  word for the defect they share, an action with no signifier; if the literal 'one
  control, several actions by input type' record is still wanted it remains unpooled and
  this is not it), drag-to-create (interaction, core; the second interaction record in a
  category the pool emptied first), operational-transparency (pattern, core; the honest
  half of labor-illusion, contrast edge between them), additive-color and
  subtractive-color (color, core; the pair cmyk asked for, each fenced as PRINCIPLE
  against a published SPACE or MODEL, and 'rgb' is srgb's alias so additive must never
  claim it), conversational-interface (pattern, core; natural-language-interface is the
  input MODE, this is the SHAPE, a transcript that is the whole screen), digital-rain
  (aesthetic, tail; excluded by the 2026-08-19 creative-coding probe, now approved),
  oversized-typography (typography, core; the site had every mechanic of large type and
  no word for the look), elevation (aesthetic, HEAD, and the largest gap on the list:
  23 published articles use the word, elevation-overlay and surface-tint both define
  themselves against it, flat-design is defined by removing it, and nothing defined it;
  the site has no drop-shadow term either, which stays unclaimed), invoker-command
  (pattern, core; Baseline 2025-12, and dialog's closedby is a DETAIL for the
  modal-dialog article, not a record, noted so nobody pools it), interest-invoker
  (pattern, tail; the interesting part is the platform DEFINING interest per input,
  which is hover-intent's problem standardised, and the touch answer is the half
  designers keep getting wrong), top-shelf (layout, tail; see the alias rulings below).
  THE THREE ALIAS QUESTIONS ARE NOW CLOSED, and two of them are refusals:
  'disclosure widget' needs nothing, because the published disclosure term already
  carries 'show hide' (aria-apg) and 'disclosure control' (hig), which is APG's own
  naming; 'entity title' is NOT a page-header alias, verified from Blueprint's source
  rather than its JS-rendered docs (EntityTitle is a reusable title block with a
  configurable heading level, icon, subtitle and tag, used in many contexts), so
  page-header plus heading already cover it; and 'top shelf' is NOT a content-shelf
  alias either, since content-shelf is a row of cards per category and the top shelf is
  one placement on one platform's home screen, its sectioned style being where the
  confusion came from, so it is pooled as its own record instead.
  DELIBERATELY NOT POOLED, against the blanket approval, with the reason: millennial
  beige / sad beige. It is the scandinavian-design case exactly, which this human
  rejected on 2026-08-25 for being a furniture-and-lighting story with no honest
  implementation to point at. 'Sad beige' traces to a 2021 TikTok account satirising
  upscale children's retailers, and the best citations are a dictionary blog and
  parenting coverage; the interface half of the trend is already held by the published
  neutral-palette. If it is wanted anyway it needs an interface-facing source that does
  not exist yet, so it is being refused here rather than pooled thin.
  STILL UNPOOLED AND NAMED BY THIS SWEEP, for a later decision: the hydration family
  (progressive and selective hydration, islands architecture, resumability), refused by
  the human as engineering rather than design; Figma's auto layout; a literal
  'one control, several actions by input type' record; diagram-as-code as its own record
  if flowchart ever cedes the alias; ghost table; drop-shadow; marketing email as
  transactional-email's contrast; the preference centre as the fair version of an
  unsubscribe; a paged-media record for @page margins and running headers; and obstacle
  avoidance and edge bundling under edge-routing.
  VERIFICATION: all 33 slugs and all 93 proposed aliases checked against the 1,076
  published terms and their 5,162 claimed spellings, no collisions; every relatedSlug on
  all 33 records resolves to a published term or a pooled record. All 52 distinct source
  and implementation URLs on the 33 records answered 200 on 2026-08-26, but two carry a
  caveat worth keeping: the INFORMS labor-illusion paper answers 200 to a browser user
  agent and 403 to curl with its body behind the publisher either way, which is why
  operational-transparency also cites the 2019 HBR piece as the readable source, and the
  Apple HIG Top Shelf page answers 200 with no body at all (JS-rendered), so its row
  stays verified:false like every other HIG row in this file. The Blender manual behaves
  the same way in reverse, 200 to curl and 403 to a bot fetch, noted in the earlier
  entry. Trust numbers for the new systems read from the GitHub and npm
  APIs the same day. TWO MORE SYSTEMS ADDED (113 to 115): mermaid (MIT, 89.9k stars,
  15.0M weekly) and campaign-monitor (free-docs; its dev-resources index answers 403 to
  an automated fetch while the guide pages answer 200, so probe the deep link, never the
  index). The whole pool's implementation rows still resolve against the registry with
  no dangling ids.
- CATEGORY MODEL CHANGE (2026-08-26): `surface` carved out of `aesthetic`, taking the
  enum from nine to ten (SPEC 2.2, which now states the color/surface/aesthetic line
  outright). 21 terms moved in: the corner and edge words (corner-radius, squircle,
  chamfer, bevel, concentric-corner-radius, blob-shape), the depth and light words
  (elevation, long-shadow, gloss, specular-highlight, neon-glow), and the texture and
  finish words (grainy-gradient, gradient-border, progressive-blur, vignette,
  letterpress-text, holographic-foil, dot-grid-background, halftone, terrazzo,
  scanlines). Two more were misfiled in other directions and went with the same pass:
  visual-hierarchy to layout (a principle, not a look) and deformable-ui to motion
  (squash and spring is change over time).
  DELIBERATELY NOT MOVED, so a future sweep does not re-open it: the gradient family
  (gradient, conic-gradient, mesh-gradient) stays in color, because a gradient's claim
  is which colours; opacity and blend-mode stay in color as compositing's neighbours;
  and elevation-overlay and surface-tint stay in color even though elevation itself is
  now surface, because their claim is which colour a raised plane takes. That last one
  is the shape of split worth accepting rather than fixing: relations carry a family
  across a category line, which is what SPEC 2.2 says they are for.
  CONSEQUENCE FOR THE PIPELINE: scripts/merge-enumeration.ts reads one sweep file per
  category, so it will warn "missing sweep file: surface.json" until a sweep produces
  one, and any future shape, edge, depth or finish candidate belongs in that file rather
  than in aesthetic.json. The old records in candidates.json are all authored, so none
  were re-filed.
- ROUND 24 (2026-08-26): all 38 records authored, taking the site from 1,076 to 1,114
  terms and emptying the pool.
  Batched by FAMILY rather than by category, seven batches: graph 5, scheduler 6,
  developer views 4, mail inbox 6, mail craft 5, platform 6, look 6. That is the
  decision worth keeping. The mail words are a family of eleven spanning two
  categories, so batching by category would have split them across two rounds and
  minted stubs for the half that waited, and one owner per family also puts both sides
  of every intra-family discrimination in one head (preview-text against subject-line,
  additive against subtractive, node-graph against flowchart).
  Relations were declared ONE-SIDED, in the authors' own files only, and closed
  centrally afterwards: 93 symmetric edges across 80 published files. That closure is
  worth scripting rather than doing by hand, and the script has one trap. A membership
  test written as \b<slug>\b matches a longer slug that merely CONTAINS the short one,
  because a hyphen is a word boundary, so "elevation" tested true inside
  "elevation-overlay" and that edge was silently skipped (found by re-running the gate,
  fixed by hand). Match the list item, never the substring.
  TAGS: nothing in the round declares one, per the arrives-complete rule, and it leaves
  three facet candidates. The eleven mail words are the real one: either `messaging`
  (20 members, "conversations, presence, and things that arrive unannounced") adopts
  the mail family whole, or the mail family wants a facet of its own, and either way it
  is one pass over all eleven plus the published neighbours it would otherwise
  contradict (magic-link, one-time-code-login, roach-motel, confirmshaming), never a
  mid-round sprinkle. Cheaper and narrower: `media` (26) for autoplay, and
  `web-platform` (48) for invoker-command and interest-invoker, which name real
  attributes rather than design ideas.
  fluid-hybrid declares variantOf: [responsive-web-design], so the term-named facet
  adopts it by derivation with nothing declared, which is that mechanism working as
  intended rather than something to fix.
  VERIFICATION RESIDUE: two implementation rows stay verified:false on URL resolution
  only, Material 3's Elevation and the HIG's Top Shelf, both JS-rendered pages that
  answer an automated fetch with no body. Neither article was worded from them.
  NOT PROVEN: the specimen suite. The static gates are green (1,114 terms valid, 0
  stubs, typecheck, biome, unit tests) and every author audited its own specimens
  through vd-stage.audit() on the dev server, but no subject snapshot exists for the 38
  new specimens until a test:e2e:new run writes one, so what each of them identifies as
  is recorded nowhere yet.
- User wishlist (2026-08-28), shaped and pooled (8 records, pool 1,010 to 1,018, and the
  first records since round 24 emptied it). Three wishes, and each one turned out to name
  a family rather than a term, so the round is batched the way round 24 was: by family,
  three of them.
  WORDS (2 records, from "Fine print"): fine-print (typography, core; the FTC's own
  doctrine is the design content, the four P's of prominence, presentation, placement and
  proximity, plus the 2014 maxim that what the headline giveth the footnote cannot taketh
  away; the honest use IS the definition, since a real condition really does have to be
  stated somewhere, and burying a material term is the failure mode reached by a contrast
  edge rather than the thing itself) and microcopy (pattern, HEAD, and the largest hole
  this sweep found: 1,114 published terms and not one word for the words, while the site
  already defines a dozen instances of it, error-message, helper-text, empty-state,
  no-results-state, placeholder-as-label, confirmshaming; 'UX writing' is carried as an
  alias on Yifrah's own ruling that the two are synonyms, and NN/g's boundary is the one
  the article should use, copy shorter than three sentences that is read more often than
  anything else on the screen).
  ALIAS FENCES on those two are the crowded part. fine-print may never claim 'disclosure'
  or anything near it, because FIVE published terms already split that family (disclosure
  the widget, progressive-disclosure, expanded-state, menu-button's 'disclosure button',
  disclosure-triangle's 'disclosure indicator'), and never 'helper text', 'hint text',
  'supporting text', 'assistive text' or 'field description', all five of which are
  helper-text's. microcopy is the CLASS and must never claim its instances for the same
  reason. 'footnote' is left DELIBERATELY UNCLAIMED as its own possible record, since no
  published term holds the word and a footnote is an editorial device rather than a legal
  one.
  FIDELITY LADDER (3 records, from "Mockup / Mock UI"): wireframe (pattern, HEAD),
  mockup (pattern, core) and prototype (pattern, core), pooled as a family so that no one
  of the three has to be authored against an unpooled contrast. The sources agree on the
  axis and it is worth writing down once: wireframe and mockup differ by FIDELITY and are
  both static, while only a prototype is interactive.
  CATEGORY QUESTION, and it is the real finding of that wish: the three are
  REPRESENTATIONS, and none of the ten categories is about representations. They are filed
  in pattern as the least-wrong home, and layout was the tempting alternative for
  wireframe alone until it became clear that taking it would split the family across two
  categories, which is exactly what round 24 learned not to do. The precedent for filing a
  non-interface artifact at all is already on site twice: type-specimen is typography and
  accessibility-annotation is accessibility, both filed by material rather than by kind.
  If a canonicalize pass wants to move all three, move all three.
  Three more fences there. hand-drawn-ui already owns 'wireframe aesthetic' and 'lo-fi
  look', so the LOOK is claimed and wireframe is only the artifact; skeleton-screen owns
  'skeleton' and 'content placeholder', and the discrimination worth writing is that a
  skeleton is the wireframe the READER sees at runtime while a wireframe is the one only
  the team sees; and prototype may never claim 'hotspot', however uniformly every
  prototyping tool uses the word, because coach-mark carries it already.
  MOCK UI, taken separately (1 record): fake-door (pattern, core), which is the only part
  of that wish naming something a reader can actually meet, a control that looks shipped
  and leads nowhere on purpose. The design content is the reveal, the one part a designer
  composes, and it is also the line the term must not cross: a signposted fake door is an
  experiment, a fake door that harvests a card number for a feature that does not exist is
  deception, so dark-pattern is a CONTRAST and never a parent. The labor-illusion ruling of
  2026-08-25 already settled the naming half of that (a 'fake-*' word is not automatically
  a dark-pattern sibling). Its two sources are product-analytics vendor glossaries rather
  than design catalogs, which is where this vocabulary actually lives.
  HUMOUR (2 records, from "Humorous / playful UI"): error-page (pattern, core) and
  easter-egg (interaction, core). Neither is the wish's own word, and that is the point.
  error-page is the honest home for it, because it arrives with a SOURCED DISAGREEMENT
  that is the article rather than a footnote to it: NN/g (Nielsen, 1998) advises mitigating
  total failure with novelty, and the GOV.UK Design System forbids informal language on a
  page-not-found page outright, forbids red warning text, and forbids ever printing the
  number 404 at all. Both are right for their own service, and it is the one place on this
  site where the humour question can be settled with citations instead of taste. Its
  three-way fence is already half-drawn on site (error-message is the inline message under
  one field, error-summary the list at the top of a form, no-results-state a search that
  matched nothing INSIDE a working page) and the 404-versus-5xx split is the record's own
  axis, cited to both GOV.UK patterns.
  NAMING on that one: 'Error page' rather than '404 page', because the slug convention
  spells numbers out (eight-point-grid, twelve-column-grid) and 'four-oh-four-page' is a
  worse URL than an alias is, so the vernacular spelling is the first alias and the search
  still lands.
  easter-egg is filed in interaction rather than pattern so that it lands beside the two
  terms that make it definable, and it is hidden-gesture's HONEST INVERSE: round 24's
  record is the defect, an action with no signifier that the reader needed, and an easter
  egg is the same mechanism aimed at something nobody needed. Its design content is two
  rules with real answers, that it must never be the only route to anything and that one
  nobody finds is dead code.
  THE VAGUE HALF OF THE HUMOUR WISH IS REFUSED, on the scandinavian-design grounds of
  2026-08-25: playful UI, whimsy and delight have no headword with an honest source to
  point at, confetti-burst already claims 'delight moment', and kawaii-ui already claims
  'mascot UI'. Emotional design (Norman, and Walter's hierarchy) is a book concept with no
  category and is named here rather than pooled. If any of them is wanted anyway it needs
  a source that is not an agency blog post.
  LEFT UNPOOLED AND NAMED BY THIS SWEEP, for a later decision: footnote; device mockup or
  device frame, which is the more-searched sense of the bare word in stock-asset shops and
  is a different record with different content (bezel, shadow, angle, whether the screen is
  real), so mockup must never claim either spelling; fidelity itself as the ladder's axis
  record, which would make an excellent specimen (one screen at three fidelities) and which
  nobody searches for by name; maintenance page and coming-soon page as error-page's
  neighbours; and emotional design.
  VERIFICATION: all 8 slugs and all 39 proposed aliases checked against the 1,114 published
  terms and every alias they claim, plus every record already in the pool, which is 6,074
  claimed spellings between them: no collisions. Every relatedSlug on all 8 records resolves
  to a published term or to another record in this batch. All 23 distinct source and
  implementation URLs answered 200 on 2026-08-28, with three worth recording anyway. The Jargon
  File's Easter egg entry is http ONLY: catb.org has no working TLS, so curl over https
  fails with exit 60 rather than a status, and the URL must not be 'fixed' to https or
  marked dead. Polaris's Voice and tone page and Material 3's UX writing best practices are
  both JS-rendered shells that answer 200 with no body (Polaris returns 327KB of framework
  containing the word 'voice' zero times), so both implementation rows are recorded
  verified:false exactly as every HIG and Material row in this file is; Carbon's writing
  style page is real prerendered HTML and is the one verified row. NO SYSTEMS ADDED: govuk,
  carbon, polaris, material and nngroup were all already in the registry, and Figma is a
  TOOL rather than one of the registry's five kinds, so its prototyping docs are a source
  and systems.json stayed at 115.
  ONE THING TO CARRY FORWARD about the term files themselves: govuk is in systems.json but
  NOT in the site schema's nine tracked SYSTEMS, so error-page's implementation row has to
  become a source when the term file is written. The pool is richer than the schema on
  purpose, and this is the first record in a while where that bites at authoring time.
- PIPELINE GOTCHA found while pooling the 2026-08-28 wishlist, and it would have cost a
  future round a day. `scripts/merge-enumeration.ts` DROPS every record whose slug now
  matches a published term, so RUNNING IT REGENERATES candidates.json as the unauthored
  remainder rather than as the accumulated pool: it rewrote 1,010 records down to 54 and
  deleted 48,681 lines. Worse, the 54 were not a pool at all. Eight were this sweep's, and
  the other 46 were records this file had already RESOLVED BY FOLDING (activity-bar into
  navigation-rail, flag-object into media-object, focus-restoration into focus-management,
  scroll-scrubbing into scroll-linked-animation, hotspot into coach-mark's aliases,
  icon-button-label dropped outright), which never became files and so cannot be recognised
  as settled by a filename check. `pool-remaining.ts` reads candidates.json, so the next
  authoring round would have been handed 46 phantom candidates and would have re-authored
  decisions this file spent a canonicalize pass making.
  So candidates.json is APPENDED to, not regenerated, which is what every sweep before this
  one silently did (its first ~950 records are slug-sorted from one early generation and
  every batch since sits in a block at the end). The merge script stays useful for what it
  is actually good at, which is the check pass: run it, read the warnings for the records
  you just wrote, and throw the output file away. This sweep did exactly that, then restored
  candidates.json from git and appended its 8 records with `sweptFrom` set by hand.
  The real fix, when someone wants it, is for a folded or dropped record to say so in its
  own data (a `resolved` field the merge script and pool-remaining both honour) instead of
  the knowledge living only in this file's prose.
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
