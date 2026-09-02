---
name: Overscan safe area
slug: overscan-safe-area
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The inset a television layout keeps clear of the screen edge, about
  five percent, because sets crop the outer frame and anything near it
  disappears.
aliases:
  - name: title safe area
    source: community
  - name: action safe area
    source: community
  - name: overscan margin
    source: android
  - name: TV safe area
    source: community
tags:
  - platform-registers
  - screen-size
relations:
  contrastWith:
    - display-cutout
  variantOf: []
  partOf: []
  seeAlso:
    - ten-foot-ui
    - letterboxing
    - top-shelf
implementations: []
sources:
  - title: Layouts in the Leanback UI toolkit, Android Developers
    url: https://developer.android.com/training/tv/playback/leanback/layouts
demo: inline
exhibit: false
useWhen: laying out for a screen that crops its own edges
---

Television sets have never been trusted to show the whole picture. Cathode ray tubes were
deliberately driven to scan slightly beyond the visible glass, so that ageing components and
mains voltage drift produced a picture that still filled the tube rather than one with black
edges creeping in, and broadcasters answered by keeping everything that mattered well inside
the frame. Panels are digital now and the geometry is exact, but the habit survived in the sets
themselves: many still default to a mode that scales the incoming picture up and crops the
outer few percent, and a fair number ship with no way to turn it off. So a television layout
still keeps a margin, and that margin is the overscan safe area.

The working vocabulary is a pair, and it is worth getting right. The action safe area is the
inner ninety percent or so, and it is where movement, video and graphics belong: content there
survives on any reasonable set. The title safe area is tighter, about the inner eighty percent,
and it is where text, logos, scores and captions belong, because a letter with its top row of
pixels shaved is not a slightly cropped letter, it is a typo. Android's TV guidance states the
same idea as a flat overscan margin, forty eight density-independent pixels across and twenty
seven down on a nine hundred and sixty by five hundred and forty layout, which is five percent
of each dimension.

The related terms are close enough to be confused, and the difference is what the screen shows.
A phone [safe area](/safe-area) is about a screen that displays every pixel it is given, where
the obstacles are notches, system bars and rounded corners sitting on top of the picture, and a
[display cutout](/display-cutout) is one such obstacle. Overscan is not an obstruction at all:
the pixels near the edge are simply never displayed, and no inset query will tell you how many
of them were lost. That is why the number is a convention rather than a measurement, and why the
web platform has no `env()` value for it.

In practice the discipline is the same as edge to edge on a phone, run the other way round.
Backgrounds, video and full-bleed artwork extend to the physical edge of the layout, because
losing five percent of a gradient costs nothing. Text, buttons and anything focusable stop at
the title safe line. Two extra pressures push the same way on a television: at
[ten foot](/ten-foot-ui) viewing distance type is already large, so the margin is cheap, and a
remote-driven interface needs room around each focusable item for the focus ring and its
scale-up, which is exactly the room the safe area was going to reserve anyway.
