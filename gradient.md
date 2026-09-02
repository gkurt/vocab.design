---
name: Gradient
slug: gradient
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A fill that transitions between two or more colours across a shape,
  defined by colour stops and by the space the transition is interpolated in.
aliases:
  - name: linear-gradient
    source: css
  - name: radial gradient
    source: css
  - name: color transition
  - name: ramp
tags:
  - perception
relations:
  contrastWith:
    - color-ramp
    - color-stop
    - conic-gradient
    - mesh-gradient
  variantOf: []
  partOf: []
  seeAlso:
    - aurora-ui
implementations: []
sources:
  - title: "MDN: Using CSS gradients"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Using_gradients
demo: inline
exhibit: false
useWhen: a fill that changes colour across its own area
---

A gradient is an image the browser draws rather than downloads, and it is
described by two things: the stops (which colours, at which positions) and the
geometry that sweeps between them. Linear runs the stops along an axis, radial
runs them outward from a point, and conic runs them around one, which is why the
same three colours can read as a sky, a glow, or a pie chart depending only on the
function name.

The part that surprises people is interpolation. Between two stops the browser
invents every colour in between, and which colours it invents depends on the space
it works in. Blending blue to yellow in sRGB drags the midpoint through a muddy
grey, because sRGB is not perceptually even; the same pair blended in oklab keeps
its chroma the whole way. CSS now lets you say so directly, and a stated
interpolation method is the difference between a gradient that looks designed and
one that looks washed out in the middle.

Two practical failures show up constantly. Banding, where a shallow gradient over a
large area is quantised into visible stripes, is fixed by adding chroma variation,
a touch of noise, or more stops rather than by adding blur. And text over a
gradient has no single contrast ratio: it must clear the threshold against the
lightest and the darkest pixel it can land on, which usually means a scrim or a
solid plate under the text rather than a hopeful eyedropper reading of the middle.

A gradient with two stops that both sit at the same position is a hard edge, and a
gradient with stops repeated at intervals is a stripe pattern. That is not a trick
so much as a reminder that in CSS the gradient functions are the general fill
language, and a smooth blend is only the most common thing to ask them for.
