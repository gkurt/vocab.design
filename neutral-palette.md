---
name: Neutral palette
slug: neutral-palette
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The greys an interface is mostly made of, ramped from page
  background to body text, which carry the structure while the accent carries
  the attention.
aliases:
  - name: greyscale
    source: community
  - name: grayscale
    source: community
  - name: gray ramp
    source: community
  - name: neutral ramp
    source: fluent
  - name: slate scale
    source: radix
tags:
  - tokens
relations:
  contrastWith:
    - tinted-neutral
    - color-ramp
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Carbon: color"
    url: https://carbondesignsystem.com/elements/color/overview/
demo: inline
exhibit: false
useWhen: the greys that most of the interface is actually made of
---

Almost every pixel of a working interface is a neutral. The page behind everything, the
card in front of it, the hairline between two rows, the label nobody is meant to read
twice, the sentence they are: all of it is one ramp of greys spent by role. The brand
colour shows up on a handful of small things, which is exactly why it works. A neutral
palette is therefore not the boring part of a colour system, it is the part that decides
whether an interface has structure, and the accent is the only thing left that has to
shout.

Pure grey is available and is rarely the answer. Zero [chroma](/chroma) looks inert next
to a coloured accent, so most systems tint their neutrals a few thousandths toward a hue:
cool greys, tilted to blue, read as crisp and screen-like and recede politely behind a
blue accent, while warm greys tilted to yellow or red read as paper and flatter warm
brands. The budget is small. Somewhere above about 0.02 chroma the greys stop being
neutral and start being a very quiet colour, which is a different design and usually an
accident. This is the decision [colour temperature](/color-temperature) is about, made
once and then applied to every step.

It is worth telling apart from a [monochromatic palette](/monochromatic-palette), which
builds the whole scheme, accent included, out of a single hue. A neutral palette is the
opposite arrangement: a hue free, or nearly hue free, structure plus a separate accent
that carries the only colour with a job. The two schemes fail differently. Monochromatic
schemes run out of ways to say "this one is important", and neutral schemes go dead if
the tint is dropped and the accent is used for decoration rather than for meaning.

Build the ramp by role rather than by name, because `grey-400` tells nobody where to use
it: a page background, a raised [surface](/surface-color), a sunken well, a border, a
muted label, and body ink is usually enough, with a couple of spare steps for hover and
pressed washes. Every step that carries text has to clear its own
[contrast ratio](/contrast-ratio), which is why the muted step is the one that quietly
fails audits. And a dark theme is not the ramp reversed: the lightness steps have to be
re-picked so that surfaces still separate and the tint does not turn muddy, which is the
work [dark mode](/dark-mode) actually is.
