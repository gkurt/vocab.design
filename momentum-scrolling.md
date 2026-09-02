---
name: Momentum scrolling
slug: momentum-scrolling
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Content that keeps moving after the finger lifts, decelerating as
  though it had mass, so one flick can travel a long way.
aliases:
  - name: inertial scrolling
    source: community
  - name: kinetic scrolling
    source: community
  - name: scroll momentum
    source: community
  - name: flick scrolling
    source: community
tags:
  - scroll
  - touch
relations:
  contrastWith:
    - overscroll
    - smooth-scrolling
    - fling
  variantOf: []
  partOf: []
  seeAlso:
    - scroll-snap
implementations: []
sources:
  - title: "MDN: Basic concepts of scroll snap"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap/Basic_concepts
demo: inline
exhibit: false
useWhen: scrolling that coasts after the gesture ends
---

The gesture and the motion are two different lengths. A finger travels a few centimetres
and lifts, and the list carries on for another two screens before it settles, because the
scroller was handed a velocity rather than a position. That is the whole trick of the
flick: a short stroke buys a long journey, so a thousand rows can be crossed with the
thumb without the hand ever leaving the phone. The iPhone shipped it as the default
behaviour of every scroll view in 2007 and it became the thing a touch surface has to do,
to the point that a list which stops dead where the finger stopped now reads as broken.

Underneath it is one small piece of physics. The scroller samples the pointer's velocity
over the last few moves rather than over the whole gesture, since only the end of the
stroke says how hard it was thrown, and then applies a constant deceleration until the
speed falls under a threshold. The one number worth knowing is the deceleration rate,
which platforms expose as a small vocabulary (normal and fast on iOS) rather than as a
free value, because the feel of a system depends on every list agreeing about it. Two
rules matter more than the curve. The coast must be catchable, so a touch during it stops
the content where it is instead of queueing another gesture, and where the coast is
allowed to end can be constrained by snapping, which is why scroll snap and inertia are
specified together.

The neighbouring words are easy to blur. Overscroll is not the coast, it is the answer to
what is left of it: the bounce or the edge glow that fires when the travel runs out of
content, and it belongs to the limit rather than to the motion. Smooth scrolling is the
system gliding to a destination someone named, so its distance is known before the
animation starts, while a flick's distance is decided by the hand and not known to anyone
until it stops. In the drag family, a drag threshold decides whether the press ever became
a gesture, and pointer capture decides which element keeps hearing that gesture, both of
which are settled while the finger is still down; momentum is the only one of the three
that is entirely about what happens once the finger is gone.

On the web this is mostly not yours to write. The platform's own scroller brings it, and
the modern job is to avoid taking it away: a scroll container that is really a transform
driven by a wheel listener has thrown out the inertia, the snapping, the keyboard, and the
accessibility of a real scroller in exchange for a curve someone tuned by hand. The
historical exception is worth recognising in old code, where an overflowing element on iOS
only got momentum if it was given `-webkit-overflow-scrolling: touch`, which is now the
default. If you genuinely are implementing it, for a canvas or a virtualized
surface of your own, keep the coast interruptible, clamp it at the content edge rather
than letting it run into nothing, and skip straight to the resting position when the
reader has asked for reduced motion.
