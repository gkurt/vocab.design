---
name: Picture in picture
slug: picture-in-picture
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A small always on top window that keeps video or navigation visible
  in a corner while the reader works in another app or scrolls another page.
aliases:
  - name: PiP
    source: android
  - name: mini player
    source: community
  - name: floating player
    source: community
tags:
  - media
  - overlays
  - windowing
relations:
  contrastWith:
    - video-player
  variantOf: []
  partOf: []
  seeAlso:
    - multi-window-mode
implementations: []
sources:
  - title: Use picture-in-picture (PiP), Android Developers
    url: https://developer.android.com/develop/ui/views/picture-in-picture
demo: inline
exhibit: false
useWhen: keeping video visible while doing something else
---

The name comes from television sets that could inset a second channel into a corner of the
first, and the idea survived intact: one thing you are watching, one thing you are doing, and
the watched thing shrinks into a corner rather than being closed. Every platform now has a
version. Android puts an activity into a small always-on-top window, iOS and macOS float a
video over other apps, and video calls, turn-by-turn navigation, and live sport are the
places it earns its keep, because all three are worth glancing at and none is worth staring
at.

On the web there are three different things wearing this name and it is worth separating
them. The **Picture-in-Picture API** takes a `<video>` element and asks the browser for an
operating-system-level floating window with it inside:
`video.requestPictureInPicture()`, with the browser drawing the window's chrome, so you get
almost no control over what is in it. The **Document Picture-in-Picture API** is newer and
much broader, since `documentPictureInPicture.requestWindow()` gives you an always-on-top
window you can put arbitrary DOM into, which is how a custom player keeps its own controls,
captions, and playlist rather than surrendering to the browser's two buttons. And then there
is the **in-page mini player**, which is not an API at all: a video that shrinks into the
corner of its own page when scrolled past, still an ordinary element in an ordinary document,
and which cannot outlive the tab it lives in.

The last one is the one most people build and the one most people complain about, because it
usually arrives uninvited. The rules that make it tolerable are short. It must be closable,
and the close control must be reachable without hunting. Closing it must be remembered, at
least for the session, so the reader is not fighting the same box on every article. It must
not cover the content it is floating over, which in practice means a corner and a modest
size. And it should leave a reserved slot behind where the inline player was, so returning to
that part of the page does not find a hole. A mini player that appears on scroll is close
kin to a [sticky header](/sticky-header) in mechanism and to a
[cookie consent banner](/cookie-consent-banner) in reputation.

Two details separate a good implementation from an irritating one. The video must not restart
when it moves, which means moving the element or handing off its current time rather than
creating a second one. And the transport controls have to come along: a floating player with
no [scrubber](/scrubber) or volume is a video you can only watch, which is fine for
navigation and wrong for anything you might want to skip back in.
