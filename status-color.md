---
name: Status color
slug: status-color
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The small fixed set of colours a product reserves for outcome,
  typically success, warning, danger and info, so meaning is consistent wherever
  it appears.
aliases:
  - name: feedback colors
    source: community
  - name: intent colors
    source: community
  - name: critical
    source: polaris
  - name: error color
    source: material
  - name: state colors
    source: community
tags:
  - errors
  - theming
  - tokens
relations:
  contrastWith:
    - accent-color
    - brand-color
    - color-coding
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Error
    url: https://m3.material.io/styles/color/roles
sources:
  - title: "Material 3: color roles"
    url: https://m3.material.io/styles/color/roles
demo: inline
exhibit: false
useWhen: colours that report an outcome rather than a brand
---

Most palettes have a brand half and an outcome half, and the outcome half is small on
purpose: four meanings, usually success, warning, danger and info, each with exactly one
colour. The point of fixing the set is that a reader learns it once. If green means "this
worked" in the toast, in the table cell and on the status dot, then the fifth place it appears
needs no label to be understood. That only holds if nothing else is allowed to be green, which
is the discipline part: a status colour spent on decoration stops being a signal.

Each meaning needs a set of values rather than a single hex, because the same status has to
work as a text colour, a fill, a border and a tint. That is what a
[colour role](/color-role) is for, and it is why systems name the roles rather than the
colours. The names themselves vary and are worth translating when reading someone else's
system: Material calls the bad one `error`, Shopify's Polaris calls it `critical`, plenty of
others call it `danger` or `destructive`. Info is the one to watch, because it is usually blue
and so is the brand [accent](/accent-color) in about half of all products, which leaves an
informational banner looking exactly like a promotional one.

The accessibility rule is that colour is never the only carrier (WCAG 1.4.1), so each status
travels with an icon whose shape differs, and with words. Red and green is also the single most
common confusion pair, which makes success and danger the two that most need distinguishing by
something other than hue. Both the text and the boundary have their own
[contrast ratio](/contrast-ratio) floors, and warning is the hardest of the four to satisfy:
the amber people reach for first is almost always too light to carry text.

Meaning is cultural as well as learned. Red is loss in Western markets and gain in Chinese
ones, and the "danger" colour is also the colour many products use for the primary destructive
button, so the same red is simultaneously a warning and a call to action. Where a status is
just one attribute of a row, keep the colour off the whole row and put it on a badge, so the
[semantic colour](/semantic-color) is doing one job rather than shouting the entire table
down.
