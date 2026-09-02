---
name: Color gamut
slug: color-gamut
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The set of colours a space or a display can actually produce, which
  is why a value that is legal in one notation can be impossible on a given
  screen.
aliases:
  - name: gamut
    source: community
  - name: out of gamut
    source: community
  - name: color-gamut media query
    source: css
tags:
  - perception
relations:
  contrastWith:
    - gamut-mapping
    - color-space
    - wide-gamut
  variantOf: []
  partOf: []
  seeAlso:
    - cmyk
implementations: []
sources:
  - title: "MDN: color-gamut media feature"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/color-gamut
  - title: CSS Color Module Level 4
    url: https://www.w3.org/TR/css-color-4/
demo: inline
exhibit: false
useWhen: asking whether a colour can be shown at all
---

Draw every colour a person can see as a horseshoe and any real device covers a triangle
inside it, with its three primaries at the corners. That triangle is the gamut. sRGB, the
triangle the web assumed for twenty years, reaches about a third of the horseshoe.
Display P3 is the same shape pushed out in the reds and greens, and Rec. 2020 further
still. A [colour space](/color-space) has a gamut because its primaries are fixed; a
monitor has a gamut because its backlight and filters are. The two are separate
questions, and a value only appears on screen when both answer yes.

CSS can name colours outside sRGB directly. `color(display-p3 1 0 0)` addresses that
space's red corner, `color(rec2020 ...)` a wider one, and `oklch()` will happily accept a
chroma no display can reach because it is not bounded by any device at all. What happens
next is gamut mapping: rather than failing, the browser brings the colour back inside the
range it can show, holding [hue](/hue) and [lightness](/lightness) as far as it can and
giving up [chroma](/chroma) first. The result is a real colour, just not the one that was
written, and two screens can disagree about it.

Asking before writing is the polite version. `@media (color-gamut: p3)` is true when the
display can show roughly the P3 triangle, so the usual shape is an sRGB value stated
plainly and a wider one layered over it inside the query, which also covers browsers that
never heard of the feature. `@supports (color: color(display-p3 1 0 0))` answers the other
half of the question, whether the engine can parse the syntax at all, and the two are
often paired.

The discipline is to treat wide gamut as decoration, never as information. A status that
is only distinguishable as a more vivid red on a good laptop is broken everywhere else,
and a [contrast ratio](/contrast-ratio) calculated on the value you wrote is not the one
the reader gets after mapping. Spend the extra range on things that are allowed to be
merely nicer: a saturated accent, a brand red that finally looks like the printed one, a
gradient with more room in the middle. Everything load bearing stays inside the triangle
every reader has.
