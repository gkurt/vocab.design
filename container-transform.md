---
name: Container transform
slug: container-transform
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Material's transition in which a container grows or shrinks into
  another one, its contents crossfading inside, so a card visibly becomes the
  screen it opened.
aliases:
  - name: card to detail transition
    source: community
  - name: expand from card
    source: community
tags:
  - depth
relations:
  contrastWith:
    - shared-axis
    - cloning
    - origin-aware-animation
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Container transform
    url: https://m3.material.io/styles/motion/transitions
sources:
  - title: "Material Design 3: Transitions"
    url: https://m3.material.io/styles/motion/transitions
  - title: Building beautiful transitions with Material Motion for Android
    url: https://m3.material.io/blog/android-material-motion
demo: inline
exhibit: false
useWhen: a small surface opens into the larger one it belongs to
---

A container transform is Material's answer to the question of where a detail screen came
from. One box, the container, interpolates from the bounds of the thing that was tapped to
the bounds of the destination, while the outgoing contents fade out and the incoming ones
fade in inside it. The reader never sees two surfaces, only one that changed size, so the
list row they pressed is literally the screen they end up reading. Material specifies the
whole thing as a set of coordinated fades: the container's own bounds and corner radius
travel together on one curve, the outgoing content leaves early, and the incoming content
arrives late, which is what keeps the box from showing both sets of contents stacked on top
of each other halfway through. Anything that survives the move, a thumbnail becoming a hero
image, is animated as part of the container rather than crossfaded with the rest.

The nearest word on this site is [morph transition](/morph-transition), and the line between
them is what is being interpolated. A morph interpolates a shape: an icon path bending from a
hamburger into an arrow, one outline becoming another outline. A container transform
interpolates a rectangle, and the contents inside it are simply crossfaded rather than
reshaped. A [view transition](/view-transition) is a different kind of thing again, a browser
capability rather than a pattern: the platform photographs the page before and after and
tweens between the two snapshots, which is one way to implement a container transform and
also a way to implement a dozen other transitions. Within Material's own family the
distinction is by relationship. [Shared axis](/shared-axis) moves peers along one axis
because they sit beside each other in a hierarchy, [fade through](/fade-through) swaps
destinations with no spatial relationship at all, and a container transform is for the
parent and child case where one surface is contained by the other.

Its round mate is worth stating both ways. A container transform keeps one shared container
whose bounds morph from the source to the destination, and the source stops existing because
it became the destination. A [zoom transition](/zoom-transition) scales the whole destination
out of the tapped element's rectangle while the source fades away beneath it, and no shared
container persists through the move. Both read as "this came from that". The container
transform reads as continuity, the zoom as arrival.

The practical failures are all in the geometry. The container has to start at the source's
real rectangle, which means measuring it, and a source that scrolls away or reflows mid
transition leaves the box travelling from somewhere nothing is. Corner radius matters more
than it sounds: a card at eight pixels expanding into a square-cornered screen without
animating the radius reads as two boxes rather than one. The duration wants to scale with
the distance travelled, since the same 300 milliseconds that feels crisp for a small card
feels sluggish for one that crosses the screen. And the destination must be usable the
moment it is legible, because a reader who has decided to read does not want to wait out the
last 100 milliseconds of a corner unrounding.
