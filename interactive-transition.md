---
name: Interactive transition
slug: interactive-transition
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A transition whose progress is held by an ongoing gesture, so the
  reader can drag it partway, hesitate, and either complete it or send it back.
aliases:
  - name: gesture-driven transition
    source: community
  - name: interactive dismiss
    source: hig
  - name: swipe back
    source: community
  - name: drag to dismiss
    source: community
tags:
  - dragging
  - touch
relations:
  contrastWith:
    - interruptible-animation
    - predictive-back
  variantOf: []
  partOf: []
  seeAlso:
    - swipe-to-dismiss
implementations:
  - system: hig
    name: Motion
    url: https://developer.apple.com/design/human-interface-guidelines/motion
sources:
  - title: "Apple HIG: Motion"
    url: https://developer.apple.com/design/human-interface-guidelines/motion
demo: inline
exhibit: false
useWhen: a gesture should own the transition until it is released
---

Most transitions are *played*. Something triggers them, they run on a clock nobody can reach, and
they end. An interactive transition is *scrubbed* instead: its progress is a number the reader's
finger is writing, frame by frame, and the interface has committed to nothing until the finger comes
off. Halfway through, the sheet is genuinely halfway, the scrim is genuinely half dark, and the
answer to "is this going to happen" is still open. That openness is the whole point. A played
transition tells the reader what has already been decided; a scrubbed one lets them look at the
consequence first and decide afterwards.

Building one means expressing the transition as a function of progress rather than as a duration.
Every property that moves has to be derivable from a single number between zero and one, because
that number is going to arrive out of order, stop, reverse, and jitter. Only the release is timed: a
short pull runs backwards to where it started, a pull past the threshold carries on to the end, and
the threshold is usually distance combined with velocity, so a fast flick counts even when it did
not travel far. That final leg is where a [spring animation](/spring-animation) earns its keep,
since it can take the gesture's velocity as its own starting velocity and the hand-off becomes
invisible. Two rules keep it honest. The settle must itself be interruptible, or a reader who grabs
the sheet again mid-flight gets ignored at the exact moment they expressed a preference. And the
gesture can never be the only route, since a scrub is a pointer idiom: the same state change owes a
button, an Escape key, or a menu item.

The specific cases have their own names and this one is the property they share.
[Swipe to dismiss](/swipe-to-dismiss) is the gesture; whether it is scrubbed or merely triggered is
a separate question, and plenty of implementations just fire an animation once the swipe passes a
threshold, which is not this term.
[Predictive back](/predictive-back) is one gesture-driven transition, standardised on one platform,
with a system-supplied preview of the destination. An interactive transition is the general property
of being scrubbable and reversible mid-flight, and it applies just as well to a card expanding, a
pull-down refresh, or the [page curl](/page-curl) that draws its own progress on the sheet of paper.

The failure mode worth naming is the half-interactive transition: a drag that tracks the finger up
to a threshold and then snaps to an animation the reader can no longer influence. It reads as the
interface losing interest. If the gesture owns the transition, it owns all of it, including the
right to change its mind at ninety-nine percent.
