---
name: Surface tint
slug: surface-tint
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: A wash of the primary colour blended into a surface in proportion to
  its elevation, so height reads as a colour shift rather than only as a shadow.
aliases:
  - name: surfaceTint
    source: material
  - name: tonal elevation
    source: material
  - name: tonal surface color
    source: material
tags:
  - depth
  - theming
relations:
  contrastWith:
    - elevation-overlay
    - state-layer
    - container-color
    - elevation
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Surface tint
    url: https://m3.material.io/styles/color/roles
sources:
  - title: "Material 3: color roles"
    url: https://m3.material.io/styles/color/roles
  - title: "Flutter: ElevationOverlay.applyOverlay"
    url: https://api.flutter.dev/flutter/material/ElevationOverlay/applyOverlay.html
demo: inline
exhibit: false
useWhen: elevation shown by tinting a surface rather than by shadow
---

A drop shadow says height by darkening what is behind an object. That works beautifully on a
pale page and does almost nothing on a near black one, which is why Material 3 gives every
scheme a `surfaceTint` role and mixes it into a surface in proportion to how high that surface
sits. Level 1 takes about 5 percent of the primary colour, level 3 about 11, level 5 about 14,
and the resulting values are shipped as the surface container roles rather than computed by
each component. Height stops being an effect drawn around a card and becomes a property of the
card's own fill.

The technique it replaced is worth keeping straight. An [elevation overlay](/elevation-overlay)
lightens a dark surface with translucent white, so every level is the same neutral grey a
little brighter. A surface tint mixes the scheme's own primary in instead, so height reads as
colour and a raised sheet stays recognisably part of a palette rather than drifting toward
grey. Both answer the same problem, and the second one is the reason a Material 3 dark theme
can show four distinct levels without a single shadow anybody can see.

Hold it apart from its neighbours in this batch. A [container colour](/container-color) is also
a fill derived from the [seed colour](/seed-color), but it encodes emphasis and is chosen for
the content it has to hold, while a surface tint encodes height and knows nothing about what is
on it. A [static colour](/static-color) is a value that refuses to re-derive at all, which is
the exact opposite of a fill whose whole definition is a function of something else. Everything
here moves when [Material You](/material-you) picks a new seed, because the tint is the primary
and the primary came from the wallpaper.

Two cautions. The tint is a small percentage of a saturated hue, so it shifts the hue of a
supposedly neutral [surface](/surface-color) more than a screenshot suggests: check that ink
still clears its background at the top of the ladder, since the fill moved and the
[on colour](/on-color) usually did not. And a tint ladder needs distinct steps more than it
needs many of them. Five levels separated by three percent each is a ladder nobody can read,
and the honest fix is fewer levels rather than more shadow.
