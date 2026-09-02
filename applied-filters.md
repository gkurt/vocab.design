---
name: Applied filters
slug: applied-filters
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A row of removable tokens above the results showing every filter
  currently in force, with a control to clear them all at once.
aliases:
  - name: filter chips
    source: material
  - name: filter pills
    source: community
  - name: active filters
    source: community
  - name: filter tokens
    source: cloudscape
  - name: selected filters
    source: community
tags:
  - search
  - selection
relations:
  contrastWith:
    - faceted-filter
    - faceted-search
  variantOf: []
  partOf: []
  seeAlso:
    - chip
    - bulk-actions
implementations: []
sources:
  - title: "Cloudscape: Filtering patterns"
    url: https://cloudscape.design/patterns/
demo: inline
exhibit: false
useWhen: the removable tags showing which filters are on
---

The controls that set a filter and the summary of what is set are two different
things, and the second one is what this term names. Faceted search gives the reader
a rail of checkboxes; applied filters gives them a sentence made of tokens sitting
directly above the results, saying "this is why you are seeing 3 of 240". The row
earns its place because the rail is so often not on screen: collapsed behind a
Filters button on a narrow viewport, scrolled past on a long one, or in a drawer
that closed when the reader applied. Without the row, the only evidence that a
filter is on is a result count that looks wrong.

Every token removes exactly one constraint, and the removal has to land back on the
control that set it, so the checkbox unticks in the same beat. The remove affordance
inside a chip is small, so it needs a target larger than the glyph drawn in it, and
the accessible name has to say what pressing it does ("Remove filter: Remote")
rather than just "Close". Clear all is a second, separate control, because clearing
six filters one chip at a time is six round trips through a re-rendering result
list. Keep it out of the reading order of the tokens themselves, usually at the end
or set apart as a link, so it cannot be hit while aiming at the last chip.

Two things make the row feel unstable if they are not designed for. The first is
order: tokens should sit in a fixed order, by facet group, so a chip does not move
under the pointer when a neighbour is removed, and the row should reserve its height
so the results do not slide up when it empties. The second is scope: a chip should
only exist for a constraint the reader chose. Putting the default sort, the current
tab, or an implicit "in stock only" in the row invites people to remove things the
interface will immediately put back, and a chip that reappears after being dismissed
reads as broken.

The row is also where the result count belongs, and where a change of results should
be announced. Removing a filter changes a list somewhere else on the page, which
nothing tells a screen reader about unless the count lives in a polite live region.
Note that the word chip is doing double duty here: a filter chip reports and removes
a constraint, while the chips inside a tag input are values being composed into a
field. They look alike and behave nothing alike, so the tokens above a result list
are worth calling applied filters rather than just chips.
