---
name: Scrollbar
slug: scrollbar
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The bar beside a scrollable region whose thumb shows both how much
  content there is and where in it you are.
aliases:
  - name: scroller
    source: hig
  - name: scroll bar
  - name: overlay scrollbar
  - name: scroll indicator
  - name: scroll area
    source: radix
tags:
  - scroll
relations:
  contrastWith: []
  variantOf: []
  partOf: []
  seeAlso:
    - scrollbar-color
    - minimap
    - track
    - scroll-container
implementations:
  - system: base-ui
    name: Scroll Area
    url: https://base-ui.com/react/components/scroll-area
sources:
  - title: User Interface Elements Glossary, NN/g
    url: https://www.nngroup.com/articles/ui-elements-glossary/
demo: inline
exhibit: false
useWhen: the bar that shows and sets scroll position
---

A scrollbar is a track with a thumb in it, and the thumb answers two questions at
once. Its position says where you are in the content; its length says how much content
there is, because the thumb is as long a fraction of the track as the visible part is
of the whole. A thumb filling half the track means one more screenful; a sliver means
a very long document. That second reading is why a thumb has a minimum length, and why
a bar that ignores the ratio and draws a fixed-size handle has thrown away half of
what the control is for. Dragging the thumb sets the position, so the bar reports and
controls in the same gesture.

Platforms disagree about whether the bar takes up room. A classic scrollbar sits in
the layout and permanently narrows the content beside it. An overlay scrollbar floats
over the content and fades out when the pointer leaves, which is what macOS and touch
platforms do by default and which is why a scroller can be invisible until you touch
it. The overlay style buys space and costs discoverability: with no bar showing, there
is nothing to say that a region scrolls at all. The layout hazard is the classic one:
a bar that appears when content grows past the box shifts everything beside it, which
`scrollbar-gutter: stable` fixes by reserving the space whether or not a bar is drawn.

Restyling is legitimate, replacing usually is not. CSS offers `scrollbar-width` and
`scrollbar-color`, which respect the platform's own behaviour, and hand-built bars
should be measured against what they are giving up: keyboard scrolling, a real hit
target (a hairline thumb is a fine looking, unclickable control), click-in-track
paging, the platform's fade timing, and the way an assistive technology already
understands a real scroll container. Whatever the bar looks like, the region under it
must stay reachable by keyboard, which for a `div` that scrolls means it needs to be
focusable so arrow keys reach it at all. Do not confuse the bar with the two things
that ride alongside it: a [reading progress](/reading-progress) indicator reports
position through a document as a fraction of a task, and [scroll spy](/scroll-spy)
answers which section you are in by name. The scrollbar is the one that also lets you
change the answer.
