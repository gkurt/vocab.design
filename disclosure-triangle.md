---
name: Disclosure triangle
slug: disclosure-triangle
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The small triangle beside a tree item that points right when
  collapsed and down when open, rotating as it toggles.
aliases:
  - name: twisty
    source: community
  - name: expander arrow
    source: community
  - name: turner
    source: community
  - name: dropdown caret
    source: community
  - name: disclosure indicator
    source: hig
tags:
  - icons
relations:
  contrastWith:
    - disclosure
    - chevron
  variantOf: []
  partOf:
    - treeview
  seeAlso:
    - expanded-state
implementations:
  - system: hig
    name: Disclosure controls
    url: https://developer.apple.com/design/human-interface-guidelines/disclosure-controls
sources:
  - title: Disclosure widget, Wikipedia
    url: https://en.wikipedia.org/wiki/Disclosure_widget
  - title: Disclosure triangle, Usability First glossary
    url: https://www.usabilityfirst.com/glossary/disclosure-triangle/index.html
demo: inline
exhibit: false
useWhen: the little triangle that opens a branch
---

The disclosure triangle is the oldest expand control in graphical interfaces,
inherited from the Macintosh Finder, and it survives because its two positions
are unambiguous: pointing right means there is more, pointing down means you are
looking at it. The rotation between them is the whole vocabulary, which is why
the shape is a triangle rather than a plus sign. A plus can only say "add".

Engineers call it a twisty, designers usually say caret or chevron, and Apple's
guidelines call the family disclosure controls. The words are used loosely, but
the distinctions are real: a chevron is drawn as two strokes and an arrow as one
line with a head, while the classic triangle is a filled solid. Filled or
stroked matters less than direction, since direction is what carries state.

The triangle is a control, not an ornament, so it needs a hit area far larger
than the seven pixels it draws. Give it the padding of a button, put
`aria-expanded` on the element that receives the click, and let the row label
open the branch as well: a reader who missed the triangle by two pixels should
not be punished for it. In a tree, the row is the tree item and the triangle
lives inside it, so the expanded state belongs to the row.

One convention deserves care. In file browsers a triangle only appears beside
items that have children, and its absence is information: the folder is empty,
or the item is a leaf. Rendering a permanently disabled triangle on every row
throws that signal away.
