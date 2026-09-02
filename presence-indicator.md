---
name: Presence indicator
slug: presence-indicator
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The small coloured dot on an avatar reporting whether a person is
  available, away, busy or offline.
aliases:
  - name: status dot
    source: community
  - name: online indicator
    source: community
  - name: presence badge
    source: fluent
  - name: activity status
    source: community
tags:
  - messaging
relations:
  contrastWith:
    - badge
  variantOf: []
  partOf: []
  seeAlso:
    - avatar
    - read-receipt
    - pulse-animation
    - avatar-group
implementations: []
sources:
  - title: Fluent 2 web components
    url: https://fluent2.microsoft.design/components/web/react
demo: inline
exhibit: false
useWhen: the green dot on someone's picture
---

A presence indicator is a badge parked on the corner of an [avatar](/avatar), usually
about a third of its width, ringed in the surface colour so it stays legible over a
photograph of anything. It carries one of a small set of states, and the states are the
whole design: available, away, busy, offline, and sometimes out of office. Good
implementations give each state a shape as well as a colour, a filled disc against a
hollow ring against a dash, because the two most common states are green and red and
those are exactly the pair a red-green colour blind reader cannot separate.

What makes the dot harder than it looks is that it is a promise about right now. Every
other badge on a screen describes something stored; this one claims a fact about the
present moment, and the moment keeps moving. Behind it sits a heartbeat, a timeout that
demotes someone to away when the input stops, a rule about what a backgrounded tab
means, and a disconnect path for the browser that was closed without saying goodbye. Get
those wrong and the dot lies, which is more expensive than it sounds: a green dot that
means nothing quietly discredits everything else the product says about other people. If
the connection cannot be trusted, a written "last seen 20 minutes ago" is the honest
fallback, and it is often the more useful line anyway.

Two different ideas usually share the same dot, and naming them separately is what makes
the design tractable. Availability is derived: the system infers it from activity and
the person never touches it. Status is declared: someone chooses do not disturb, or in a
meeting, or on leave, and expects that choice to be respected. Most systems draw the
declared status over the derived one, since a person who says they are busy is busy even
while typing. Its sibling signal is the [typing indicator](/typing-indicator), which is
about a specific message on its way rather than a standing state, and which expires in
seconds where presence persists for hours.

The same promise takes other drawings. In a collaborative document, presence is a
coloured caret with a name flag riding beside it, plus a stacked row of faces in the
corner reporting who has the file open, and the caret is far more informative than any
dot because it says where the person is as well as that they are here. Whatever the
shape, the text duty is the same. The dot belongs in the accessible name of the thing it
sits on, so a screen reader hears "Rae O., online" rather than a picture and a decoration
it has no way to describe.
