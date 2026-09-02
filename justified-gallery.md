---
name: Justified gallery
slug: justified-gallery
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A photo grid that scales and trims images so every row lands on one
  shared height with flush left and right edges, unlike masonry's ragged
  columns.
aliases:
  - name: justified layout
    source: flickr
  - name: mosaic layout
    source: community
  - name: justified image grid
    source: community
  - name: Flickr style gallery
    source: community
tags:
  - grids
  - media
relations:
  contrastWith:
    - card-grid
    - grid-lanes
    - masonry
  variantOf: []
  partOf: []
  seeAlso:
    - object-fit
    - deconstructed-pancake
implementations: []
sources:
  - title: Justified Layout by Flickr
    url: https://flickr.github.io/justified-layout/
demo: inline
exhibit: false
useWhen: photos of mixed shapes in tidy flush rows
---

A justified gallery lays photos of mixed shapes into rows, choosing how many go in each row and
scaling them all to one shared height so the row ends exactly at both edges of the container. The
name is borrowed from typesetting, where [justified text](/justified-text) stretches the spaces in
a line so both margins are flush; here the images are stretched instead, and the leftover is
absorbed by cropping a few pixels rather than by widening gaps. Every row can have a different
height, and the row above rarely matches the row below, but within a row the tops and bottoms line
up perfectly.

The contrast that defines it is [masonry](/masonry), and the difference is one sentence: masonry
fixes the column widths and lets the heights fall where they may, so the bottom edge is ragged and
the eye reads the layout as vertical columns. A justified gallery fixes the height per row and lets
the widths fall where they may, so both side edges are flush and the eye reads horizontal bands. A
portrait photo in masonry becomes a tall tile in its column; in a justified row it becomes a narrow
one, and its neighbours grow to take the space it gave up. Neither is more correct: masonry suits a
feed that keeps growing downward, while a justified gallery suits a bounded set of photos you want
to look tidy, and it never leaves the awkward half-empty last column masonry is prone to.

Getting it right is a small optimisation problem rather than a CSS declaration, which is why it is
usually a script. For each row you accumulate aspect ratios until the implied height drops into an
acceptable band around a target, then commit the row, scale its images to the height that makes the
widths sum exactly to the container, and hand the rounding error to one image as a crop of a pixel
or two. The implementation published by [Flickr](https://www.flickr.com),
[justified-layout](https://flickr.github.io/justified-layout/), is the reference: it takes a list
of aspect ratios and a container width and returns boxes, which keeps the geometry out of the
rendering layer entirely. The practical cautions are that the last row has nothing to justify
against, so it is either left short at the target height or stretched into an unbelievably wide
strip, and that the whole thing has to be recomputed on resize, which makes intrinsic sizing and
[lazy loading](/lazy-loading) awkward unless every image's aspect ratio is known up front.

Two neighbours are not the same thing. A [card grid](/card-grid) or a
[layout grid](/layout-grid) puts items into equal tracks and asks the content to fit; a justified
gallery derives the tracks from the content it was handed. And an
[aspect ratio box](/aspect-ratio-box) preserves each image's shape exactly, which is the opposite
of the small crop a justified row spends to land flush.
