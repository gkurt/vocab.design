---
name: Entrance animation
slug: entrance-animation
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The motion an element plays as it arrives, running from a starting
  style that only exists before the element was ever rendered.
aliases:
  - name: enter animation
    source: community
  - name: mount animation
    source: community
  - name: entry animation
    source: css
  - name: "@starting-style"
    source: css
  - name: enter transition
    source: material
tags:
  - web-platform
relations:
  contrastWith:
    - exit-animation
    - origin-aware-animation
    - pop-in
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: @starting-style"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style
  - title: "Material Design 3: Transitions"
    url: https://m3.material.io/styles/motion/transitions
demo: inline
exhibit: false
useWhen: something new appears and should not just pop in
---

An entrance is the one animation with nowhere to start from. A transition interpolates
between the style an element had and the style it has now, but an element that has just
been created had no previous style, so the browser has nothing to interpolate from and the
first frame is simply the final one. Every solution to this is the same solution: invent a
before. CSS does it declaratively with `@starting-style`, which is a block of values that
apply only for the frame in which the element first becomes rendered, including elements
arriving from `display: none` or from the top layer, as a dialog or a popover does.
Scripted animation does it by naming the from state as the first keyframe. Framework
libraries do it by mounting the element in its hidden state and flipping it a frame later,
which is the same trick with more machinery around it.

What an entrance should say is that the thing is new and where it came from. Small
distances read as arrival, large ones read as flying, so a slide of eight to sixteen
pixels paired with a fade is the workhorse, and the direction should agree with the
element's origin: a notification that lives at the top edge comes down, a sheet comes up
from the edge it is docked to. Curve matters as much as distance. An entrance is
decelerating, easing out so the element rushes in and settles, because something coming to
rest under its own weight is what makes the arrival feel finished. The reverse curve on
the way out is what makes an [exit animation](/exit-animation) its mirror rather than its
copy. Keep it short, roughly 150 to 300 milliseconds for a small element, and remember the
entrance runs while the reader is still deciding whether to look.

Two failures are worth naming. The first is animating an element into space it did not
already own, so everything under it jumps down as it arrives and the entrance reads as a
layout bug. Reserve the room first, or animate only properties that cost no layout, which
in practice means `opacity` and `transform`. The second is animating an entrance the
reader asked for and now has to wait through: a menu that has to complete a 400 millisecond
entrance before it accepts a click is slower than one that appears instantly, whatever the
motion says about polish. Under `prefers-reduced-motion` the correct entrance is usually no
entrance at all, because the state change was always the point and the motion was only ever
a comment on it.
