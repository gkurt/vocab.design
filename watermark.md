---
name: Watermark
slug: watermark
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Repeating faint text or a mark tiled across content to claim it or
  to mark it as a draft or a preview.
aliases:
  - name: overlay watermark
    source: community
  - name: draft stamp
    source: community
  - name: tiled watermark
    source: community
tags: []
relations:
  contrastWith:
    - scrim
  variantOf: []
  partOf: []
  seeAlso:
    - dot-grid-background
implementations: []
sources:
  - title: Ant Design components overview
    url: https://ant.design/components/overview/
demo: inline
exhibit: false
useWhen: faint repeated text laid over content
---

A watermark is faint text or a mark laid over content and repeated across it, usually rotated
so it cannot be mistaken for part of the layout. The repetition is what makes it a watermark
rather than a label: a single word in the corner is a badge and can be cropped away in one
gesture, while a mark tiled across the whole surface has to be removed everywhere at once. The
web version is a component, not a graphic. [Ant Design](https://ant.design) ships one that
wraps arbitrary children, and every implementation that takes the job seriously also watches
for its own node being deleted from the page.

Two jobs account for almost every use. The first is provenance: this document, image, or
export came from here and belongs to this account, which is why so many watermarks carry a
name, an email address, or a user id. The second is state: the content is a draft, a preview,
a sample, a comp under a licensing hold, and must not be mistaken for the finished thing. The
second job is the one with a deadline, because a document that escapes review unmarked causes
a specific kind of expensive mistake, and it is the reason the mark is applied to the view
rather than to the content underneath.

The whole craft is one tension, and the demo above shows both ends of it. A watermark has to
survive a screenshot, a crop, and a photograph of the screen, which argues for high contrast
and dense tiling. It also has to leave the content readable, which argues for the opposite.
Anything faint enough to be pleasant is faint enough to be cleaned up in an image editor, and
anything strong enough to be uncleanable makes the text underneath hard to read. Practical
settings sit near the readable end: low opacity, a repeat interval wide enough that the mark
does not land on the same line twice, an angle far from the horizontal, and an accessibility
check that the marked text still meets its contrast requirement, since a watermark drops the
effective contrast of everything beneath it.

Against other overlays the distinction is what the overlay is doing. A [scrim](/scrim) is
there to suppress what is beneath it and to hand attention to whatever is on top, so it is
meant to be seen and then dismissed. A [vignette](/vignette) darkens edges to focus the eye
on the middle and carries no message at all. A watermark carries a message and is not
dismissible: it is content added to the view for as long as the view is shown. Do not use one
where a status field would do. If the reader is already inside a screen that says "draft" and
can only be reached by an editor, a tiled stamp is noise; the watermark earns its cost when
the view can leave the building.
