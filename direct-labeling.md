---
name: Direct labeling
slug: direct-labeling
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Writing series names next to the data instead of in a legend,
  trading a lookup for a glance.
aliases:
  - name: direct labels
  - name: data labels
  - name: value labels
tags:
  - content-design
  - dataviz
relations:
  contrastWith:
    - chart-annotation
    - chart-legend
  variantOf: []
  partOf: []
  seeAlso:
    - sparkline
implementations: []
sources:
  - title: "Fundamentals of Data Visualization: Redundant coding"
    url: https://clauswilke.com/dataviz/redundant-coding.html
demo: inline
exhibit: false
useWhen: few series and room at the line ends make the legend deletable
---

A legend is an index. It tells the reader that this colour means that name, and leaves the
matching up as an exercise. Direct labeling deletes the index by writing each name where
its data already is, usually at the end of a line, sometimes on the mark itself. The
information is identical. What changes is the number of times the eye has to leave the
plot, and for a three-series chart that number goes from three to zero.

The cost of a legend is easy to underestimate because it is paid in working memory rather
than in pixels. To read a legended line chart the reader looks at a line, carries a colour
across to the key, finds the row, carries a name back, and hopes the line is still the one
they left. Claus Wilke's argument for [redundant
coding](https://clauswilke.com/dataviz/redundant-coding.html) is the same argument one step
further: colour is a weak channel to hang identity on, so give the series a second cue.
Direct labeling is the strongest version of that cue, because the second channel is
position, and position is the one thing the reader was already looking at. It also survives
the failure modes colour does not: a printed page, a screenshot pasted into a document, a
[color vision deficiency](/color-vision-deficiency) that collapses two of the three hues.

It is a trade, not an upgrade, and the conditions are specific. Direct labeling needs room
at the ends of the lines and ends that are far enough apart to label separately, which is
why it is a pattern for three or four series and not for twelve. When the lines finish
bunched together, or the plot has no right margin to give, or the series names are long
enough to become the chart, the key earns its place back. Small multiples are the usual
escape hatch when the count is too high for either: give each series its own panel and the
panel title becomes the direct label.

The pairing to keep straight is with [chart legend](/chart-legend). A legend is a lookup
you consult, a separate block that maps encoding to meaning and can be shared by several
charts; direct labeling puts the name where the eye already is, and it can only exist once
per mark. Read the other way: the legend is the component, direct labeling is the decision
to do without it. Both sit inside [chart](/chart), and both are downstream of
[categorical palette](/categorical-palette), which is where the colours being named come
from in the first place. Direct labeling does not make the palette unnecessary, but it does
lower the stakes: once every line says its own name, the palette only has to separate the
lines, not identify them.
