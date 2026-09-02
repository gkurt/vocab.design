---
name: Sort state
slug: sort-state
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The announced direction of the one column a table is currently
  sorted by, carried on that column header alone rather than on every sortable
  header.
aliases:
  - name: aria-sort
    source: aria
  - name: sort direction
    source: community
  - name: sortable column indicator
    source: community
tags:
  - assistive-tech
  - tables
relations:
  contrastWith:
    - sort-indicator
  variantOf: []
  partOf: []
  seeAlso:
    - table-header-association
implementations: []
sources:
  - title: "MDN: aria-sort"
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort
demo: inline
exhibit: false
useWhen: a sorted column shows an arrow but says nothing
---

A [sort indicator](/sort-indicator) is the arrow a sighted reader sees in the header of
the column a table is ordered by. Sort state is the same fact said out loud: `aria-sort`
on that header cell, taking one of four values, `ascending`, `descending`, `other`, or
`none`. Without it the arrow is a decorative glyph, and a reader working through the
header row hears "Size, column header, button" whether the table is sorted by size or
not.

The attribute belongs on the header cell, not on the button inside it, and it belongs on
exactly one cell at a time. That is the part teams get wrong most often: `aria-sort` set
to `none` on every sortable header, or left on the previous column after the sort moves,
describes a table nobody could build. The rule follows from the same logic as the visible
arrow. A table has one sort order, so one header carries the direction and the rest carry
either `none` or nothing at all.

The header also has to be operable, which means a real `button` inside the `th` rather
than a click handler on the cell. That gives the header a role, keyboard activation, and
a name for free, and it leaves `aria-sort` doing the one job it is good at: reporting
state. Sorting a whole table is a large change with no focus movement to accompany it,
so it is worth pairing with a [status message](/status-message) that says how many rows
are showing and in what order. Screen readers differ in how eagerly they re-announce a
header whose `aria-sort` changed under an unmoved cursor, and a polite live region is the
part you control.

One more habit worth keeping: pick a sensible default and expose it from the first
render, rather than shipping a table that is visibly ordered by name while every header
claims `none`. The state is a description of the data on screen, and it is wrong the
moment it disagrees with the order the rows are actually in.
