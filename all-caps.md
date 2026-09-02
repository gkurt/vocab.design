---
name: All caps
slug: all-caps
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Text set entirely in capitals, which reads slower than mixed case
  because the word's outline shape disappears.
aliases:
  - name: uppercase
  - name: caps
  - name: "text-transform: uppercase"
    source: css
  - name: capitals
tags:
  - content-design
  - perception
relations:
  contrastWith:
    - small-caps
    - title-case
    - sentence-case
  variantOf: []
  partOf: []
  seeAlso:
    - letterpress-text
implementations: []
sources:
  - title: All caps (Practical Typography)
    url: https://practicaltypography.com/
  - title: Title case vs sentence case in UI
    url: https://www.everyinteraction.com/articles/title-case-vs-sentence-case-in-ui/
demo: inline
exhibit: false
useWhen: short labels that must shout, never sentences
---

The cost is measurable and the reason is structural. A word in mixed case has a
silhouette: ascenders sticking up, descenders hanging down, a ragged outline the
eye can match against words it already knows. Set the same word in capitals and
every letter becomes the same height, so the outline flattens into a rectangle
and the reader has to identify letter by letter. Studies of reading speed have put
the penalty in the range of ten percent or more on running text, which is nothing
on a four-word label and a great deal on a paragraph.

That is why caps are a label technique. Section headers, table column heads,
overline eyebrows above a title, button text in some systems, all short enough
that the reader recognises them as a shape rather than reading them. Sentences are
where it goes wrong. A caps paragraph is slow, and on the web it also carries the
connotation of shouting, borrowed from decades of email and forums. The other
thing caps lose is case as information: acronyms stop standing out, proper nouns
stop announcing themselves, and a name in the middle of a caps line is invisible.

Caps want more space between letters than lowercase does. Type is spaced for
mixed case, where the sidebearings are tuned to how round and straight letters sit
beside each other at x-height; capitals are wider, flatter sided, and set at their
default spacing they look cramped. Opening the [tracking](/tracking) by roughly 5
to 10 percent of the size is the standard correction, and it is what separates a
caps label that looks designed from one that looks like a `text-transform` was
added and nobody looked again. Small sizes need more of it than large ones.

Two mechanisms, and they are not equivalent. `text-transform: uppercase` changes
the rendering of lowercase text, so the DOM keeps the original string: search,
copy and paste, and translation all still see "Shipping address", which is almost
always what you want. `font-variant-caps: all-small-caps` and true
[small caps](/small-caps) are a different answer, using capital forms drawn at
lowercase height instead of full-height ones. Typing the caps by hand is the
option to avoid, since it hard-codes a visual decision into the content and some
screen readers spell out all-caps strings letter by letter when they mistake them
for acronyms.
