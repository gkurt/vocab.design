---
name: Modular grid
slug: modular-grid
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A grid with both columns and rows, dividing the page into equal
  modules that content can span in either direction.
aliases:
  - name: module grid
    source: community
  - name: two dimensional grid
    source: community
  - name: swiss grid
    source: community
tags:
  - grids
relations:
  contrastWith:
    - compound-grid
    - bento-grid
    - layout-grid
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: content that needs to span rows as well as columns
---

Most grids on the web only divide the width. A modular grid divides the height too: a set of
horizontal fields crosses the vertical columns, and the rectangle where one column meets one
field is a module. Content is then specified in modules. A picture is two modules wide by two
modules tall, a standfirst is three modules by one, and the sizes of everything on the page are
drawn from one small set of numbers rather than invented per element. The gutters between
modules run in both directions, so the horizontal rhythm and the vertical rhythm are the same
decision made once.

The contrast to hold on to is with the ordinary column grid. A
[twelve column grid](/twelve-column-grid) divides width alone, so how tall anything is gets left
to whatever the content happens to be, and a designer sizing an image ends up specifying columns
plus a guess. A modular grid divides height as well, so that image can be stated in modules in
both directions and will agree with its neighbours without anyone measuring. Read the other way,
that is also the cost: a column grid asks nothing of the vertical dimension and therefore never
fights the content, while a modular grid only holds if the material can be made to fit the
fields you chose.

The technique is closest associated with Swiss typography, where it became the standard tool for
imposing order on pages full of unrelated material: photographs, captions, tables, and running
text all reduced to the same set of rectangles. The horizontal fields are usually derived from
the type, so that the field height is a whole number of lines and the module boundaries land on
the [baseline grid](/baseline-grid) rather than cutting across it. See
[Swiss style](/swiss-style) for the wider movement, and
[editorial web design](/editorial-web-design) for what happens when that thinking is carried onto
a page that scrolls.

On the web the mechanism is cheap now: a grid container with explicit column tracks and explicit
row tracks, and children placed across both. The judgement is in what the row tracks are made of.
Fixed row heights give you real modules and will clip or strand text that does not cooperate,
while auto rows give you a column grid wearing a modular grid's name. A common compromise is a
fine field, several fields per component, so the vertical steps are small enough that most
content lands on one. Either way it sits on top of the same shared measure a
[layout grid](/layout-grid) defines, and is a statement about how a page is composed rather than
a replacement for it.
