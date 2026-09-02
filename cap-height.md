---
name: Cap height
slug: cap-height
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The height of a capital letter measured from the baseline, and the
  edge designers usually mean when they say text should line up flush.
aliases:
  - name: capital height
  - name: cap-height baseline
    source: css
tags:
  - fonts
relations:
  contrastWith:
    - ascender
    - baseline
    - x-height
  variantOf: []
  partOf: []
  seeAlso:
    - overshoot
implementations: []
sources:
  - title: A Glossary of Typographic Terms (Monotype)
    url: https://www.monotype.com/resources/typographic-terms
  - title: "Typography Terms: Glossary (NN/g)"
    url: https://www.nngroup.com/articles/typography-terms-ux/
demo: inline
exhibit: false
useWhen: aligning a heading optically instead of by its box
---

Cap height is measured from the [baseline](/baseline) to the top of a flat
capital such as `H`, `E` or `T`. Round and pointed capitals are drawn a hair
taller so they do not read as short, the same overshoot that lifts an `o` above
the lowercase line, so the flat letters are the ones the measurement is taken
from. It is also not the same as ascender height: in most faces the `b`, `d` and
`h` climb a little above the capitals, which is why a lowercase word can look
taller than a capitalised one set at the same size.

The reason the number matters is that a capital's top edge is what a reader's eye
treats as the top of a line of text. The box that CSS lays out is much taller:
it carries the ascent, the descent, and whatever room the face reserves for
accents, so aligning two boxes leaves a gap of empty air above the capitals that
nobody asked for. This is the whole of the complaint that a heading sits too low
in its button, or that a title and the rule beside it refuse to look level.
Aligning on cap height and baseline instead puts the ink where the eye expected
it, which is what optical alignment means in practice.

Icon sizing is the same problem in miniature. An icon set to `1em` is drawn
against the em box and towers over the capitals it stands beside, while an icon
set to the cap height stops exactly where the letters do and reads as part of the
line. CSS gives you the metric directly as the `cap` unit, one cap height of the
element's first available font, alongside `ex` for [x-height](/x-height). Both
track the face, so the alignment survives a font swap that a hardcoded pixel
value would not.

The ratio between cap height and x-height is one of the things that gives a
typeface its character: a face with tall lowercase relative to its capitals feels
even and workmanlike, while a big gap between them reads as classical. Trimming
the extra space is finally becoming a CSS job rather than a negative-margin hack,
through `text-box-trim` and `text-box-edge`, which crop a text block's box down
to the cap height at the top and the alphabetic baseline at the bottom so that a
heading's visible ink is what gets spaced.
