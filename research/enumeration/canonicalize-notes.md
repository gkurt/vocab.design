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
article at the relations pass, not its own term. [PROSE TODO]

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
(tag-input territory), bare "autocomplete" to anything (contested between combobox
and typeahead; decide at the relations pass, note only).

## Name collisions needing disambiguation prose (live, due when the second sense arrives)

thumb (slider) vs thumbnail; timeline (event list, authored) vs timeline (media
editor); chevron/caret (component) vs caret (typography); gutter (grid) vs gutter
(editor); spinner vs spinbutton; swimlane (horizontal band, constantly misused for
the vertical column); "ghost text" (inline autocomplete vs AI completion);
layout-shifter (LukeW) vs layout-shift (CLS, authored). Handled already:
multi-column-layout vs text-columns (both articles disambiguate), pull-quote vs
blockquote (article draws it), captions vs caption, focus-visible vs focus-ring,
neubrutalism spelling, Memphis vs Corporate Memphis, Windows Aero vs Frutiger Aero
(windows-aero candidate deliberately skipped), card-flip vs flip-animation (both
authored). Round-two flag on "cover and contain" as a view-progress-timeline alias
was checked and the record is RIGHT: cover/contain are view-timeline range names.

## Contrast edges for the relations pass

The keep-both decisions above, plus edges the sweeps proposed; feed these to the
consolidated relations milestone as candidate contrastWith/seeAlso:

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

## Known coverage gaps (follow-up sweeps)

- User wishlist (2026-08-15), shaped and pooled: abbreviation (typography, core,
  absorbing the abbreviation-expansion record), pixel-density (layout, core; DPI/PPI/
  retina as aliases), chamfer (aesthetic, tail; must disambiguate the bevel term),
  interface-metaphor (pattern, head; reshaped from "figures of speech", whose
  idiom/localization half belongs to plain-language).
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
