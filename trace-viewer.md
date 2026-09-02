---
name: Trace viewer
slug: trace-viewer
category: component
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The view that lays a request's spans on one time axis, each nested
  under the span that called it, so the bar that is too long or starts too late
  is the finding.
aliases:
  - name: trace view
    source: community
  - name: span waterfall
    source: community
  - name: waterfall view
    source: community
  - name: trace timeline
    source: community
  - name: distributed trace view
    source: community
tags:
  - devtools
  - time
relations:
  contrastWith:
    - timeline
    - treegrid
    - flame-graph
    - gantt-chart
  variantOf: []
  partOf: []
  seeAlso:
    - minimap
implementations: []
sources:
  - title: "OpenTelemetry: Traces"
    url: https://opentelemetry.io/docs/concepts/signals/traces/
  - title: "Jaeger: Frontend/UI configuration"
    url: https://www.jaegertracing.io/docs/latest/frontend-ui/
demo: inline
exhibit: false
useWhen: reading where one request spent its time, span by span
---

A trace is one request's journey through a system, and a span is one named piece of
work inside it, with a start time, a duration, and a parent. That vocabulary is
[OpenTelemetry's](https://opentelemetry.io/docs/concepts/signals/traces/), and the
trace viewer is the component that draws it: every span becomes a bar whose left edge
is when it started and whose width is how long it took, all of them measured against a
single axis running from the first millisecond of the request to the last. The bars are
stacked in one column and indented by parent, so the picture carries two facts at once,
who called whom going down and when it happened going across.

Reading one is mostly reading proportions. The root bar spans the whole width by
definition, so it is never the answer, and the eye is looking for a child that takes an
unreasonable share of it. Colour is by service rather than by status, because the
question a trace answers is usually which system is slow rather than which call failed,
and a run of same-coloured bars is how a reader sees that one service was talked to
eleven times. The other finding is the one with no bar at all. Empty horizontal space
between the end of one span and the start of the next is time the request spent inside
its parent doing something nobody instrumented, and a wide gap is far more often the bug
than the long bar beside it, because a long bar at least names what it was doing.

Real traces are bigger than the screen. A few hundred spans is ordinary and a few
thousand is not rare, which is why a trace viewer that is more than a demonstration
grows the same set of controls: subtrees that collapse to a single summary bar, a filter
by service or by minimum duration, and a minimap of the whole trace above the scrollable
part so the reader keeps a sense of where in the request they are looking. Selecting a
span opens its detail beside or below the waterfall, where the attributes live, and that
panel is what turns a shape into an explanation: the route, the SQL statement, the
status code, the retry count. The horizontal direction is the discipline the whole
view rests on: every position along it is a moment, so a bar's left edge states when
that work began and its length states how long it took, neither of them a layout
decision anyone is free to make.

Two neighbouring pictures use the same data and answer different questions. A flame
graph aggregates many samples or many traces by how much time was spent in each stack,
so its width means total cost and its horizontal order means nothing; a flame chart
keeps chronological order but still stacks by depth rather than listing spans as rows.
A trace viewer is deliberately the literal one: one request, in order, one row per span.
Reach for it when the question is where this particular request went, and for an
aggregate view when the question is where the service spends its time in general.
