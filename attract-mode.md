---
name: Attract mode
slug: attract-mode
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A self-playing loop an idle screen falls into to demonstrate itself,
  inherited from arcade cabinets and reused by kiosks and product demos.
aliases:
  - name: attract loop
    source: community
  - name: demo loop
    source: community
  - name: idle animation
    source: community
  - name: kiosk mode demo
    source: community
tags:
  - onboarding
  - retro
relations:
  contrastWith:
    - float-animation
  variantOf: []
  partOf: []
  seeAlso:
    - pause-stop-hide
    - carousel
implementations: []
sources:
  - title: "School of Motion: motion design dictionary"
    url: https://schoolofmotion.com/blog/motion-design-dictionary
demo: inline
exhibit: false
useWhen: an unattended screen should demonstrate itself
---

An arcade cabinet with nobody standing at it was not allowed to sit there dark. It cycled: a title
card, the high score table, a stretch of gameplay driven by scripted or recorded input, then round
again. The reason was commercial rather than decorative, since a cabinet that shows what it is gets
fed coins and one that shows a blank screen does not, but the constraint that came with it is the
interesting part. The loop had to surrender the moment a hand touched it, and it had to surrender
cleanly, because a player who pressed start and got the tail end of a demo would think the machine
was broken. Every later use inherits both halves: museum kiosks, retail demo units on a shop floor,
airport wayfinding boards, and the product tour that starts playing when a landing page has been open
for a while.

The rules are short and each one is a failure mode in disguise. Fall into the loop only after an idle
threshold long enough that a person who is reading, not gone, is never interrupted. Loop rather than
play once, since nobody is there to see it end. Surrender on the first input, and this is the one that
gets botched most often: the gesture that wakes the screen must not be spent on waking it, or the
first tap of every visitor's session vanishes and the kiosk earns a reputation for ignoring people.
Leave no state behind, so the next person starts from a genuine beginning rather than three steps into
somebody else's session. And make the loop legible as a demonstration rather than as a live session,
usually by keeping it obviously synthetic: a visible cursor, a caption, a pace no real hand would keep.

This site runs one. Every specimen on a term page plays its own
[choreography](/choreography) on a loop, with a ghost cursor and key chips standing in for a hand,
until a reader takes the stage over, and the same script doubles as the demo's test in CI. That is
also why the specimens obey the last rule below.

Because the last rule is the one an arcade cabinet never had to think about: a loop that plays
without being asked is exactly the motion a
[prefers-reduced-motion](/prefers-reduced-motion) visitor has asked not to be given. Motion nobody
requested, running indefinitely, in the corner of someone's eye, is the textbook case for that
preference, so attract mode does not run at all under it and the screen rests on a still frame that a
control can play once on request. The related restraint is attention rather than accessibility: an
attract loop off screen is a loop burning a battery for nobody, which is why the honest
implementations pause the moment they are not being looked at. If what you actually want is to teach
one specific thing to a person who *is* present, the tools for that are an
[onboarding tour](/onboarding-tour) or a [feature spotlight](/feature-spotlight), both of which are
allowed to interrupt precisely because someone is there to interrupt.
