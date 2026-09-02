---
name: Escape gesture
slug: escape-gesture
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The screen reader equivalent of the Escape key, a two finger scrub
  that dismisses a sheet or steps back a level.
aliases:
  - name: accessibilityPerformEscape
    source: hig
  - name: two-finger scrub
    source: community
  - name: z-shaped gesture
    source: community
tags:
  - assistive-tech
  - touch
relations:
  contrastWith:
    - light-dismiss
    - explore-by-touch
    - magic-tap
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
useWhen: a custom sheet ignores the platform dismiss gesture
---

The escape gesture is a scrub: two fingers sweeping back and forth, which Apple's own
documentation describes as drawing a "z". It means what the Escape key means, dismiss this
and give me back what was underneath, and a screen reader user reaches for it constantly,
because a modal that cannot be dismissed without finding its close button is a modal that
has taken the screen hostage.

The failure the term is for is not a sheet that stays open. It is a sheet that lets the
gesture past. Something always answers a dismiss: if the overlay does not, the platform
does, and the platform's answer is to step back a level, which takes the sheet away and the
page behind it as well. The reader asked to close a filter panel and arrived at the previous
screen with their place gone. That is why it is worth saying that a custom overlay has to
answer for itself, and it is what the specimen above shows: the same scrub, once against a
sheet that handles it and once against a sheet that does not.

On the web you cannot handle it, and pretending otherwise is the trap. The scrub does not
emulate a keystroke, so nothing arrives as an Escape [keydown](/keyboard-shortcut); it does
not deliver its contacts to the document either, so there is no pointer sequence to listen
for. It is not detectable from a page at all. Reports of Safari behaving oddly here (the
gesture closing a widget and navigating back in one go) are the browser and VoiceOver
negotiating between themselves, with the page a bystander. In a native app the gesture is a
method you implement, `accessibilityPerformEscape`, returning true once you have dismissed
your own thing; on the web there is no equivalent to implement.

So the practical reading for anyone building in a browser is to stop reaching for the
gesture and get the semantics right instead, because the browser can only do the right
thing on your behalf if it knows what your overlay is. A native dialog element brings its
own dismissal, its own [focus trap](/focus-trap) and its own Escape handling; a `div` with
a shadow brings none of those, and no amount of gesture listening will fix it. Support the
real Escape key for keyboard readers, give every sheet a visible close control, and let the
platform's own dismissal work rather than competing with it. The sibling gesture,
[magic tap](/magic-tap), points the same lesson the other way: these shortcuts are contracts
with the platform, and the web's half of the contract is written in semantics rather than
handlers.
