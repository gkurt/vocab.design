---
name: Multi-window mode
slug: multi-window-mode
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A windowing mode where two or more apps share one screen, side by
  side, stacked, or as freeform windows, so every app must survive being any
  size.
aliases:
  - name: split-screen mode
    source: android
  - name: freeform windowing
    source: android
  - name: desktop windowing
    source: android
  - name: multitasking layout
    source: community
tags:
  - platform-registers
  - windowing
relations:
  contrastWith:
    - spanned-layout
    - split-view
  variantOf: []
  partOf: []
  seeAlso:
    - picture-in-picture
implementations: []
sources:
  - title: Support multi-window mode, Android Developers
    url: https://developer.android.com/develop/adaptive-apps/guides/support-multi-window-mode
demo: inline
exhibit: false
useWhen: the app is only part of the screen
---

Multi-window mode is the platform handing an app less than the whole screen. On Android that
covers split screen, where two apps sit either side of a divider the person can drag; freeform
and desktop windowing, where apps float in resizable windows; and picture in picture, where a
small window stays on top of whatever is underneath. The design consequence is blunt: the app no
longer decides how much room it has, and it can be resized while it is running, repeatedly, by
someone dragging a divider. Anything that read the screen size once at launch and built a layout
from it is wrong the moment the divider moves.

This is the honest answer to why a [window size class](/window-size-class) is measured on the
window and never on the device: splitting the screen is exactly how an app lands in a smaller
size class without the hardware changing at all, so a tablet in split screen hands each app a
compact window and each app should behave like it. Treating size classes as device categories,
phone and tablet, breaks here first and most visibly, usually as a two pane layout crushed into
half a screen. The related boundary is the hardware one: a
[device posture](/device-posture) is the shape the hardware is currently in, while multi-window
mode is the software's division of whatever shape that is, and the two combine, since a foldable
in book posture can also be running two apps.

Practically, this is what makes [adaptive layout](/adaptive-layout) a continuous obligation
rather than a set of device targets. Reflow on every size change, not on rotation alone, and
make the arrangement a function of the current width rather than a branch taken once. Where a
detail view sits beside a list, a [supporting pane](/supporting-pane) is the first thing to fold
away when the window narrows, because it is the part whose absence costs the least. Keep the
navigation reachable at every width, and let a pane collapse rather than compress past
usefulness: a three column layout squeezed into a third of a tablet is worse than the one column
version of itself.

Two smaller things are easy to get wrong. State has to survive being resized, which on Android
means surviving configuration changes, so a form half filled in must still be half filled in
after the divider moves. And an app in multi-window mode may be visible without being the one
being used, so pausing playback or stopping updates just because focus went elsewhere makes a
video that keeps playing beside a chat window stop for no reason the person can see.
