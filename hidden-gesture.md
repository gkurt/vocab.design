---
name: Hidden gesture
slug: hidden-gesture
category: interaction
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: "An action reachable only by an input the reader has to guess: a
  swipe, a long press, a two-finger tap, with nothing on screen saying it is
  there."
aliases:
  - name: undiscoverable gesture
    source: community
  - name: gesture discoverability
    source: community
  - name: secret gesture
    source: community
tags:
  - perception
relations:
  contrastWith:
    - signifier
    - easter-egg
  variantOf: []
  partOf: []
  seeAlso:
    - long-press
    - swipe-actions
    - coach-mark
implementations:
  - system: hig
    name: Gestures
    url: https://developer.apple.com/design/human-interface-guidelines/gestures
sources:
  - title: "Apple HIG: Gestures"
    url: https://developer.apple.com/design/human-interface-guidelines/gestures
  - title: "IxDF: gesture-based interaction"
    url: https://www.interaction-design.org/literature/topics/gesture-interaction
demo: inline
exhibit: false
useWhen: an action only an unadvertised gesture reaches
---

A hidden gesture is not a kind of input, it is a defect several inputs share: the action
exists, the gesture works, and nothing on screen says either is true. The catalogue is
short and familiar. A row that reveals actions when swiped, with no edge peeking out to
say so. A tile that opens a menu when held, with no glyph and no ripple. A two-finger tap
that switches a mode, an edge swipe that goes back, a shake that undoes. Each is a
perfectly good gesture the moment someone knows about it, which is precisely the problem:
the whole design rests on a fact the reader does not have.

What makes it hard to notice is that the failure is silent in every measurement.
An unfound feature and an unwanted feature produce the same numbers, so the analytics say
nobody uses it, the roadmap concludes nobody needs it, and the gesture is either removed
or left in and quietly relied on by the handful of people who were told. The only
instruments that see it are the ones nobody runs on a shipped feature: a first-use study,
a support queue read for the phrasing of the question, and the observation that the people
using the gesture all learned it from the same person.

The remedies are ordered, and they are not interchangeable. A permanent
[signifier](/signifier) is the strongest: the peeking edge of the swipe action, the
chevron, the handle, the eight pixels of the next panel showing. A
[coach mark](/coach-mark) shown once is second, and it is weaker than it looks, since it
is read at the moment the reader is least interested in learning and never seen again by
anyone who reinstalls or arrives later. Third, and the one that carries the most weight in
practice, is a duplicate path: the same action also available from a menu, a toolbar, or a
detail screen. The gesture then becomes what it should have been from the start, an
accelerator for people who already know, rather than the only door.

That third remedy is also the accessibility requirement, which settles the argument
whenever taste does not. A gesture with no equivalent control excludes everyone who cannot
perform it: a reader using switch access or voice control, a reader whose tremor turns
every swipe into a tap, a reader on a keyboard where a swipe does not exist as a concept.
WCAG says so directly, in 2.5.1 Pointer Gestures, which asks that anything needing a path
or several contacts also work with a single pointer, and in 2.5.7 Dragging Movements, which
asks the same of drags.
[Apple's own guidance](https://developer.apple.com/design/human-interface-guidelines/gestures)
draws the same line by reserving the standard gestures for their standard meanings and
treating custom ones as additions. So a hidden gesture is rarely a decision anyone defends
out loud. It is what is left when a control was cut for a cleaner screen and the gesture
behind it was never given anything to stand in its place.
