---
name: Generative UI
slug: generative-ui
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An interface whose parts are chosen or composed by a model at
  runtime, so a request is answered with a built form, chart, or panel instead
  of a paragraph of text.
aliases:
  - name: GenUI
  - name: AI-native UI
    source: uistyleguide
  - name: AI-generated interface
  - name: agent-native UI
  - name: adaptive interface
tags:
  - ai
relations:
  contrastWith:
    - natural-language-interface
    - multimodal-interface
  variantOf: []
  partOf: []
  seeAlso:
    - prompt-input
implementations: []
sources:
  - title: "CopilotKit: Generative UI, understanding agent-powered interfaces"
    url: https://www.copilotkit.ai/generative-ui
  - title: "Builder.io: Designing generative UI in an agent-native world"
    url: https://www.builder.io/blog/designing-generative-ui-in-an-agent-native-world
  - title: "Eleken: Inside generative UI in 2026"
    url: https://www.eleken.co/blog-posts/generative-ui
demo: inline
exhibit: false
useWhen: the model assembles the screen, not just the words
---

Generative UI is what happens when the answer to a request is a built interface rather
than a block of prose. Ask about last month's spending and a panel comes back with the
figures in it and a control for changing the period. Ask to book something and a form
comes back with the fields already filled in. Two things have to be in place for that to
work: a catalogue of components the product already ships, and a model whose output
names one of them and supplies its data. The model is choosing and filling, not
inventing, which is why this reads as a pattern rather than as a rendering trick.

The catalogue is the part that gets skipped in demonstrations and matters most in
practice. When the model may only return a component name and a set of properties, every
answer inherits the design system's spacing, its colour roles, its keyboard behaviour,
and its accessible names, and a wrong answer is a wrong choice from a known set rather
than arbitrary markup arriving in the page. Free-form generated markup fails in all the
boring ways at once: it cannot be tested, it drifts from the rest of the product on
every request, and it is a live channel for whatever the model was talked into
generating. Bounding the generation is what makes the pattern shippable.

The tension the term carries, and the one worth saying out loud, is that an interface
generated per request cannot be learned. Interfaces get easier the second time because
they are in the same place: muscle memory, a screenshot in a support article, a
colleague saying "the button under the chart". A screen assembled fresh each time has
none of that, and it also has no stable target for a test, a bug report, or an
accessibility audit. The practical answer is to keep the arrangement predictable even
when the content is not: the same kind of question should produce the same kind of
panel, in the same region of the screen, with a way to keep what was built so it stops
being ephemeral.

Two neighbours are close enough to be worth separating. [Adaptive
layout](/adaptive-layout) also produces different screens for different situations, but
the rules were written at build time and merely evaluated at runtime, so the set of
outcomes is known and can be reviewed; here the choice is made per request by something
that will occasionally choose badly. [Progressive disclosure](/progressive-disclosure)
is about when to reveal parts of a fixed interface, not about which parts exist at all.
Whatever else it borrows, a generated panel still owes the reader the ordinary
courtesies: a state while it is being assembled, an honest one when the model got it
wrong, and enough of the underlying data on screen that the answer can be checked rather
than merely believed.
