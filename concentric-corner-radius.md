---
name: Concentric corner radius
slug: concentric-corner-radius
category: surface
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: Sizing a nested shape's corners so its curve shares a centre with
  the one outside it, the inner radius being the outer radius less the padding
  between them.
aliases:
  - name: nested corner radius
  - name: corner concentricity
    source: hig
  - name: concentricity
    source: hig
  - name: nested radius
tags:
  - tokens
relations:
  contrastWith: []
  variantOf: []
  partOf: []
  seeAlso:
    - corner-radius
    - spacing-scale
implementations: []
sources:
  - title: "Apple HIG: Layout"
    url: https://developer.apple.com/design/human-interface-guidelines/layout
  - title: "Nil Coalescing: Corner concentricity in SwiftUI on iOS 26"
    url: https://nilcoalescing.com/blog/ConcentricRectangleInSwiftUI/
demo: inline
exhibit: false
useWhen: the radius an inner shape needs inside a rounded one
---

Put a rounded shape inside another rounded shape and the two curves have to agree. Give
both the same radius, which is the reflex, and the gap between the outlines is right along
the flat sides and wrong at every corner: the inner curve turns away from the outer one
and the space between them opens out diagonally, so the inner shape looks like it is
sliding out of the corner it sits in. The fix is one subtraction. Concentric means the two
arcs are struck from the same centre, and two circles share a centre when their radii
differ by exactly the distance between them, so the inner radius is the outer radius minus
the padding. Do that and the gap is the same width the whole way round, which is what the
eye was measuring all along.

Apple made a word of it. Rounded hardware, rounded windows and rounded controls nest
several deep on current platforms, and the 2025 guidance names concentricity as a
principle rather than a detail. SwiftUI ships it as geometry instead of arithmetic:
a `ConcentricRectangle` derives its radii from the container it is nested inside and the
distance to that container's edge, so nothing states a number twice and nothing has to be
updated when the container's radius changes. The same idea shows up wherever a system owns
both shapes, which is why an inset control on a phone keeps its even margin no matter what
the outer window is doing.

The web has no such primitive. CSS gives a shape no way to ask its container for a radius,
so concentricity is arithmetic done by hand: publish the outer radius and the padding as
custom properties and write the inner one as `calc(var(--radius) - var(--pad))`. That is
cheaper than it sounds, because both operands are already published values, the padding a
step off the [spacing scale](/spacing-scale) and the outer radius a step off the shape
scale, so the subtraction can be stored as a token of its own rather than recomputed per
card. What it cannot do is react: change the padding at a breakpoint and the inner radius
has to be changed with it.

There is one honest edge case, and it is not a failure of the rule. When the padding is as
large as the outer radius or larger, the subtraction reaches zero or goes negative, and the
correct inner shape is a square corner: the outer arc has already finished turning before
the inner shape's corner begins, so there is nothing left to be concentric with. Platforms
that implement this clamp at zero, and hand-written CSS should say `max(0px, ...)` for the
same reason. Note what this term is not: [corner radius](/corner-radius) is the number
itself, one value on one shape, while this is the rule relating two of them, and it only
has an answer when one rounded shape sits inside another.
