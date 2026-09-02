---
name: Color picker
slug: color-picker
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A control for choosing a colour, usually pairing a saturation and
  lightness field with a hue slider, an alpha slider and a text field for a
  value.
aliases:
  - name: color chooser
    source: community
  - name: color input
    source: community
  - name: color wheel picker
    source: community
  - name: saturation field
    source: community
tags:
  - design-tools
  - forms
relations:
  contrastWith:
    - color-well
    - eyedropper
  variantOf: []
  partOf: []
  seeAlso:
    - swatch
implementations: []
sources:
  - title: "MDN: EyeDropper API"
    url: https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API
demo: inline
exhibit: false
useWhen: letting a person choose an arbitrary colour
---

A colour picker exists because colour has three dimensions and a screen has two.
The usual answer splits them: a rectangular field carries saturation across and
brightness up, a narrow strip beside or below it carries hue, and a fourth strip
carries alpha when transparency is on offer. Underneath sits the value itself as
text, because the picture can get you close and only the number gets you exact.

The field is where the craft is. It is one gesture setting two numbers at once,
which makes it fast to explore with and impossible to be precise in, so the value
field is not a nicety: it is how a brand colour gets entered rather than hunted
for. Good pickers also keep the last few colours used, since the second time you
need a colour is usually the same colour, and many now offer an eyedropper that
samples a pixel from anywhere on the screen (on the web, through the EyeDropper
API) so that a colour already in the design does not have to be re-found by eye.

The word is worth keeping apart from the things it is often confused with. A
[swatch](/swatch) is a single block of colour, and a grid of them is a palette to
choose from, not a picker: a palette offers the colours a design allows, while a
picker offers every colour there is. That is a product decision more than a visual
one, and offering the full field where a palette belongs is how a design system
quietly loses control of its own colours. A [color wheel](/color-wheel) is the same
job in polar coordinates, hue around and saturation out from the centre, which
reads more like paint mixing and takes more room to do the same work.

Colour is also the one control where the input cannot carry the meaning. A picker
whose value is only ever a position in a gradient is unusable to anyone who cannot
see the gradient, and hard to use for anyone whose vision compresses part of it,
which is why the text value and the arrow keys are load-bearing rather than
optional. Label the parts by name (hue, saturation, brightness, alpha), let the
value field accept and echo the notation the project actually uses, and report the
result as text somewhere a screen reader will reach it.
