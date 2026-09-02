---
name: Interest invoker
slug: interest-invoker
category: pattern
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: A link or button that shows more when a reader shows interest in it,
  by hovering, focusing or long pressing, with no click and no script deciding
  what interest means.
aliases:
  - name: interestfor
    source: open-ui
  - name: interesttarget
    source: open-ui
  - name: interest target
    source: open-ui
  - name: hover card trigger
    source: community
tags:
  - overlays
  - pointer
  - web-platform
relations:
  contrastWith:
    - hover-intent
    - invoker-command
  variantOf: []
  partOf: []
  seeAlso:
    - hover-card
    - tooltip
implementations: []
sources:
  - title: "Open UI: interest invokers explainer"
    url: https://open-ui.org/components/interest-invokers.explainer/
demo: inline
exhibit: false
useWhen: showing more on interest rather than on a click
---

An interest invoker is a link or a button carrying `interestfor`, which names a popover to
show when the reader shows interest in the control and to hide again when they lose it. It is
the counterpart of the click half of the same vocabulary, the
[invoker command](/invoker-command), and the same rule holds: the relationship is stated in
markup, so the control works before any script has loaded. Status first, because the
attribute reads as shippable and is not: this is an Open UI explainer with a pull request
open against the HTML specification and an early implementation behind a flag. Design with
it, and ship the pattern by hand until it lands.

The attribute is the least interesting part. What is worth a designer's attention is that the
platform is defining what interest MEANS, per input, which is a problem this vocabulary
already has a word for. [Hover intent](/hover-intent) exists because a pointer merely
crossing a target is a false positive, and every design system that has ever shipped a
[hover card](/hover-card) wrote its own delay, guessed at its length, and got it subtly
different from the one next to it. Interest invokers put that number in CSS, as
`interest-delay-start` and `interest-delay-end`, defaulting to half a second each, so the
delay becomes a property a designer sets rather than a timer an engineer buries. The events,
`interest` and `loseinterest`, fire on the target rather than the trigger, which is the same
inversion the command half makes.

The half worth reading twice is touch, because it is the half designers keep getting wrong.
A finger cannot hover, so a tooltip wired to `pointerenter` is a tooltip no phone can open,
and shipping one means the extra information exists for mouse users only. The platform's
answer on a touchscreen is a long press, offered through the context menu, with an opt-in
`::interest-button` pseudo-element for authors who would rather draw an explicit affordance
next to the link. A keyboard shows interest by focusing, with the same delay, and Escape
always gives it up. Read that as a checklist for anything you build in the meantime: three
inputs, three ways in, one way out.

Two fences. This term is the trigger contract, not the surface: what appears is a
[tooltip](/tooltip), a [hover card](/hover-card) or some other popover, and those words
describe the content and its behaviour once it is up. And interest is not activation. A
control that reveals on interest still has to do something when it is actually clicked, which
in practice means a link that goes somewhere useful, because a reader who commits to a
control expecting the preview to be the whole of it has been misled by the design and not by
the attribute.
