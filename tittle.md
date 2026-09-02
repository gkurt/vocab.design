---
name: Tittle
slug: tittle
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The dot above a lowercase i or j.
aliases:
  - name: the dot on the i
  - name: superscript dot
tags:
  - fonts
relations:
  contrastWith: []
  variantOf: []
  partOf: []
  seeAlso:
    - glyph
    - counter
implementations: []
sources:
  - title: A Glossary of Typographic Terms (Monotype)
    url: https://www.monotype.com/resources/typographic-terms
  - title: Weird Glyphs (Pangram Pangram)
    url: https://pangrampangram.com/blogs/journal/weird-glyphs
demo: inline
exhibit: false
useWhen: you need the word for the dot on an i
---

The tittle is the dot above a lowercase i or j, and that really is the whole
definition. The word is a medieval one, from the Latin *titulus*, and it
survives mainly in the phrase "to a T", which was once "to a tittle", meaning
down to the smallest mark. Scribes added it in the eleventh century for a
practical reason: in the dense blackletter hands of the period a bare i vanished
into the neighbouring strokes of an m or a u, and a stroke over it told the
reader where one letter ended and the next began.

Typographically it is a separate contour inside the same
[glyph](/glyph), and its shape is a real decision rather than a default. It can
be round, square, rectangular, diamond, or a slanted wedge, and its size and how
far it floats above the stem are among the first things that distinguish one
sans from another at small sizes. It usually sits near
[ascender](/ascender) height, and in a good many faces it is the tittle rather
than the b and the d that establishes how tall the ascenders can be, because a
mark colliding with the line above is worse than a short l.

The tittle is also the reason internationalized text handling has a famous edge
case. Turkish and Azerbaijani treat dotted and dotless i as two different
letters: ı is a letter in its own right and its capital is I, while the dotted i
capitalizes to İ, an I that keeps its tittle. So uppercasing a lowercase i is
locale-dependent, and code that assumes otherwise turns Turkish words into
misspellings. This has broken real systems, most memorably where a case
conversion applied to an identifier changed its meaning on Turkish devices. If
you are uppercasing user text, pass the locale.

One last piece of trivia for the pub: the dot is called a tittle only on the i
and the j. The dot over a Scandinavian å is a ring, the pair over ä is a
diaeresis or umlaut depending on what it does, and the mark that turns n into ñ
is a tilde. They are all diacritics; the tittle is the one that is simply part
of the letter.
