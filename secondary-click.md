---
name: Secondary click
slug: secondary-click
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The alternate pointer press, usually the right button or a
  two-finger tap, reserved for opening contextual actions rather than
  activating.
aliases:
  - name: right click
    source: community
  - name: context click
    source: community
  - name: two-finger click
    source: hig
  - name: control-click
    source: hig
tags:
  - menus
  - pointer
relations:
  contrastWith:
    - context-menu
    - double-click
    - middle-click
    - tap
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: Pointer events"
    url: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
demo: inline
exhibit: false
useWhen: the press that asks for options instead of acting
---

Everybody says right click, and the word is wrong often enough to matter. Every desktop
system lets the buttons be swapped, which left-handed people frequently do, so the right
button is not reliably the secondary one. On a trackpad the same press is a two-finger
tap, on Apple hardware it is also Control and a click, and on a one-button mouse it was
only ever the modifier. The vocabulary that survives all of that is primary and secondary:
the primary press acts, the secondary press asks. Naming it by function rather than by
hardware is also the only way to write the sentence that follows, which is that the
secondary press has one job.

That job is to reveal what could be done to the thing under the pointer, and never to do
any of it. A secondary press that deletes, opens, or submits anything at the moment of the
press is a bug, because the whole convention rests on it being safe to press and read.
It is a shortcut for people who know it is there, which means it can never be the only way
to reach a command: the same actions need a visible affordance, usually a kebab or
meatball menu on the row, or the interface has hidden a feature behind knowledge that most
of its users do not have. Touch screens have no second button at all. The nearest gesture
is a long press, which is a different term with different timing problems, and it is worth
deciding deliberately rather than assuming the desktop behaviour carried over.

On the web, listen for `contextmenu` rather than for a pointer event with `button === 2`.
The two are not equivalent: `contextmenu` also fires from the keyboard, from the Menu key
and from Shift and F10, which is the accessible route to the same actions and the one most
custom implementations forget. Calling `preventDefault()` on it replaces the browser's own
menu, and that is a real cost to weigh rather than a formality, since the reader loses
open in new tab, copy, spellcheck, translation, and their extensions in one go. Replace it
only over the specific elements that genuinely have contextual actions, and leave plain
text, images, and links alone.

Two details make a custom menu feel native. Select the target of the press before the menu
appears, so the scope of what is about to happen is visible, but do not clear an existing
multiple selection if the press landed inside it, because a right click on one of five
selected files is a question about all five. And place the menu at the pointer, then pull
it back inside the viewport rather than let it be clipped, which is the difference between
a menu that appears where the reader is looking and one that opens off the edge of the
screen.
