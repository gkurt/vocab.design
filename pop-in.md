---
name: Pop in
slug: pop-in
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An entrance that scales slightly past full size before settling, so
  the element arrives with a small snap instead of simply being there.
aliases:
  - name: pop
    source: community
  - name: spring in
    source: community
  - name: bounce in
    source: community
  - name: scale in with overshoot
    source: community
tags: []
relations:
  contrastWith:
    - entrance-animation
    - bounce-animation
  variantOf: []
  partOf: []
  seeAlso:
    - squash-and-stretch
implementations: []
sources:
  - title: Animation Vocabulary
    url: https://animations.dev/vocabulary
  - title: The Vocabulary of Motion
    url: https://motion-vocabulary.vercel.app/
demo: inline
exhibit: false
useWhen: an arriving element should feel eager rather than merely present
---

A pop in is a scale entrance with a little too much in it. The element starts under its
final size, usually somewhere around 0.9, comes up quickly, goes a few percent past 1, and
settles back. Opacity comes up much faster than the scale does, so the element is fully
opaque long before it has finished sizing itself, which is what keeps the gesture reading as
one arrival rather than as a fade and a resize happening at once. The overshoot is small on
purpose. Four or five percent is a snap; fifteen is a cartoon.

Four neighbours divide this territory and it is worth being precise about which is which.
[Entrance animation](/entrance-animation) is the general category, arrival by any means, and
the CSS mechanism for the plain case is `@starting-style`. [Overshoot](/overshoot) is the
principle: passing the target value before returning to it, which applies to position and
colour and anything else, not only to scale. [Spring animation](/spring-animation) is the
physics that naturally produces this shape, since a spring with light damping overshoots
once or twice on its way to rest, and most pop ins are a spring curve either literally or
approximated by keyframes. [Bounce](/bounce-animation) is a repeated settle, several
decreasing rebounds off a surface, where a pop in is one snap and done. That last line is
the one people get wrong most often, and the way to hear it is that a bounce has a floor and
a pop in does not.

This entry is a merge candidate against all four, and the honest reason it keeps its own is
that "pop in" is what people ask for by name. A designer saying "make it pop in" is not
asking for an entrance animation in general, and is not asking for a spring solver either;
they are asking for this specific shape, and answering with a category word helps nobody.
The word is common enough in motion libraries and in design handoff that it deserves to
resolve to something.

Where it belongs is small things that arrive because the reader did something: a badge
appearing after a save, a reaction landing on a message, a chip added to a filter bar, an
avatar joining a call. Where it does not belong is anything large, anything that arrives
without being asked for, and anything that arrives many at a time, because a scale entrance
draws attention proportional to the area it sweeps, and a full-width panel popping in is a
flinch. Keep it under about 400 milliseconds, animate only `transform` and `opacity` so the
compositor can carry it, and let the element be usable from the moment it is legible rather
than from the end of the settle. Under `prefers-reduced-motion` the honest answer is not a
faster pop but no scale at all: the element is simply there.
