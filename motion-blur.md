---
name: Motion blur
slug: motion-blur
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Blurring an element along its direction of travel so fast movement
  reads as speed instead of teleporting, borrowed from film and rare but real in
  interfaces.
aliases:
  - name: directional blur
    source: community
  - name: blur transition
    source: community
  - name: speed blur
    source: community
tags:
  - perception
relations:
  contrastWith:
    - progressive-blur
    - velocity-skew
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "School of Motion: motion design dictionary"
    url: https://schoolofmotion.com/blog/motion-design-dictionary
  - title: Animation Vocabulary
    url: https://animations.dev/vocabulary
demo: inline
exhibit: false
useWhen: something moves fast enough that a sharp frame looks wrong
---

A film camera does not sample instants, it integrates them. The shutter is open for a fraction of
each frame, so anything moving during that fraction is recorded as a streak, and a century of
watching film has trained everyone to expect the streak. Take it away and fast movement stops
reading as movement: the object appears at a series of separate places, which the eye interprets as
stuttering rather than speed. That perceptual debt is the whole reason the effect exists, and it is
why animation software has a shutter-angle control at all.

Interfaces inherited the expectation without inheriting the mechanism. A browser composites
discrete frames and exposes no sub-frame position, so nothing in CSS produces real motion blur; what
ships is always a fake. The honest options are a directional blur applied through an SVG filter, a
gradient tail trailing the moving element, or a handful of stacked ghost copies at falling opacity.
All three are approximations of a smear, all three cost fill rate on the exact frames that are
already the busiest, and none of them can be pointed at as a platform feature.

Which raises the fair question of when it is worth it, and the answer is: rarely.
[Frame rate](/frame-rate) explains why. Motion blur is how twenty-four frames a second gets away
with being twenty-four frames a second, and an interface running at sixty or a hundred and twenty
has far less to hide. It earns its place when something crosses a lot of distance in very little
time, a card thrown off screen, a carousel flicked hard, a page slamming past, because there the
gap between consecutive frames really is large enough to read as a jump. On a two hundred
millisecond fade or a button lifting four pixels, there is nothing to smear.

Two things it is not. It is not a fix for [jank](/jank): dropped frames are irregular by nature,
and blurring the ones that did arrive makes a stutter look like a smeared stutter. And it is not
free of legibility cost, since the moment it touches text or an icon the content becomes
unreadable for the length of the move, which is fine for a card leaving and unacceptable for one
arriving. The safe rule is to blur what is departing, keep what is landing sharp, and turn the
whole thing off under a reduced-motion preference, where a fast move should not be happening in the
first place.
