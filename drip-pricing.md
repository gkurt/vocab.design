---
name: Drip pricing
slug: drip-pricing
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Advertising a low headline price and adding mandatory fees one
  screen at a time, so the true total only appears once the buyer is committed.
aliases:
  - name: hidden costs
    source: deceptive-design
  - name: partitioned pricing
    source: community
  - name: junk fees
    source: community
  - name: resort fee
    source: community
tags:
  - commerce
relations:
  contrastWith:
    - order-summary
    - sneak-into-basket
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Deceptive Design: Hidden costs"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: fees keep appearing as you move through checkout
---

Drip pricing is a schedule, not a price. The number in the advert is real, in the sense
that some part of what you pay is that number, and every fee added afterwards is
disclosed somewhere before the card is charged. What makes it a
[dark pattern](/dark-pattern) is the ordering. The cheap number does the work of winning
the click and the comparison; the mandatory additions arrive after seats have been
chosen, details typed, and enough effort spent that starting over somewhere else feels
worse than paying. By the time the total is true, the decision it was supposed to inform
has already been made.

The giveaway is that the fees are not optional and not avoidable. A resort fee charged
to every guest is part of the room rate with a different name on it. A service fee on
every ticket is part of the ticket price. The test a regulator applies is the same one a
designer should: if nobody can complete the purchase without paying it, it belongs in
the advertised number. Economists studying partitioned pricing have found for decades
that splitting a price into a base plus surcharges makes buyers underestimate the total
and rate it as better value than the identical all in figure, which is precisely why the
practice persists without anyone technically lying.

Enforcement caught up in the 2020s. US rules now require ticketing and short term lodging
sellers to show the total price including mandatory fees up front, the Federal Trade
Commission has acted against airline and hotel style fee disclosure, and EU and UK
consumer law has long required the total payable to be given before a buyer commits. The
practical effect is that a checkout which discovers new fees per step is now a legal
question in several markets, not only an ethical one.

The honest version already has a name and a shape: the [order summary](/order-summary)
that stands beside the form from the first step, itemising every line including the ones
a seller would rather not name. The rule that separates them is easy to state. A total
may change because the reader changed something, a quantity, a delivery speed, a seat.
A total may not change because the seller advanced the step. Put the all in figure in the
headline, keep the breakdown one tap away for anyone who wants to see where it goes, and
let the comparison be won on a number that is still true at the end.
