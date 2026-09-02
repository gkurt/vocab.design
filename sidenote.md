---
name: Sidenote
slug: sidenote
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A note placed in the outer margin beside the line it belongs to,
  rather than collected at the foot of the page.
aliases:
  - name: margin note
    source: community
  - name: marginalia
    source: print
  - name: side note
    source: community
  - name: tufte sidenote
    source: community
tags:
  - editorial
relations:
  contrastWith:
    - sticky-sidebar
  variantOf: []
  partOf: []
  seeAlso:
    - superscript
    - breakout
    - pull-quote
    - blockquote
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: an aside that must stay level with its sentence
---

A sidenote is set in the outer margin of the text, level with the line it annotates, so the eye
travels sideways rather than to the bottom of the page and back. That single change removes the
whole footnote transaction: no jump, no return, no losing your place, and no numbered list at
the end that a reader has to decide whether to visit. Edward Tufte is the reason most people on
the web know the pattern by name, because his books put nearly all of their annotation in the
margin and his layouts have been copied into stylesheets ever since. The idea is much older
though, and the medieval [gloss](/gloss) written beside a manuscript line is the same instinct.

The pattern only works if the page is built to leave the room. That means an asymmetric column:
the text keeps a comfortable [measure](/measure) and the margin is a real, permanent band beside
it rather than whatever space happens to be left over. A note is then positioned vertically
against its reference, which is why sidenotes fight with anything that reflows the text
independently of the margin, and why they are awkward inside
[text columns](/text-columns): with two or more columns of running text there is no single outer
margin for a note to belong to. The reference marker in the text is usually a small numeral or
symbol, and pairing it with a [hanging indent](/hanging-indent) on the note itself keeps the
marker legible against the note's own first line.

It is worth being precise about what a sidenote is not. A [tooltip](/tooltip) is summoned and
transient, appearing where the pointer is and leaving when it goes, while a sidenote is always
visible and positioned by its reference rather than by the reader's cursor. That difference is
the whole argument for the form: the annotation is part of the page's composition, so it can be
skimmed, skipped, or read in passing without any action at all, and it is present for someone
printing the page or reading it without a pointer.

The hard part is narrow screens, where the margin does not exist. The usual answer is to let the
note collapse back into the flow, right after the paragraph that refers to it, behind the same
numbered marker used as a toggle. That keeps the note near its sentence, which is the point,
even though the marginal position is gone. Two things to keep honest when you do this: the
collapsed note must still be reachable and announced in the reading order, and the marker has to
be a real control with a real target size, not a numeral scaled to eight pixels because it looked
right in the wide layout.
