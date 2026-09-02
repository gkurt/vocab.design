---
name: Jank
slug: jank
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Visible stutter in motion caused by frames arriving late or not at
  all, so an animation that should be continuous reads as juddering.
aliases:
  - name: dropped frames
    source: community
  - name: jitter
    source: community
  - name: stutter
    source: community
  - name: judder
    source: community
  - name: frame drop
    source: community
tags:
  - errors
  - perceived-performance
relations:
  contrastWith:
    - layout-thrashing
    - compositor-animation
    - frame-rate
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: animation performance and frame rate"
    url: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate
  - title: "web.dev: jank busting for better rendering performance"
    url: https://web.dev/articles/speed-rendering
demo: inline
exhibit: false
useWhen: naming why smooth-looking motion feels wrong
---

Jank is a blown budget, seen. A [frame rate](/frame-rate) says how much time each picture
gets; jank is what the eye reports when a picture misses that deadline. The display has
nothing new to show, so it shows the last frame again, and the element that should have
moved a little further stands still. When the late frame finally arrives it carries the
position the element should have reached by then, so the hold is paid off with a jump. Hold,
jump, hold, jump: that is the whole sensation, and it is why jank feels less like slowness
than like something being wrong with the machine.

The cause is almost always the main thread being busy elsewhere. A long task blocks it,
and rendering waits in line behind whatever the task is doing: parsing a chunk of JSON,
building a hundred list rows, running a layout the code asked for at a bad moment. That last
one has its own name. [Layout thrashing](/layout-thrashing) is the loop where script writes a style, reads a
measurement back, writes again, and forces the browser to recalculate geometry on every
iteration instead of once at the end. Garbage collection, a large repaint, and a
still-decoding image can each do the same, and a phone reaches all of these sooner than the
laptop the code was written on.

The escape is to move the animation off the busy thread altogether. `transform` and
`opacity` can be handled by the [compositor alone](/compositor-animation), which keeps drawing them at the display's
cadence even while script is stuck, so an element that slides with `translate` survives a
stall that would visibly break the same slide written with `left` or `margin`. Everything
else is about doing less at the wrong moment: batch reads before writes, cut long tasks into
short ones, keep expensive work out of the frames while something is moving, and do not
start an animation in the same instant as the work it was meant to cover.

Irregularity is what hurts, not the average. A steady 30 frames a second reads as a
deliberately slower animation, while 60 with four frames missing in the middle reads as
broken, even though the second one drew more pictures. That is the practical line between
these two words: the frame rate is the budget, jank is the sound of missing it, and a
report of one is not a report of the other. It also means jank is diagnosed by watching for
the stutter and then measuring the long frames underneath it, rather than by chasing a mean
frame rate that was never the thing a reader could feel.
