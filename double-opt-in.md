---
name: Double opt-in
slug: double-opt-in
category: pattern
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: Asking a new subscriber to confirm from the address they typed, so a
  list holds only addresses whose owner agreed and a typo never becomes a
  stranger's mail.
aliases:
  - name: confirmed opt-in
    source: community
  - name: subscription confirmation
    source: community
tags:
  - consent
  - email
relations:
  contrastWith:
    - magic-link
  variantOf: []
  partOf: []
  seeAlso:
    - unsubscribe-link
    - transactional-email
implementations: []
sources:
  - title: "Mailchimp: about double opt-in"
    url: https://mailchimp.com/help/about-double-opt-in/
demo: inline
exhibit: false
useWhen: a signup confirmed from the address itself
---

A form takes an address, and that is a claim rather than a fact. Double opt-in turns it
into a fact by sending one mail to the address itself and asking for an action from
inside it: until that action happens the signup is pending and nothing else is sent.
Single opt-in skips the step and starts sending immediately, which is faster in every
respect except the one that matters, since it cannot tell the difference between an
address someone typed for themselves and an address someone typed by mistake.

The mechanism is the same one [magic link](/magic-link) uses, put to a different
purpose. Both prove possession of a mailbox by requiring an act performed from inside it,
and the difference is what the proof buys: a magic link buys a session, a confirmation
buys consent. That is worth keeping straight, because the two get built by the same team
out of the same sending code and then described as if they were one feature. One is
authentication. The other is a record that somebody agreed.

The cost is real and it should be stated plainly: a confirmation step loses subscribers.
Some never open the mail, some open it and do not act, some find it in a spam folder.
Every one of those is a name a single opt-in list would have had, which is exactly the
argument for the step rather than against it. The people lost are overwhelmingly the ones
who would never have read anything, and what remains is a list whose open rate describes
its readers rather than its size.

The case that settles it is the typo. An address off by one letter usually belongs to
somebody, and under single opt-in that somebody starts receiving mail they never asked
for, cannot recognise, and can only stop by using an
[unsubscribe link](/unsubscribe-link) in a mail from a company they have never heard of.
The same goes for an address typed into a form by a third party, maliciously or as a
joke. Confirmation is the only step in the whole flow that can tell those apart from a
real subscriber, which is why it belongs to ethics rather than to deliverability, even
though deliverability is the argument that usually wins the meeting.
