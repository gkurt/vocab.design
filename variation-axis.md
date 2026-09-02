---
name: Variation axis
slug: variation-axis
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "One dimension a variable font can move along, named by a
  four-letter tag: lowercase for the five registered axes, uppercase for custom
  ones."
aliases:
  - name: font axis
  - name: design axis
  - name: registered axes
    source: opentype
  - name: custom axis
  - name: wght wdth slnt ital opsz
    source: opentype
tags:
  - fonts
relations:
  contrastWith:
    - named-instance
    - grade-axis
    - optical-size
    - variable-font
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: OpenType Design-Variation Axis Tag Registry
    url: https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg
  - title: Variable fonts (MDN)
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts
demo: inline
exhibit: false
useWhen: naming a single dial inside a variable font
---

A variation axis is one dial inside a [variable font](/variable-font): a named,
continuous range the outlines can be moved along. Each axis carries a four-letter
tag and three numbers, a minimum, a default and a maximum, and a font instance is
just a coordinate on every axis at once. Five tags are registered, and registered
tags are always lowercase: `wght` for weight, `wdth` for width, `slnt` for slant
in degrees, `ital` for the switch into a true italic, and `opsz` for
[optical size](/optical-size). Anything a foundry invents for itself takes an
uppercase tag instead, which is the whole convention: `GRAD` for grade, `YOPQ`
for the thickness of thin strokes, and so on down whatever the design needed.

The important thing about an axis is that a type designer drew it. The foundry
supplies masters at the ends of the range, and often at points in between, and
the interpolation between them is designed rather than guessed: counters stay
open as the stems thicken, joints are rebuilt, the fit is adjusted. That is what
separates an axis from faux bold, where the browser has no second drawing to move
toward and smears the one it has outward until the letters lose their counters.
Every value on a real axis is a drawing the designer signed off on, including the
ones nobody has ever named.

Reach for the high-level CSS property when there is one:
[font-weight](/font-weight) for `wght`, `font-stretch` for `wdth`,
`font-style: oblique 12deg` for `slnt`, `font-optical-sizing` for `opsz`. Those
inherit, animate, and mean something to the browser, so a fallback face still
gets a sensible weight. `font-variation-settings` is the escape hatch for custom
axes, and it comes with a sharp edge: it does not inherit one axis at a time, so
a rule that sets a single tag on a child silently resets every other axis that
element had. Axis values are also inclusive of nothing outside the range, and a
value the file does not carry is clamped rather than honoured.

A foundry usually ships named instances alongside the axes, which are just
bookmarked coordinates with human names on them (Regular, Condensed Bold) so a
menu has something to list. They are conveniences, not the design space. The
space is the axes, and picking a value between two named instances is as
legitimate as picking one of them.
