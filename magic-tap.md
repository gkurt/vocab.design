---
name: Magic tap
slug: magic-tap
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A screen reader gesture that fires the one action a screen is most
  likely about, so the reader does not have to hunt for the control.
aliases:
  - name: accessibilityPerformMagicTap
    source: hig
  - name: two-finger double tap
    source: community
  - name: most intended action
    source: community
tags:
  - assistive-tech
  - touch
relations:
  contrastWith:
    - escape-gesture
    - explore-by-touch
  variantOf: []
  partOf: []
  seeAlso:
    - multi-touch
implementations: []
sources:
  - title: "Apple: Supporting Accessibility (View Controller Programming Guide)"
    url: https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/SupportingAccessibility.html
demo: inline
exhibit: false
useWhen: a screen has one obvious action worth a shortcut
---

A magic tap is a two-finger double tap that means "do the obvious thing here". On a call
screen it answers, and once connected it hangs up. On a player it plays, and once playing
it pauses. The reader does not move to a control first, because the gesture is not aimed
at anything: it is aimed at the screen, and the screen decides what it means. That is the
whole design problem the term names, and it is a harder one than it looks, because a
screen with two equally plausible actions has no magic tap worth wiring.

The gesture belongs to a small family of screen reader shortcuts that skip navigation
rather than assist it. Ordinary [screen reader](/screen-reader) use is a walk: move to a
thing, hear it, act on it. A magic tap collapses that walk for the one action worth
collapsing, which is why it pairs naturally with the [escape gesture](/escape-gesture),
the same idea pointed the other way, at leaving rather than acting. Both are what Apple
calls performing an accessibility action, and in a native app both arrive as a method you
implement: `accessibilityPerformMagicTap` on the responder chain, which means any object
from the focused view up to the app delegate can claim it.

On the web, none of that is available, and the honest thing to say is that a page cannot
hear this gesture at all. VoiceOver consumes the two-finger double tap itself and does not
hand the contacts to the document, so there is no event to listen for and nothing to
attach a handler to. `dblclick` does not fire under VoiceOver either. The specimen above
portrays the gesture the way this site portrays any touch input, as the contacts it is
made of, so the shape of the interaction is visible; but a page that wants the behaviour
cannot subscribe to it, and a page that fakes it with a two-finger listener will be
answering fingers VoiceOver never delivers.

What survives the translation is the design question, and it is worth asking even where
the gesture does not exist. If a screen has one action that is obviously the point, the
reader should be able to reach it without traversing everything else, which on the web
means a real first stop: a [skip link](/skip-link), a sensible
[focus order](/focus-order) that puts the point near the front, or a
[keyboard shortcut](/keyboard-shortcut) that does the same job with a key. The magic tap
is a native answer to a question every interface has.
