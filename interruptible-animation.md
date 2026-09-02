---
name: Interruptible animation
slug: interruptible-animation
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Motion that can be caught, reversed, or redirected mid-flight from
  its current value, instead of finishing before it will accept a new input.
aliases:
  - name: interruptible transition
    source: hig
  - name: reversible animation
    source: community
  - name: catchable animation
    source: community
  - name: velocity handoff
    source: community
  - name: velocity
    source: community
tags: []
relations:
  contrastWith:
    - spring-animation
    - additive-animation
    - interactive-transition
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: hig
    name: Motion
    url: https://developer.apple.com/design/human-interface-guidelines/motion
sources:
  - title: "Apple HIG: Motion"
    url: https://developer.apple.com/design/human-interface-guidelines/motion
demo: inline
exhibit: false
useWhen: a reader may act again before the motion finishes
---

An animation is a promise about where something will be in half a second. An interruptible
one lets the reader change that promise while it is still being kept. Tap open, change your
mind, tap closed, and the sheet turns around from wherever it had reached instead of
insisting on arriving first. What makes this feel right is that the new move starts from the
current value rather than from the value the old move was aiming at, so there is no jump and
no queue: one continuous object that changed its mind, which is exactly what a physical
thing under your hand would do.

The alternative is a lockout, and it is easy to ship by accident. A control that ignores
input while its animation runs, or that stacks the ignored presses and replays them
afterwards, has quietly decided that the motion outranks the person. Half a second is a long
time to a reader who already knows what they want, and every dropped or queued press teaches
them that the interface is not listening. The rule underneath is simple: the reader outranks
the animation. If an input arrives mid-flight, the current position is the new starting
point.

Most of this is free on the web, and it is worth knowing why. A CSS transition retargets
natively: write a new value while the old transition is running and the browser starts a
fresh one from the currently computed value, so a redirected slide is already smooth without
any code that knows about interruption. What CSS does not carry across the seam is velocity.
The new transition begins at rest, so a fast-moving element stops dead for an instant before
setting off again. That is the gap a spring fills. A spring animation is defined by a
position and a velocity rather than by a duration and a curve, so handing the current speed
into the new spring is the natural spelling of an interruption, and it is why gesture-driven
interfaces reach for springs rather than for [easing](/easing) curves.

Three habits keep the promise. Model state rather than steps, so the animation is always
running toward the current state instead of playing a scripted move that must finish to be
correct. Never freeze input for the duration of a transition, including the pointer events
of the thing that is moving. And check the reversal specifically, since it is the case the
lockout hides: open then immediately close, drag then release backwards, expand then collapse
before the row has finished growing. Under a stated
[prefers-reduced-motion](/prefers-reduced-motion) the whole problem simplifies, because a
move with no duration has nothing to interrupt.
