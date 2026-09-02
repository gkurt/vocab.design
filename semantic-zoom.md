---
name: Semantic zoom
slug: semantic-zoom
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Switching between two views of the same content, a zoomed out view
  of group headings and a zoomed in view of individual items, instead of scaling
  pixels.
aliases:
  - name: SemanticZoom
    source: fluent
  - name: zoomed out view
    source: fluent
  - name: zoomed in view
    source: fluent
tags:
  - canvas
relations:
  contrastWith:
    - minimap
    - focus-plus-context
  variantOf: []
  partOf: []
  seeAlso:
    - pinch-to-zoom
    - zoom-transition
    - infinite-canvas
implementations:
  - system: fluent
    name: Semantic zoom
    url: https://learn.microsoft.com/en-us/windows/apps/design/controls/semantic-zoom
sources:
  - title: Semantic zoom, Microsoft Learn
    url: https://learn.microsoft.com/en-us/windows/apps/design/controls/semantic-zoom
demo: inline
exhibit: false
useWhen: zooming out to headings, not to smaller text
---

Zooming out of a long list normally makes everything smaller, which helps nobody: a thousand
names at four pixels tall is a texture, not an overview. Semantic zoom answers the same gesture
with a different drawing instead. Zoomed in you get the individual items; zoomed out you get the
group headings, at full size and legible, and picking one drops you back in at that group. The
address book is the canonical case, where zooming out gives you the alphabet rather than tiny
names, and Windows made it a control of its own: Fluent's SemanticZoom is a host that manages
two views, a zoomed in view showing items and a zoomed out view showing their group headers.
Maps and timelines generalize it past two levels, redrawing at each step so that a year becomes
months and months become individual events.

The contrast worth being strict about is with
[progressive disclosure](/progressive-disclosure). Progressive disclosure reveals more of the
same thing on demand: what was hidden becomes visible and what was already there stays exactly
as it was. Semantic zoom reveals nothing, because at each level the content is redrawn: the
same data appears in a different representation in the same place, and the level you left is
gone rather than folded away. Practically that means disclosure is a question about how much to
show at once, while semantic zoom is a question about what the right unit is at this scale.

Two rules keep it usable, and both come from the control's own guidance. Keep the layout and
the panning direction the same at every level, so that zooming feels like a change of unit
rather than a change of app, and keep the scope the same: an overview of a photo library should
be months or albums, never a file browser. The zoomed out view also has to be genuinely small,
ideally a screen or two, because an overview you have to scroll through at length is not an
overview.

It sits between two neighbours. On an [infinite canvas](/infinite-canvas) the same idea keeps a
zoomed out board readable, with cards collapsing to titles and titles to coloured blocks rather
than shrinking to nothing. And it is the spatial cousin of
[drill down navigation](/drill-down-navigation): drilling down replaces the screen and adds a
step to a back stack, while semantic zoom stays in one place and changes only what is drawn
there, so the reader keeps their bearings and there is nothing to go back from.
