---
name: Signature pad
slug: signature-pad
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A drawing area that captures a handwritten signature by pointer or
  touch, with a clear control and a baseline to sign on.
aliases:
  - name: signature capture
    source: community
  - name: draw signature
    source: community
  - name: sign here box
    source: community
tags:
  - forms
  - pointer
  - touch
relations:
  contrastWith:
    - image-well
  variantOf: []
  partOf: []
  seeAlso:
    - pressure-sensitivity
implementations: []
sources:
  - title: UX Patterns for Developers
    url: https://uxpatterns.dev/patterns
demo: inline
exhibit: false
useWhen: capturing a handwritten signature
---

A signature pad is a box that records a stroke. Everything else about it is convention borrowed
from paper: a printed baseline to write on, a cross at the left marking where to start, and a
clear control for the first attempt that always goes wrong. The box is wider than it is tall
because signatures are, and it is bigger than it looks like it needs to be because people sign
with their whole arm on a screen and with two fingers of a wrist on a phone.

What actually gets captured is a decision, not a given. The cheap version stores an image of the
finished mark. The useful version stores the stroke itself: an ordered list of points with
timestamps, which is why a captured signature can be replayed and why the capture is worth more
than a picture of it. That is also where [pressure sensitivity](/pressure-sensitivity) comes in.
A pad on a pressure reading surface can vary the stroke's width with force, which makes the mark
look like ink rather than wire, and it records a second channel that handwriting comparison
actually uses. On a surface with no pressure sensor, the honest fallback is a constant width
rather than a fake taper derived from speed, and the demo below is deliberately in that camp.

Trimming is the detail that separates a pad that works from one that annoys people. Nobody signs
in the middle of the box, so a raw capture is a small mark floating in a large empty rectangle,
and it prints badly at every size. Trimming the capture to the ink's own bounds and showing the
result in place is a quiet way of saying the signature was received, which is worth more than a
green tick. Keep the stroke data behind that image, since the trim is presentation and the points
are the record.

Signing usually sits at the end of a flow, right after a [check answers](/check-answers) step,
and it inherits that position's obligations. Say what is being agreed to above the box rather
than below it, keep the confirm control separate from the pad so a stray stroke cannot submit,
and never make the signature the only route through: a signature drawn with a finger is a poor
fit for a motor impairment, so an alternative such as typing a name with an explicit agreement
checkbox has to exist beside it. The mark is evidence of intent, not a security measure, and
designing it as though it were the latter is how forms end up demanding three of them.
