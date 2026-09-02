---
name: Edge routing
slug: edge-routing
category: layout
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: "How a connector gets from one node to another: a bezier sweep, a
  right-angled staircase, or a straight line, picked so the crossings stay
  readable."
aliases:
  - name: connector routing
    source: community
  - name: edge type
    source: xyflow
  - name: orthogonal routing
    source: community
tags:
  - canvas
relations:
  contrastWith:
    - graph-layout
  variantOf: []
  partOf:
    - node-graph
  seeAlso:
    - flowchart
    - node-graph
    - node-port
implementations: []
sources:
  - title: "React Flow: edge types"
    url: https://reactflow.dev/examples/edges/edge-types
demo: inline
exhibit: false
useWhen: the path a connector takes between two nodes
---

Once two nodes are placed, something has to decide the shape of the line between them, and
there are only three answers in wide use. A bezier sweep leaves each port along the port's
own axis and curves to the other, which reads as a single gesture and makes fan-out from one
port legible because the curves separate immediately. An orthogonal route, the staircase,
travels in horizontal and vertical legs only, which is the one shape that can be sent around
whatever sits in the way and the one that looks correct on a diagram of racks, wires or
plumbing. A straight line is the shortest and the least readable, because it takes no account
of anything between its two ends.

The choice is a readability judgement rather than a matter of taste, and the thing being
judged is crossings. Every extra edge multiplies the chances that two lines meet somewhere
that is not a node, and a crossing is where a reader loses track of which line they were
following. Curves help, because two curves crossing at a shallow angle stay distinguishable
where two straight lines do not, and because a curve carries its own direction. Staircases
hurt in the general case, since two orthogonal routes that share a corridor overlap exactly
rather than crossing, and then they are one line as far as the eye is concerned. This is why
routing and placement have to be considered together: an arrangement that reduces crossings,
which is [graph layout](/graph-layout)'s job, is worth more than any routing applied to a bad
one.

The second problem every real graph hits is where the label goes. A connector with a name
("on error", "yes", 42 items) has an obvious answer for a straight line and no obvious answer
for a bend, because the midpoint of a staircase is frequently a corner, and a label parked in
a corner appears to belong to both legs and therefore to neither. The workable rule is to put
the label on the longest straight leg rather than at the middle of the path, to give it the
paper colour behind it so the line does not strike through the text, and to keep it out of the
last stretch before a port, where an arrowhead and a socket are already competing for
attention.

Two further techniques are worth knowing by name even though most tools do not offer them.
Obstacle avoidance routes an edge around intervening nodes instead of through them, which only
orthogonal routing does convincingly, and it is expensive because moving one node can require
rerouting many edges. Edge bundling gathers parallel runs into a shared trunk that splits near
its destinations, the same trick a transit map plays, which trades exact traceability for a
picture that can be taken in at all. Both are the answer to the same complaint, which is that
a graph past a certain density stops being readable no matter what shape its lines are, and at
that point the honest fix is to show fewer of them.
