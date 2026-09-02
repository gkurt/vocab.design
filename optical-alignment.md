---
name: Optical alignment
slug: optical-alignment
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Nudging an element off its measured position so it looks aligned,
  correcting for shapes whose bounding box lies about their visual centre.
aliases:
  - name: optical adjustment
    source: community
  - name: visual centering
    source: community
  - name: optical correction
    source: community
tags:
  - perception
  - spacing
relations:
  contrastWith:
    - keyline
    - text-box-trim
  variantOf: []
  partOf: []
  seeAlso:
    - visual-balance
    - hanging-punctuation
implementations: []
sources:
  - title: Spacing, Atlassian Design
    url: https://atlassian.design/foundations/spacing
demo: inline
exhibit: false
useWhen: it measures right but still looks wrong
---

The eye aligns edges of mass, not bounding boxes. Give a square, a circle and an upward
triangle the same left coordinate and only the square looks aligned: the circle touches
that line at exactly one point and curves away above and below it, and the triangle touches
it at one corner while most of its body sits well to the right. Optical alignment is the
correction, a small nudge past the measured position until the shapes read as level. The
same physics is why a round shape has to be drawn slightly larger than a square one to look
the same size, and why nobody can make the correction from the numbers alone: it is
judged by looking.

Three places account for most of the work. The first is a glyph inside a round container,
where the play triangle in a circular button is the standard example, always pushed a pixel
or two right of the geometric centre because its mass is at the flat edge. The second is an
[icon](/icon) beside a label, where the icon's artwork rarely fills its own frame evenly and
the gap has to be measured from the drawing rather than from the box. The third is type
against any edge, where the line box is taller than the letters and the alignment that
matters runs along the [cap height](/cap-height) and the [baseline](/baseline), not along
the top and bottom of the box the browser drew. Setting a heading flush to a card's top
padding is the most common case of the third and the most commonly skipped.

It sits in a specific relationship with the measured systems around it. A
[spacing scale](/spacing-scale) and an [eight point grid](/eight-point-grid) exist to stop
every value being an argument, and optical alignment is the last step that is allowed to
break them, which is why the nudge belongs inside the component rather than in the layout
that places it. [Overshoot](/overshoot) is the same effect named from the typographic side:
a round letter is drawn slightly past the baseline and the cap line for exactly the reason a
circle is nudged past a rule. Systems built on ratios, [golden ratio](/golden-ratio)
included, produce measured positions like any other and get corrected the same way.

Two practical rules keep it from turning into folklore. Record the nudge as a named value
rather than as a magic number in one file, because an unlabelled minus two pixels is the
first thing a later refactor deletes. And check it at the sizes it ships at: an adjustment
tuned on a 48 pixel button is wrong on a 20 pixel one, since the correction is a proportion
of the shape and not a fixed distance. Where the artwork is yours, the better fix is to
bake the correction into the drawing itself, so every consumer gets it without knowing.
