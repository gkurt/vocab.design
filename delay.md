---
name: Delay
slug: delay
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The wait between an animation being triggered and starting to move,
  the unit a stagger is built from and the difference between twitchy and
  considered.
aliases:
  - name: animation-delay
    source: css
  - name: transition-delay
    source: css
  - name: lead-in
tags: []
relations:
  contrastWith:
    - stagger
    - duration
  variantOf: []
  partOf: []
  seeAlso:
    - choreography
implementations: []
sources:
  - title: Animation Vocabulary
    url: https://animations.dev/vocabulary
  - title: The Vocabulary of Motion
    url: https://motion-vocabulary.vercel.app/
demo: inline
exhibit: false
useWhen: motion should start after something else, not with it
---

A delay is time that has been triggered but has not started moving yet. In CSS it
is `transition-delay` and `animation-delay`, and in the shorthand it is the second
time value, which is the classic misreading:
`transition: opacity 200ms 400ms` is a fifth of a second of fade that begins four
tenths of a second late, not a six hundred millisecond fade. `animation-delay`
takes negative values as well, which start the animation part-way through instead
of holding it back, and that is how a field of looping elements is knocked out of
phase without writing a keyframe set per element.

Most delays in an interface are not aesthetic, they are filters. A label that
appears the instant the pointer touches a control will also appear when the pointer
merely crosses it on the way somewhere else, so a delay of a few hundred
milliseconds is how a [tooltip](/tooltip) tells a passing pointer from a pointer
that stopped. That specific use has its own name,
[hover intent](/hover-intent), and its own numbers, usually somewhere between 300
and 500 milliseconds on the way in with a smaller grace period on the way out so a
one pixel gap cannot kill an open menu.

Written many times over, one delay per element, the same value becomes a
[stagger](/stagger): the delay is the unit, and the stagger is the series. That is
worth keeping straight in a review, because "add a delay" and "stagger it" are
different instructions, and only one of them makes the whole sequence longer.

The cost is that a delay is dead time for the reader who did mean it, so the rule
of thumb runs in one direction only: delay a reveal that a passing pointer might
trigger by accident, and never delay feedback for something a person deliberately
did. A press that acknowledges itself a quarter of a second late does not read as
considered, it reads as a slow computer, and no amount of [easing](/easing) after
the wait recovers the impression. Where a delay exists to buy time for work rather
than to filter intent, the honest version is to show that the work has started.
