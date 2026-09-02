---
name: Conic gradient
slug: conic-gradient
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A gradient whose colours sweep around a centre point like a clock
  hand rather than along a line, the shape behind pie charts, colour wheels and
  progress rings.
aliases:
  - name: angular gradient
    source: community
  - name: sweep gradient
    source: android
  - name: pie gradient
    source: community
tags:
  - web-platform
relations:
  contrastWith:
    - gradient
    - mesh-gradient
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: conic-gradient()"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient
demo: inline
exhibit: false
useWhen: colours sweeping around a centre instead of across a line
---

CSS draws [gradients](/gradient) three ways, and the difference is only which geometry the
stops are laid along. Linear runs them down an axis, radial runs them outward from a point,
and conic runs them around one: the colour at any pixel is decided by the angle from the
centre to that pixel, so the fill sweeps like a clock hand. Two arguments steer it. `from`
rotates the starting angle, which is almost always what you want when the seam lands
somewhere ugly, and `at` moves the centre off the middle of the box. Positions on a
[colour stop](/color-stop) are read as angles or as percentages of one full turn, so `25%`
and `90deg` are the same place.

The trick that made conic gradients famous is the hard edge. Two stops pinned at the same
position leave no room to blend, so `conic-gradient(#3557e8 0 42%, #7aa2f7 42% 68%, ...)`
draws four flat slices and you have a pie chart with no SVG, no library, and no elements.
The same trick plus a radial mask punching out the middle is a donut, which is how a
[progress ring](/progress-ring) is usually painted. Be honest about what that gets you: it
is paint, not data. A chart built this way carries no labels, no values, and nothing a
screen reader can read, so the numbers have to exist somewhere in the markup as well, and
the slices need to differ by more than hue for anyone reading them without colour.

The smooth version has its own uses. A [colour wheel](/color-wheel) is a conic sweep
through every hue with the last stop repeating the first, which is the only way to close
the loop without a visible seam. A conic behind a border box is where
[gradient borders](/gradient-border) get their rotating shimmer. And a conic under a mask
is the shape most "sweep" spinners are, because the fade around the circle falls out of the
geometry rather than being drawn frame by frame.

Two things bite. The sweep gets wider in pixels as it moves away from the centre, so a
shallow ramp shows [colour banding](/color-banding) at the outer edge long before it does
near the middle, and the fix is more chroma variation or a grain layer rather than blur.
And interpolation still matters: a conic from blue to yellow travels through the same muddy
midpoint any other gradient does unless you name a better space to blend in.
