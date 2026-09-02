---
name: Zebra striping
slug: zebra-striping
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Alternating row backgrounds in a table so the eye can track a single
  row across many columns.
aliases:
  - name: striped rows
    source: bootstrap
  - name: banded rows
    source: community
  - name: alternating row colors
    source: community
  - name: row banding
    source: community
tags:
  - perception
  - tables
relations:
  contrastWith:
    - divider
  variantOf: []
  partOf: []
  seeAlso:
    - data-table
    - keyline
implementations: []
sources:
  - title: Data table, Carbon Design System
    url: https://carbondesignsystem.com/components/data-table/usage/
demo: inline
exhibit: false
useWhen: shading every other row of a table
---

Shade every other row of a [data table](/data-table) and the rows stop being a field of
text and become a set of rails. The problem it solves is specific: on a wide table the eye
has to travel a long way from the first column to the last, and somewhere in the middle it
drifts up or down a line, which means reading the wrong customer's total. A band of colour
under the row is a track to follow. The technique is old (it comes from continuous form
paper, where the printer's alternate green bars did exactly this job) and it survived the
move to screens for the same reason it existed on paper.

Where it earns its keep is precisely where that problem is real: many columns, wide
rows, dense text, and rows that have to be read across rather than scanned down. Where it
does not is everything else. On a three-column table the eye never had far enough to fall,
and the stripes are pure noise: a pattern the reader has to look past to see the data, plus
a second background colour to reconcile with selection, hover and status. Striping a
narrow table is one of the most common ways a table is made harder to read while looking
more designed. Try the alternatives first. A little more row spacing, a
[divider](/divider) between rows, or right-aligning the numeric column so the reader has
somewhere to aim, often do the same job for less.

The strongest alternative is a band that follows attention instead of covering everything:
a highlight on the row under the pointer, and on the row that has keyboard focus. It gives
a stronger cue than a stripe, precisely because it is the only one on screen, and it costs
nothing when nobody is asking. Its limitation is the mirror image of striping's: it helps
one row at a time and it helps nobody who is reading a screenshot or a printout. A wide
[data grid](/data-grid) with a [sticky header](/sticky-header) and a
[column resizer](/column-resizer) is the case where you may reasonably want both, since a
reader who has just dragged a column boundary is going to lose their place in it.

Two rules keep an implementation honest. The stripe must clear
[non-text contrast](/non-text-contrast) against the plain row, or it is invisible to a
share of readers and to anyone on a dim screen at an angle, and it must not be so strong
that the shaded rows read as a different kind of row. And the stripe must never be the only
thing carrying meaning. It says "this is a row", nothing more, so any state that matters
(selected, overdue, failed) needs its own cue that survives on top of both a striped and an
unstriped row. Practically that means picking the stripe first, then checking that
selection and hover are still legible against it, rather than the other way around.
[Carbon's data table guidance](https://carbondesignsystem.com/components/data-table/usage/)
sets out the zebra rules alongside the row-height and density decisions they interact with.
