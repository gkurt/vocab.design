---
name: Chartjunk
slug: chartjunk
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "Tufte's word for ink that decorates a chart without carrying data:
  3D bevels, gradient fills, mascots, gridline thickets."
aliases:
  - name: chart junk
  - name: non-data ink
tags:
  - dataviz
  - perception
relations:
  contrastWith:
    - data-ink-ratio
  variantOf: []
  partOf: []
  seeAlso:
    - chart-annotation
implementations: []
sources:
  - title: "Wikipedia: Chartjunk"
    url: https://en.wikipedia.org/wiki/Chartjunk
demo: inline
exhibit: false
useWhen: a chart's decoration is fighting its data
---

Edward Tufte coined the word in *The Visual Display of Quantitative Information* in 1983,
and it has outlived most of the charts it was aimed at. Chartjunk is ink on a
[chart](/chart) that carries no data: bars extruded into blocks, gradient fills behind the
plot, hatch and moiré patterns, drop shadows, heavy frames, redundant legends, thickets of
gridlines, and the clip-art mascot somebody added because the slide looked empty. The test
is simple and physical. Erase a mark and ask whether any number got harder to read. If
nothing was lost, the mark was decoration, and it was competing for attention with the
marks that were doing the work.

The word travels with its measure. Chartjunk names ink that carries no data; the
[data-ink ratio](/data-ink-ratio) measures how much of a chart's ink does. One is a
category you can point at and delete, the other is the arithmetic that tells you how much
deleting is left to do, and Tufte published them together as two views of the same
argument.

Two cautions keep the word honest. First, not all non-data ink is junk. An
[axis](/axis) line, tick labels, and a light gridline are all non-data ink that earn their
place by making position readable as quantity, which is why the charge is really "ink that
competes" rather than "ink that is not a datum". Second, the empirical record is less
one-sided than the polemic. Bateman and colleagues found in 2010 that heavily embellished
charts were remembered better over a delay than plain ones, with no measurable cost to
accuracy at reading time, so a chart made to be recalled from a poster and a chart made to
be read closely are not obviously subject to the same rule. What survives every study is
the specific harm: decoration that distorts the encoding. An extruded bar makes the reader
choose between the front face and the back face of the same value, and a gradient fill
makes two equal bars look unequal.

Distinguish it from its neighbours by where the damage lands. A [truncated
axis](/truncated-axis) is a lie in the geometry itself, so the marks misreport their
values while the chart stays visually clean, whereas chartjunk usually leaves the geometry
honest and buries it. [Maximalism](/maximalism) is a register that means its excess, chosen
for a poster or a brand where more is the point, while chartjunk is excess arriving by
default from a spreadsheet's chart wizard and paid for by the reader. The practical
correction is not austerity for its own sake. It is one pass of deletion at the end,
keeping whatever a reader would miss.
