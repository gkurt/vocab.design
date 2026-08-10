# Canonicalize worklist (stage 2 input)

Consolidated from the enumeration sweep agents' reports (2026-08-10) plus the merge
run. The sweeps for interaction, typography, color, and systems completed their data
files but lost their summary notes to a session crash; their per-record `notes` fields
survive in the JSON.

## Merge stats

- 866 records swept, 815 unique candidates, against 48 existing terms.
- By category: component 160 · pattern 118 · typography 108 · color 85 · layout 82 ·
  accessibility 78 · interaction 75 · motion 62 · aesthetic 47.
- By priority: head 99 · core 287 · tail 429.
- 748 implementation rows, 706 verified at sweep time; 57 systems in the registry
  before gap-filling.
- Full mechanical issue list: run `bun scripts/merge-enumeration.ts`.

## Duplicate slugs (human must pick one home per slug)

component vs pattern: pagination, wizard, inline-edit, coach-mark, captcha,
typing-indicator, presence-indicator, input-mask, zebra-striping, expandable-row,
comparison-table. pattern vs interaction: pull-to-refresh, swipe-to-dismiss,
drop-indicator, drag-preview, drag-to-reorder, scroll-hijacking, infinite-scroll,
typeahead, marquee-selection, undo. layout vs interaction: scroll-snap, thumb-zone.
component vs interaction: multi-select (NOTE: these are two different concepts under
one word, the form control vs the shift/ctrl selection gesture; rename one rather
than merge). pattern vs motion: scrollytelling. interaction vs motion: rubber-banding,
momentum-scrolling, microinteraction. layout vs motion: layout-shift, scroll-snap
(three-way with layout and interaction). motion vs typography: overshoot (two senses:
animation past the target vs letterform past the baseline; likely two terms, rename
one). layout vs typography: baseline-grid. color vs aesthetic: mesh-gradient,
vibrancy, dithering, duotone, scrim, dark-mode. interaction vs accessibility:
roving-tabindex, selection-follows-focus, access-key, pressed-state. color vs
accessibility: forced-colors-mode, contrast-ratio, apca. typography vs accessibility:
dynamic-type. pattern vs accessibility: error-summary. Within accessibility.json
itself: keyboard-trap and non-text-contrast appear twice (agent self-duplicates, drop
one copy of each). Within motion.json: ripple appears twice.

## Merge candidates (same concept, multiple records or overlap with existing terms)

- no-results-state vs existing empty-state/zero-state (three overlapping names).
- typeahead vs existing combobox (behaviour vs component).
- paywall / metered-paywall / feature-gate (collapse or keep three).
- scarcity-indicator vs fake-scarcity, countdown-timer vs fake-urgency: deliberately
  kept as honest/deceptive pairs, the contrast is the teaching.
- smart-defaults vs preselected-opt-in: same mechanic, judged by whose interest it
  serves; candidate for the sharpest contrastWith on the site.
- focus-management vs existing focus-trap (umbrella vs one case); keyboard-trap vs
  focus-trap kept as deliberate pair (escapable and intended vs not).
- flip-animation vs layout-animation; crossfade vs dissolve;
  shared-element-transition vs container-transform vs zoom-transition (one idea,
  three platform words); damping vs spring-animation; scroll-scrubbing vs
  scroll-linked-animation; motion-token vs existing duration/easing;
  cross-document-view-transition may fold into the existing view-transition page.
- split-view vs list-detail (kept separate: container mechanism vs content
  relationship); activity-bar vs navigation-rail (IDE vs Material word for one shape);
  flag-object as variantOf media-object or folded in; mostly-fluid / column-drop /
  layout-shifter could become one parent with children.
- flat-design-2 into flat-design; synthwave into vaporwave; grainy-gradient absorbs
  noise-texture; halftone vs dithering need explicit contrastWith.
- icon-button-label vs accessible-name; focus-restoration absorbs "initial focus";
  live-region absorbs "screen reader announcement"; browse-mode absorbs "virtual
  cursor"; heading-hierarchy absorbs "document outline".
- stepper (numeric control) vs step-indicator (MUI/Ant call that one "Stepper").

## Name collisions needing disambiguation prose

thumb (slider) vs thumbnail; timeline (event list) vs timeline (media editor);
chevron/caret (component) vs caret (typography, the text cursor); gutter (grid) vs
gutter (editor); spinner (existing, loading) vs spinbutton (alias of stepper);
container (width wrapper) vs container (query containment root); multi-column-layout
(app panes) vs CSS multi-column; layout-shifter (LukeW pattern) vs layout-shift (CLS);
swimlane (horizontal band, constantly misused for the vertical column); "ghost text"
(inline autocomplete vs AI completion); captions (media) deliberately plural to avoid
caption (figure); focus-visible vs focus-ring kept separate on purpose (heuristic vs
style); neubrutalism vs neobrutalism spelling; Memphis vs Corporate Memphis
(unrelated); Windows Aero vs Frutiger Aero.

## Aliases to fold into EXISTING term files (no new records)

- segmented-control: content switcher (carbon), tab list.
- empty-state: non-ideal state (blueprint), blankslate (primer), result (ant),
  blank slate (ui-patterns).
- zero-state: no results, null state (if no-results-state merges).
- banner/toast: scoped notification (lightning), warning text + notification banner
  (govuk), flashbar (cloudscape); toast: undo snackbar.
- spinner: inline loading (carbon).
- drawer: sheet (shadcn), side sheet, navigation drawer, off-canvas menu, offcanvas
  (bootstrap), slide-in panel.
- combobox: autocomplete, autosuggest (cloudscape), tag picker.
- chip/badge: tile (carbon), token, pill.
- hamburger-menu: doner menu, burger (mantine).
- table-of-contents: anchor (ant).
- overflow-menu: more menu.
- progressive-disclosure: expandable input, inline help box.
- skip-link: bypass blocks (WCAG 2.4.1), skip navigation (webaim), skip to main
  content.
- visually-hidden: sr-only + not-sr-only (tailwind), clip-rect hack, VisuallyHidden
  (react-aria), screen reader only text.
- focus-trap: focus containment, FocusScope contain (react-aria), focus sentinel,
  aria-modal.
- glassmorphism: frosted glass, backdrop blur, acrylic-like, blurred card; also gains
  prefers-reduced-transparency as counter-preference.
- neumorphism: soft UI, extruded plastic.
- view-transition: hero animation, shared element transition, @view-transition,
  view-transition-class, MPA view transition.
- easing: full curve family (sine/quad/cubic/quart/quint/expo/circ/back/elastic/
  bounce, in/out/in-out), timing function, emphasized easing (material),
  productive/expressive easing (carbon).
- duration: duration token, short/medium/long/extra long (material).
- stagger: staggering, delay cascade.
- shimmer: shimmer sweep (contrast with new pulse-animation).

## New contrastWith edges to existing terms

badge↔achievement-badge, accordion↔expandable-row, hover-card↔quick-view,
drawer↔mini-cart + help-drawer + off-canvas (strategy vs component),
combobox↔typeahead + inline-autocomplete, scroll-spy↔reading-progress,
segmented-control↔morphing-controls, banner↔cookie-consent-banner + hero,
app-bar↔page-header + collapsing-toolbar, bento-grid/masonry↔card-grid +
modular-grid, optimistic-ui↔offline-indicator, skeleton-screen↔layout-shift +
aspect-ratio-box.

## Known coverage gaps (follow-up sweeps)

- motion, aesthetic, accessibility, and layout agents all exhausted their 200-call
  WebSearch budgets before the formal two-dry-rounds stop; motion in particular was
  still surfacing tail terms. Unrecorded candidates named: hover lift, magnetic
  button, cursor follower, spring back, fill mode; editorial/magazine style, sci-fi
  HUD, terrazzo, low-poly; forced-colors/system-colors docs, Label in Name,
  Carbon/Polaris/Primer accessibility docs.
- Blocked sources needing a browser-tool pass (403/429/JS-rendered to WebFetch):
  uiterms.com, component.gallery, welie.com, uistyleguide.com (67 styles),
  Radix/Bootstrap/Blueprint doc indexes, m3.material.io and Apple HIG indexes.
- ui-patterns.com deep links use inconsistent slug casing and deceptive.design
  per-type pages 504'd; several pattern rows point at index URLs and need deep links
  before publication.
- Deliberate omissions: ~90 pure cognitive-bias names from ui-patterns' persuasive
  section (only the demoable ones were recorded); VPAT/ACR/ACT/POUR and other policy
  vocabulary; block formatting context and normal flow as too CSS-mechanical.

## Registry id consolidations (from the gap-fill probe, 2026-08-10)

The registry now covers every referenced id (108 entries), but several ids should
consolidate before authoring; each entry's notes carry the details:

- css → mdn (all 17 rows link MDN pages); keep w3c-css for normative citations,
  retire css.
- uxpatterns-dev → uxpatterns; chrome → chrome-developers (consider folding web-dev
  in too); tailwind-ui → tailwind-plus (already registered).
- framer-motion is renamed Motion upstream (motion.dev, npm `motion`); consider
  renaming the id.
- deque rows that mirror WCAG criteria should point at w3.org Understanding pages;
  postcss row actually cites csstools; angular row actually cites @angular/cdk.
- uikit here is Apple UIKit, not getuikit.com; never merge on the name.
- Junk rows better fixed in term data than in the registry: illustrator, excalidraw,
  chrome (bare), wicg (single stale EyeDropper draft; prefer MDN); all 12 goodui rows
  point at the site root and need per-idea URLs or removal.
- Row-level residue: 1 row deleted (mantine NumberFormatter posing as a
  relative-timestamp implementation); 1 row still unverified (HIG tint color,
  JS-rendered page); tanstack /docs/introduction and embla /get-started/ 404'd so
  those rows keep resolving root URLs.
- Paid or gated, marked in the registry: every-layout, tailwind-plus, mui-x (cited
  column pinning is the Pro tier), adobe-fonts, illustrator. maintained:false:
  wired-elements, wicg.

## Round two (2026-08-10): targeted re-sweep results

Round two added 210 records (motion +35, aesthetic +39, accessibility +61, layout
+52, delta over component/pattern/typography +23), taking the pool to 1025 unique
candidates with 888 implementation rows (887 verified). Zero new cross-file duplicate
slugs: the 51 in the list above are all round-one artifacts. Six new registry entries
were added and probed (magicui, tldraw, flickr-justified-layout, buildui, utopia,
microsoft-dual-screen), bringing systems.json to 114.

Source outcomes from the browser pass:
- welie.com is dead: the pattern library is gone and the domain serves SEO spam.
  Remove it from any future source list.
- uiterms.com, component.gallery, uistyleguide.com, Radix/Bootstrap/Blueprint/
  m3.material.io/Apple HIG indexes: all captured via the browser pane and folded in.
  component.gallery's full 60-component index was swept; nothing further remains.
- Saturation: all four re-swept categories hit the two-consecutive-empty stopping
  rule this time. Motion's remaining tail is judged to be library coinages rather
  than shared vocabulary.

New sense collisions for the human pass:
- card-flip (motion) vs flip-animation (FLIP): unrelated meanings of one word,
  flagged in both records.
- cascader (component) carries "miller columns" as an alias, but Finder-style column
  view is a browsing layout, not a cascading select; likely needs splitting.
- "cover and contain" sits as an alias of motion:view-progress-timeline, which looks
  wrong (it is object-fit vocabulary); motion owner should check.
- typography:pull-quote carries "block quote" as an alias, but component.gallery
  distinguishes quote-from-source vs passage-lifted-from-document; blockquote may
  deserve its own record.

More aliases for EXISTING site terms found in round two: dropdown gains "dropdown
menu" and Material's "menu"; modal-dialog gains "modal" and Material's "dialog";
radio-group gains "radio button"; skeleton-screen gains "skeleton" and Bootstrap's
"placeholders"; segmented-control gains Material's "segmented button"; drawer gains
"navigation drawer"; tabs gains HIG's "tab view"; combobox gains HIG's "combo box";
empty-state gains Blueprint's "non-ideal state"; spinner gains Material 3
Expressive's "loading indicator" (the shape-morphing replacement for the
indeterminate circular indicator, m3.material.io/components/loading-indicator).

Named gaps with no record anywhere (candidates for a small round three or manual
addition): oversized typography / big type (typography); millennial beige / sad
beige (color); plain elevation as its own term (color or layout; only
tonal-elevation and elevation-overlay aliases exist); skip-link's aliases ("skip
navigation", "bypass blocks") have no candidate record carrying them; the new HTML
invoker vocabulary (invoker commands / command / commandfor, interest invokers /
interestfor, dialog closedby, Baseline 2025-12) belongs with dialog/popover records;
APG's "disclosure widget" phrase is absent everywhere; "top shelf" (tvOS) is either
new layout or an alias of content-shelf; Blueprint's "entity title" reads as an
alias of page-header.

## Attributions to verify before publishing

Olia Lialina for "vernacular web"; CSS `corner-shape: squircle` support; the two HIG
aesthetic rows marked verified on URL resolution only (JS-rendered pages).
