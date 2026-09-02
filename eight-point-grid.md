---
name: 8 point grid
slug: eight-point-grid
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A spacing convention where every size and gap is a multiple of
  eight, so values stay whole numbers at every common screen density.
aliases:
  - name: 8pt grid
    source: community
  - name: 8 point grid
    source: community
  - name: 8 point grid system
    source: community
  - name: 4pt grid
    source: community
  - name: base unit grid
    source: community
  - name: mini unit
    source: carbon
tags:
  - grids
  - spacing
  - tokens
relations:
  contrastWith:
    - spacing-scale
    - baseline-grid
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: picking a base unit for a whole system
---

Pick one number, make everything a multiple of it, and most spacing arguments stop. The
number is usually eight: paddings, gaps, icon sizes, control heights, and block dimensions
are all 8, 16, 24, 32 and up, and anything that lands on 13 or 27 is wrong by definition
rather than by opinion. The rule is blunt on purpose, because its value is that it can be
checked without taste.

Eight earns the job by dividing well. Screens ship at a range of densities, and a layout
written in points or density-independent pixels gets multiplied by 1.5, 2, or 3 on the way
to physical pixels: eight survives all of them as a whole number, where five becomes 7.5 at
1.5x and lands on a half pixel that the renderer has to guess at. Eight also halves twice
before it runs out, which is where the companion 4 point step comes from. Most systems are
honest about being on a 4 point grid with a strong preference for even multiples, and
Carbon calls its 8px base the mini unit for exactly this reason.

The convention and the shortlist built on it are different things, which is the line
between this term and [spacing scale](/spacing-scale): the 8 point grid says what every
value must be a multiple of, and a spacing scale says which of those multiples a team is
actually allowed to spend. Adopting the unit without publishing the ladder still leaves 8,
16, 24, 32, 40, 48, 56 and 64 available for the same job, which is how a system on a strict
grid ends up looking inconsistent anyway.

Two things sit outside the grid and pretending otherwise causes damage. Type is one: font
sizes come from a [type scale](/type-scale) and line boxes land where the metrics put them,
so forcing a heading to a multiple of eight is a way of making text worse to protect an
invisible rule. Optical adjustment is the other: a circular glyph, a piece of punctuation,
or a border that reads as heavy needs a pixel or two that the grid does not offer. The
useful discipline is to snap boxes and spacing hard, let type and optics be argued
separately, and keep the exceptions few enough to name.
