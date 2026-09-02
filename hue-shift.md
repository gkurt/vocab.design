---
name: Hue shift
slug: hue-shift
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Rotating hue deliberately along a ramp, warmer at the light end and
  cooler at the dark end, so a scale looks alive instead of like one colour
  fading out.
aliases:
  - name: hue torsion
    source: community
  - name: hue rotation
    source: community
  - name: hue cycling
    source: community
  - name: warm light cool shadow
    source: community
tags:
  - perception
  - tokens
relations:
  contrastWith:
    - color-interpolation
    - color-temperature
  variantOf: []
  partOf: []
  seeAlso:
    - color-ramp
implementations: []
sources:
  - title: "Rampensau: palette generation with hue cycling"
    url: https://github.com/meodai/rampensau
demo: inline
exhibit: false
useWhen: steering hue across a ramp instead of holding it fixed
---

The naive way to build a scale from one colour is to hold the [hue](/hue) still and move
only lightness: white mixed in gives a [tint](/tint), black mixed in gives a
[shade](/shade). It works, and it looks like exactly what it is, one colour being turned up
and down. Hue shifting adds a second move. As the ramp gets lighter the hue rotates toward
the warm side, and as it gets darker it rotates toward the cool side, so the light end and
the dark end are not quite the same colour any more.

Painters got there first, and the shorthand is warm light, cool shadow. A lit surface takes
on the colour of whatever is lighting it, usually something warm, while the shadow is lit
by the sky and by bounce from everything nearby, which is usually something cool. A shadow
that is merely the same colour multiplied by a smaller number is a shadow no light ever
made, and the eye knows it even when the viewer cannot say why. Pixel artists turned the
same observation into a technique with a name, because a sprite limited to a handful of
colours cannot afford steps that look like each other.

In interface work the same move rescues a [colour ramp](/color-ramp). Fix the lightness
ladder first, since that is what carries contrast, then rotate hue a few degrees per step
on top of it: twenty to sixty degrees across the whole scale is a normal budget. Palette
generators do this by default now, and [Rampensau](https://github.com/meodai/rampensau)
names the parameter hue cycling outright. Working in a perceptual space such as
[oklch](/oklch) makes it a one-number edit, because hue there is an axis you can turn
without the lightness following it.

Two cautions. Shifting is a look, not a contrast tool: rotating hue barely moves
[relative luminance](/relative-luminance), so a ramp that fails a contrast check does not
pass by getting more colourful. And the budget is real. A blue whose darkest step has
rotated far enough to read as purple is no longer the brand's blue, which is why the ends
of a ramp are worth checking against the middle rather than only against each other.
