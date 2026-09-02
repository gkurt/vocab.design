---
name: Express checkout
slug: express-checkout
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A row of one-tap payment buttons placed above the normal form, which
  fetch address and payment details from a wallet the buyer already has.
aliases:
  - name: wallet buttons
    source: community
  - name: one-click checkout
    source: community
  - name: accelerated checkout
    source: polaris
  - name: buy now button
    source: community
  - name: payment request
    source: mdn
tags:
  - auth
  - commerce
relations:
  contrastWith:
    - guest-checkout
  variantOf: []
  partOf: []
  seeAlso:
    - order-summary
    - social-login
implementations: []
sources:
  - title: "Baymard Institute: Ecommerce Checkout UX"
    url: https://baymard.com/learn/checkout-flow-ux-optimization
demo: inline
exhibit: false
useWhen: the wallet buttons above the checkout form
---

Express checkout is the row of wallet buttons that sits above the ordinary checkout form,
under some version of "or pay by card". Pressing one hands the order to a wallet the buyer
is already signed into, which returns a name, a delivery address and a payment method in a
sheet the buyer confirms. The form underneath does not go away. It is the path for everyone
whose wallet does not hold the right address, or who does not use one, and it is what the
whole screen falls back to.

Placement is most of the pattern, which is why the name says "above". The entire value of a
wallet button is skipping the form, so a wallet offered after the form has been filled in
has nothing left to save. Putting the row at the top also means it is the first decision on
the screen, ahead of the sign-in and guest question, which is the order the buyer would
choose if asked: the fastest path first, with everything else still reachable underneath.
[Baymard's checkout research](https://baymard.com/learn/checkout-flow-ux-optimization)
keeps finding the same thing, that the number of fields between a buyer and a paid order is
the strongest thing a checkout controls.

The near neighbour is [guest checkout](/guest-checkout), and the pair is easy to keep
straight: guest checkout removes the account, express checkout removes the form. They solve
different halves of the same objection and a good checkout offers both, because a wallet is
itself an account and a buyer who declines one may still want the other. Beyond that, the
sheet compresses the review the rest of the flow spreads out, so it has to carry what an
[order summary](/order-summary) and a [check answers](/check-answers) screen would otherwise
have shown: what is being bought, where it is going, and the real total including delivery.

Two failures are worth designing against. The address in a wallet is often years old, so
the sheet must show it in full and let it be changed there rather than sending the parcel to
a former flat. And the row should offer only the wallets the buyer can actually use on this
device: five buttons where four are dead ends is not choice, it is a longer form with
better graphics. Keep the card path styled as a real option rather than as the punishment
for refusing, and let the wallet row be quiet enough that a buyer reading it as a shortcut
is right.
