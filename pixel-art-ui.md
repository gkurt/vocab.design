---
name: Pixel art UI
slug: pixel-art-ui
category: aesthetic
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An interface drawn on a visible pixel grid, with bitmap type, hard
  aliased edges, and icons kept at their original low resolution.
aliases:
  - name: 8-bit UI
    source: community
  - name: bitmap UI
  - name: pixel UI
  - name: pixelated interface
  - name: pixel art
    source: uistyleguide
tags:
  - icons
  - illustration
  - retro
relations:
  contrastWith:
    - low-poly
    - scanlines
  variantOf: []
  partOf: []
  seeAlso:
    - retro-web-design
    - stepped-animation
implementations: []
sources:
  - title: "Sage: Retro Web Design: When Pixel Art Belongs on Your Site"
    url: https://sage.agency/blog/websites-that-use-cool-pixel-art-design/
demo: inline
exhibit: false
useWhen: the pixels are meant to be visible
---

The rule that generates everything else is that the pixel is the unit. Every edge lands on
a grid cell, so borders are stepped rather than curved, diagonals are staircases, and
there is no antialiasing anywhere: a shape is either on the grid or it is drawn wrong.
Panels get a chunky frame a few cells thick with the corner cells knocked out, meters are
built from discrete cells rather than a continuous fill, icons are drawn once at something
like sixteen cells square and never redrawn larger, and type is a bitmap face where each
glyph is a fixed arrangement of cells. Palettes are small and flat, partly as homage to
hardware that could only hold a few colours at once and partly because dithering, not
blending, is how this style makes a gradient.

It began as a constraint. Early consoles and home computers had a hundred and something
lines of resolution and a palette measured in dozens, so artists learned to say a great
deal with very little, and the discipline outlived the hardware. What was a limitation
became a signature, which is the same trajectory the [terminal aesthetic](/terminal-aesthetic)
took, though the two are built on different grids: a terminal is a grid of character cells
that happen to be drawn from pixels, and this is the pixel grid itself, free to put a shape
anywhere on it. It is also the older sibling of the computing nostalgia cluster, since
[vaporwave](/vaporwave) and the [Y2K aesthetic](/y2k-aesthetic) quote the decade after the
one this style is actually from.

Scaling is the whole technical story on the web. A bitmap sprite drawn at 16 by 16 and
displayed at 48 by 48 will be smoothed into mush by the browser's default interpolation,
so `image-rendering: pixelated` is mandatory, and the scale factor has to be a whole
number: at 2.5 times, some source pixels become two screen pixels and others three, and the
sprite visibly wobbles. The same arithmetic applies to CSS drawn pixels, which is why this
style tends to fix a unit, express every dimension as a multiple of it, and treat browser
zoom as the thing most likely to break the illusion.

Two accessibility notes are worth stating. Bitmap type at its native size is small, tightly
spaced, and low contrast by habit, and it does not reflow or scale gracefully, so keep it
for headings, labels, and scores, and set the actual reading text in a normal face. And a
pixel icon carries the same obligation as any other icon: it needs a real accessible name,
because a nine cell arrow rendered as a background image says nothing at all to a screen
reader.
