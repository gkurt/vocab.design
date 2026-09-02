---
name: Emphasis level
slug: emphasis-level
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A three-rung text hierarchy, high, medium and disabled, ranked by
  stepping the opacity of one foreground colour instead of naming a separate
  colour for each rung.
aliases:
  - name: high emphasis
    source: material
  - name: medium emphasis
    source: material
  - name: disabled emphasis
    source: material
  - name: text opacity
    source: community
  - name: secondary text
    source: community
tags:
  - perception
  - tokens
relations:
  contrastWith:
    - opacity
    - on-color
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Emphasis levels
    url: https://m2.material.io/design/color/text-legibility.html
sources:
  - title: "Material: text legibility and emphasis"
    url: https://m2.material.io/design/color/text-legibility.html
  - title: "Material: states"
    url: https://m2.material.io/go/design-states/
demo: inline
exhibit: false
useWhen: ranking text by opacity instead of by separate colours
---

Material 2 gave interface text three rungs and a single colour. High emphasis was the ink at 87
percent, medium at 60 percent, and disabled at 38 percent, black on light surfaces and white
on dark ones. It was an appealing simplification: a heading, its supporting line, and a
greyed-out label all descend from one value, so a theme change moves one colour and the whole
hierarchy follows. Designers picked up the vocabulary quickly, and "medium emphasis" is still
how a lot of teams say "the second-most important text in this block".

The mechanism is what makes it fragile. An `opacity` on a text run is not a colour, it is an
instruction to blend with whatever is underneath, so the resulting colour is decided by the
background at paint time. On the surface the ladder was tuned against, the rungs land where
the designer expected. Move the same three rungs onto a coloured banner, a card with a tinted
state layer, or an image, and the arithmetic changes without anyone touching a token: the
specimen above measures both cases and finds the top rung still clearing AA on a brand
surface while the middle rung drops well under it. An emphasis level is a promise about a
background you do not control, and the
[contrast ratio](/contrast-ratio) is where the promise is called in.

That is why systems moved. Material 3 and every token-based system since express the same
hierarchy as named [colour roles](/color-role): an on-surface colour, an on-surface-variant
for the quieter rung, and a separate disabled treatment, each one a real value chosen and
checked against the surface it is used on. The hierarchy survives, and what disappears is the
derivation. Two details are worth keeping when you make the swap. Disabled text is exempt
from the WCAG minimums, so a disabled rung failing the ratio is a fact about the requirement
rather than a bug, though it is still worth asking whether anyone can read it. And borders,
dividers and icons ranked the same way answer to
[non-text contrast](/non-text-contrast) instead, which asks for 3:1.

The word still earns its place, for two reasons. It is the only compact vocabulary most teams
have for "how loud is this text", which is why
[prefers-contrast](/prefers-contrast) is usually implemented by moving the quiet rungs up
rather than by restyling components. And opacity-based emphasis is not gone: it is still the
right tool inside a component whose background the component itself owns, such as a placeholder
in a field or a caption in a card that will never sit on anything else. The rule is narrow and
easy to state. Use an alpha where you own the surface underneath it, and a token everywhere
else.
