---
name: Color coding
slug: color-coding
category: color
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: Giving each category its own colour so the eye can group and find by
  hue, which holds only while the set stays small and one colour means one thing
  everywhere.
aliases:
  - name: colour coding
    source: community
  - name: color-coded
    source: community
  - name: category color
    source: community
tags:
  - dataviz
  - perception
relations:
  contrastWith:
    - categorical-palette
    - status-color
    - use-of-color
  variantOf: []
  partOf: []
  seeAlso:
    - chart-legend
implementations: []
sources:
  - title: "NN/g: Using Color to Enhance Your Design"
    url: https://www.nngroup.com/articles/color-enhance-design/
  - title: "Christopher Healey: Perception in Visualization"
    url: https://www.csc2.ncsu.edu/faculty/healey/PP/
demo: inline
exhibit: false
useWhen: colour standing in for a category the reader must learn
---

Colour coding is a substitution. A category stops being a word and becomes a hue, and the
reader is asked to learn the mapping once so they can read it everywhere afterwards. What
that buys is the one question colour answers faster than text: grouping, and finding. Hunting
a week of calendar entries for the interviews, or a log for the network lines, is close to
effortless when the target has a hue of its own, and it means reading every label when it does
not. The cost is the learning, which is why a distinction that appears once is not worth
coding: until the mapping is known, a coloured mark carries less than the written word it
replaced.

The set size is where colour coding usually fails, and the ceiling is lower than people
expect. Christopher Healey's survey of perception research puts the reliable number of
distinguishable colours somewhere between six and twelve, and that is for colours seen in
isolation, not small marks scattered across a busy screen. Past the ceiling the hues have to
sit close enough together that two of them read as one colour seen twice, and the reader
stops matching marks back to the key at all. A code set that has outgrown the limit is not
repaired by picking better colours. It is repaired by coding fewer things: merge the rare
categories, code only the few the screen is actually about, and let the rest be plain.

Four neighbours own the parts of this that are not the coding itself, and they are easy to
blur together. A [categorical palette](/categorical-palette) is the set of hues, chosen so
that none of them outranks another; colour coding is what happens once that set is pointed at
real categories. [Status colour](/status-color) is a coding whose categories are fixed
outcomes and whose mapping most readers already hold, so it carries no learning cost and
never grows past four. A [chart legend](/chart-legend) is the written half of one chart's
mapping, the key rather than the code. And [use of colour](/use-of-color) is the constraint
over all of them, the rule about what a coding may not be the only carrier of.

That constraint is also the practical advice, because a coding is at its best when it is
never alone. A shape, a position, an icon, or the label the mark was going to carry anyway
turns the hue into an accelerator rather than the sole channel, and the mark stays readable
for a reader with a colour vision deficiency, on a projector, or in a screenshot printed in
grey. [Syntax highlighting](/syntax-highlighting) is the colour coding most people look at
all day, and it is the clearest demonstration of the whole idea: a small closed set of token
categories, one colour each, held identical across every file, with weight and italics
carrying the same distinctions a second time.
