---
name: Chart aspect ratio
slug: chart-aspect-ratio
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: How wide a chart is for its height, which sets the slopes of its
  lines; banking to 45 degrees keeps rates of change readable.
aliases:
  - name: banking to 45 degrees
  - name: banking
tags:
  - dataviz
relations:
  contrastWith: []
  variantOf: []
  partOf: []
  seeAlso:
    - chart
    - aspect-ratio-box
implementations: []
sources:
  - title: "eagereyes: Banking to 45 degrees"
    url: https://eagereyes.org/blog/2013/banking-45-degrees
demo: inline
exhibit: false
useWhen: a line chart reads too steep or too flat for the story it tells
---

A line's slope is not a property of the data. It is a property of the data and the box you drew
it in. Squash a [chart](/chart) into a wide, short strip and every rise flattens into a drift.
Stretch the same numbers into a tall, narrow panel and the same rises turn into spikes. Nothing
in the series changed, no axis was cut, and the reader's impression of how fast things are
moving has been rewritten entirely by the shape of the frame.

William Cleveland's answer to this is banking to 45 degrees: choose the width to height ratio
that puts the average orientation of the line's segments at roughly 45 degrees, because that is
where the eye judges differences in slope most accurately. Very shallow segments all look
equally flat and very steep ones all look equally vertical, so the useful discrimination sits in
the middle. The rule is a target rather than a law, and [eagereyes](https://eagereyes.org) has a
good account of how loosely it holds up under testing, but it gives a defensible starting number
in an argument that otherwise gets settled by whatever space the layout had left over.

The mechanism people reach for is [aspect ratio box](/aspect-ratio-box), and the two words are
not doing the same job. An aspect ratio box is the CSS that holds a chosen ratio while a
container resizes. Chart aspect ratio is the judgement about which ratio tells the truth, which
is what you feed that mechanism. [Letterboxing](/letterboxing) is the third neighbour and the
one to avoid here: bars around a chart that will not reshape are wasted room, since a chart is
not a fixed picture and a plot area can genuinely be redrawn at whatever shape it is given.

In practice the ratio is usually decided by accident. A chart dropped into a full width card
gets whatever height looked tidy, a chart in a dashboard cell gets whatever the cell was, and a
responsive plot silently re-banks itself at every breakpoint, so the same figure argues
differently on a phone and on a laptop. Two habits help. Decide the ratio from the data, by
looking at how much of the value range a typical step covers, and then hold it with a ratio
box rather than a fixed pixel height. And be suspicious of a very wide, very short plot that
happens to make a worrying trend look calm, because that is the same rhetorical move as a
[truncated axis](/truncated-axis) made with geometry instead of numbers.
