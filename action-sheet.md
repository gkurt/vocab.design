---
name: Action sheet
slug: action-sheet
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A modal list of choices that slides up from the bottom of a phone
  screen in response to something you just did, with cancel at the end.
aliases:
  - name: action sheets
    source: hig
  - name: bottom action menu
    source: community
  - name: option sheet
    source: community
tags:
  - menus
  - overlays
  - platform-registers
  - touch
relations:
  contrastWith:
    - drawer
    - context-menu
    - bottom-sheet
    - share-sheet
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: hig
    name: Action sheets
    url: https://developer.apple.com/design/human-interface-guidelines/action-sheets
sources:
  - title: "Apple Human Interface Guidelines: Action sheets"
    url: https://developer.apple.com/design/human-interface-guidelines/action-sheets
demo: inline
exhibit: false
useWhen: choices for an action you just started, on a phone
---

An action sheet is a menu that has been re-cut for a thumb. The choices arrive at the
bottom of the screen, where the hand already is, stacked as full width rows rather
than a floating list of small targets. Because it is modal, everything behind it is
inert until an answer is given, and because the answer is always available, the last
row is Cancel.

It is defined by what raised it. An action sheet is a response to something you just
did, usually a Share or a More button, and it lists the ways that one action could
go. That is the difference between it and a [drawer](/drawer), which is a place you
navigate to, and it is why the sheet carries no title in the common case: the button
you just pressed is the title. When the choices need explaining, or one of them
destroys something, the sheet grows a short message at the top and the destructive
row takes on ink of its own, at the top of the list on Apple's platforms and never
next to Cancel.

The vocabulary splits by platform, which is where reviews go wrong. Apple's
[human interface guidelines](https://developer.apple.com/design/human-interface-guidelines/action-sheets)
say action sheet; Material calls the same surface a bottom sheet and treats it as a
container that can hold anything, a list of actions being only one filling. Android
also has no Cancel row, since the system back gesture is the way out, so a sheet
ported straight across gains a button that duplicates the hardware. Say "a bottom
sheet of actions" when the audience is mixed.

On a wide screen the pattern stops making sense: a modal strip across the bottom of a
desktop window is far from the pointer and covers content for no reason. The same
choices become an anchored menu next to the control, which is why an interface that
runs on both usually keeps one list of commands and two presentations of it.
