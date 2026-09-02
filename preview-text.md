---
name: Preview text
slug: preview-text
category: pattern
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The line an inbox prints under a subject, written as hidden text at
  the top of the mail so the client shows those words instead of scraping
  whatever body copy comes first.
aliases:
  - name: preheader
    source: litmus
  - name: preheader text
    source: community
  - name: snippet text
    source: community
tags:
  - content-design
  - email
relations:
  contrastWith:
    - subject-line
    - sender-name
  variantOf: []
  partOf: []
  seeAlso:
    - truncation
implementations: []
sources:
  - title: "Litmus: The Ultimate Guide to Email Preview Text"
    url: https://www.litmus.com/blog/the-ultimate-guide-to-preview-text-support
demo: inline
exhibit: false
useWhen: the line the inbox shows after the subject
---

An inbox row prints three things: who it is from, what it is called, and then one more
line. That third line is preview text, and it is the only one of the three a sender
regularly forgets to write. When it is missing the client does not leave a gap, it
scrapes the first text it finds in the message body, which is how thousands of campaigns
go out advertising themselves as "View this email in your browser" or, worse, as their
own unsubscribe boilerplate. The words are not a bug in the mail. They are the top of
the mail, read out loud by a list the sender never designed.

The vocabulary here is genuinely muddled, and [Litmus](https://www.litmus.com/blog/the-ultimate-guide-to-preview-text-support)
draws the line worth keeping: preview text is what the inbox prints beside or under the
subject, while preheader text is what a reader sees at the top of the message once it is
open. The two are usually the same string, because the standard technique is one hidden
element at the very start of the body, which is why the words get used
interchangeably. They are still different jobs. One competes in a list against forty
other rows, the other introduces a mail somebody has already decided to read.

As a design problem it has three hard edges. It is set in someone else's type at
someone else's width, so it arrives unstyled and cannot be laid out. It is cut at a
length nobody can predict, since every client and every window gives it a different
allowance, which is why the usual advice is to land the meaning inside about ninety
characters and treat everything after that as a bonus. And it is read as one sentence
with the [sender name](/sender-name) and the [subject line](/subject-line) rather than on
its own, so a preview that repeats the subject wastes the only line that could have
added something.

The technique is unglamorous. Put the words in a hidden element as the first thing in
the body, then follow them with enough blank characters that the client runs out of room
before it reaches the real content, otherwise the navigation and the view-in-browser
link leak in behind the sentence you wrote. Everything about that is a workaround for
having no control over the surface, which is the honest summary of the whole medium: the
copy is yours and the [truncation](/truncation) is not.
