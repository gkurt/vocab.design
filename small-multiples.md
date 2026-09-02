---
name: Small multiples
slug: small-multiples
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The same small chart repeated in a grid, once per category, so
  comparison happens by eye movement instead of overplotting.
aliases:
  - name: trellis chart
  - name: panel chart
  - name: grid of charts
  - name: lattice chart
tags:
  - dataviz
  - grids
  - perception
relations:
  contrastWith: []
  variantOf: []
  partOf: []
  seeAlso:
    - brushing
    - dual-axis
implementations: []
sources:
  - title: "Wikipedia: Small multiple"
    url: https://en.wikipedia.org/wiki/Small_multiple
demo: inline
exhibit: false
useWhen: one chart would need too many series to stay readable
---

Small multiples are one chart design drawn many times, once per category, and laid out in a
grid. Edward Tufte gave them the name and the argument: once the reader has decoded the
first panel, every other panel is free, because they all share a design, a scale, and an
axis treatment. The alternative is putting all those categories into a single
[chart](/chart) as separate series, which works for two or three and then collapses. Six
lines in one frame cross each other, fight for the same colours, and need a key the eye has
to keep visiting. Six panels of one line each need no key at all, because the panel title
does the work a legend was doing.

The rule that makes the layout work is a shared scale. When every panel is drawn against the
same domain, position means the same thing everywhere, and comparison becomes a matter of
looking across the grid rather than reading numbers. Per-panel scales quietly destroy
exactly that. Each panel fills its own box, every trend looks equally dramatic, and a
category with a tenth of the volume of its neighbour renders at the same height. The chart
still looks like small multiples and no longer works like them, which is the most expensive
kind of failure, because nothing about it looks broken.

The layout it is most often confused with is the [dashboard grid](/dashboard-grid), and the
two are opposites dressed alike. A dashboard grid holds different charts answering different
questions, sized by importance, and a reader moves between panels to change subject. Small
multiples hold one chart repeated so that moving between panels changes only the category,
which is what turns comparison into a positional judgement. If your panels need individual
titles explaining what each one measures, you have a dashboard. If the only thing that
changes from panel to panel is which slice of one measure is drawn, you have small multiples.

Two practical decisions carry most of the quality. The first is panel order: alphabetical is
almost never right, and sorting by the value the reader came for (the latest figure, the
total, the rate of change) makes the grid itself say something. The second is how much
apparatus each panel keeps. Axis labels repeated twelve times are noise, so the usual answer
is to label the outer edges of the grid and let the inner panels carry only their title, the
same economy that lets a [sparkline](/sparkline) drop its axis entirely. Keep the panels
genuinely small. A grid of six charts each big enough to study on its own is just six charts.
