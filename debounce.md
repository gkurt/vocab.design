---
name: Debounce
slug: debounce
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Waiting until input has stopped for a set moment before reacting, so
  a burst of keystrokes or clicks produces one response instead of many.
aliases:
  - name: debouncing
    source: community
  - name: input settling
    source: community
  - name: trailing delay
    source: community
tags:
  - perceived-performance
relations:
  contrastWith:
    - throttle
  variantOf: []
  partOf: []
  seeAlso:
    - typeahead
implementations: []
sources:
  - title: "NN/g: Timing guidelines for exposing hidden content"
    url: https://www.nngroup.com/articles/timing-exposing-content/
demo: inline
exhibit: false
useWhen: waiting for input to settle before responding
---

A person typing a search term produces one intention and a dozen events. Debouncing
throws away the intermediate ones by refusing to act until the input has been quiet for
a set interval: every new keystroke cancels the pending reaction and starts the wait
again, so the handler runs once, on the last value, after the burst ends. The name comes
from the switch, where a mechanical contact bounces several times before it settles and
the circuit is made to wait it out.

There are two edges and they behave differently. The trailing edge is what most people
mean: wait for silence, then act, which is right for anything driven by the final value
(a typeahead query, a save of a text field, work that should follow a window resize).
The leading edge acts on the first event and ignores the rest of the burst, which is
what you want for a command that must feel instant and must not run twice, such as a
button that fires on the way down and then declines to fire again for a moment.

The delay is a real cost, paid on every interaction, not a free optimisation. Too short
and the burst is not absorbed. Too long and the interface feels like it is thinking
about something else: NN/g's guidance on timing puts the threshold where a delay stops
being perceived as a response at a few hundred milliseconds, and a search suggestion
list past roughly half a second reads as broken rather than as considerate. Around 200
to 300 milliseconds is the usual compromise for a query, and it should always be
possible to skip the wait by submitting, since pressing Enter is a statement that the
input is finished.

Debounce and throttle are often named together and solve opposite problems. Debounce
waits for a gap and makes no promise about when it will run, which means an input that
never goes quiet is never answered at all. Throttle promises a steady cadence and makes
no promise about the final value. Pick debounce when the input arrives in bursts with an
end to wait for, and throttle when it is continuous. Two details save most of the bugs:
flush the pending call when the field loses focus or the form is submitted, and cancel
it when whatever owns the handler goes away, or a stale reaction will arrive after the
thing it was meant for has gone.
