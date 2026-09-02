---
name: Confirmation page
slug: confirmation-page
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The screen that closes a transaction, stating plainly that it
  succeeded, giving a reference the reader can quote, and saying what happens
  next.
aliases:
  - name: success page
    source: community
  - name: thank you page
    source: community
  - name: receipt page
    source: community
  - name: order confirmation
    source: community
tags:
  - commerce
  - content-design
relations:
  contrastWith:
    - order-summary
    - check-answers
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "GOV.UK Design System: Confirmation pages"
    url: https://design-system.service.gov.uk/patterns/confirmation-pages/
demo: inline
exhibit: false
useWhen: the screen that says it worked and what happens next
---

A confirmation page is the last screen of a transaction, and it has four jobs. Say that
it worked, in words rather than in a colour. Give a reference the reader can write down,
quote on the phone, or search their inbox for. Summarize what was actually agreed, since
this is the last chance to catch a wrong address before it becomes a support ticket. And
say what happens next, including when, because the question in the reader's head the
moment they press the button is not "did that submit" so much as "am I finished, and
what do I have to do now".

It is worth being precise about which side of the commit it sits on. A
[check answers](/check-answers) screen comes before: it is the reader's last look at
what they are about to do, and every line on it is editable. A confirmation page comes
after: nothing on it can be changed, which is exactly why it can be trusted as a record.
The two are often drawn similarly, and confusing them is a real failure mode, because a
page that looks like a receipt but is still a draft invites people to close the tab
halfway through.

The reason this is a durable page and not a passing message is that a completed
transaction outlives the session. A [toast](/toast) is the right shape for an action
that is small, undoable, and immediately visible in the interface behind it. Money
changing hands is none of those things, and a message that removes itself after four
seconds cannot be screenshotted, printed, read slowly by someone using a screen reader,
or found again after a browser crash. Give it a real URL that survives a refresh, keep
the reference selectable rather than baked into an image, and repeat the whole thing in
an email, because the page is on screen once and the email is the copy that stays.

The failure mode is a screen that only celebrates. Confetti, a big tick, and the word
"Thanks!" leave the reader holding no reference, no delivery date, and no idea whether
to expect anything. The other failure mode is the dead end: a page with nothing to do
next, which is a variant of the [empty state](/empty-state) problem, so offer the one
useful onward action (track it, view the booking, return to the account) instead of
leaving a cul de sac.
