---
name: Compound grid
slug: compound-grid
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Two or more grids of different column counts overlaid in one layout,
  so a page can carry several rhythms while still sharing one structure.
aliases:
  - name: compound grids
    source: community
  - name: overlaid grids
    source: community
tags:
  - grids
relations:
  contrastWith:
    - broken-grid
    - modular-grid
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Five simple steps to designing grid systems, part 4, Mark Boulton
    url: https://markboulton.co.uk/journal/five-simple-steps-to-designing-grid-systems-part-4/
  - title: Mark Boulton on grids and responsive web design, Creative Bloq
    url: https://www.creativebloq.com/design/mark-boulton-grids-and-responsive-web-design-7135509
demo: inline
exhibit: false
useWhen: one page needing two different column rhythms
---

One column count is a compromise. Four columns are right for a feature and too coarse
for a list of small items; six are right for the list and leave a feature looking thin.
A compound grid resolves the argument by refusing to pick: two grids are drawn over the
same measure, a four and a six, and each element is placed on whichever of them suits
its content. The layout keeps one set of margins and one set of edges, so the page still
reads as one structure rather than two pasted together.

What makes it work is the lines the two grids share. Over the same width a four and a
six agree at the centre, and everything either side of that line is on a rhythm of its
own. That shared line is the joint: content on either grid meets there without a jog, so
the eye reads a single vertical spine and not a collision. Pairs that share more lines
are calmer and pairs that share fewer are livelier, which is the real craft in choosing
the two counts. Some pairs, three against four for instance, share nothing at all inside
the measure, and a layout built on them has to earn the tension it creates.

The idea is Swiss, from the grid theory of the 1950s and 1960s, where a page was often
set on two systems at once. Mark Boulton reintroduced it to web designers in his series
on designing grid systems, and for years afterwards it stayed mostly theoretical: with
floats and fixed pixel columns, maintaining two overlaid systems by hand was more
arithmetic than any deadline allowed. CSS grid changed the economics. Two sets of tracks
are two declarations, a block moves from one rhythm to the other by changing its column
range, and the browser does the arithmetic at every viewport width.

Against a plain [layout grid](/layout-grid), the compound grid is not a different kind
of thing, it is two of them, agreed to in advance and documented together. It pairs
naturally with a [modular scale](/modular-scale), which does the same job vertically:
several related rhythms that share values rather than one rhythm imposed everywhere.
And it is not a [broken grid](/broken-grid). Nothing here is being violated. Every
element is on a grid, and the only question is which of the two.
