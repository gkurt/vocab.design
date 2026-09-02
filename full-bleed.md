---
name: Full bleed
slug: full-bleed
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An element that breaks past the content column to span the whole
  viewport width while its neighbours stay constrained.
aliases:
  - name: full width
    source: community
  - name: bleed
    source: print
  - name: edge to edge band
    source: community
  - name: escape the container
    source: community
  - name: full alignment
    source: wordpress
  - name: alignfull
    source: wordpress
tags:
  - editorial
relations:
  contrastWith:
    - hero
    - breakout
    - container
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Full Bleed, CSS-Tricks
    url: https://css-tricks.com/full-bleed/
  - title: CSS Grid full-bleed layout tutorial, Josh W. Comeau
    url: https://www.joshwcomeau.com/css/full-bleed/
demo: inline
exhibit: false
useWhen: one band that runs edge to edge inside a narrow page
---

The word is borrowed from print, where an image that bleeds runs past the trim
line so that after the page is cut there is ink all the way to the paper's edge.
On the web there is no trim, so the term keeps only the effect: one element
reaching both edges of the viewport while the text around it stays inside a
comfortable measure. It is the layout equivalent of raising your voice for one
sentence.

The awkward part is that the element has to escape a container it lives inside.
The old trick was a negative margin paired with matching padding, or the
`margin-left: calc(50% - 50vw)` pair, both of which work and both of which
misbehave the moment a scrollbar exists, because `vw` counts the scrollbar and the
content box does not. The grid answer inverts the problem: instead of the child
escaping, the parent stops constraining. A three track grid with a measure sized
middle column and two flexible gutters lets ordinary children sit in the middle
track, and the one element that should bleed asks for the outer lines instead
(`grid-column: full`). Nothing escapes anything, and nothing needs to know how
wide its own gutter is.

WordPress named the same idea in its editor, where a block can be set to full
alignment and gets the `alignfull` class, which is why the term arrives in a lot
of briefs as "make this full width". Worth keeping the two apart: full width means
as wide as whatever contains it, and full bleed means wider than that, out to the
edge of the page.

One caveat that is usually learned the hard way. A bleeding element inherits none
of the reading protections the measure was giving, so text placed directly in one
becomes a 120 character line, and a bleeding image with a caption needs the
caption pulled back into the content column rather than left stranded under the
far edge.
