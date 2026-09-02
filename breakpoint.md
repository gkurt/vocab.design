---
name: Breakpoint
slug: breakpoint
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A viewport width at which a layout is allowed to change shape,
  defined once so every screen in a system reflows at the same places.
aliases:
  - name: media query breakpoint
    source: community
  - name: responsive breakpoint
    source: community
  - name: screen size
    source: tailwind
  - name: breakpoints
    source: bootstrap
tags:
  - screen-size
relations:
  contrastWith:
    - container-query
    - window-size-class
    - ram-technique
  variantOf: []
  partOf: []
  seeAlso:
    - mobile-first
    - content-choreography
implementations: []
sources:
  - title: Grid system, Bootstrap
    url: https://getbootstrap.com/docs/5.3/layout/grid/
demo: inline
exhibit: false
useWhen: the widths where the layout is allowed to change
---

A breakpoint is a number with a name. Below it one arrangement applies, above it
another, and the mechanism is a media query keyed to the viewport width:
`@media (min-width: 48rem)`. Writing the queries as `min-width` is what makes a
stylesheet mobile first, because the narrow layout is the unconditional one and each
breakpoint is a widening. The point of naming the numbers, rather than typing them
where they are needed, is agreement: a system publishes `sm`, `md`, `lg` as tokens so
that a table, a form, and a hero all change shape at the same place instead of within
forty pixels of each other, which is the visual equivalent of three people rounding
differently.

The numbers do not come from devices. Chasing the width of this year's phones is a
losing game and always was, since a browser window is any size a person drags it to,
and a phone in landscape is a small laptop. The durable rule is to let the content
choose: widen the layout until something looks wrong, put a breakpoint there, and stop.
That usually yields two or three, not seven. The named scales everyone recognises
(Bootstrap's `sm` through `xxl`, Tailwind's `sm` through `2xl`) are worth adopting as
shared vocabulary even so, because "it stacks below `md`" is a sentence a whole team can
check, and an unnamed `min-width: 823px` is a sentence nobody can.

The vocabulary carries a trap: names that sound like devices get read as devices. Call a
breakpoint "tablet" and someone will eventually put tablet-only behaviour behind it,
which breaks the moment a desktop window is dragged narrow. `md` is deliberately boring
for the same reason a size chart says M. It is also worth saying what a breakpoint is
not: the space between two of them is fluid, and a layout that only looks right at the
exact declared widths has not been made responsive, it has been made into three fixed
designs with gaps between them.

Two limits are worth knowing before reaching for one. A media query measures the
viewport, so a card that has to work in a wide main column and in a narrow sidebar gets
the wrong answer in one of them: that is what a [container query](/container-query) is
for, and it is the better tool whenever the thing adapting is a component rather than a
page. And breakpoints declared in `px` ignore the reader's text size, while `em` or `rem`
breakpoints scale with it, so a person browsing at 200% type reaches the narrow layout
where they would want it. The [container](/container) is what holds the layout to a
readable width between breakpoints, and the two are usually tuned together.
