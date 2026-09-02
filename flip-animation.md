---
name: FLIP
slug: flip-animation
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A technique that measures an element's first and last positions,
  inverts the difference with a transform, then plays it off, so layout changes
  animate cheaply.
aliases:
  - name: First Last Invert Play
  - name: FLIP technique
  - name: layout animation
    source: framer-motion
tags:
  - web-platform
relations:
  contrastWith:
    - height-animation
    - card-flip
  variantOf: []
  partOf: []
  seeAlso:
    - layout-thrashing
implementations: []
sources:
  - title: "Aerotwist: FLIP your animations"
    url: https://aerotwist.com/blog/flip-your-animations/
  - title: "Josh Comeau: animating the unanimatable"
    url: https://www.joshwcomeau.com/react/animating-the-unanimatable/
demo: inline
exhibit: false
useWhen: a layout change must animate without animating layout properties
---

FLIP is an acronym for the four steps and it is the whole technique. **First**:
measure where the element is now. **Last**: make the change, in one go, and measure
where it ended up. **Invert**: apply a transform that puts it visually back where it
started, so nothing appears to have happened yet. **Play**: animate that transform
away to nothing. Paul Lewis named it in 2015, and the name has outlasted the
libraries that were current when he wrote it down.

The reason to bother is what the browser has to do per frame. Animating `left`,
`top`, `width`, or `margin` means recomputing layout on every frame, on the same
thread as everything else the page is doing, which is why those animations are the
first thing to stutter. `transform` and `opacity` are handled by the compositor and
cost nothing in layout, so FLIP arranges for exactly one layout pass, at the moment
of the measurement, and lets the rest be a transform. The layout change is real and
instant; only the appearance is animated.

Two details separate a working FLIP from a janky one. Reading a rect forces the
browser to flush pending style work, so all the reads belong together, before all
the writes, or the technique reintroduces the thrashing it exists to avoid. And a
scale inversion scales everything inside the element, so text and radii distort on
the way: the usual answers are to counter-scale the contents, to animate position
only, or to accept the squash where the element is a plain block.

Where the change is between two states of one page, the platform now offers this
directly. A [view transition](/view-transition) takes the before and after
snapshots itself and animates between them, and animation libraries wrap the same
idea under the name layout animation. FLIP is still the thing they are doing, and
still what you write by hand when a single element has to move between two places
and the browser has no idea the two are the same element.
