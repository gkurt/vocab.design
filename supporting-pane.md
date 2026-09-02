---
name: Supporting pane
slug: supporting-pane
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A secondary pane holding content that only makes sense next to the
  main pane, placed beside it on wide windows and below it or behind a control
  on narrow ones.
aliases:
  - name: secondary pane
    source: community
  - name: focus pane and supporting pane
    source: material
tags:
  - screen-size
  - windowing
relations:
  contrastWith:
    - inspector
    - list-detail
    - pane
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Supporting pane (SupportingPaneScaffold)
    url: https://developer.android.com/develop/adaptive-apps/guides/canonical-layouts
sources:
  - title: Canonical layouts, Android Developers
    url: https://developer.android.com/develop/adaptive-apps/guides/canonical-layouts
demo: inline
exhibit: false
useWhen: helper content that cannot stand on its own
---

A supporting pane is the narrower half of a two pane screen, and the test for whether a
pane qualifies is not its width but its dependence. Reviewer comments mean nothing
without the document they were written against. A palette means nothing without the
canvas it paints on. A shipment summary means nothing without the order it summarizes.
Material names the two halves the focus pane and the supporting pane, and gives the
supporting one roughly a third of an expanded window, so the proportion itself says
which pane the reader came for.

That dependence is what separates it from the other two pane arrangements.
[List detail](/list-detail) puts peers side by side: every row in the list is a thing
you could have opened on its own, and the pair exists to save you a navigation. A
supporting pane holds nothing you would ever open on its own. An
[inspector](/inspector) edits the properties of whatever is currently selected, and its
contents are a function of that selection. A supporting pane carries content that
serves the task rather than a property sheet for an object, so it can hold a comment
thread, a running total, or an activity feed, none of which are properties of anything.
Both are one of the three [canonical layouts](/canonical-layout) a platform recommends,
alongside [feed layout](/feed-layout), which drops the second pane entirely.

What makes the pane worth naming is that it has a defined answer at every width, and
the thing that supplies the answer is the [window size class](/window-size-class). At
expanded the two panes sit side by side at about seventy and thirty. At medium they
split the room evenly, because thirty percent of a medium window is too narrow to read
in. At compact there is no room beside, so the supporting content drops below the focus
pane, or waits behind a control and arrives as a [bottom sheet](/bottom-sheet). None of
those is a new design decision, which is the payoff: the arrangement was picked once
and the behaviour came with it.

The failure mode is putting something in the pane that could stand on its own.
Navigation belongs in a [navigation rail](/navigation-rail) or a
[sidebar](/sidebar), not in a pane the layout is entitled to fold away at compact
widths, because folding away navigation strands the reader. The same goes for anything
the reader might want to compare against a different focus pane: if the content
survives changing what is in the main pane, it was never supporting content, and it
wants a [split view](/split-view) or a screen of its own.
