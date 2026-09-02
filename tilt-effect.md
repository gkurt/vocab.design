---
name: 3D tilt
slug: tilt-effect
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Rotating a card in perspective toward the pointer so it appears to
  tip in three dimensions, often with a moving highlight to sell the depth.
aliases:
  - name: tilt card
    source: community
  - name: 3D hover tilt
    source: community
  - name: perspective hover
    source: community
  - name: parallax card
    source: community
  - name: vanilla-tilt
    source: community
tags:
  - depth
  - pointer
relations:
  contrastWith:
    - spotlight-hover
  variantOf: []
  partOf: []
  seeAlso:
    - parallax
    - hover-lift
implementations: []
sources:
  - title: Animation Vocabulary
    url: https://animations.dev/vocabulary
  - title: The Vocabulary of Motion
    url: https://motion-vocabulary.vercel.app/
demo: inline
exhibit: false
useWhen: a card should read as a physical object under the pointer
---

The mapping is the whole technique. Take the pointer's position inside the card,
normalise it to a pair of numbers running from minus one to one, and feed them to two
rotations: the horizontal number drives `rotateY` and the vertical one drives `rotateX`,
negated, so the corner nearest the pointer is the corner that comes forward. The parent
holds the `perspective`, which is what turns those rotations from a flat skew into a
solid object leaning; without it the card just squashes. A second layer, a soft white
radial highlight tracking the same coordinates, does most of the convincing, because a
real surface catching real light is what the eye is actually looking for.

Restraint is the difference between a card and a gimmick, and the numbers are smaller
than they feel while you are building it. Under ten degrees of rotation on each axis,
usually five to eight, is enough for the effect to register; past fifteen the text on
the card starts to read as distorted and the card stops looking tipped and starts
looking broken. Perspective in the six hundred to one thousand pixel range keeps the
viewer a plausible distance away. Give the return to flat a short transition, around
two to three hundred milliseconds, so the card settles rather than snapping, and keep
the tracking itself unlagged, since a card easing behind the pointer feels like the
page is stuttering rather than like the card is heavy.

The lineage is the tvOS home screen, where Apple gave every focused icon a parallax
lean that made a ten foot interface feel touchable, and on the web the
[vanilla-tilt](https://micku7zu.github.io/vanilla-tilt.js/) library made the same
effect a two attribute job for a whole generation of portfolio sites. That history is
also the warning: a page where every card tilts is a page that reads as a template.
Spend it on one card that deserves the attention, usually a hero, a product shot, or a
single feature panel.

Practical duties, none of them optional. Transformed text can lose its subpixel
antialiasing and read blurry, so check the card's own type rather than trusting the
effect at a glance. Touch devices have no hovering pointer at all, so the tilt must be
pure garnish over a card that already works. And because the rotation is written from
script rather than declared as a hover state, it has to answer `prefers-reduced-motion`
itself and leave the card flat. The neighbouring term is
[card flip](/card-flip): a flip turns the card the whole way over to show a second
face and makes a claim about identity, while a tilt only ever leans and makes a claim
about material.
