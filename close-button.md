---
name: Close button
slug: close-button
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The small dismiss control in the corner of a dialog, banner or
  panel, drawn as an X and named Close rather than X.
aliases:
  - name: dismiss button
  - name: x button
  - name: close icon
tags:
  - icons
  - overlays
relations:
  contrastWith:
    - icon-button
    - light-dismiss
    - window-controls
    - emergency-exit-button
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Mantine components
    url: https://mantine.dev/core/package/
demo: inline
exhibit: false
useWhen: the little X that dismisses a surface
---

The close button is the one control almost every layered surface carries. It sits
in the corner furthest from the content (top right in left to right interfaces),
it is drawn as a multiplication cross rather than a letter, and it means one
thing: put this away. Nothing else. A control in that corner that saves, cancels,
or discards is not a close button, and readers who have learned that the corner is
always safe will press it as though it were.

Its accessible name is "Close", never "X". The glyph has no text to fall back on,
so the name has to be supplied, and the useful version says what is closing:
"Close filters" beats "Close" in a screen full of panels. A dialog usually earns a
second dismissal path as well, since the corner is a small target: Escape, and for
non-modal surfaces a click outside. The corner button is the visible one, the
other two are the fast ones.

Size is where the pattern most often fails. The glyph is around 16 pixels and the
control around 24, which is below any touch guidance, so the hit area has to be
padded out past the drawing to the recommended minimum. Crowding is the other half
of that problem: a close button pressed against a menu button, or against the edge
of a card that is itself tappable, produces the wrong dismissal often enough that
people stop trusting the corner.

Be careful about what closing means. Dismissing a banner that reappears on the
next page load teaches readers that the button does nothing, and dismissing a
panel that took real work to configure with no way back is a destructive action
wearing a harmless glyph. Either persist the dismissal or provide a visible way to
bring the surface back, which is also the only honest way to demonstrate the
control at all.
