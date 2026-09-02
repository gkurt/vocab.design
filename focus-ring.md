---
name: Focus ring
slug: focus-ring
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The visible outline drawn around the element that currently holds
  keyboard focus, showing where the next keypress will land.
aliases:
  - name: focus outline
  - name: focus indicator
    source: wcag
  - name: focus highlight
  - name: focus halo
    source: spectrum
  - name: keyboard focus indicator
    source: aria-apg
tags:
  - keyboard
relations:
  contrastWith:
    - focus-visible
    - focus-appearance
  variantOf: []
  partOf: []
  seeAlso:
    - state-layer
implementations:
  - system: polaris
    name: Keep focus outlines
    url: https://github.com/Shopify/polaris/blob/main/documentation/Accessibility.md
sources:
  - title: "WCAG 2.2: Focus Visible"
    url: https://www.w3.org/TR/WCAG22/#focus-visible
  - title: "APG: Developing a Keyboard Interface"
    url: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
demo: inline
exhibit: false
useWhen: marking where keyboard focus is sitting right now
---

Someone driving an interface from the keyboard has exactly one question at all
times: where am I? The focus ring is the answer. It is the cursor of the keyboard,
and without it a Tab press is a step taken in the dark.

The ring is not decoration, so it is not optional. WCAG 2.2 requires that a
keyboard-operable control show a visible indicator when it has focus, and that the
indicator be large enough and contrasted enough to find at a glance. Browsers ship a
default ring for free; `outline: none` is the single most common way a design deletes
it, usually because the default looked wrong on a rounded button rather than because
anyone decided keyboard users did not need it. The fix is to replace the ring, never
to remove it: `:focus-visible` gives you a ring for keyboard entry and none for a
mouse press, which is the behaviour most teams were reaching for when they reached
for `outline: none`.

Draw it with `outline` rather than `border` or `box-shadow`. Outline follows
`border-radius` in every current browser, does not take part in layout, and so cannot
shift the control by a pixel when it appears. Give it `outline-offset` so it sits
clear of the control's own edge, and remember it has to survive on both the light and
the dark surface the control might sit on. A two-tone ring (a light stroke inside a
dark one) is the usual answer for a design that cannot know its background.

Ring and hover state are different claims and should look different. Hover says the
pointer is here, which the reader already knows because they are holding the pointer.
The ring says the keyboard is here, which nothing else on screen says.
