---
name: Visual hierarchy
slug: visual-hierarchy
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The ordering of elements by visual weight, size, contrast, position
  and spacing, so a reader learns what matters most without being told.
aliases:
  - name: hierarchy
    source: community
  - name: information hierarchy
    source: community
  - name: visual order
    source: community
tags:
  - perception
relations:
  contrastWith:
    - typographic-hierarchy
    - focal-point
  variantOf: []
  partOf: []
  seeAlso:
    - visual-balance
    - signifier
    - gutenberg-diagram
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: deciding what a reader should notice first
---

Hierarchy is the answer to a question every screen is asked and most screens dodge: of
everything here, what should be read first? The knobs are few and they are all relative.
Size, because a bigger thing is seen before a smaller one. Weight, because a bolder stroke
holds more ink. Contrast, because the element furthest from its background separates
first. Position, because a reader arrives at the top left of a column and leaves at the
bottom. And space, because a gap groups what it does not separate, which is how three
lines become one block that is read as a unit. Colour is a knob too, though the weakest
one on its own, since it cannot be counted on by every reader.

The failure mode is not ugliness, it is flatness. A card where the title, the date, the
description, and the action are all set at thirteen pixels in the same weight and the same
grey does not look bad, it looks undecided, and the reader has to read all of it to find
out which line was the point. The opposite failure is just as common: five things all
shouting, each given emphasis by a different means, which leaves no order at all because
everything is level again. Hierarchy is a ranking, so it costs something to promote one
element, and what it costs is the emphasis you take off the others.

The standard test is to squint, or blur the screen, or look at a thumbnail of it, and see
what survives. Whatever you can still pick out is the first level, and if it is not what
you meant to be first the design is telling a different story than the copy is. Reading
order helps too: the eye enters a Western layout at the top left and scans in an F or a Z
depending on how much text there is, so an element placed against that current has to be
much louder to win. Numbering the intended order and then checking it against where your
own eye actually lands is a cheap correction, and the demo above draws exactly that,
including the case where the accent button outranks the body copy sitting above it.

Hierarchy is not the same as [heading hierarchy](/heading-hierarchy), which is the
document's semantic outline and is read by machines and screen readers rather than by an
eye. The two should agree, and they often do not: a visually enormous marketing line is
frequently not a heading at all, and a real `h2` is frequently styled down into a caption.
The tools it is built from each have their own entries, notably the
[type scale](/type-scale) that supplies the sizes, [whitespace](/whitespace) that supplies
the grouping, and [opacity](/opacity), which is where emphasis by fading something back
starts costing legibility.
