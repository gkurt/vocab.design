---
name: Card flip
slug: card-flip
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Rotating a card about its own axis to show a second face on the
  back, with the hidden face pre-rotated and its backface hidden so only one
  side is ever visible.
aliases:
  - name: flip card
    source: community
  - name: backface-visibility
    source: css
  - name: flip horizontal
    source: uikit
  - name: 3D card flip
    source: community
  - name: reveal the back
    source: community
tags:
  - depth
relations:
  contrastWith:
    - flip-animation
    - page-curl
  variantOf: []
  partOf: []
  seeAlso:
    - morph-transition
implementations: []
sources:
  - title: "David DeSandro: card flip, intro to CSS 3D transforms"
    url: https://3dtransforms.desandro.com/card-flip
  - title: "Auroratide: a (more) realistic card flip animation"
    url: https://auroratide.com/posts/realistic-flip-animation/
demo: inline
exhibit: false
useWhen: one surface carries two faces and both are the same object
---

The markup has been settled for over a decade: a container that owns the perspective,
a card inside it that rotates, and two faces stacked in the same box. The card takes
`transform-style: preserve-3d`, so its children keep their own places in the third
dimension instead of being flattened into the card's plane. Each face takes
`backface-visibility: hidden`, so it stops being drawn the moment it turns away from
the viewer. The back face is pre-rotated by 180 degrees, which means it is already
facing the right way when the card arrives there. Turn the card 180 degrees and the
two faces trade places, with no opacity involved anywhere.

Perspective is what separates a flip from a squash. With no perspective on the
container the rotation is orthographic: the card narrows to a vertical line and widens
again, and the eye reads it as a horizontal scaling rather than as an object turning.
A value somewhere around 600 to 1000 pixels puts the viewer a plausible distance away;
smaller numbers exaggerate the near edge and are what a deliberately toy-like flip
uses. The other requirement is that both faces be exactly the same size, since a card
whose two halves disagree appears to change shape halfway through its own turn.

The reason to spend the motion is the claim it makes. A flip says the back is the same
object as the front: the details are on the card, not in a new panel that replaced it.
That is a different claim from a [dissolve](/dissolve) or a
[crossfade](/crossfade), where one thing takes another thing's place, and from a
[slide transition](/slide-transition), where the new content arrives from somewhere
else. If the back is genuinely a different object, a flip is a lie the reader will feel
without being able to name.

Flips read as playful at card size and as disorienting at panel size, and the threshold
is lower than most people expect: rotating a whole column of search results is closer to
a page turning over than to a card being examined. Keep them to one object at a time,
keep the duration in the 400 to 700 millisecond range where the turn is legible without
being slow, and never fire one on hover across a grid, where a passing pointer sets off
a wave of them. Because the move is usually scripted rather than a hover state, it also
has to answer `prefers-reduced-motion` itself and simply arrive at the other face. One
last piece of vocabulary hygiene: [flip animation](/flip-animation) usually means
something else entirely, the First Last Invert Play measuring technique, which involves
no rotation at all.
