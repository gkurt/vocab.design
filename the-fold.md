---
name: The fold
slug: the-fold
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The bottom edge of the first screenful, above which content is seen
  without any scrolling and below which it must be earned.
aliases:
  - name: above the fold
    source: community
  - name: below the fold
    source: community
  - name: first viewport
    source: community
  - name: initial viewport
    source: community
tags:
  - perception
  - scroll
relations:
  contrastWith:
    - false-bottom
    - viewport
  variantOf: []
  partOf: []
  seeAlso:
    - hero
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: arguing about what must be visible before a scroll
---

The word is borrowed from newsprint. A broadsheet is folded in half to be stacked on a
newsstand, so only the top half of the front page is doing any selling, and the largest
headline goes there. The web took the metaphor for the bottom edge of the browser window as
a page first paints: everything above it arrives for free, and everything below it costs the
reader a deliberate gesture. That is the whole idea, and it is worth keeping the two halves
of the phrase distinct in speech, because "above the fold" is a place and "the fold" is the
boundary that makes it one.

The complication is that a newspaper is folded in exactly one spot and a website is not.
Phones, laptops, external monitors, split windows, and a reader who has enlarged their type
all put the line somewhere different, so the fold is a distribution rather than a
measurement, and any specific number written down for it ("640 pixels", "the average is 900")
is a fiction with a decimal point. What survives the objection is the pattern behind it:
attention is densest at the top of a page and thins out downwards, which holds whatever the
viewport height turns out to be.

So the fold is a real gradient and a fake line, which is why the discourse settled into two
slogans that are both half right. "Nobody scrolls" was wrong by about 1997 and was still
being quoted a decade later to justify cramming an entire homepage into 600 pixels, which
backfires reliably: a screen with everything on it emphasises nothing, and a band of
content that happens to end exactly at the window edge creates a false bottom that reads as
the end of the page and actually does stop people scrolling. "The fold is a myth" is the
correction, and it goes too far in the other direction, because a reader still decides
whether to continue based on what they can see, and the first screenful is where that
decision gets made.

The practical version is a job description rather than a boundary. The first screenful has to
say what this page is, offer the one thing most people came for, and make it visibly worth
continuing, which usually means letting something be cut off by the bottom edge on purpose so
the page reads as having more in it. Everything else is negotiable. The vocabulary has also
followed the constraint down into performance work, where the content of the first viewport
is what Largest Contentful Paint measures and what a
[hero](/hero) region is competing for: it is why images up there need their space reserved by
an [aspect ratio box](/aspect-ratio-box) and why the ones below it are the candidates for
[lazy loading](/lazy-loading).
