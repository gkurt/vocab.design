---
name: Sliding indicator
slug: sliding-indicator
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A single underline or pill that travels between tabs to mark the
  selection instead of each tab drawing its own, so the move itself says which
  way the selection went.
aliases:
  - name: magic line
    source: community
  - name: animated tab indicator
    source: community
  - name: sliding underline
    source: community
  - name: moving pill
    source: community
  - name: spring pill
    source: community
  - name: magic indicator
    source: community
tags:
  - navigation
relations:
  contrastWith:
    - current-page-indicator
  variantOf: []
  partOf: []
  seeAlso:
    - tabs
    - segmented-control
implementations: []
sources:
  - title: "CSS-Tricks: creating an animated menu indicator with CSS selectors"
    url: https://css-tricks.com/creating-an-animated-menu-indicator-with-css-selectors/
  - title: "CSS Script: magic line navigation"
    url: https://www.cssscript.com/magic-line-navigation/
demo: inline
exhibit: false
useWhen: selection should move between items rather than blink between them
---

There is one bar, and it belongs to the group rather than to any tab in it. Selecting a
tab does not switch a border on and another one off: it tells the single bar where to go
next, and the bar travels there. What the reader gets out of that trip is direction. A
selection that blinks from the second tab to the fourth says only that something
changed, while a bar that slides right past the third says which way the selection
moved and how far, which is the same information a scrollbar thumb gives about a long
document.

Building it is a measuring job. The indicator is taken out of the flow, usually
absolutely positioned in a rail under the row, and every move reads the target tab's
box and writes that geometry onto the one bar. Two ways to write it: `left` and `width`,
which are honest and easy to read but recalculate layout on every frame, or a
`translateX` plus a `scaleX` against a fixed reference width, which the compositor can
run without touching layout at all and which is what most polished implementations use.
The scale version needs the bar's own content to be nothing but flat colour, since
anything inside it would be stretched along with it. Either way this is the everyday
face of [FLIP](/flip-animation): read the box you are going to, and animate a transform
that turns where you are into where you will be.

The same move appears wherever a group has exactly one selection and all the options are
on screen: the thumb of a [segmented control](/segmented-control), the highlight in a
bottom navigation bar, the pill behind a filter row. It stops working the moment the set
is not a fixed row. A wrapping menu makes the bar jump lines, an overflowing tab strip
makes it slide to somewhere off screen, and a set whose items are added or removed while
the reader watches needs a re-measure on every change, which is what a ResizeObserver is
usually doing in these implementations. Web fonts are the classic first bug: measure
before the real face has loaded and the bar sits under a width that no longer exists.

Two things keep it honest. The bar is decoration, so the actual state has to live in
`aria-selected` (or `aria-current` for navigation) on the tab itself, or a screen reader
gets a group of identical buttons with nothing selected. And a bar that travels is
motion the reader did not ask for, so under `prefers-reduced-motion` it should simply be
where it belongs, with no trip at all. That is also the reason to keep the duration
short, in the 150 to 250 millisecond range: past that the reader has already read the
new panel and the bar is still on its way.
