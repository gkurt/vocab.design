---
name: Subgrid
slug: subgrid
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A nested grid that borrows its parent's tracks instead of defining
  its own, so contents of separate children still line up with each other.
aliases:
  - name: "grid-template-columns: subgrid"
    source: css
  - name: nested grid alignment
    source: community
tags:
  - grids
  - web-platform
relations:
  contrastWith:
    - baseline-grid
    - named-grid-areas
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Subgrid, MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid
demo: inline
exhibit: false
useWhen: card internals that must align across sibling cards
---

Nested grids used to be strangers to each other. A card placed in a grid cell could lay its
own contents out beautifully and had no idea where its neighbour's title ended, so three
cards in a row would each stack from their own top and every internal seam would land
somewhere different. Writing `grid-template-rows: subgrid` on the card says the opposite:
do not size tracks of your own, use the ones my parent already established. The card's
children are then placed on the parent's lines, which means they are placed on the same
lines as the other cards' children.

The problem it closes is the equal-height card internals problem, and it is worth naming
because every workaround for it was bad. Fixed heights truncate the one title that needed
two lines. Measuring in JavaScript and writing heights back is a layout read after a write,
the thing that costs a frame. Flattening the cards into one grid, so every title and every
price is a direct child of the same container, works and destroys the markup: the card
stops being an element, so it cannot have a background, a border, a link wrapping it, or a
single accessible name.

The syntax is short and the constraint is specific. The nested element must be a grid item
that spans the tracks it wants to borrow, and then `grid-template-rows: subgrid`,
`grid-template-columns: subgrid`, or both, replaces its own track definition. Gaps are
inherited from the parent unless the subgrid restates them, and line names pass down too.
The catch worth knowing before you reach for it is that padding and borders on the subgrid
element shift its content box off the parent's lines by exactly that much, so the tidiest
subgrid cards carry their padding on the cells inside rather than on the card itself.

Support arrived late, which is why so much older code still contains the workarounds.
Firefox shipped it in 2019 and the other engines only in 2023, so a codebase written before
then has fixed heights and measuring scripts in exactly the places subgrid now handles, and
those are worth deleting rather than keeping alongside it. Where a fallback is still
required, the honest one is not a second layout but a lesser promise: without subgrid the
cards keep their own rows and simply do not align, which is the ordinary
[card grid](/card-grid) everyone has been shipping for a decade.
