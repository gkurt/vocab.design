---
name: Zigzag layout
slug: zigzag-layout
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Alternating rows that flip which side the image and the text sit on,
  so the eye zigzags down a list of features.
aliases:
  - name: alternating layout
    source: community
  - name: zig zag
    source: community
  - name: interleaved rows
    source: community
  - name: ping pong layout
    source: community
tags:
  - grids
relations:
  contrastWith:
    - split-screen-layout
  variantOf: []
  partOf: []
  seeAlso:
    - feed-layout
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: a run of feature blocks that would otherwise read as a list
---

A zigzag layout is the marketing page's answer to a run of rows that all look the same. Each
row pairs one picture with one short block of copy, and every other row swaps which side each
of them is on, so the picture goes left, right, left, right down the page. The effect is that
consecutive rows stop resembling each other: a reader who has finished row one has to move
across the page to start row two, and that movement is what tells them a new item has begun.
Without the flip, four identical rows read as a list, and a list is skimmed down its left edge
rather than read item by item.

Building it is one line these days. Rows are a two-column grid or a flex row, and the even
ones get `flex-direction: row-reverse` or a `grid-column` swap. The important detail is that
the flip stays presentational: the markup keeps picture-then-copy order in every row, so the
sequence a screen reader announces and the sequence a narrow screen stacks into are both
consistent. Reversing the source order instead produces a page that reads correctly on a
desktop and alternates confusingly when it collapses to one column, and it is the reason
[reading flow](/reading-flow) exists as a property: if the visual order is the meaningful one,
say so rather than reordering the document. Check the collapsed version deliberately, since
the whole pattern evaporates at one column and the rows have to survive as plain stacked
blocks.

Two neighbours are worth keeping apart. The
[transparency checkerboard](/transparency-checkerboard) is a different sort of alternation
entirely, software-drawn scaffolding that means "no pixels here", and alternating rows of
content down a page belong to this term rather than to that one. And an
[F pattern](/f-pattern) or a [Z pattern](/z-pattern) is a claim about how eyes move over a
page that already exists, found by eye tracking rather than authored: you cannot build an F
pattern, you can only fail to account for one. A zigzag is authored, and its relationship to
scanning is a hope rather than a finding, which is worth saying plainly because the pattern is
often sold as though the eye movement were guaranteed.

The practical caution is length. Three or four rows of alternation feel deliberate, and eight
feel like a template, because past a certain count the reader learns the rhythm and starts
skipping the copy on both sides. If the run is long, break it: change the row shape partway
down, promote one item to full width, or group the tail into a denser grid where the items are
genuinely peers. The flip is worth something only while it is still telling the reader
something they did not already know.
