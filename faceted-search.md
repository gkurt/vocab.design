---
name: Faceted search
slug: faceted-search
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Narrowing results by ticking values from several independent
  attribute groups, with counts showing how many results each value would leave.
aliases:
  - name: faceted navigation
    source: community
  - name: guided navigation
    source: community
  - name: filter sidebar
    source: community
  - name: refinements
    source: community
  - name: faceted filters
    source: tanstack-table
tags:
  - search
relations:
  contrastWith:
    - search-field
    - faceted-filter
    - applied-filters
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "A List Apart: Design Patterns, Faceted Navigation"
    url: https://alistapart.com/article/design-patterns-faceted-navigation/
  - title: "Cloudscape: Filtering patterns"
    url: https://cloudscape.design/patterns/
demo: inline
exhibit: false
useWhen: filters grouped by attribute, each showing result counts
---

Faceted search splits a set of results along several attributes at once. Each
attribute is a facet (type, availability, price band, brand), and each facet is
its own group of values. Values inside one group usually widen the result set,
because ticking two of them means either will do; groups combine the other way,
because a reader who picks Lamps and In stock wants both to be true. That pair of
rules is the whole logic of the pattern, and it is why a facet rail can narrow
thousands of items in three clicks without anyone writing a query.

The counts are not decoration. A facet value labelled with the number of results
it would leave turns filtering into a series of informed moves rather than a
series of guesses, and it is what keeps a reader out of a dead end: a value that
would return nothing can be counted zero, dimmed, or dropped, so no one spends a
click reaching an empty page. Counts are also expensive to compute honestly,
which is why they are the first thing dropped by an implementation in a hurry, and
why a rail of plain checkboxes is a weaker version of the same idea.

Applied filters have to be visible and individually removable somewhere the
reader is already looking, usually as a row of chips above the results. Without
that, the state of the query lives only in a rail that may be scrolled out of
view or collapsed behind a button on a narrow screen, and an unexpectedly short
list reads as missing stock instead of as a filter still switched on. Removal
should be per value, not just "clear all", since the usual repair is loosening one
constraint rather than starting over.

The pattern fails on data before it fails on interface. Facets are only as good
as the metadata behind them, so a catalog where half the items have no material
recorded will show a Material facet that hides more than it reveals. Too many
facets is the other failure: past roughly six or seven groups the rail becomes a
form, and a reader who has to read it is no longer browsing. Search answers a
question with words; faceted search answers it by removing everything the reader
said they did not want.
