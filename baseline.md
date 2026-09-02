---
name: Baseline
slug: baseline
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The invisible line that most letters sit on, and the line every
  other vertical type metric is measured from.
aliases:
  - name: alphabetic baseline
    source: css
  - name: text baseline
tags:
  - fonts
  - spacing
relations:
  contrastWith:
    - cap-height
    - half-leading
    - descender
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Typography Terms: Glossary (NN/g)"
    url: https://www.nngroup.com/articles/typography-terms-ux/
  - title: A Glossary of Typographic Terms (Monotype)
    url: https://www.monotype.com/resources/typographic-terms
demo: inline
exhibit: false
useWhen: aligning text with an icon or another line of text
---

Almost every vertical measurement in type is a distance from this line.
[X-height](/x-height) is the baseline to the top of the lowercase, cap height the
baseline to the top of the capitals, ascent and descent the room the face claims
above and below it. Two things deliberately break the rule. Descenders on `p`,
`g`, `y` and `j` hang below it, and round letters like `o` and `e` overshoot it
by a hair in both directions, because a curve that stopped exactly on the line
would look as though it were floating.

The reason it matters in interface work is that the baseline, not the box, is
what the eye uses to judge whether two pieces of text are on the same line. Set
a 32px number beside a 13px label and centre their boxes and they will look
wrong, because their baselines sit a few pixels apart. Align them on the baseline
and they read as one line even though the boxes are wildly different heights.
This is the single most common vertical alignment mistake in a design system, and
it shows up most in stat blocks, currency amounts with a small unit, and any
label that carries a number.

CSS gives you the line directly. `vertical-align: baseline` is the default for
inline content, which is why a mixed size sentence already lines up, and
`align-items: baseline` (with `first baseline` and `last baseline` for a
multi-line box) brings the same alignment to flex and grid. The catch is icons:
an inline SVG is a replaced element whose baseline is its bottom margin edge, so
it sits on the line rather than optically centred on the lowercase, and it needs
nudging up by a fraction of the [x-height](/x-height) to look right. The `ex`
unit is the honest way to write that nudge, since it tracks the face rather than
a number you guessed once.

Print designers go further and set type on a baseline grid, a fixed rhythm every
line of every column lands on, so facing pages agree. The web equivalent is
harder than it looks, because a browser positions a line box by its height rather
than by its baseline, and half-leading splits the difference above and below the
text. Layouts that manage it usually fix the [leading](/leading) to one rhythm
and pay for it with the flexibility they lose everywhere else, which is why most
design systems settle for consistent leading instead of a true grid.
