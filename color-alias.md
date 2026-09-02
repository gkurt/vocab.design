---
name: Color alias
slug: color-alias
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A second name pointing at an existing scale so one palette can
  answer to several meanings, letting yellow serve as both warning and pending
  without duplication.
aliases:
  - name: aliasing
    source: radix
  - name: alias token
    source: community
  - name: token reference
    source: dtcg
  - name: semantic alias
    source: radix
tags:
  - tokens
relations:
  contrastWith:
    - color-token
    - color-role
    - primitive-color-token
  variantOf: []
  partOf: []
  seeAlso:
    - relative-color-syntax
implementations:
  - system: radix
    name: Aliasing
    url: https://www.radix-ui.com/colors/docs/overview/aliasing
sources:
  - title: "Radix Colors: aliasing"
    url: https://www.radix-ui.com/colors/docs/overview/aliasing
demo: inline
exhibit: false
useWhen: one scale answering to more than one meaning
---

`color-warning: amber-500` is not a colour. It is a pointer. The value still lives one layer
down in the palette, and the alias is a second name laid over it so the rest of the system
can say what a colour is *for* rather than which rung it sits on. Radix calls the practice
aliasing and separates three flavours: semantic aliases such as `accent` or `brand`, use
case aliases named for where the colour lands (backgrounds, borders, text), and mutable
aliases that resolve to different values in light and dark.

The contrast worth holding on to is with the [primitive colour token](/primitive-color-token)
underneath. A primitive names a colour and nothing else, so `amber-500` is the same hex in
every theme, on every product, for as long as the scale exists. An alias names a job and
points at whichever primitive currently does that job, which is why swapping a theme edits
the alias table and nothing else: the scale keeps its names and its hexes, and the component
keeps naming the alias rather than the value.

Aliasing pays for itself because meanings outnumber colours. One amber scale can serve as the
warning colour and the pending colour at the same time, at different rungs, without either
meaning owning a ramp of its own. Duplicating the scale to get a second meaning is the
failure this avoids: two ramps that started identical drift, and the day someone corrects a
step in one of them the other quietly disagrees. Where the scale is generated from a
[seed colour](/seed-color), the alias layer is usually the only hand written part of the
palette, which is a good reason to keep it short enough to read in one screen. Any alias
naming a background also implies one for the ink on top of it, which is what an
[on-colour](/on-color) is.

Three habits keep an alias layer honest. Keep the chain at two hops, because an alias
pointing at an alias pointing at an alias means nobody can see the resolved value without
tracing it, and print that resolved value beside the name in the tooling so the trace is
never needed. Never let a component reach past the alias to the primitive: doing so removes
the joint the alias exists to provide, and the theme then cannot move it. And treat a drifted
alias as a bug rather than a convenience. Once `color-warning` has been used for anything
vaguely orange, re-pointing it breaks screens nobody thought to list, which is exactly the
outcome the indirection was supposed to prevent.
