---
name: Bulletproof button
slug: bulletproof-button
category: pattern
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: "A mail button built to survive a renderer that drops CSS: the fill
  carried by a cell or box behind the link rather than by a background the
  client can refuse."
aliases:
  - name: bulletproof email button
    source: community
  - name: VML button
    source: community
  - name: email button
    source: community
tags:
  - email
relations:
  contrastWith:
    - button-versus-link
    - touch-target
  variantOf: []
  partOf: []
  seeAlso:
    - table-based-layout
    - fallback-font
    - dark-mode-email
    - styled-alt-text
implementations: []
sources:
  - title: "Campaign Monitor: bulletproof email buttons"
    url: https://buttons.cm/
  - title: "Litmus: your guide to bulletproof email buttons that work"
    url: https://www.litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design
demo: inline
exhibit: false
useWhen: a button that still reads as one when the CSS is dropped
---

A button on the web is a control the browser draws for you. A button in a mail is a picture of
one, assembled out of whatever the receiving client agrees to render, and clients disagree about
almost everything. The failure the name was coined against is specific and common: the fill was
a CSS background or a background image, the shape was CSS padding and a radius, and a client
that strips those declarations leaves a line of link text where the call to action used to be.
Nobody presses it, because nothing on the screen says it can be pressed. Building it bulletproof
means putting the fill and the size somewhere the renderer has no habit of refusing.

The construction is older than CSS and reads that way. A one-cell table carries the fill on the
cell itself, through a presentational `bgcolor` attribute rather than a stylesheet, and carries
the size through `cellpadding` rather than through padding on the link. The anchor inside it is
set to `display: block` so it fills the cell, which means the target is the whole coloured
rectangle instead of the words alone. Every layer is a belt or braces for the one under it: drop
the CSS and the cell is still filled and still the right size, drop the radius and it is a
square button rather than no button. The Word rendering engine behind several desktop Outlook
versions gets a further layer, a VML `<v:roundrect>` inside a conditional comment only it can
see, which is why the generator at [buttons.cm](https://buttons.cm/) still emits one and why
[Litmus](https://www.litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design) keeps
publishing the pattern.

Two honest readings come with it. The thing is an anchor, not a button, so everything in
[button versus link](/button-versus-link) applies: the label has to name a destination, and the
markup a screen reader meets is a link however much it looks like a control. And the reason to
make the whole cell clickable rather than the text is the same reason a
[touch target](/touch-target) has a minimum size, since most of these are pressed with a thumb.
The surrounding [table based layout](/table-based-layout) is not decoration either. The button
is one more nested table in a document already built from them.

The name oversells it, as names in this corner of the craft tend to. Nothing here is
bulletproof: an image-only button still disappears when images are blocked, a fill still
inverts in a client that inverts, and a padded cell still collapses in an engine nobody tested.
What the pattern really buys is a floor. When the renderer takes something away, what is left is
a filled rectangle with a legible label in it, which is the same bargain a
[fallback font](/fallback-font) strikes for type: decide now what the degraded version looks
like, rather than finding out from a screenshot.
