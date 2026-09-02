---
name: Bottom navigation
slug: bottom-navigation
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A bar of three to five top level destinations pinned to the bottom
  edge of a phone screen, with the current destination always marked.
aliases:
  - name: tab bar
    source: hig
  - name: bottom tabs
    source: community
  - name: bottom bar
    source: community
tags:
  - navigation
  - platform-registers
  - touch
relations:
  contrastWith:
    - navigation-bar
    - dock
    - navigation-rail
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Navigation bar
    url: https://m3.material.io/components/navigation-bar/overview
  - system: hig
    name: Tab bars
    url: https://developer.apple.com/design/human-interface-guidelines/tab-bars
sources:
  - title: "Material Design 3: navigation bar guidelines"
    url: https://m3.material.io/components/navigation-bar/guidelines
  - title: "MUI: Bottom Navigation"
    url: https://mui.com/material-ui/react-bottom-navigation/
demo: inline
exhibit: false
useWhen: top level destinations within thumb reach
---

Bottom navigation puts an application's whole top level in one row, at the end of the
screen a thumb can actually reach. Its destinations are peers: none is inside another,
each keeps its own history while you are away from it, and exactly one is marked as
current at all times, so the bar doubles as a "you are here". The bar is persistent
scenery. It stays put while the content above it changes, and it disappears only when
you go deeper, into a detail screen that has its own way back.

The naming is a mess, and the mess is worth knowing. Apple calls it a **tab bar**;
Material Design 3 calls it a **navigation bar** (it was **bottom navigation** in
Material 2, which is where the English name comes from); teams say **bottom tabs** or
just **bottom bar**. Material's word is the trap, because
[navigation bar](/navigation-bar) is also the ordinary name for the strip across the
*top* of a page, and it is what UIKit and Fluent's iOS vocabulary mean by it. Say which
end of the screen you mean the first time the phrase comes up in a review.

It is not [tabs](/tabs) and it is not a [segmented control](/segmented-control). Those
swap a panel inside the page you are already on, and they are part of that page's
content. Bottom navigation switches which part of the product you are in, and it
outlives every screen it shows. It is also not a place for actions: a compose or add
button belongs beside the bar as a floating action button, not inside it, because a row
where four items are places and the fifth is a verb makes the current marker mean two
things at once.

Three destinations is the floor (with two, use tabs) and five is the ceiling. Past five,
the labels shrink to nothing, targets fall under the comfortable tap size, and the
honest fix is to demote the tail into a "More" destination rather than squeezing. Keep
the labels: an icon-only bar reads as clean in a mockup and as a guessing game in the
hand, and only a handful of glyphs (search, back, close) are truly understood without
one. On wider windows the same destinations move to a rail or a sidebar, so treat the
bar as one presentation of the product's top level, not as the top level itself.
