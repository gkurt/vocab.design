---
name: Pointer gestures
slug: pointer-gestures
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Path based or multi finger gestures such as pinch, swipe, and drag
  along a track, which need a single pointer equivalent to stay operable.
aliases:
  - name: path-based gesture
    source: wcag
  - name: multipoint gesture
    source: wcag
  - name: single pointer alternative
    source: community
tags:
  - touch
  - wcag
relations:
  contrastWith:
    - multi-touch
    - motion-actuation
    - dragging-alternative
  variantOf: []
  partOf: []
  seeAlso:
    - mouse-gesture
implementations: []
sources:
  - title: "WCAG 2.2: Pointer Gestures"
    url: https://www.w3.org/TR/WCAG22/#pointer-gestures
demo: inline
exhibit: false
useWhen: a pinch or swipe is the only way in
---

WCAG 2.5.1 divides pointer input in two. A single-pointer gesture is one contact whose only
significant fact is where it went down and came up: a tap, a click, a press and hold, a double tap.
Everything else is either path based, where the route between those two points is what carries the
meaning, or multipoint, where the number of contacts does. A swipe, a drag along a track, a circular
scrub around a dial, a two-finger [pinch](/pinch-to-zoom), a three-finger swipe: all of these are
gestures the criterion is about.

The rule is easy to state and easy to misread. It does not ban the gesture. It requires that
whatever the gesture achieves can also be achieved with a single pointer, without a path and without
a second finger. Keep the swipe and add the buttons. Keep the pinch and add plus and minus, or a
double tap to fit. The gesture is usually the faster route for the people who can make it, and that
is a good reason to keep it; the alternative is what makes the feature reachable for someone using a
head pointer, an eye tracker, a switch, a mouth stick, or one shaky finger, all of which can put a
pointer down in one place reliably and none of which can reliably trace an arc.

There is one exception, and it is narrower than people hope: the path is allowed to be essential
when the path is the content. A signature pad, a freehand drawing tool, and a handwriting field
cannot offer a button that draws for you. A carousel, a volume dial, a photo zoom, and a
[swipe action](/swipe-actions) on a list row all can, so none of them qualify. The other common
misreading is to count a [long press](/long-press) as one of these; it is not, because holding still
is not a path, though timing rules of their own apply to it.

Two practical notes. The alternative has to be visible and operable, not hidden behind the gesture
it replaces, and a control that only appears on hover fails for the same population twice over. And
platform-level gestures do not save you: a native pinch handled by the browser is fine because the
browser also offers zoom controls, but a pinch you implemented in a canvas is yours to make
reachable. If you are counting criteria, this one is Level A, which puts a swipe-only interface
squarely in the category of things that do not ship.
