---
name: Layout thrashing
slug: layout-thrashing
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Reading a geometric value after writing to the DOM in the same
  frame, forcing the browser to lay out synchronously over and over and stalling
  the animation that caused it.
aliases:
  - name: forced synchronous layout
    source: web-dev
  - name: forced reflow
    source: chrome
  - name: layout thrash
    source: community
  - name: read-write interleaving
    source: community
tags:
  - devtools
  - errors
  - perceived-performance
relations:
  contrastWith:
    - compositor-animation
    - jank
  variantOf: []
  partOf: []
  seeAlso:
    - flip-animation
implementations: []
sources:
  - title: "web.dev: avoid large, complex layouts and layout thrashing"
    url: https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
  - title: "Paul Irish: what forces layout / reflow"
    url: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
demo: inline
exhibit: false
useWhen: an animation stutters and the cause is the code, not the curve
---

Browsers are lazy about layout on purpose. Style changes are queued and the geometry is
recalculated once, at the end of the frame, when nothing else is going to change. Asking for
a measurement breaks that deal. `offsetTop`, `getBoundingClientRect()`, `scrollHeight`,
`getComputedStyle()` and a long list of similar properties all have to return a number that
is true right now, so the browser stops and lays the page out on the spot. One of those is
cheap. One inside a loop that also writes is not, because every write invalidates the
geometry the next read then has to rebuild.

That loop is the whole term. Read, write, read, write: six list items styled in a `for`
loop, each one measured after the previous one moved, is six full layouts where the page
needed one. The cost scales with how much of the document is dirty rather than with how many
elements the loop touches, so it is worst exactly where it is easiest to write, in code that
walks a long list. On a busy page it is one of the most common reasons the main thread misses
a frame, which is why it is usually met as [jank](/jank) first and diagnosed as thrashing
second.

The fix is batching, not avoidance. Measure everything first, keep the numbers, then apply
every write, so the frame contains one layout instead of one per item. Libraries have
formalised this as separate read and write queues that flush on `requestAnimationFrame`, but
the discipline is the point, not the library: two loops instead of one. Where the value is
needed only for its own element, `ResizeObserver` and `IntersectionObserver` deliver
geometry that was already computed, which is cheaper than asking for it again. The
performance panel in Chrome DevTools marks each occurrence as a forced reflow and names the
line that caused it, which is the only reliable way to find them.

This site's own specimen kit has the same rule in a smaller form: a demo never measures
immediately after writing a style, and mounts in the state it intends to measure. The
reasoning is a cousin rather than a twin, since there the danger is reading a transitioned
property back before it has moved, but both come from the same habit of treating a write and
a read as two things that must not be interleaved.
