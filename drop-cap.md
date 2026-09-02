---
name: Drop cap
slug: drop-cap
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An oversized opening letter set into the first lines of a paragraph,
  marking where the reading starts.
aliases:
  - name: dropped capital
  - name: initial letter
    source: css
  - name: versal
  - name: illuminated capital
tags:
  - editorial
relations:
  contrastWith:
    - raised-cap
  variantOf: []
  partOf: []
  seeAlso:
    - small-caps
implementations: []
sources:
  - title: "MDN: initial-letter"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter
  - title: How to use drop caps effectively in editorial design
    url: https://hyentus.com/blog/how-to-use-drop-caps-effectively-in-editorial-design
demo: inline
exhibit: false
useWhen: marking where an article begins
---

The device is inherited from illuminated manuscripts, where a scribe painted the
opening capital of a chapter large enough to be found from across the room. Its
modern job is the same and much quieter: on a spread with a headline, a standfirst,
a byline, a pull quote and a caption, the drop cap is the one mark that says
*the reading starts here*.

What makes it a drop cap rather than a big letter is that it sinks into the text.
The letter occupies a number of lines, usually two to four, and the paragraph
wraps around it; its cap height lines up with the top of the first line and it
sits on the baseline of the last line it spans. Miss either alignment and the
effect reads as a mistake. The variant that rises above the first line instead of
sinking into it is a raised cap, or versal, and it is a different look with the
same ancestry.

CSS has a property built for this. `initial-letter` takes the number of lines the
letter should fill and, optionally, how many of them it should sink, and the
browser does the metric work. It applies to the `::first-letter` pseudo-element,
which is also the tidiest markup, since nothing in the document changes. The
older technique is a float with a hand-tuned font size, line height and margin,
and it is still what most sites ship because it works everywhere and gives the
designer the last word on optical spacing. This specimen uses the float, for a
reason particular to this site: a pseudo-element is not an element, so the stage
would have nothing to point at when you ask it which part of the scene is the term.

The details are where drop caps go wrong. The gap to the right of the letter is
optical rather than metric, so an A or a V needs less of it than an O does, and a
letter with a descender (J, Q) or almost no width (I) usually needs its own
treatment. A paragraph that opens with a quotation mark is a trap, since the mark
is not the letter anyone means. Set at most one per article and never one per
section, because a page with several has no beginning at all. Whichever technique
you use, keep the letter inside the paragraph's own text rather than lifting it
into a separate block, so the sentence a screen reader announces is still the
sentence that was written.
