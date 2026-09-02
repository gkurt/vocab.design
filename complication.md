---
name: Complication
slug: complication
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A slot on a watch face filled with one live figure from an app,
  sized to be read in the second a wrist is raised.
aliases:
  - name: accessory
    source: hig
  - name: watch face widget
    source: community
tags:
  - platform-registers
  - time
relations:
  contrastWith:
    - widget
    - stat
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: hig
    name: Complications
    url: https://developer.apple.com/design/human-interface-guidelines/complications
sources:
  - title: "Apple HIG: Complications"
    url: https://developer.apple.com/design/human-interface-guidelines/complications
demo: inline
exhibit: false
useWhen: one number has to survive being glanced at on a watch
---

The word is borrowed from watchmaking, where a complication is any mechanism in a watch that
does something other than tell the time: a date window, a moon phase, a chronograph. Digital
watch faces kept the word for the same idea. A complication is a slot the face defines, an app
fills it with one live figure, and the whole exchange is designed around a glance of about two
seconds. That budget is the design constraint. Whatever cannot be read in a raised wrist is not
a complication, it is a screen you have to open.

The contrast worth being precise about is with the [widget](/widget). A widget owns its own
rectangle on a home screen, chooses from a set of sizes, and lays out whatever it likes inside
that box. A complication fills a slot the face already defined, at the size the face grants it,
in the form the face allows: a ring here, a corner arc there, a line of text somewhere else.
The app does not get to negotiate. It supplies the same figure in every form the platform
offers and the face picks one, which is why a well built complication is authored as a family
of forms rather than as a single small view.

Because the slot can be tiny, the discipline is aggressive subtraction. One value, one unit,
and a label only if the slot has room for one, since a ring that reads 68 percent needs no word
next to it. When the slot shrinks past the point where the number fits, the honest move is to
drop to a form that still says something true (an arc at 68 percent, an icon plus a colour)
rather than truncating the value into a lie. This is [readability](/readability) at its most
literal: a small figure at arm's length on a moving wrist, often outdoors, is the hardest
reading condition any interface faces, which is why complications lean on high contrast, large
numerals, and tabular figures that do not shuffle as the value changes.

There is a version of [the fold](/the-fold) here too. A watch face is the whole viewport and
there is nothing below it, so a complication is not a preview of something longer, it is the
answer or it is nothing. Tapping it opens the app, and that tap is the only affordance, so the
figure has to be worth the slot on its own. Choosing what deserves one is the real work: a
number that changes rarely wastes a slot, and a number nobody acts on wastes the glance.
