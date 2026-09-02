---
name: Spatial navigation
slug: spatial-navigation
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Moving focus by direction rather than by sequence, so arrow keys, a
  D-pad, or a TV remote jump to the nearest control up, down, left, or right.
aliases:
  - name: directional navigation
    source: wicg
  - name: arrow key focus
    source: community
  - name: D-pad navigation
    source: community
  - name: 10-foot UI navigation
    source: community
tags:
  - keyboard
  - navigation
  - platform-registers
relations:
  contrastWith:
    - roving-tabindex
    - switch-access
  variantOf: []
  partOf: []
  seeAlso:
    - ten-foot-ui
    - focus-order
implementations: []
sources:
  - title: CSS Spatial Navigation Level 1
    url: https://drafts.csswg.org/css-nav-1/
  - title: "WICG: spatial-navigation"
    url: https://github.com/WICG/spatial-navigation
demo: inline
exhibit: false
useWhen: the input is a remote or a game pad, not a keyboard
---

A keyboard walks a page in one dimension: Tab goes forward through a sequence, Shift and Tab go
back. A remote control has no such key. It has a ring of four directions and a select button, and
so the only question it can ask is "what is the nearest thing that way?" Spatial navigation is the
answer: focus moves to the closest candidate in the direction pressed, measured in geometry rather
than in source order.

The two models disagree constantly, and that is the thing to internalise. A grid whose source
order runs across the rows still walks correctly with Tab, but pressing Down from the third cell
is a geometry problem whose answer may be several positions away in the DOM. Put a tall card, a
missing cell, or a floating panel into the layout and the divergence gets worse: direction hops
over the hole, while the sequence walks patiently into it. This is why a
[ten-foot UI](/ten-foot-ui) cannot be tested by tabbing through it. The navigation model that
ships to the television is not the one your keyboard is using.

Browsers do part of this already. Arrow keys scroll, and CSS Spatial Navigation Level 1 specifies
directional focus movement with `spatial-navigation-action` and `nav-up`-style overrides, but the
feature is unimplemented outside experiments, so in practice a TV interface ships its own focus
engine. If you are writing one, the two rules that matter most are alignment beats proximity (a
candidate overlapping the current element's own extent should win over a nearer diagonal one) and
the move must be reversible, because a Right that cannot be undone by a Left makes a remote feel
broken within seconds.

Inside a single widget the answer is usually not a focus engine at all. A
[roving tabindex](/roving-tabindex) is the established way arrow keys move around one composite
control, and it keeps the widget as a single stop in the page's own
[focus order](/focus-order). Spatial navigation is the model for a whole interface whose only
input is a direction pad, not a technique to sprinkle over a form.
