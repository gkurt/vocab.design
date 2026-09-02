---
name: Categorical palette
slug: categorical-palette
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: A data palette of distinct hues at roughly equal visual weight, used
  for groups that have no order so no colour reads as larger than another.
aliases:
  - name: qualitative palette
    source: community
  - name: categorical scale
    source: community
  - name: series colors
    source: community
  - name: chart colors
    source: community
tags:
  - dataviz
  - perception
relations:
  contrastWith:
    - sequential-palette
    - diverging-palette
    - color-coding
  variantOf: []
  partOf: []
  seeAlso:
    - color-vision-deficiency
implementations: []
sources:
  - title: Color palettes for data visualization
    url: https://colorarchive.org/guides/data-visualization-color-palettes/
demo: inline
exhibit: false
useWhen: colouring unordered groups without implying rank
---

Where a sequential palette spends lightness, a categorical one spends hue. Groups like
traffic sources, product lines, or teams have no rank, so the palette's job is to make each
one findable while making none of them look bigger: the hues are pushed as far apart around
the circle as they will go, and lightness and colourfulness are held roughly level across
the set. Let one swatch get noticeably darker or more saturated than its neighbours and
readers start treating that series as the important one, which is a claim the data never
made.

The practical ceiling is low. Six to eight is where most people stop being able to match a
patch in a legend back to a wedge in the chart, because past that the hues have to sit close
enough together that two of them read as the same colour seen twice. When a chart genuinely
has twenty categories, the answer is not twenty colours: group the small ones into an
"other" bucket, colour only the few series the chart is about, or drop colour entirely and
label directly. A palette that has run out of separation is worse than no palette, since it
looks like it is encoding something.

Two constraints ride along with every set. Around one in twelve men has a colour vision
deficiency, so any pair the palette relies on has to survive red and green collapsing into
each other, which is why good sets vary lightness a little even while trying to keep it
level. And hue on its own is never enough on its own terms: direct labels, patterns, or
marker shapes have to repeat what the colour says, which is the whole content of
[use of colour](/use-of-color). A legend is the weakest form of this, because it makes the
reader hold six colour-to-name pairs in their head while looking somewhere else.

The other two data palettes answer questions this one refuses to. A sequential palette
encodes an ordered quantity, so darker deliberately means more. A diverging palette adds a
meaningful midpoint and lets the two directions mean opposite things. Reach for either of
those the moment the groups turn out to have an order after all, because a categorical set
applied to ordered data throws that order away.
