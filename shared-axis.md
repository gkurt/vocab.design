---
name: Shared axis
slug: shared-axis
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Material's transition where outgoing and incoming views slide and
  fade along the same x, y, or z axis, so direction encodes the navigational
  relationship.
aliases:
  - name: shared axis transition
    source: material
  - name: axis transition
    source: community
  - name: z-axis transition
    source: material
tags:
  - navigation
relations:
  contrastWith:
    - fade-through
    - directionality
    - container-transform
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Shared axis
    url: https://m3.material.io/styles/motion/transitions
sources:
  - title: "Material Design 3: Transitions"
    url: https://m3.material.io/styles/motion/transitions
demo: inline
exhibit: false
useWhen: two views sit next to each other in a sequence or hierarchy
---

A shared axis transition moves both views a short distance along one line while fading them
past each other. The view being left goes one way and the view arriving comes from the other,
and because they travel the same line at the same moment, the reader reads a spatial claim:
these two things are next to each other, and I have just moved from one to the next. Reverse
the direction and the claim reverses with it, which is what makes a back gesture legible
without any label saying so.

Material names three axes and each one means something different. The x axis is for siblings
laid out side by side, such as tabs or the steps of a wizard. The y axis is for the same
relationship arranged vertically, such as moving down a sequence within one page. The z axis
is depth, and it is drawn as scale rather than as travel: going deeper, the outgoing view
grows slightly and fades while the incoming one comes up from about 80 percent, so the reader
is moving into the interface rather than along it. Picking the axis is the design decision.
The motion is only as honest as the relationship it claims.

The pairing with fade is what separates this from its neighbours. A
[push transition](/push-transition) sends both panels the full width of the slot with no
fading at all, so it reads as a hard stack; shared axis moves far less and lets the
crossfade do most of the work, which makes it lighter and better suited to swaps that happen
often. A [fade through](/fade-through) drops the axis entirely, which is the right choice
when there is no relationship to encode. And a [slide transition](/slide-transition) usually
moves only the arriving panel over a background that stays put, so nothing is displaced and
no sequence is implied.

In practice this is a paired transform and opacity animation on two stacked views, around
300 milliseconds, with the travel kept short (roughly 30 pixels rather than the full width)
so the fade carries the change and the movement only points at it. Both views need to be out
of the flow in a slot that holds its own size, since they overlap for most of the duration.
Direction should come from the route rather than from the call site, so that forward and
back cannot disagree with each other. And under a stated
[prefers-reduced-motion](/prefers-reduced-motion) drop the travel and keep the fade: the
spatial claim was useful, but it is not worth the movement to someone who asked for less of
it.
