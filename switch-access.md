---
name: Switch access
slug: switch-access
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Operating a device with one or two switches, where a scanning cursor
  steps through targets in turn and a press selects the highlighted one.
aliases:
  - name: switch control
    source: apple
  - name: scanning
    source: community
  - name: single switch
    source: community
tags:
  - assistive-tech
relations:
  contrastWith:
    - dwell-activation
    - spatial-navigation
    - voice-control
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Android Accessibility Help: Get started with Switch Access"
    url: https://support.google.com/accessibility/android/answer/6122836
demo: inline
exhibit: false
useWhen: input is a single button and time, not a pointer
---

A switch is one button. It can be a jelly button under a hand, a sip and puff tube, a head
switch on a wheelchair rest, or a phone's own volume key, and it produces exactly one signal:
now. Android's Switch Access is described as letting someone interact with the device using
one or more switches instead of the touchscreen, and Apple ships the same idea as Switch
Control. Because a single signal cannot say where, the interface has to offer targets one at
a time: a highlight steps through them and the reader presses when it reaches the one they
want. With one switch the highlight advances on a timer and the press selects. With two, one
switch advances and the other selects, which trades a second button for the timing pressure.

The scan follows the same order the keyboard does, so switch access inherits everything
[focus order](/focus-order) gets right or wrong, and a control that Tab cannot reach is a
control the scan never offers. That is the quiet reason so many keyboard bugs are worse than
they look. A widget kept to one [tab stop](/tab-stop) is one scan stop; a
[keyboard trap](/keyboard-trap) is not an annoyance but a dead end with no way out, since
there is no pointer to escape with.

The design consequence is arithmetic. Every element between the top of the sequence and the
action someone wants is a step, and every step is a wait. A row of five equally weighted
buttons costs up to five, a [card grid](/card-grid) of twenty cards costs up to twenty, and a
dialog that opens with focus in the wrong place costs the whole trip back. Scanners mitigate
this by scanning in groups, offering a row or a region first and only stepping through its
contents once that group is chosen, which is why sensible grouping and
[landmarks](/landmark) pay off here more than anywhere else. The rule that survives is that
shallow beats clever: fewer stops before the primary action, the important thing early, and
no interface that only makes sense if you can get to two distant controls quickly.

Time is the other half of the cost. A scan that moves on a fixed interval means anything with
its own deadline is unusable, so a [timeout warning](/timeout-warning) has to be
generous and extendable, and a [toast](/toast) that dismisses itself is gone long before the
highlight could reach it. [Dwell activation](/dwell-activation) is the neighbouring answer to
the same problem: one input and no pointer, where the selection is made by resting rather
than by pressing. Both are worth knowing about together, because a design that scans well
usually dwells well too.
