---
name: Fluid typography
slug: fluid-typography
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: Type sizes that scale continuously with the viewport between a
  minimum and a maximum, rather than jumping at breakpoints.
aliases:
  - name: fluid type scale
  - name: clamp typography
    source: css
  - name: responsive type
  - name: fluid heading styles
    source: carbon
tags:
  - screen-size
  - spacing
relations:
  contrastWith:
    - dynamic-type
    - modular-scale
  variantOf: []
  partOf: []
  seeAlso:
    - oversized-typography
implementations: []
sources:
  - title: Fluid Typography (CSS-Tricks)
    url: https://css-tricks.com/snippets/css/fluid-typography/
  - title: Creating a Fluid Type Scale (Modern CSS)
    url: https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/
demo: inline
exhibit: false
useWhen: sizing text across screens without breakpoints
---

The mechanism is one function. `clamp(min, preferred, max)` takes a floor, an
expression, and a ceiling, and the expression is where the viewport gets in:
something like `clamp(1.25rem, 0.5rem + 2.5vw, 2.75rem)`. Below one width the
floor wins, above another the ceiling does, and between them the size tracks the
viewport as a straight line. One declaration replaces a heading size repeated at
three breakpoints, and there is no width at which the type visibly jumps.

The preferred term needs both parts. `vw` alone gives a size proportional to the
viewport, which sounds right and reads badly: it halves when the window halves, so
the type collapses on a phone and balloons on a monitor. Adding a fixed component
in `rem` flattens the slope, so the size still moves but the ratio between the
smallest and largest case stays sane. Picking the two numbers is solved arithmetic:
choose a size at a minimum viewport and a size at a maximum one, and the slope is
the difference in size over the difference in width. Fluid type scale generators do
exactly this, and design systems ship the result as tokens.

Accessibility is where naive fluid type fails, and the rule is worth knowing
precisely. A size expressed purely in viewport units does not respond to the
reader's text-size setting or to browser zoom the way `rem` does, which can trap a
reader who needs larger text: WCAG 1.4.4 asks that text scale to 200 percent
without loss of content. The fix is the same fixed component that fixes the visual
problem. As long as a `rem` term is present in the preferred expression, and the
`min` is a `rem` value too, zooming still enlarges the text, because zoom changes
what a `rem` is worth.

Fluid type also asks to be checked at the extremes, since a line that behaves
between 400 and 1200 pixels can still be wrong outside that range. Test the floor
and the ceiling, not the middle. And know when not to reach for it: body copy has
a comfortable size and a comfortable [measure](/measure), and neither wants to
move much, so most systems make the display sizes fluid and leave body text on one
value. Fluid sizing responds to the viewport, which is also its limit: a component
that must adapt to the slot it sits in wants a container query instead.
