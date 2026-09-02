---
name: Motion path
slug: motion-path
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A defined path an element travels along, with its distance and
  rotation along that path animated instead of its x and y positions.
aliases:
  - name: offset-path
    source: css
  - name: CSS Motion Path
    source: css
  - name: path animation
    source: community
  - name: follow path
    source: community
tags:
  - web-platform
relations:
  contrastWith:
    - orbit-animation
    - arc-motion
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: offset-path"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
demo: inline
exhibit: false
useWhen: an element should follow a specific route
---

Most movement on the web is described by where a thing ends up: change two
numbers, let the browser fill in the straight line between. A motion path
describes the route instead. The path is stated once, as a shape, and the thing
that animates is how far along it the element has travelled. In CSS that is
`offset-path` for the route and `offset-distance` for the position on it, with
`offset-rotate` deciding whether the element turns to face the direction it is
going, which is the difference between a paper plane flying a curve and a paper
plane sliding sideways along one.

The reason to reach for it is that some routes are not lines. Material's motion
guidance asks elements that move both across and down to travel an
[arc](/arc-motion) rather
than a diagonal, on the grounds that a natural gesture curves and a diagonal
reads as machinery; a card expanding from a grid cell to a full sheet, a floating
button flying to become a toolbar, a chip returning to the list it came from. All
of those are one path with one parameter, and stating them as a route makes the
route reviewable: it can be drawn, adjusted, and looked at as a shape rather than
inferred from two independent easing curves fighting each other.

The path syntax is SVG's, which is both the strength and the catch. `path()`
takes the same `d` string a drawn curve uses, so a designer's own SVG can be
lifted straight into the stylesheet, and `ray()` and `shape()` cover the simpler
cases without one. But the coordinates are resolved against the element's
containing block, not against the drawing they were traced from, so a path copied
out of an illustration has to be lined up by hand or by matching the box to the
artboard. The older answers, SMIL's `animateMotion` and hand-stepping an element
with `getPointAtLength`, still work and are still what a genuinely dynamic route
needs.

Restraint is the whole craft here. A path that loops, doubles back, or takes a
scenic route says something about the element's importance that is almost never
true, and a route long enough to be admired is a route the reader is waiting on. A
motion path should be the shortest reasonable curve between two real positions.
Under [prefers-reduced-motion](/prefers-reduced-motion) there is nothing to argue
about: the element lands on its stop, since the route was never the information,
only the way of getting there.
