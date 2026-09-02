---
name: Material 3 Expressive
slug: material-3-expressive
category: aesthetic
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "Google's 2025 update to Material 3: springier motion, emphasized
  typography, updated dynamic colour themes, and responsive components that
  stretch to hug the display."
aliases:
  - name: M3 Expressive
    source: material
  - name: expressive design
  - name: Android 16 design
tags:
  - theming
relations:
  contrastWith:
    - material-you
  variantOf: []
  partOf: []
  seeAlso:
    - motion-token
implementations: []
sources:
  - title: "Google blog: Material 3 Expressive redesign for Android and Wear OS"
    url: https://blog.google/products-and-platforms/platforms/android/material-3-expressive-android-wearos-launch/
demo: inline
exhibit: false
useWhen: "Material turned up: emphasized type, springy motion"
---

This is a vendor design language with a version number, not a folk aesthetic, and it helps
to say that plainly. Google announced Material 3 Expressive on 13 May 2025 as an update to
Material 3, going to Pixel devices first and then to Android 16 and Wear OS 6. The
announcement names four moves: a system of more natural, springy animations; emphasized
typography; updated dynamic colour themes that carry across Google apps and onto watch
faces; and responsive components, including buttons described as stretching to hug the
display. On the watch, it adds scrolling animations that follow the curve of the screen and
transitions built from shape-morphing elements. Anything beyond that list is somebody's
interpretation rather than the platform's claim, which matters when a client asks you to
build "the new Material" and means whichever screenshot they saw.

The register that comes out of those moves is Material with the volume up. Shape is the
loudest part: corner radii stop being one global number and become a range, so a card, a
button and a toggle in the same view can be rounded quite differently on purpose, and a
control can change shape as it changes state rather than only changing colour. Type is
bigger and carries more of the hierarchy, so a heading does the work a label and a divider
used to share. Colour arrives in large tonal fields rather than as small accents on a
neutral ground. And motion is spring based rather than curve based, which is a real
difference and not a decorative one: a spring is described by stiffness and damping, so it
settles where it is interrupted instead of insisting on finishing a fixed duration.

Its immediate relatives on this site are the parts it is built on rather than rivals.
[Material-you](/material-you) is the previous chapter, the one that introduced dynamic
colour extracted from the wallpaper, and Expressive inherits that machinery rather than
replacing it. [Seed-color](/seed-color) is the mechanism underneath both: one source colour
generating a whole tonal palette, which is why "large tonal fields" is even affordable to
design with. [Flat-design-2](/flat-design-2) is worth holding beside it as the previous
swing of the same pendulum, a style that added back shadow and depth after flat design had
removed too much, where this one adds back shape, size and bounce after a decade of
restrained, evenly rounded rectangles.

Two cautions before adopting it. It is a platform language, so wearing it on a non-Android
surface says "this is a Google product" whether or not you meant to, in the way a screen
built from Apple's own controls does on the other side. And the parts that make it feel
alive are the parts most likely to be turned off: springy motion has to answer reduced
motion honestly, and emphasized type has to survive a reader who has raised their font size
past what your mockup assumed. Take the shape range and the tonal fields first if you want
the flavour; those degrade gracefully, and the motion does not.
