---
name: Half-leading
slug: half-leading
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The empty space a browser splits evenly above and below a line of
  text when line height exceeds the font's own height, which is why text boxes
  never sit flush.
aliases:
  - name: leading space
  - name: line box padding
  - name: half leading space
tags:
  - spacing
  - web-platform
relations:
  contrastWith:
    - leading
    - text-box-trim
    - baseline
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Leading-Trim: The Future of Digital Typesetting"
    url: https://medium.com/microsoft-design/leading-trim-the-future-of-digital-typesetting-d082d84b202
  - title: CSS text-box-trim (Chrome for Developers)
    url: https://developer.chrome.com/blog/css-text-box-trim
demo: inline
exhibit: false
useWhen: explaining the mystery padding around a line of text
---

Set a line of 40px text with a line height of 2 and the browser produces an 80px
box. The letters themselves only need the font's own content area, roughly 46px
for a typical family, so 34px is left over. That leftover is not appended below
the line or reserved above it: it is halved, and one half is placed above the
letters and the other below. Each of those halves is a half-leading. It is the
reason a heading you gave no padding still refuses to touch its container, and
the reason two elements set 24px apart look closer to 40 apart.

The mechanism matters because the space belongs to the line box rather than to
the box model. It is not margin and not padding, so it does not collapse, does
not answer to a negative value you can reason about, and cannot be measured with
a ruler in the browser's box overlay. It also is not constant: the amount depends
on the family's ascent and descent, which means the same declared
[leading](/leading) yields a different half-leading in every typeface, and a
font swap quietly shifts every label you had centered. On a multi-line paragraph
the half-leadings between lines meet and add up to the visible line spacing,
which is exactly the effect you wanted. On a single line of interface text they
are just two cushions nobody asked for.

Two ways out, and they answer different questions.
[Text box trim](/text-box-trim) removes the half-leading at the ends of a text
block so the box hugs the [cap height](/cap-height) and the
[baseline](/baseline), which is what an interface label wants: the padding you
declare becomes the padding you see. A
[baseline grid](/baseline-grid) goes the other way and embraces the arithmetic,
placing every line on a fixed interval so the half-leadings work out to a
consistent rhythm down the page. The trap in
[vertical rhythm](/vertical-rhythm) work is forgetting which of the two you are
doing, and subtracting half-leadings from spacing that was already sitting on a
grid.

The one thing not to do is guess. Nudging a label up by 2px because it looks
high is a fix that lasts until someone changes the font size, the weight, or the
family, at which point the half-leading changes and the nudge becomes the bug. If
the box has to hug the letters, trim it and then state the space you meant.
