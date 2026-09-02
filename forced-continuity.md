---
name: Forced continuity
slug: forced-continuity
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Turning a free trial into a paid subscription automatically, with
  the card taken up front and no reminder before the first real charge.
aliases:
  - name: hidden subscription
    source: deceptive-design
  - name: auto-renewal trap
    source: community
  - name: negative option billing
    source: community
  - name: free trial trap
    source: community
tags:
  - commerce
  - consent
relations:
  contrastWith:
    - roach-motel
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Deceptive Design: Hidden subscription"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: a free trial quietly becomes a paid plan
---

Forced continuity is a billing shape, not a screen. A trial is offered free for thirty
days, a card is taken to start it, and on day thirty-one the card is charged without
anything having been asked again. Every part of that was disclosed somewhere, usually in
grey text under the button, and the interface then goes quiet for a month, which is the
part that does the work. The charge arrives with no warning before it, often no receipt
after it, and the reader finds out from a bank statement rather than from the product.
Whatever the reader agreed to, they did not agree on the day the money moved.

Taking a card up front is not automatically the pattern, and it is worth being precise
about that, because the honest defence is real. A card stops one person opening forty
trials, it removes a step from the moment the trial converts, and for something like a
delivery subscription the whole product is continuity. What turns it into forced
continuity is the silence around the conversion: no reminder before the first charge, a
renewal date the account screen does not show, a cancel control that is somewhere other
than where the sign-up button was. The fix is unglamorous and cheap. Mail the reminder a
week out, put the next billing date on the account screen in the same size as the plan
name, and let one click stop it.

Its close kin on this site is the [roach motel](/roach-motel): forced continuity starts
the money, the roach motel makes it hard to stop. Ship both and a thirty-day experiment
becomes an annuity that takes a phone call to end. Both sit under the
[dark pattern](/dark-pattern) umbrella, where the catalogue at
[deceptive.design](https://www.deceptive.design) files this one as hidden subscription,
and both fail the same test: the design would stop working if it were read out loud to
the person it is aimed at.

The law has moved fastest here of anywhere in the catalogue. Negative option billing,
the legal name for an arrangement where silence counts as consent, has long been
regulated in the US, and the Federal Trade Commission's click to cancel rulemaking is
built on a symmetry test plus a consent test: cancelling must be as easy as subscribing,
and a trial that converts has to be agreed to clearly rather than inferred. California's
automatic renewal law requires a reminder before longer terms renew, and EU consumer
rules require that the recurring cost be stated at the moment of commitment rather than
in a footnote. A team that mails the reminder is compliant almost everywhere by
accident.
