---
name: Image
slug: image
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An embedded picture, sized and cropped by the layout around it,
  carrying the alternative text that stands in when it cannot be seen.
aliases:
  - name: picture
    source: component-gallery
  - name: img
    source: community
  - name: media
    source: community
tags:
  - media
relations:
  contrastWith:
    - figure
    - thumbnail
  variantOf: []
  partOf: []
  seeAlso:
    - alt-text
    - decorative-image
implementations: []
sources:
  - title: "The Component Gallery: Image"
    url: https://component.gallery/components/image/
demo: inline
exhibit: false
useWhen: a picture is content rather than decoration
---

An image is the one component that arrives late. Everything else in a page is drawn from
markup the browser already has, while an image is a promise of pixels that may take a
second, may never come, and may be met by a reader who will not see them at all. That is
why the element carries three things a plain box does not: a declared size, so the layout
can hold its place before anything downloads; an alt string, so the meaning survives when
the picture does not; and a loading and decoding beat that the design has to look decent
during. Treat those three as part of the component, not as afterthoughts, and most image
bugs stop happening.

The declared size is the one people skip. Writing the real pixel dimensions on the element
lets the browser compute the ratio and reserve the box immediately, which is what stops the
[layout shift](/layout-shift) that throws a reader's line of text down the page half a
second after they started it. Where the ratio is fixed by the design rather than by the
file, an [aspect ratio box](/aspect-ratio-box) does the reserving instead. Once the box
exists, how the picture fills it is a separate decision: [object fit](/object-fit) says
whether it is letterboxed, stretched or cropped, and a declared
[focal point](/focal-point) says what must survive the crop when the box gets narrow.

Alt text is where the word "content" earns its place in the definition. If the picture is
carrying information, it needs [alt text](/alt-text) that carries the same information, and
a [figure](/figure) with a caption is often the better shape because the caption serves
everybody. If it is carrying nothing, it is a [decorative image](/decorative-image) and
belongs behind an empty alt attribute or a CSS background, so a screen reader is not made
to read out "hero-banner-final-2". The case to actually avoid is
[images of text](/images-of-text): a picture of words cannot be selected, translated,
searched, or resized, and the alt string that repeats the words is a confession that the
words should never have been a picture.

The rest is delivery. Images below the first screenful can be deferred with
[lazy loading](/lazy-loading), so the ones the reader can actually see are not queued
behind them, and something has to fill the box while they arrive:
[progressive image loading](/progressive-image-loading) covers the blur-up and low quality
placeholder family. A [thumbnail](/thumbnail) is a separate, smaller asset rather than the
full picture scaled down in the browser, which is the difference between a fast grid and a
slow one. And the file itself usually needs more than one version, at more than one width,
because the same slot is a different number of physical pixels on different screens: that
is the device pixel ratio story, and it belongs to its own entry rather than to this one.
