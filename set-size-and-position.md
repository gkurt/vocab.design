---
name: Set size and position
slug: set-size-and-position
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Telling assistive technology how big a list really is and where an
  item sits in it, so a windowed or paginated list still announces "item 6 of
  16".
aliases:
  - name: aria-setsize
    source: aria
  - name: aria-posinset
    source: aria
  - name: item 6 of 16
    source: community
  - name: virtual list count
    source: community
tags:
  - assistive-tech
relations:
  contrastWith:
    - list-virtualization
    - pagination
  variantOf: []
  partOf: []
  seeAlso:
    - select-all-across-pages
implementations: []
sources:
  - title: "MDN: aria-setsize"
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-setsize
demo: inline
exhibit: false
useWhen: only twenty rows of ten thousand are in the DOM
---

A [screen reader](/screen-reader) counts what it can see in the accessibility tree. Land on a row
and it says "item 3 of 6", because six rows is what the tree contains. That is a fact about your
DOM, not about your data, and the moment the DOM stops holding the whole list the fact becomes a
lie. `aria-setsize` on each item declares the real total, `aria-posinset` declares that item's
real place in it, and together they let a reader announce "item 247 of 500" from a window that
only ever renders six rows.

This is the accessibility half of [list virtualization](/list-virtualization), and it is the half
that gets forgotten, because nothing looks broken. Sighted users have a scrollbar whose thumb
tells them how much list there is. A reader user without these attributes has no total at all, no
way to judge how deep they are, and no way to tell whether the list ended or the renderer simply
has not caught up. The same pair fixes paginated lists, where page two starts at item 1 again by
default, and infinitely loading feeds, where the total genuinely changes as more arrives.

The mechanics are ordinary and the constraints are worth memorising. Both attributes are integers
and both belong on the items, not on the container, and every item in the set needs them (a set
where half the rows declare a size gets announced inconsistently). `aria-setsize="-1"` is the
declared way to say the total is unknown, which is the honest value for a feed still loading.
Positions are one-based. And the pair only works on roles that are actually members of a set:
`listitem`, `option`, `row`, `treeitem`, `menuitem`, `tab`, `article` inside a feed. On a plain
`div` they mean nothing at all.

One warning about announcing changes. A count is context, not news. If your list grows while
somebody is reading it, updating `aria-setsize` is right and shouting the new total through a
polite region is usually wrong, because a total repeated at every arrival becomes noise. Where
you do announce something, make sure the announcement is a whole thought rather than a fragment,
which is what [atomic live region](/atomic-live-region) is about.
