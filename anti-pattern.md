---
name: Anti-pattern
slug: anti-pattern
category: pattern
status: published
created: 2026-08-28T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: A solution reached for again and again for a familiar problem, which
  fails at the thing it was reached for and often leaves the situation worse
  than doing nothing.
aliases:
  - name: antipattern
    source: community
  - name: design anti-pattern
tags: []
relations:
  contrastWith:
    - dark-pattern
  variantOf: []
  partOf: []
  seeAlso:
    - placeholder-as-label
implementations: []
sources:
  - title: AntiPattern (WikiWikiWeb)
    url: https://wiki.c2.com/?AntiPattern
  - title: Choosing our Preferences (Havoc Pennington)
    url: https://ometer.com/preferences.html
demo: inline
exhibit: false
useWhen: the fix everyone reaches for is the thing making the problem worse
---

Andrew Koenig named the anti-pattern in 1995, and the name has two halves that both
have to hold. It has to be a pattern: something people reach for over and over, because
it looks obvious and arrives with a story attached about why it will work. And it has to
be anti: it fails at the job it was reached for, often leaving the situation worse than
leaving it alone would have. A bad idea nobody has twice is not an anti-pattern. It is a
mistake. What earns the word is the recurrence, which is why every anti-pattern worth
naming has the shape of received wisdom rather than the shape of an accident.

A [dark pattern](/dark-pattern) is not one of these, and the two words are worth keeping
apart because they level different accusations. A dark pattern works. That is the whole
reason it survives contact with a dashboard: the roach motel really does keep
subscribers, the preselected box really does sell the insurance, and the cost is paid by
the reader rather than by the business running the test. Calling something a dark pattern
is a charge of malice against a design that succeeds. Calling something an anti-pattern is
a charge of incompetence against a design that fails. The two do meet, but by circumstance
rather than by definition: a deceptive flow becomes an anti-pattern as well on the day
enforcement and refunds cost more than it earns, which is a claim about this year's
regulator and not about the pattern.

The specimen shows the one that quietly eats software: settling a design argument by
adding a preference. Two people disagree about a default, nobody has to lose the
argument, and the option ships. Every property of a decision is there except the
deciding. Havoc Pennington wrote the case against it for GNOME in 2002 in
[Choosing our Preferences](https://ometer.com/preferences.html), and the accounting is
what makes it an anti-pattern rather than a preference for fewer preferences: each option
is cheap on its own, they multiply the states the software can be in, and the settings
window was supposed to be the place where a person gets what they want. Enough of them
and the switch you came for is below the fold. The fix was the cause.

The word does work in a review that "this is bad" cannot, because it names a goal and
then asks for a measurement. An anti-pattern claim is falsifiable by construction: it
says this was adopted to achieve something and does not achieve it, so anyone who
disagrees has somewhere to go and look. That also makes it a claim to spend carefully.
Most of the famous ones are contested, and the honest ones travel with a number and a
date attached, because a pattern that stopped working is a different finding from a
pattern you would not have chosen.

Koenig's definition has a second half that design reviews usually drop. An anti-pattern
is not fully described until someone writes down what to do instead, and the 1998 book
that followed made that refactored solution part of the form. Naming the trap is the
cheap half of the work.
