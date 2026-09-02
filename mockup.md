---
name: Mockup
slug: mockup
category: pattern
status: published
created: 2026-08-28T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: "A screen shown as it will look rather than as it will work: colour,
  type and real copy all settled, and nothing in it clickable."
aliases:
  - name: mock-up
    source: community
  - name: mock UI
    source: community
  - name: high-fidelity mockup
    source: nngroup
  - name: hi-fi mockup
    source: community
  - name: visual comp
    source: community
tags:
  - design-tools
relations:
  contrastWith:
    - wireframe
    - prototype
  variantOf: []
  partOf: []
  seeAlso:
    - accessibility-annotation
implementations: []
sources:
  - title: "NN/g: UX Prototypes, Low Fidelity vs. High Fidelity"
    url: https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/
  - title: "NN/g: Prototypes vs Wireframes in UX Projects"
    url: https://www.nngroup.com/videos/prototypes-vs-wireframes-ux-projects/
demo: inline
exhibit: false
useWhen: showing what a screen will look like before anything behind it exists
---

A mockup answers one question completely and another one not at all. It says what the
screen will look like: which typeface, which weights, which greys, how much air between
the price and the button, what the photograph is of. It says nothing about what the
screen will do, because nothing in it does anything. That division of labour is the
whole value of the artifact. Colour and type are decisions somebody has to make and sign
off, they are cheap to make in a drawing and expensive to make in code, and a picture is
the fastest way to get them all in front of the people who have opinions about them.

What makes a mockup deceptively persuasive is that it is made under conditions no reader
will ever meet. Every name in it is short, because the person who typed the names chose
them. Every list has three items, because three looked balanced. Nothing is loading,
nothing has failed, nothing is empty, and the type is at the size the author set it at.
A [placeholder as label](/placeholder-as-label) looks tidier in a mockup precisely
because every field in the picture is empty. An icon-only
[bottom navigation](/bottom-navigation) reads as clean there because the author knows
what the icons mean. And [Material 3 Expressive](/material-3-expressive) makes the point
from the other side: a reader who has raised their font size past what the mockup
assumed gets a layout nobody drew.

So the honest reading of a mockup is a claim about its best case, and the questions worth
asking of one are all about the cases it left out. What does this row do with a name
three times that long? What is here on the first run, before the reader has saved
anything? Where does the error go? A design that has answered those has more pictures
than one, or a set of rules alongside the picture, and the properties that cannot be
drawn at all get written down beside it: heading level, focus order, accessible name.
That is what an [accessibility annotation](/accessibility-annotation) is for, and its
existence is an admission about this format, not about accessibility.

The word sits between two others. A [wireframe](/wireframe) is the same kind of still
picture at a deliberately lower fidelity, so the two differ by how much has been decided
rather than by what they can do. A [prototype](/prototype) is the one that answers a
click, which is a difference in kind: no amount of finish turns a picture into a flow.
Adding finish is also the one direction this artifact drifts. A mockup grows until
somebody mistakes it for a specification, and then a piece of behaviour nobody ever
designed gets invented in a ticket, because the drawing had already been approved and
the drawing did not cover it.
