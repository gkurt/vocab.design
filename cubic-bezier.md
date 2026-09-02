---
name: Cubic bezier
slug: cubic-bezier
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The four-control-point curve that describes how a value moves
  between its start and end, the default way CSS spells an easing.
aliases:
  - name: bezier curve easing
  - name: easing curve
tags:
  - web-platform
relations:
  contrastWith:
    - linear-easing
    - easing
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: easing-function"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function
  - title: Easing Functions Cheat Sheet
    url: https://easings.net/
demo: inline
exhibit: false
useWhen: an easing has to be written down exactly
---

A cubic bezier is how a curve becomes four numbers. The first and last points are
fixed, at the start of the animation and at its end, so only the two control
points in between are yours to choose, and each one is an x and a y:
`cubic-bezier(0.2, 0.8, 0.2, 1)` places the first handle at 0.2 along the time
axis and 0.8 of the way to the destination, and the second at 0.2 and 1. Pulling a
handle to the right delays the movement it governs; pulling it up spends the
distance early. Nothing else is in the description, which is exactly why an
[easing](/easing) written this way ports between CSS, the Web Animations API, and
every design tool.

The keywords are the same thing under names. `ease-in` is
`cubic-bezier(0.42, 0, 1, 1)`, `ease-out` is `cubic-bezier(0, 0, 0.58, 1)`,
`ease-in-out` is `cubic-bezier(0.42, 0, 0.58, 1)`, and the default `ease` is the
slightly asymmetric `cubic-bezier(0.25, 0.1, 0.25, 1)`, which is why the default
already feels better than `linear` and worse than a curve chosen on purpose.
Writing the numbers out is what a design system does when it wants one curve
named once and used everywhere, and the numbers are the reason two systems can be
compared at all.

The two axes are not equally free. Time is clamped: the x values must stay within
0 and 1, because an animation cannot run backwards through its own duration.
Progress is not, so a y above 1 or below 0 sends the value past its destination
and brings it back, which is how a bezier expresses
[overshoot](/overshoot) and anticipation with no physics involved.

What a single cubic curve cannot do is oscillate. It crosses its target at most
once, so a real spring settling through several diminishing bounces is out of
reach, and this is where beziers stop:
[spring animation](/spring-animation) needs a simulation, and CSS approximates one
by sampling it into a `linear()` function with dozens of stops. The other escape
hatches are `steps()` for motion that should jump rather than glide, and
`linear()` for anything whose shape a curve cannot hold.
