---
name: Box
slug: box
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A bordered container, optionally titled, that groups logically
  related controls so the grouping is drawn rather than implied by spacing
  alone.
aliases:
  - name: boxes
    source: hig
  - name: group box
    source: community
  - name: grouping container
    source: community
tags: []
relations:
  contrastWith:
    - common-region
  variantOf: []
  partOf: []
  seeAlso:
    - fieldset
    - card
implementations:
  - system: hig
    name: Boxes
    url: https://developer.apple.com/design/human-interface-guidelines/boxes
sources:
  - title: Boxes, Human Interface Guidelines
    url: https://developer.apple.com/design/human-interface-guidelines/boxes
demo: inline
exhibit: false
useWhen: grouping controls with a visible boundary
---

Few words in interface work carry more meanings than this one. CSS calls every element
a box, page designers call any bounded rectangle a box, typographers have a text box,
and a checkbox is a box that is not this box at all. The sense meant here is the
platform-toolkit one: a visible container, usually a thin border with an optional
title, drawn around a set of controls that belong together. Windows named it the group
box, SwiftUI ships it as GroupBox, and Apple's guidelines simply call them boxes. All
three describe the same small device, and all three exist for the same reason: spacing
alone is a weak signal, and a border is a strong one.

The decision a box makes is whether a grouping should be drawn or merely implied. Three
switches under a heading, separated from the next three by extra space, are grouped in
the sense that a careful reader can work it out. Put a border around each set and the
grouping stops being an inference. That is worth doing when the group has a name worth
printing (Notifications, Privacy, Advanced) and when the panel is dense enough that
whitespace is already doing several other jobs. It is worth skipping when the sections
are far apart, or long, or already separated by a heading with real typographic weight,
because a border that repeats what the layout has said is one more line to look at.

A box is a visual device and nothing more, which is the distinction people most often
miss. A [fieldset](/fieldset) with a legend is the form's semantics: it tells assistive
technology that these controls answer one question, and the legend is read with each of
them. The two are independent. A box drawn with a border and a title says nothing to a
screen reader, and a fieldset with its border styled away says nothing to the eye. A
real group deserves both, which is why the honest implementation is usually a fieldset
that is also drawn as a box rather than a choice between them.

Against a [card](/card), the difference is what the container is for. A card is a
content object, collected with others of its kind, usually tappable as a whole and
often raised off the surface behind it. A box holds controls, sits inside a larger pane,
and is never itself the thing you act on. The characteristic failure is over-boxing:
a box inside a box inside a box, each border claiming "these belong together" until
none of them is telling the reader anything. One border around a real group is a
grouping; four nested borders are texture.
