---
name: Overview plus detail
slug: overview-plus-detail
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A layout that shows a compressed overview and a detailed view at the
  same time in separate regions, so the reader keeps their place while
  inspecting one part.
aliases:
  - name: overview+detail
    source: community
  - name: overview and detail
    source: community
  - name: minimap pane
    source: community
tags:
  - canvas
  - perception
relations:
  contrastWith:
    - minimap
    - focus-plus-context
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: A Review of Overview+Detail, Zooming, and Focus+Context Interfaces,
      Cockburn, Karlson and Bederson
    url: https://dl.acm.org/doi/10.1145/1456650.1456652
demo: inline
exhibit: false
useWhen: a map or minimap kept beside the detail
---

Some things are too big to see and read at once: a chart, a floor plan, a photograph at pixel
level, a board of a thousand cards. Overview plus detail is the arrangement that gives up on
choosing between the two scales and shows both at the same time, in separate regions, with a
box on the overview marking which part of it the detail is currently showing. The reader
inspects at full size without losing the answer to where am I, which is the question that
otherwise costs them a zoom out and a zoom back in every few seconds.

The literature name comes from Cockburn, Karlson and Bederson's review, which sorts the whole
family of approaches to this problem into three. Overview plus detail separates the two scales
in space, showing them side by side. Zooming separates them in time, so you see one scale and
then the other. Focus plus context keeps them in one view by distorting it, magnifying the part
in focus while the surroundings stay visible and squashed, the way a fisheye lens does. Each
buys something different: separating in space costs screen area and asks the reader to
assemble the two views mentally, while separating in time costs them their sense of place.

What makes the pattern work, rather than merely look right, is that the coupling runs both
ways. Scrolling or panning the detail moves the box on the overview, and dragging the box on the
overview moves the detail. A one way version is still useful and very common, and that is
usually what a [minimap](/minimap) is: a compressed picture that reports position and accepts a
click to jump. Overview plus detail is the layout that pattern lives in, and its two regions are
usually [panes](/pane) of a window. The other layouts that pair two regions divide the work
differently: [split view](/split-view) names any two panes with a boundary between them, and
[list detail](/list-detail) is the pairing where the first region indexes items and the second
shows the one you picked, rather than showing the same content at a smaller scale.

Three details decide whether it earns its space. The overview must be a real reduction of the
same content, not a diagram of it, or the reader cannot use it to aim. The viewport box must be
draggable and large enough to grab, which quietly sets a lower bound on how small the overview
can be. And on a narrow window the overview is the first thing to go, because two regions
showing the same content is a luxury that stops paying once the detail region is small enough
to be the overview.
