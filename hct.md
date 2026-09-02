---
name: HCT
slug: hct
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Material's colour space of hue, chroma and tone, which borrows hue
  and chroma from CAM16 and lightness from CIELAB so tone alone predicts
  contrast.
aliases:
  - name: hue chroma tone
    source: material
  - name: Material color space
    source: material
  - name: material-color-utilities
    source: material
tags:
  - perception
  - theming
  - tokens
relations:
  contrastWith:
    - oklch
    - seed-color
  variantOf: []
  partOf: []
  seeAlso:
    - material-you
    - color-ramp
implementations:
  - system: material
    name: HCT
    url: https://m3.material.io/styles/color/system/how-the-system-works
sources:
  - title: "Material 3: how the color system works"
    url: https://m3.material.io/styles/color/system/how-the-system-works
  - title: HCT in ColorAide
    url: https://facelessuser.github.io/coloraide/colors/hct/
demo: inline
exhibit: false
useWhen: generating a Material palette where tone predicts contrast
---

HCT is a graft. Hue and chroma come from CAM16, a colour appearance model that knows about
viewing conditions and therefore describes how a colour actually looks rather than what the
signal is. Tone is CIE L\*, the lightness axis from CIELAB. Material assembled the pair
because neither half was enough on its own: CAM16 alone gives no lightness axis that maps
cleanly onto contrast, and CIELAB alone gives hues that drift as they lighten. The result
ships as `material-color-utilities` and is the space every Material 3 scheme is generated in.

The payoff is the third axis. L\* is a fixed function of relative luminance, so two colours
that share a tone share a luminance, and therefore share a contrast ratio against any given
background regardless of their hue or chroma. That is why Material states its roles as tone
numbers rather than as colours: primary is tone 40 in a light scheme and tone 80 in a dark
one, on-primary is tone 100 and tone 20, and the accessible pairing holds before anyone has
chosen a hue. Contrast becomes a property of the ramp instead of something to be audited
afterwards, one colour at a time.

This is also the sentence that separates HCT's tone from [lightness](/lightness) as most
stylesheets use it: tone is a perceptual measure calibrated against human vision, while HSL's
L is arithmetic on channel extremes and says almost nothing about how light a colour looks.
[OKLCH](/oklch) is the other answer to the same complaint, a perceptual space with the same
motive that happens to be standardized in CSS and usable in a stylesheet today, where HCT
lives inside Material's own libraries. What both give you is
[perceptual uniformity](/perceptual-uniformity): equal steps that look equal, and a
[chroma](/chroma) axis that can be pushed without dragging the lightness along with it.

Two practical notes. Chroma is a request, not a promise: ask for more saturation than sRGB
can hold at that hue and tone and the space hands back the most it can, holding hue and tone
steady, which is the behaviour the specimen's read-out reports. And HCT is the space, not the
recipe. Deriving a whole palette from one [seed colour](/seed-color), regenerating it from a
wallpaper in [Material You](/material-you), and pulling an outside colour into line by
[harmonization](/color-harmonization) are all operations performed in HCT; the space is what
makes them safe to automate rather than being any of them.
