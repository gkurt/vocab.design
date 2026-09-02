---
name: No results state
slug: no-results-state
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: What a search or filtered list shows when nothing matched, naming
  the query, explaining why, and offering a way to loosen the constraints.
aliases:
  - name: zero results
    source: community
  - name: no matches
    source: community
  - name: empty search results
    source: community
  - name: null state
    source: community
tags:
  - content-design
  - errors
  - search
relations:
  contrastWith:
    - empty-state
    - did-you-mean
    - error-page
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Cloudscape: Empty states"
    url: https://cloudscape.design/patterns/
demo: inline
exhibit: false
useWhen: the screen shown when a search matches nothing
---

An [empty state](/empty-state) and a no results state look alike and mean opposite
things. Empty means there is nothing to show yet, and the honest response is an
invitation: add your first invoice. No results means there is plenty to show and
your query excluded all of it, and the honest response is a diagnosis. Using the
empty state's cheerful illustration here tells someone with two hundred orders that
they have no orders, which is both wrong and slightly insulting.

The diagnosis has three parts. Say what was searched for, quoted back, because by
the time the results render the reader has often stopped looking at the field and a
typo is the single most likely explanation. Say which constraints are in force,
because on a faceted list it is usually the filters and not the words that emptied
the page: naming the three active filters is more useful than any amount of
sympathy. Then offer the loosening as something to press, not as advice to follow.
Clear the search, remove this one filter, search all departments instead of this
one. A spelling suggestion earns its place here more than anywhere else in the
interface, and if the correction is confident enough, some systems run it and say so
("showing results for chair") rather than making the reader ask twice.

Keep the query and the filters visible and editable. Wiping the field on a failed
search is the most common way to make this state hostile, because it forces a retype
of the thing that was nearly right. Announce the outcome as well as drawing it: a
region with `role="status"` reporting "no results" gives a screen reader user the
same information the sudden blank area gives everyone else, and a count that only
exists as a visual heading is a count they do not get.

Zero results is also a product signal, not just a screen. The queries that land here
are people telling you, in their own words, what they expected to find and what you
call it instead. A search log full of a competitor's term for your feature is a
naming decision waiting to be made, and a search that matches nothing because the
matching is too strict (no stemming, no synonyms, no tolerance for a plural) is a
bug wearing this pattern as a costume.
