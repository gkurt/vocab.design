---
name: Hyphenation ladder
slug: hyphenation-ladder
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Three or more consecutive lines ending in a hyphen, which builds a
  visible staircase down the right edge of a column.
aliases:
  - name: ladder
  - name: stacked hyphens
  - name: hyphen stack
tags:
  - editorial
  - perception
relations:
  contrastWith:
    - rag
    - river
    - hyphenation
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Practical Typography, on hyphenation
    url: https://practicaltypography.com/
demo: inline
exhibit: false
useWhen: naming a stack of hyphens down a column edge
---

A ladder is three or more consecutive lines that all end in a hyphen. Each break
is legitimate on its own: the word did not fit, the engine found a permitted
point inside it, and it broke there. The defect is the run. Once the third
hyphen lands under the second, the eye stops reading words and starts reading a
column of dashes, because a repeated mark at a fixed interval is a texture and
texture is louder than text.

Narrow measures cause it, and [justified text](/justified-text) makes it worse
in the way that matters most: the right edge is flush, so every hyphen lands at
the same horizontal position instead of at wherever the line happened to stop.
That perfect alignment is what turns three hyphens into a staircase rather than
into three unrelated marks. Ragged-right setting hides a ladder better without
fixing it, which is why the fault is easy to ship in body copy and impossible to
miss in a justified sidebar.

[Hyphenation](/hyphenation) is the feature; a ladder is the defect the feature
produces when nothing limits it. The property written for exactly this is
`hyphenate-limit-lines`, which caps how many consecutive lines may end in a
hyphen, and browser support for it is still thin. The dependable fixes are the
blunt ones: widen the measure, raise `hyphenate-limit-chars` so short fragments
stop qualifying, or turn hyphenation off in that block and accept a worse
[rag](/rag). Turning it off is not free, since hyphenation is what keeps a
narrow justified column from opening rivers between the words.

The single-event faults are a different family. A [runt](/runt) is one word
alone on a last line, a [widow](/widow) is a short last line pushed to the top
of the next column, and an [orphan](/orphan) is a first line stranded at the
bottom of one. Each is judged in a single glance at one spot. A ladder is
judged over several lines at once, which is why it survives proofreading that
catches the others: nothing is wrong on any line you look at.
