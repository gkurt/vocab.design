---
name: Range slider
slug: range-slider
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A slider with two handles on one track that sets a lower and an
  upper bound, so the selection is an interval rather than a point.
aliases:
  - name: multi thumb slider
    source: aria-apg
  - name: dual slider
    source: community
  - name: price range slider
    source: community
  - name: two handle slider
    source: community
tags:
  - dragging
  - forms
relations:
  contrastWith:
    - slider
    - track
    - date-range-picker
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: aria-apg
    name: Slider (Multi-Thumb)
    url: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
sources:
  - title: "ARIA APG: Slider (Multi-Thumb) pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
demo: inline
exhibit: false
useWhen: the reader picks a from and a to on one track
---

A range slider says both ends of an interval on one track. The filled part between
the two handles is the selection, and everything outside it is what the filter
throws away, which is the reason the control is worth its complexity: two number
fields can express the same thing, but only the track shows how much of the range
is left in.

Two handles on one track create a problem a single slider never has: they can meet.
Decide early whether they may cross (usually not), whether they may sit on the same
value (usually yes, giving an empty or single-value selection), and how a press on
the bare track resolves, since the sensible answer is to move the nearer handle
rather than whichever was touched last. When the handles are stacked on the same
value they also have to be separable by keyboard, which is why each one is its own
focusable element.

In ARIA the pattern is two `slider` elements inside one `group`, not one widget
with two values. Each handle carries its own `aria-valuenow`, its own
`aria-valuemin` and `aria-valuemax` (narrowed by the other handle's position,
which is how "cannot cross" is announced rather than merely enforced), and its own
label, because "minimum price" and "maximum price" are two different questions.
Give each an `aria-valuetext` when the number is a formatted value, so a screen
reader reads $250 rather than 250.

The honest limitation is precision. A track a few hundred pixels wide covering a
wide numeric range gives every pixel several units, so a range slider is for
approximate bounds, and anything the reader needs to type exactly wants number
fields beside it. Pair it with a histogram of where the results actually sit and
it starts answering the question people really have, which is not "what is my
budget" but "where is there anything".
