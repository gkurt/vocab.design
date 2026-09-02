---
name: Pixel density
slug: pixel-density
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: How many physical pixels a display packs into an inch, and the
  reason a CSS pixel is a unit of measure rather than a dot on the screen.
aliases:
  - name: DPI
  - name: PPI
  - name: retina
  - name: device pixel ratio
  - name: 2x
  - name: hidpi
tags:
  - platform-registers
  - screen-size
relations:
  contrastWith:
    - density-independent-pixel
  variantOf: []
  partOf: []
  seeAlso:
    - signed-distance-field
    - font-hinting
    - font-smoothing
implementations: []
sources:
  - title: "MDN: devicePixelRatio"
    url: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  - title: "MDN: Resolution media feature"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution
demo: inline
exhibit: false
useWhen: raster crispness, 2x assets, or dpi/ppi confusion is on the table
---

A display's pixel density is how finely its physical pixels are packed, counted in pixels
per inch. A CSS pixel is not one of those. It is a reference unit, anchored to roughly
ninety-six per inch at a comfortable viewing distance, so that a 44 pixel target is about
the same physical size on a phone held close and a monitor an arm away. The number that
connects the two is the device pixel ratio: how many physical pixels the screen spends on
one CSS pixel along each axis. At a ratio of 2, a 44 by 44 CSS pixel button is painted with
88 by 88 physical pixels and stays exactly as large as it was. Density buys detail, never
room, which is the single most useful thing to know about it.

That is why density never moves a [breakpoint](/breakpoint). A dense phone reports the same
CSS [viewport](/viewport) width as a coarse one of the same physical size, so layout code
can go on ignoring the whole subject. What cannot ignore it is anything made of samples.
A raster shipped at exactly its CSS size has one sample per CSS pixel, and on a 2x screen
the browser has to invent the other three quarters, which is the softness people mean when
they say an asset "looks bad on retina". The fix is to ship more samples than the layout
asks for and let the density decide: `srcset` with `x` descriptors, or a `min-resolution`
media query, both of which pick a denser file for a denser screen without changing a single
layout number. The [image](/image) element is where that negotiation actually happens, and
it is worth reading as its own subject.

Vector artwork sidesteps the problem rather than solving it. An SVG or an
[icon font](/icon-font) stores outlines instead of samples, so the rasterizer works at
whatever density it finds and there is no 2x file to forget. This is the strongest argument
against [images of text](/images-of-text): real text is vector art with hinting, a
screenshot of text is a raster locked to whatever density it was captured at, and no
`srcset` list rescues a screenshot taken at 1x. Where a raster is unavoidable, a
[thumbnail](/thumbnail) grid is the usual place the cost shows up first, because the same
neglect is repeated forty times on one screen.

Two habits keep the vocabulary honest. DPI and PPI are used interchangeably in interface
work and it is not worth fighting, though PPI is the accurate one for screens, since DPI
was a printing measure counting ink dots. And "retina" is a product name, not a threshold:
device pixel ratios are frequently fractional rather than whole, particularly on Android
and on desktops set to a scaling percentage that is not a multiple of a hundred, so code
that branches on `devicePixelRatio === 2` will be wrong on a large number of real machines.
Ask whether the ratio is above one, not whether it equals a number you remember.
