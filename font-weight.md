---
name: Font weight
slug: font-weight
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: How thick a typeface's strokes are, named in steps from thin to
  black and numbered from 100 to 900 on the web.
aliases:
  - name: weight
  - name: boldness
  - name: wght axis
    source: opentype
  - name: type weight
tags:
  - fonts
relations:
  contrastWith:
    - faux-bold
    - named-instance
  variantOf: []
  partOf: []
  seeAlso:
    - typographic-color
    - grade-axis
implementations: []
sources:
  - title: "Typography Terms: Glossary (NN/g)"
    url: https://www.nngroup.com/articles/typography-terms-ux/
  - title: OpenType Design-Variation Axis Tag Registry
    url: https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg
demo: inline
exhibit: false
useWhen: naming how heavy the strokes are
---

Weight is stroke thickness, and a family ships it as a set of separately drawn
faces rather than as one drawing thickened. Bold is not Regular with more ink
around it: counters are opened back up, joins are cut away so they do not fill
in, and the letters are widened so the heavier strokes still have air. That is
why a real Bold looks calm at text sizes and a browser's synthetic bold, which
does smear the outline, looks muddy.

The numbers run 100 to 900 in hundreds, a scale CSS inherited from OpenType's own
weight class, with 400 as Regular and 700 as Bold. The names attached to the
steps (Thin, Extra Light, Light, Regular, Medium, Semi Bold, Bold, Extra Bold,
Black) are conventions rather than measurements, so one foundry's Medium can be
heavier than another's Semi Bold, and a family with only two faces will map both
to 400 and 700. Ask for a weight the family does not have and the browser picks
the nearest one by a defined rule, or invents it: `font-weight: 600` on a
two-weight family usually renders as 700, and asking for 300 on a family with no
Light can produce a synthesized face on some platforms and plain Regular on
others.

A variable font changes the arithmetic. Its `wght` axis is continuous, so 437 is
a real value and there is no rounding to a shipped step, and the whole range
arrives in one file instead of five. Interfaces mostly still quantize to a small
set anyway, because a design system needs a weight to be a decision that can be
repeated rather than a number someone nudged.

In interface work, weight is the cheapest way to make hierarchy without changing
size. A row label at 600 against a value at 400 separates the two while the line
keeps its height and the layout stays put, which is what a [type
scale](/type-scale) cannot do without moving something. The limits are worth
knowing: below about 400 on a screen, light weights lose contrast and get thin
enough that antialiasing eats them, especially in light text on a dark
background, and jumping straight from 400 to 700 in a table reads as shouting
where 500 would have been enough.
