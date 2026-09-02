---
name: Letterboxing
slug: letterboxing
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "Filling the mismatch between content shape and frame shape with
  bars: above and below for letterbox, at the sides for pillarbox."
aliases:
  - name: pillarboxing
    source: community
  - name: windowboxing
    source: community
  - name: black bars
    source: community
  - name: matting
    source: community
tags:
  - media
relations:
  contrastWith:
    - object-fit
  variantOf: []
  partOf: []
  seeAlso:
    - overscan-safe-area
implementations: []
sources:
  - title: Pillarbox
    url: https://en.wikipedia.org/wiki/Pillarbox
demo: inline
exhibit: false
useWhen: the bars that appear when ratios do not match
---

Two rectangles rarely agree. A film is wider than a television, a phone photograph is
taller than a laptop screen, and a video call is whatever shape the other person's
camera is. When the content is placed inside the frame whole, the leftover room has to
be filled with something, and that something is bars. Bars above and below is
letterboxing, named after the slot in a front door. Bars at the sides is pillarboxing.
Bars on all four sides at once is windowboxing, which is what you get when a source that
was already letterboxed is then pillarboxed by a second frame, and it is almost always a
mistake rather than a choice.

The control and the result are different words, which is where the confusion usually
starts. [Object fit](/object-fit) is the knob: a CSS property, or its equivalent in any
other layout system, that says whether the content should be fitted inside the frame or
made to fill it. Letterboxing is what one setting of that knob produces when the aspect
ratios disagree, so `contain` gives you bars and `cover` gives you a crop. Nothing is
free in that trade. Bars cost you screen area and can look like a bug to someone who
does not know the source shape. A crop costs you pixels that existed, and it always
takes them from the edges, which is exactly where a subject sitting off centre lives.

Which one is right depends on whether the frame is a viewport or a slot. A film frame is
a composition somebody signed off on, so a player letterboxes and is right to. A
[thumbnail](/thumbnail) in a grid is a slot that has to tile evenly with its neighbours,
so it crops, and the interesting question becomes where to crop from, which is what a
[focal point](/focal-point) answers. A reasonable rule: bars when the content's own
shape carries meaning, crop when the layout's rhythm does. Either way the frame should
be declared with an [aspect ratio box](/aspect-ratio-box) so the space is reserved before
the media loads and nothing on the page jumps when it arrives.

The bars themselves are not neutral. Painting them pure black on a bright page reads as
broken rather than as cinematic, and letting a control float in a bar makes people
suspect the media is bigger than it is. Give the bars the surrounding surface colour, or
a deliberately dark tone if the register is a player, and keep every control outside the
media rectangle. Watch out too for bars that arrive twice: a video exported with black
bars already burned into the pixels will be letterboxed again by any player that trusts
its declared ratio, and there is no way for the layout to detect it.
