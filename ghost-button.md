---
name: Ghost button
slug: ghost-button
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A button with no fill and often no border until you hover it,
  sitting at the bottom of the emphasis ladder above a plain link.
aliases:
  - name: text button
    source: material
  - name: tertiary button
    source: community
  - name: subtle button
    source: primer
  - name: quiet button
    source: spectrum
  - name: borderless button
    source: community
tags: []
relations:
  contrastWith:
    - link
    - button-versus-link
  variantOf:
    - button
  partOf: []
  seeAlso: []
implementations:
  - system: material
    name: Text button
    url: https://m3.material.io/components/all-buttons
  - system: shadcn
    name: Button (ghost variant)
    url: https://ui.shadcn.com/docs/components/button
sources:
  - title: All buttons, Material Design 3
    url: https://m3.material.io/components/all-buttons
demo: inline
exhibit: false
useWhen: naming the least emphatic button variant
---

A ghost button is a position on a ladder, not a different control. Filled shouts,
outlined answers, ghost waits to be looked for. All three run the same code and
carry the same semantics; what changes is how much of the reader's attention the
button asks for before it is needed. That makes the variant a layout decision:
one filled button per screen region, then quieter treatments for everything
beside it, so the emphasis says which action the screen is actually about.

The absence of a fill is what earns the name. Until the pointer arrives there is
nothing but a label in a clickable box, and the hover state (a faint wash, a
border appearing) is the moment it admits to being a control. That is also the
weakness: on touch there is no hover, and a ghost button in a place nobody
expects a control can read as a caption. Use it where a button is predicted (a
dialog's cancel, a toolbar, a row's secondary action), never as the only route to
something a reader has to find.

The naming is a mess and worth knowing. Material calls it a text button, Adobe's
Spectrum calls it quiet, Primer calls it invisible or subtle, and plenty of teams
call it tertiary, which numbers the rung rather than describing the look. "Ghost"
itself sometimes means an outlined button with a transparent fill, so in a
mixed-vocabulary room it is worth pointing at the thing rather than saying the
word.

The one line not to cross is the one into link territory. A ghost button still
does something where the reader already is; the moment it goes somewhere it wants
to be an anchor, with an address, a middle-click, and Enter alone for activation.
Strip a button of its fill and it starts to look like prose, which is exactly when
people reach for a `div` and lose the role, the focus stop, and the keyboard
behaviour that made it a button in the first place.
