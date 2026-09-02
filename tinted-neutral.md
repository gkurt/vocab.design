---
name: Tinted neutral
slug: tinted-neutral
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A grey with a trace of the brand hue mixed in, so backgrounds and
  borders belong to the palette instead of reading as a separate, colder system.
aliases:
  - name: hued gray
    source: community
  - name: brand-tinted grey
  - name: gray scale companion
    source: radix
  - name: brand-tinted gray
tags:
  - tokens
relations:
  contrastWith:
    - color-temperature
    - neutral-palette
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Radix Colors: custom palettes"
    url: https://www.radix-ui.com/colors/docs/overview/custom-palettes
demo: inline
exhibit: false
useWhen: greys that quietly carry the brand hue
---

Most of an interface is grey. Page backgrounds, card surfaces, dividers, borders, secondary
text, disabled controls: none of them are the brand colour, and all of them are what the brand
colour is seen against. A pure grey has no hue at all, so the palette ends up in two halves that
were designed by different people, one warm and one from nowhere. A tinted neutral closes the
gap by carrying a trace of the brand hue in every step, small enough that nobody would call it
blue, large enough that it stops looking like a separate system. Radix builds this into its
scales by pairing each colour with a matching grey rather than one shared grey for everything.

The whole thing lives on the [chroma](/chroma) axis, and the exact word matters: a tinted
neutral is low chroma, not zero chroma. Zero chroma is a true grey, one colour per lightness,
no direction. A chroma somewhere between about 0.01 and 0.02 in OKLCH is what makes the same
lightness read as warm or cool instead of as colour, which is the effect being bought. Push it
past about 0.03 and the
greys start competing with the accent they are supposed to sit under, and the interface reads as
tinted rather than as neutral.

What must not move is [lightness](/lightness). A tinted ramp and a pure one should match rung
for rung on measured tone, so swapping one for the other changes no contrast ratio and breaks no
promise the theme has already made about text on a surface. This is why tinted neutrals are
generated rather than hand picked: in [HCT](/hct) or OKLCH the whole operation is one number
held near zero while hue rides along, and every rung keeps the lightness it was assigned. In hex
it is guesswork, and the guesses drift lighter as they get warmer.

A few habits. Tint the surfaces and the lines first, since that is where the halves of a palette
meet, and be more careful with ink: text at low chroma is fine, but a tint applied to body copy
as well as to its background can leave the two agreeing so closely that the page looks slightly
out of focus. Give a dark theme its own tint rather than inverting the light one, because the
hue that reads as a warm paper grey reads as a stain at tone 20. And keep one tinted ramp per
palette. Two greys, each nearly neutral in a different direction, is the same problem the tint
was introduced to solve.
