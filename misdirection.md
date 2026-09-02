---
name: Misdirection
slug: misdirection
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Using contrast, size, and position to pull attention to the option
  the business prefers while the other option is present but visually demoted.
aliases:
  - name: visual interference
    source: deceptive-design
  - name: false hierarchy
    source: community
  - name: attention misdirection
    source: community
  - name: greyed-out decline
    source: community
tags:
  - perception
relations:
  contrastWith:
    - trick-wording
    - confirmshaming
    - disguised-ad
    - fine-print
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Deceptive Design: Visual interference"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: the choice you want is there but styled to be missed
---

The word is borrowed from stage magic, where misdirection is not hiding a thing but
sending the audience's attention somewhere else while it happens in plain sight. The
interface version works identically. Both options are on the screen, both are legible,
both are clickable, and a screenshot would satisfy a compliance reviewer. One of them is
a filled button with a glow, forty pixels tall, sitting where the eye finishes reading.
The other is eleven point grey text in the corner. Nothing is concealed. The attention
budget of someone who has already decided to get on with their day is simply spent
before they reach it.

The levers are the same ones honest hierarchy uses, which is what makes this hard to
police and easy to smuggle through a review. Contrast: one option carries the accent
colour and the other is set at the edge of what passes for body text. Size: area is
persuasive, and a target six times larger is chosen more often by people who never
consciously compared them. Position: the reading path ends at the primary button, and
the refusal is placed before the eye arrives or after it has left. Order and grouping do
the rest, so a decline sitting under a heading of small print reads as small print. Any
one lever is a design decision. All of them pointing the same way, at the option that
happens to make money, is the [dark pattern](/dark-pattern) Harry Brignull's catalogue
at [deceptive.design](https://www.deceptive.design) files as visual interference.

It is worth separating from its neighbour. [Confirmshaming](/confirmshaming) works on the
words, writing the refusal as a confession, and it survives being restyled. Misdirection
works on the pixels, and it survives being rewritten: the decline can say exactly the
right thing in exactly the right tone and still be invisible at eleven point grey.
A cookie banner where Accept all is a button and Reject all is a link is the textbook
case, and it is the one European regulators have gone after most often, because consent
under the GDPR has to be as easy to refuse as to give, which is a statement about weight
and not only about wording.

The test is cheap and it is visual, so run it visually. Squint at the screen, or blur the
screenshot until the type is unreadable, and see which shape survives. If only one option
is still there, the design has already made the choice. The fix is equal weight for equal
consequences: the same size, the same contrast, and the same position in the reading
order for both answers, with emphasis reserved for cases where one option really is the
safer one for the reader rather than the more profitable one for you.
