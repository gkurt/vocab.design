---
name: Additive colour
slug: additive-color
category: color
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: Colour made by adding light, where red, green and blue at full
  strength give white, which is why a screen is at its brightest when it is
  showing all three.
aliases:
  - name: light mixing
    source: community
  - name: emissive colour
    source: community
tags:
  - perception
relations:
  contrastWith:
    - subtractive-color
    - srgb
  variantOf: []
  partOf: []
  seeAlso:
    - blend-mode
implementations: []
sources:
  - title: "Wikipedia: additive color"
    url: https://en.wikipedia.org/wiki/Additive_color
  - title: CSS Color Module Level 4
    url: https://www.w3.org/TR/css-color-4/
demo: inline
exhibit: false
useWhen: colour mixed by adding light, as a screen does
---

Every screen a design is shown on makes colour by adding light. A pixel is three emitters, red,
green and blue, and the colour a reader sees is whatever those three sum to: red and green make
yellow, green and blue make cyan, blue and red make magenta, and all three at full strength make
white. Nothing is being mixed in the sense a painter means. Light is landing on the eye and the
eye is adding it up, which is why the model is called additive and why the three primaries are
the ones they are: they are what human colour vision has receptors for, not what happens to be
in the paint box.

Three consequences follow, and all three matter more than the physics does. A screen cannot show
a colour darker than its own black, because black is the absence of emitted light and the panel
has a floor: whatever it leaks when every channel is at zero is the darkest thing a design can
specify on it, which is why a true-black theme looks different on an OLED panel than on a backlit
one. Two translucent layers stacked on a screen get lighter rather than muddier, since compositing
them adds their light together, and a lighten or screen
[blend mode](/blend-mode) is that addition made explicit. And a designer who learned mixing with
paint has to unlearn it: yellow and blue give a pale grey on a screen, not green, because those
two lights already contain all three primaries between them.

The model is the principle rather than any particular set of numbers. [sRGB](/srgb) is a concrete
space built on top of it, with its own three primaries pinned to real coordinates, a white point,
and a transfer function between the value written and the light emitted, and every other RGB
space is another set of choices about the same three additions. Getting the principle right is
what makes a gamut argument legible: a wider space moves the primaries further out so their sums
reach further, and no amount of moving them lets the sum of three lights be darker than none of
them.

The opposite arrangement is [subtractive colour](/subtractive-color), where every layer can only
take light away, and the two are worth holding in the same head. Ink stacks towards black, light
stacks towards white, and almost every difficulty in getting a screen design onto paper is one of
those two facts refusing to be the other.
