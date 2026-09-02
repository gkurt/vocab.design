---
name: Subject line
slug: subject-line
category: pattern
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The one line a mail is opened or ignored on, written to survive a
  list that truncates it and shows it wedged between the sender and the preview
  text.
aliases:
  - name: subject
    source: community
  - name: email subject
    source: community
tags:
  - content-design
  - email
relations:
  contrastWith:
    - preview-text
    - sender-name
  variantOf: []
  partOf: []
  seeAlso:
    - truncation
implementations: []
sources:
  - title: "Litmus: The Anatomy of a Good Email"
    url: https://www.litmus.com/blog/the-anatomy-of-a-good-email
  - title: "Litmus: 18 subject line tips from experts"
    url: https://www.litmus.com/blog/how-to-write-the-perfect-subject-line-infographic
demo: inline
exhibit: false
useWhen: the line a mail is opened or ignored on
---

A subject line looks like copywriting and behaves like layout. It is never read on its
own: it arrives in a list, set in type the sender did not choose, at a width the sender
cannot measure, with the [sender name](/sender-name) above it and the
[preview text](/preview-text) below it. The three are read as one sentence in the second
or so a person spends deciding whether this row is worth a tap, which is why writing any
one of them in isolation is the mistake. The subject is the middle clause.

The design constraint that follows is [truncation](/truncation). Every client and every
window gives the line a different allowance, so the cut lands somewhere the sender will
never know, and the only safe assumption is that it lands early. What that turns into is
a rule about order rather than about length: the meaning has to have arrived before the
cut. "Shipped: order 4471, arrives Friday" survives being sliced in half because the
fact is at the front. "A quick update about your recent order with us" does not survive
anything, because the words that carry information were saved for the end, and on a phone
the end is not shown.

The rest is restraint. A subject that repeats the sender name wastes the only line that
could have said something new, a subject that repeats the preview text wastes two. Length
is worth less attention than sequence, since a long line that front-loads reads fine
truncated while a short vague one reads as nothing at any width. And the line is a
promise the mail has to keep: the words most likely to earn an open are also the words
most likely to be resented if the body does not deliver them, which is the quiet reason
curiosity gaps and false urgency cost more than they return.

Two habits show up in every list of tips worth reading. Write the line before the mail,
because a subject you cannot write in eight words usually means the mail is about more
than one thing. And read it in a narrow column with the sender and the preview beside
it, at the size a phone will actually use, rather than in the wide field of a sending
tool where every line looks complete.
