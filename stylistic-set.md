---
name: Stylistic set
slug: stylistic-set
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A numbered bundle of alternate glyphs inside a font, switched on as
  a group to change the look of certain letters.
aliases:
  - name: stylistic sets
  - name: ss01
    source: opentype
  - name: character variants
    source: opentype
  - name: alternate glyphs
tags:
  - fonts
relations:
  contrastWith:
    - contextual-alternates
    - opentype-features
    - swash
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Syntax for OpenType features in CSS (Adobe Fonts)
    url: https://helpx.adobe.com/fonts/using/open-type-syntax.html
  - title: A Practical Guide to Alternate Characters (Pangram Pangram)
    url: https://pangrampangram.com/blogs/journal/opentype-features
demo: inline
exhibit: false
useWhen: switching a font's single-storey a on
---

Most letters in a font have more than one drawing available. The double-storey `a`
has a single-storey twin, the two-storey `g` a single-storey one, the `l` a version
with a tail, the zero a version with a slash. A stylistic set is how a type
designer bundles those alternates: `ss01`, `ss02`, up to `ss20`, each a numbered
group that swaps in a coherent handful of shapes when you switch it on. The
grouping is the point. A face's "code" set might slash the zero, put a foot on the
`1` and a tail on the `l` all at once, because those three decisions only make
sense together, and no interface should make you turn them on one at a time.

The numbers carry no meaning. `ss01` in one family is a single-storey `a` and in
another it is old-fashioned quotes, because the [OpenType](/opentype-features)
specification reserves the tags and leaves their contents entirely to the
designer. The only way to know what a set does is the family's own specimen or
documentation, which is why CSS gives the tag a human-readable wrapper:
`font-variant-alternates: styleset(code)` reads the names out of the font's own
table, while `font-feature-settings: "ss01" 1` just asks for the number. Character
variants (`cv01` to `cv99`) are the finer-grained cousin, one letter each rather
than a bundle, for when you want the tailed `l` without the slashed zero.

Neighbouring features do related but distinct work, and the distinction is worth
keeping straight. A [ligature](/ligature) fuses two adjacent letters into one
drawing to fix a collision, and it fires wherever that pair occurs.
[Contextual alternates](/contextual-alternates) swap a shape based on what sits
beside it, automatically, with no decision from you. A [swash](/swash) is a
specific kind of alternate, the ornate extended one, usually parked in its own
`swsh` feature. A stylistic set is the only one of the four that is a deliberate
editorial choice about the voice of the text: nothing is broken, nothing is
contextual, you simply prefer the other `a`.

The trap is asking for a set the file does not have. There is no error, no
warning, no fallback: the request is silently ignored and the default glyphs
render, so a stylesheet full of `"ss02" 1` can look exactly like a stylesheet
without it. Check the face before the CSS, and be aware that most system fonts
carry no sets at all. The subtler version of the same trap is delivery, because a
face that has ten sets can arrive with none: the specimen above is set in Fira Code
from the type designer's own release, since the Google Fonts build of that family
keeps the contextual rules and drops every stylistic set, so identical CSS against
an identically named family does nothing at all depending on where the file came
from.
