---
name: Display cutout
slug: display-cutout
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The camera housing that intrudes into the screen rectangle, which a
  layout has to route content around rather than under.
aliases:
  - name: notch
    source: community
  - name: dynamic island
    source: apple
  - name: punch hole
    source: community
  - name: cutout
    source: android
  - name: sensor housing
    source: hig
tags:
  - platform-registers
  - screen-size
relations:
  contrastWith:
    - overscan-safe-area
    - safe-area
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Using safe-area-inset to build mobile-safe layouts, Polypane
    url: https://polypane.app/blog/using-safe-area-inset-to-build-mobile-safe-layouts/
demo: inline
exhibit: false
useWhen: naming the hole the layout must dodge
---

A display cutout is the piece of hardware that sits inside the screen instead of above
it. The camera, and on some phones a depth sensor and a speaker, have to be somewhere,
and once bezels got thin the only place left was inside the rectangle. The names come
from the shapes: a notch is a bar hanging down from the top edge, a punch hole is a
circle, and Apple's Dynamic Island is a rounded capsule that doubles as a live status
surface. Android calls the general case a cutout and Apple's guidelines call the region
the sensor housing. All of them mean the same thing to a layout: there are pixels you
are technically allowed to paint and nobody will ever see.

The word most often confused with it is [safe area](/safe-area), and the two are not the
same size or the same kind of thing. A safe area is the whole region a platform reports
as usable, and it is an inset on all four sides, accounting for the cutout, the status
bar, the home indicator, the rounded corners, and anything else the hardware or the
system has claimed. A display cutout is one specific intrusion into the display, which
the safe area is one way of dodging. The distinction earns its keep at the edges,
because there are cutouts a safe area does not protect you from: on a phone rotated to
landscape the cutout moves to the left or right side, and an application that only ever
insets the top will run a text column straight into it.

In practice most applications never see the problem, because the
[status bar](/status-bar) already occupies the band the cutout lives in and the system
draws it clear of the hardware. The cutout bites when an application asks to draw edge
to edge, which is exactly what a full bleed image, an immersive video, or a map wants.
At that point the cutout is yours to handle, and the two honest answers are to inset the
content region so it starts below the housing, or to let the background run under it
while keeping every control and every word inside the safe region.
[Layout margins](/layout-margins) are the wrong tool here on their own: they are a
consistent gutter you chose, while a cutout inset is a number the device reports and can
change when the phone is rotated or the window is resized.

Testing is the part teams skip. A cutout is not one shape, and the difference between a
punch hole and a notch is enough to change whether a centred title survives. Emulators
let you switch the cutout shape, browsers expose the insets to CSS through the
environment variables, and both are worth exercising in landscape as well as portrait.
The failure is quiet: nothing crashes, nothing logs, and a control is simply underneath
a piece of glass that is not transparent.
