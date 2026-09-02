---
name: Confirmshaming
slug: confirmshaming
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: Wording the decline option so that choosing it is an admission of
  something embarrassing, making refusal feel like a confession rather than a
  choice.
aliases:
  - name: shame decline
    source: community
  - name: guilt opt-out
    source: community
  - name: no thanks, I hate saving money
    source: community
tags:
  - consent
  - content-design
relations:
  contrastWith:
    - misdirection
    - trick-wording
    - unsubscribe-link
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Deceptive Design: Confirmshaming"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: the no button is written to make you feel bad
---

Confirmshaming lives entirely in the copy of the negative option. The offer is
ordinary, the accept button says what it does, and then the way out reads "No thanks,
I like paying full price", or "I don't want to save money", or "I prefer to stay
uninformed". The reader is not blocked, misled, or charged anything. They are simply
handed a sentence about themselves and asked to sign it in order to leave. The trick is
in the grammar as much as the sentiment: the decline is written in the first person, so
clicking it is not choosing an option but making a statement.

It belongs to the deceptive design taxonomy that Harry Brignull began cataloguing in
2010, where it sits as one named type under the [dark pattern](/dark-pattern) umbrella,
alongside the roach motel, drip pricing, and preselection. The name itself came from a
blog that collected screenshots of the wording, and it stuck because it describes the
mechanism exactly rather than the feeling. That precision is the point of the
vocabulary: "this modal is manipulative" is an opinion, and "the decline is
confirmshaming" is a finding a team can act on in one edit.

The reason it works is that it moves the cost of saying no from the practical to the
emotional. Declining an offer normally costs a click; declining this one costs a click
plus a small unpleasant thought about yourself, and loss framing makes the thought
sharper, since the copy is careful to name what the reader is giving up rather than
what they are refusing to take. It does lift opt-in rates, which is why it spread, and
the lift is paid for out of the only account the interface cannot see: how the reader
feels about the brand once the modal is gone. It also reads as contempt the moment
anyone screenshots it, which is how these examples travel.

Regulators now read the wording too. The US Federal Trade Commission's 2022 staff
report on dark patterns treats emotionally manipulative decline copy as part of the
practice it is scrutinising, and in the EU the Digital Services Act prohibits designs
that distort a person's ability to make a free choice, which is precisely what a
decline written as a confession is for. The fix is not expensive. Write the negative
option as a plain description of what it does, keep it in the second person or in no
person at all, give it the same visual weight as the accept, and let the offer persuade
on its own terms. A reader who declines politely and remembers you kindly is worth more
than one who was shamed into an email list.
