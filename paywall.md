---
name: Paywall
slug: paywall
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A barrier that stops access to content or a feature until the reader
  pays, placed either before anything is shown or partway into the content.
aliases:
  - name: hard paywall
    source: community
  - name: content gate
    source: community
  - name: subscription wall
    source: community
  - name: premium wall
    source: community
tags:
  - commerce
relations:
  contrastWith:
    - metered-paywall
    - feature-gate
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "UI Patterns: Paywall"
    url: https://ui-patterns.com/patterns
demo: inline
exhibit: false
useWhen: the point where content stops until you pay
---

A paywall is placed, and where it is placed is most of the design. A hard paywall
sits in front of everything: the headline, maybe a deck, then the offer. A metered
paywall lets a counted number of articles through and appears when the count runs
out, which is why it carries a number the reader can check ("2 of 3 free articles
this month") and a hard wall does not. Between them sit the freemium wall, where
some pieces are free forever and others never are, and the registration wall, which
takes an email rather than a payment and is a different trade dressed in the same
furniture.

The moment of the wall is a moment of loss, so the craft is in not making it feel
like a trick. Show the counter before it runs out, not only after, or the reader
experiences the meter as a trapdoor. Say what the subscription costs on the wall
itself rather than one click later. Keep the sign-in route visible and equal in
weight to the subscribe button, because a large share of the people who hit a wall
are already paying and are simply logged out on a new device. And let the reader
see enough to judge whether the piece is worth buying: a headline over a fade is
usually not enough, and a fade over three paragraphs usually is.

The fade itself is a specific bit of vocabulary. Clipping the text and washing it
into the background says "there is more" in a way a hard cut does not, which is why
almost every metered wall uses one. It also invites a cheap mistake: rendering the
whole article and hiding it with CSS, so anyone who opens the inspector reads it
free. If the content is meant to be paid for, the server has to withhold it, and
what the fade covers has to be a genuinely truncated excerpt. The related trick of
serving the full text to search engines and the wall to people arriving from them
has a name, cloaking, and search engines penalize it; the sanctioned version is a
structured-data flag that declares which part is paid.

Two things separate a paywall from the dark patterns it sits next to. It should not
manufacture urgency it does not have, so a countdown on a subscription offer that
resets on reload is lying. And it should not make cancelling harder than
subscribing: if signing up is two clicks in the app and cancelling is a phone call
during office hours, the pattern has stopped being a wall and started being a trap.
