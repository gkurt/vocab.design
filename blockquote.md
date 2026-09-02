---
name: Blockquote
slug: blockquote
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A passage quoted from another source and set off from the running
  text as its own block, carrying the attribution with it.
aliases:
  - name: block quotation
  - name: extract
tags:
  - editorial
relations:
  contrastWith:
    - pull-quote
  variantOf: []
  partOf: []
  seeAlso:
    - sidenote
implementations: []
sources:
  - title: "MDN: <blockquote>"
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
demo: inline
exhibit: false
useWhen: quoting a source at paragraph length
---

A short quotation stays in the sentence, inside quotation marks, and the reader
never breaks stride. Past a certain length that stops working: the marks are too
far apart to hold the borrowed words together, the sentence hosting them collapses
under its own subordinate clauses, and the reader loses track of who is speaking.
The blockquote is the fix. The passage leaves the paragraph, becomes a block of its
own with space above and below and usually an indent, and the change in shape does
the job the quotation marks were failing at. The switch is a judgment about length
and weight, and the usual rule of thumb in editorial style guides is around forty
words, or four printed lines.

Because the block already says "these are someone else's words", the quotation
marks come off. Setting a blockquote in marks as well is belt and braces, and it
makes the [hanging punctuation](/hanging-punctuation) problem worse: an opening
mark at the start of an indented block either sits inside the indent and reads as
a ragged left edge, or hangs outside it and needs negative space nobody budgeted
for. Where marks do stay, in the inline case, they should be the real
[typographic ones](/smart-quotes) rather than the typewriter substitutes.

The attribution belongs to the block, not to the paragraph after it. In HTML that
is `<figure>` wrapping a `<blockquote>` and a `<figcaption>`, or a `<footer>`
inside the blockquote, and the `cite` attribute for the source URL, which is
metadata and is not rendered. The quotation itself is `<blockquote>`, and the
element is real markup rather than a styling hook: assistive technology announces
it as a quotation, so a `div` with an indent leaves a screen reader user unable to
tell where the borrowed words start and stop.

The word that gets confused with it is [pull quote](/pull-quote), and they are
almost opposites. A pull quote repeats a sentence that is already in the article,
pulled out and set large to bait a scanning reader. A blockquote brings text in
from somewhere else, and it is load-bearing: delete it and the argument loses its
evidence. Delete a pull quote and the article is unchanged. The tell is the
attribution: a blockquote names a source outside the piece, and a pull quote never
needs to, because the source is the paragraph three inches above it.
