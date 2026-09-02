---
name: Rage click
slug: rage-click
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A burst of repeated clicks on one spot, the shape frustration takes
  when a control answers nothing, and the analytics signal that goes looking for
  it.
aliases:
  - name: rage clicking
    source: community
  - name: rage tap
    source: community
  - name: frustration click
    source: community
tags:
  - errors
  - pointer
relations:
  contrastWith:
    - ghost-click
    - dead-zone
  variantOf: []
  partOf: []
  seeAlso:
    - microinteraction
    - optimistic-ui
implementations: []
sources:
  - title: "Fullstory: What are rage clicks?"
    url: https://www.fullstory.com/blog/rage-clicks/
  - title: "Smashing Magazine: Accessible Target Sizes Cheatsheet"
    url: https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/
demo: inline
exhibit: false
useWhen: the repeated clicking that reports a dead control
---

A rage click is a burst: three or five or ten presses landing inside the same small area
within a second or two, with the pointer barely moving between them. Nobody clicks like
that on purpose. It is what a hand does when the interface has stopped answering, and the
reason the behaviour has a name at all is that session recording tools can see it.
Fullstory trademarked Rage Clicks and the phrase spread from there; Hotjar, Microsoft
Clarity and Pendo all ship a version of the same detector. What none of them agree on is
the number. Fullstory publishes no threshold, only that the clicks are logged when someone
clicks "multiple times rapidly in the same area", and every vendor tunes its own count and
its own window. A rage click figure is therefore a reading from one instrument rather than
a fact about your readers, which is why the specimen above prints its own rule in the
caption instead of borrowing anyone else's.

The word names an observed behaviour, not a defect, and that is the distinction its
neighbours keep collapsing. A [ghost click](/ghost-click) is a cause: the browser delivers
a synthesized click to whatever moved under the finger, the control the reader aimed at
never fires, and they press again. A [dead zone](/dead-zone) is a cause too, and a
deliberate one, since input inside the band is thrown away by design, so a reader nudging
a stick or dragging a hair's width gets nothing back and leans harder. Rage clicking is
what causes like those look like from the outside, measured at the pointer. Treating the
burst as the problem is like treating the fever as the illness.

Most bursts are not produced by anything exotic. They are produced by silence. A control
that takes a second to answer and says nothing in the meantime will be pressed again,
which is what a [spinner](/spinner) and a [busy state](/busy-state) are for; a control
whose result only appears once the server has replied will be pressed again, which is what
[optimistic UI](/optimistic-ui) is for. A [pressed state](/pressed-state) alone retires a
surprising share of them, because the second press is usually a question about whether the
first one registered. The remainder come from things that look pressable and are not: text
styled enough like a link to be worth trying, a [ghost button](/ghost-button) nobody read
as a button, a decorative card that is not a target, a transparent overlay parked over the
thing the reader wants. And some bursts are nobody's fault at all, because a reader who
[double-clicks](/double-click) everything is doing what a desktop taught them rather than
losing their temper.

So the signal is a coordinate and a session, never a ticket. It tells you where to look
and it is worth ranking by how many sessions reach the same spot, but the fix is always
found by watching what the control did, not by counting presses harder. In the vocabulary
of the [microinteraction](/microinteraction), a rage click is one of those loops seen from
outside with its feedback missing: the trigger fired, the rules ran or did not, nothing
came back, and the reader supplied the only input still available to them.
