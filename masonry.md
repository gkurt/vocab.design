---
name: Masonry
slug: masonry
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A column layout that packs items of unequal height by placing each
  one in the shortest column, so the rows never line up and the bottom edge
  stays ragged.
aliases:
  - name: masonry layout
  - name: waterfall layout
    source: community
  - name: cascading grid layout
    source: community
tags:
  - grids
relations:
  contrastWith:
    - grid-lanes
    - bento-grid
    - card-grid
    - justified-gallery
  variantOf: []
  partOf: []
  seeAlso:
    - reading-order
implementations: []
sources:
  - title: Masonry, David DeSandro
    url: https://masonry.desandro.com/
  - title: Masonry layout, MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout
demo: inline
exhibit: false
useWhen: unequal heights packed into the shortest column
---

The algorithm is the term, and it is one sentence long: take the items in order, and put
each one into whichever column is currently shortest. Everything else follows from that.
The columns stay a fixed width, so an item's height is whatever its content needs. No
item ever waits for a row to complete, so no gaps open under a short item. And because
each placement depends on the heights that came before it, the bottom edge lands
wherever it lands, which is the ragged silhouette the word is usually reaching for.

The cost is that reading order and visual order come apart. Item three can end up sitting
higher on the screen than item two, because item two went into a column that was already
tall. A pointer user never notices. Someone tabbing through, or listening to the page,
gets the source order, which is the order the packer consumed and not the order the eye
reconstructs, so "the third one across the top" is a phrase that means nothing to them.
That divergence is a real cost rather than a footnote, and it is the reason a masonry
wall of interactive cards is a worse idea than a masonry wall of photographs. The
[reading order](/reading-order) is the one that is authoritative, so it has to be the
one that makes sense.

The neighbours are best told apart by what each of them equalises. A
[card grid](/card-grid) equalises the cards, giving every item the same box and asking
the content to fit. A [justified gallery](/justified-gallery) equalises the rows,
scaling each row's images to one shared height so both side edges land flush. A
[bento grid](/bento-grid) equalises nothing but is authored by hand: every cell's size
is a decision, and the field is tiled to fill its rectangle exactly. Masonry equalises
nothing and decides nothing, which is why it is the only one of the four with a ragged
bottom edge.

For most of its life this was a scripting job, and the reference implementation is still
[Masonry](https://masonry.desandro.com) by David DeSandro, which measures every item,
positions it absolutely, and recalculates on resize and on every image that finishes
loading. Doing it in the layout engine has been argued in the CSS Working Group for
years, as a value of `display`, as an item-flow property, and as the lanes spelling that
is currently in the grid module. That argument is its own entry:
[grid lanes](/grid-lanes) covers the mechanism and the state of the naming, which is
still moving, so check the [MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout)
before writing the property rather than copying a syntax out of an article.
