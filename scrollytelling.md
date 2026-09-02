---
name: Scrollytelling
slug: scrollytelling
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A narrative layout where a pinned graphic stays fixed while text
  scrolls past it, each step changing what the graphic shows.
aliases:
  - name: scroll driven narrative
    source: community
  - name: pinned scroll
    source: community
  - name: sticky graphic
    source: community
  - name: scroll story
    source: community
tags:
  - editorial
  - scroll
relations:
  contrastWith:
    - scroll-pinning
  variantOf: []
  partOf: []
  seeAlso:
    - timeline
    - stacking-cards
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: one visual that changes as the story scrolls past
---

Scrollytelling is a way of laying out an argument. One graphic is held on screen while the
prose moves past it, and each paragraph is a step that changes what the graphic shows: a map
zooms to the district under discussion, a chart adds the series the sentence just mentioned,
a photograph swaps for the same view forty years later. The reader never loses the picture
while reading about it, and never has to hold a figure in their head between the text and
the plate. It arrived in newsrooms in the early 2010s and now belongs to any long-form piece
with one visual and several things to say about it.

Three parts make one. A sticky graphic, which is the mechanism named by
[scroll pinning](/scroll-pinning): the figure is held at the top of its container while the
container is taller than it. A sequence of steps, which are ordinary blocks of prose in the
flow beside or over the graphic. And a trigger, which watches the steps and reports which
one currently occupies a chosen line across the viewport, usually somewhere around the
middle. That last part is the whole discipline. The step boundary is a line, not a moment,
so the graphic changes when the reader has arrived at a paragraph rather than after a fixed
number of pixels, and scrolling back up runs the same boundaries in reverse. A story that
cannot be read backwards has a bug, not a style.

The line between this and the thing readers hate is thin, and it is drawn at control of the
scroll. Scrollytelling holds a graphic still and lets the reader move at their own pace; it
does not slow the wheel down, intercept a flick, or spend three screens of scrolling to
advance one step. When those happen the reader has lost the scrollbar they were holding,
which has its own name and a bad reputation. Nearby patterns do different jobs with the same
material: [scroll snap](/scroll-snap) advances a whole panel at a time and is a slideshow
mechanic rather than a narrative one, and a
[sticky sidebar](/sticky-sidebar) also stays put while text scrolls but says the same thing
throughout, since it is navigation rather than a step in an argument.

The honest test is what the piece becomes when the technique is unavailable. On a narrow
screen there is no room for a graphic beside the prose, so the usual fallback stacks each
step under its own copy of the figure, which reads perfectly well and often better. Under
[prefers-reduced-motion](/prefers-reduced-motion) the transitions between states go away and
the states remain. And for a reader using a screen reader, the graphic's changes are
invisible unless each step carries the text of what it shows, which is the same discipline
alt text asks for, applied once per step rather than once per image. If the story falls apart
in all three cases, the scrolling was not carrying the argument, it was carrying the design.
