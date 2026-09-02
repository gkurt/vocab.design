---
name: Descender
slug: descender
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The part of a letter such as g, j, p, or y that drops below the baseline.
aliases:
  - name: descender line
  - name: descent
    source: css
tags:
  - fonts
relations:
  contrastWith:
    - baseline
    - ascender
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Descender (Wikipedia)
    url: https://en.wikipedia.org/wiki/Descender
  - title: A Glossary of Typographic Terms (Monotype)
    url: https://www.monotype.com/resources/typographic-terms
demo: inline
exhibit: false
useWhen: naming the strokes that hang below the baseline
---

The lowercase letters that hang are `g`, `j`, `p`, `q` and `y`, and the depth
they reach is the descender line, measured downward from the
[baseline](/baseline). A few capitals join them depending on the face, `J` and
`Q` most often, and old style figures put `3`, `4`, `5`, `7` and `9` below the
line as well, which is exactly what makes them sit comfortably inside running
text and badly inside a table. Where the descender line falls is a design
decision rather than a fixed proportion: a face drawn for small sizes keeps its
tails short so lines can be packed tightly, and a display face lets them swing.

Descenders are the mirror of the [ascenders](/ascender) above, and between them
they carry the word shape that lets a reader tell `paging` from `poking` without
spelling either out. They also set the arithmetic of vertical rhythm. A font's
em is divided between an ascent and a descent, and in most faces those two add
up to more than one em, which is why `line-height: 1` is not a tidy choice but a
guarantee that consecutive lines will touch: the `g` on one line and the `h` on
the next are drawn into the same few pixels. The room a comfortable
[leading](/leading) buys is mostly descender room.

The other collision is with an [underline](/underline). A rule drawn at the
baseline runs straight through every tail on the line, and the old fix was to
lift the line until it cleared them, which put it too far from the text it was
marking. `text-decoration-skip-ink: auto` is the modern answer and is now the
default in browsers: the rule breaks around each descender and closes up
afterwards, so it can sit close to the baseline and still leave the letters
whole.

Clipping is where descenders cost real money. Give a chip or a button a fixed
height with `overflow: hidden`, trim a heading to its cap height, or animate a
box open to a measured value taken while the text was empty, and the tails go
first while everything else looks fine. Test strings are the trap: `Settings`
survives any box, `Sign up` does not. In CSS the metric is reachable as the
`descent-override` descriptor on an `@font-face` rule, which is how a
[fallback font](/fallback-font) is made to reserve the same depth as the face it
stands in for, and `text-box-edge` lets a heading be trimmed to the alphabetic
baseline on purpose rather than by accident.
