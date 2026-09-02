---
name: Popover arrow
slug: popover-arrow
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The small triangle joining a popover or tooltip to the thing it
  belongs to, which flips and slides as the popover repositions.
aliases:
  - name: tooltip arrow
    source: radix
  - name: beak
    source: community
  - name: nub
    source: community
  - name: tail
    source: community
  - name: pointer
    source: community
tags:
  - overlays
relations:
  contrastWith:
    - chevron
  variantOf: []
  partOf:
    - popover
    - tooltip
  seeAlso:
    - anchor-positioning
implementations: []
sources:
  - title: Floating UI
    url: https://floating-ui.com/
demo: inline
exhibit: false
useWhen: the little triangle pointing at the trigger
---

The arrow is the only part of a [popover](/popover) that says which control it belongs
to. Without it a floating panel is just a panel that happened to appear nearby, and the
reader has to guess the connection from proximity. With it the surface has a stated
owner, which is why the same triangle turns up on a [tooltip](/tooltip), on a
[hover card](/hover-card), and on the callouts of a product tour.

What makes it fiddly is that it cannot be a fixed decoration. A popover is placed against
whatever room the viewport happens to leave, so it flips to the other side of its anchor
when the space below runs out, and it slides along its own edge when it has been pushed
sideways to stay on screen. The arrow has to answer both moves: change edge when the
panel flips, and travel along that edge so it keeps pointing at the anchor's centre even
though the panel is no longer centred on it. That is exactly the job of the arrow
middleware in [Floating UI](https://floating-ui.com), which reports the offset the arrow
should sit at once the rest of the placement is settled. It also explains why the arrow is
usually a rotated square with two borders rather than a real triangle: a triangle drawn
with `border-width` cannot carry the panel's own outline across the join, and half a
rotated square can.

The word for it is a mess, and the mess is worth naming. Radix and most component
libraries say arrow; Apple's documentation and a lot of Mac vocabulary say beak; Bootstrap
called it a caret; other people say nub, tail, or pointer. Two of those collide with terms
that already mean something else here. A [caret](/caret) is the blinking text insertion
point, and the dropdown triangle that Bootstrap named is a third thing again. A
[disclosure triangle](/disclosure-triangle) is the twisty that opens a tree node, and it
answers a press rather than a placement. If you are writing a component API, arrow is the
name to standardise on, because it is the one every library will recognise.

Two practical notes. The arrow is decoration, so it belongs behind `aria-hidden`: a screen
reader has the popover's own relationship to its trigger and does not need a shape
described to it. And keep it small and blunt. A long thin beak has to be clipped when the
panel slides near its own corner, and the clipping reads as a rendering bug rather than as
placement.
