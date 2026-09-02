---
name: Anticipation
slug: anticipation
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A small move in the opposite direction just before the main one,
  borrowed from character animation to telegraph what is about to happen.
aliases:
  - name: wind-up
    source: community
  - name: pre-move
    source: community
  - name: anticipatory motion
    source: community
tags:
  - perception
relations:
  contrastWith:
    - overshoot
    - follow-through
  variantOf: []
  partOf: []
  seeAlso:
    - squash-and-stretch
implementations: []
sources:
  - title: "IxDF: UI Animation, applying Disney's 12 principles to UI"
    url: https://ixdf.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design
  - title: "Adobe: 12 principles of animation"
    url: https://www.adobe.com/creativecloud/animation/discover/principles-of-animation.html
demo: inline
exhibit: false
useWhen: an action needs a wind-up so it does not start cold
---

Anticipation is the second of Disney's twelve principles and the one about attention
rather than about physics. A character crouches before it jumps, draws its arm back before
it throws, leans away before it runs. The wind-up is not there because bodies work that
way, though they do; it is there because the audience needs a moment to look at the thing
that is about to move. Without it the action has already happened by the time the eye
arrives, and the viewer reconstructs the event from its aftermath instead of watching it.

In an interface the same trick buys the same fraction of a second, and it is spent in the
same currency. A send button whose icon pulls back before it launches, a card that dips a
few pixels before it flies to the top of a list, a drawer that eases in slightly before it
slides out: in each case the reverse move is small, roughly a tenth of the main travel, and
fast, roughly a fifth of the total time. The direction is the whole message, so the wind-up
must be along the same axis as the action and opposite to it. A pull back before a rightward
launch reads as preparation. A pull down before a rightward launch reads as a wobble.

The cost is honesty about latency. Anticipation adds time before anything the reader asked
for begins, so it belongs on motion that the interface is narrating rather than on motion
the reader is waiting through. It suits an element leaving on its own terms, an animated
mascot, a celebratory or once-off transition. It does not suit a menu opening under a
cursor or a validation message, where the extra 80 milliseconds is pure delay and a reader
who uses the control fifty times a day will feel every one of them. When it is used, make
sure the state change commits at the start of the action rather than at the end of the
motion, and drop the wind-up entirely under `prefers-reduced-motion`: it is decoration on
top of a change that has to work without it.
