---
name: Stacking cards
slug: stacking-cards
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A run of sections that each stick at the top of the viewport as the
  next one slides over it, so scrolling deals the page like a deck rather than
  passing it by.
aliases:
  - name: stacked cards on scroll
    source: community
  - name: card stack scroll
    source: community
  - name: sticky stacking sections
    source: community
  - name: deck scroll
    source: community
tags:
  - scroll
relations:
  contrastWith:
    - scroll-pinning
  variantOf: []
  partOf: []
  seeAlso:
    - scrollytelling
    - swipe-deck
implementations: []
sources:
  - title: "CSS-Tricks: stacked cards with sticky positioning"
    url: https://css-tricks.com/stacked-cards-with-sticky-positioning-and-a-dash-of-sass/
  - title: Stacking cards, scroll-driven animations
    url: https://scroll-driven-animations.style/demos/stacking-cards/css/
demo: inline
exhibit: false
useWhen: sequential sections should pile up instead of scrolling away
---

Ordinary sections leave. You scroll past one and it is gone, and whatever it said is now something
the reader has to remember. Stacking cards keep them: each section sticks where the last one stopped,
the next section rides up over it, and the top of the page slowly fills with a visible pile of
everything already read. The gesture is the same scroll, but the metaphor changes from *passing by*
to *dealing a deck*, and the reader can see how many cards are down and how many are still coming.

The mechanism is almost embarrassingly small. Give every section `position: sticky` with a `top`
offset a little larger than the one before it, put each later section above the earlier ones in the
stacking order, and give them opaque backgrounds. Nothing is measured, nothing is scripted, and the
staggered offsets are what leave each stuck card a visible strip at the top, which is the difference
between a deck and one card covering another completely. Scroll-driven animations then add the
frills people usually associate with the pattern: cards that shrink or dim slightly as they are
covered, timed against the covering card's own progress rather than against the page's.

The same sticky mechanism serves a completely different intent in a
[sticky header](/sticky-header), which pins one element permanently because its controls are needed
throughout; here every section takes a turn at being pinned and then hands the position on, and the
pile is the point rather than an accident. It is also not
[scroll pinning](/scroll-pinning), where the page holds still while an animation plays out against
scroll distance; a stacking deck never stops advancing, it just refuses to let anything leave. Under
the hood it is close kin to a [scroll-linked animation](/scroll-linked-animation) and it pairs
naturally with [scroll snap](/scroll-snap), which lands each card squarely rather than mid-deal.

Two costs are worth stating. The pattern eats vertical room, since every stuck card is viewport the
next one does not get, and by the fourth or fifth card the reader is looking at a stack of strips and
a sliver of content. And it is content-hostile if the sections are long: a card taller than the
viewport scrolls internally before it sticks, which reads as the page having two scrollbars in
sequence. It works best with a small, fixed number of short sections that genuinely belong in a
sequence, and badly as a general layout for a page whose length nobody controls.
