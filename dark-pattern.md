---
name: Dark pattern
slug: dark-pattern
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: An interface arranged to make the reader do something they did not
  intend and would not have chosen, by exploiting how attention and defaults
  work.
aliases:
  - name: deceptive design
    source: deceptive-design
  - name: deceptive pattern
    source: deceptive-design
  - name: manipulative design
    source: community
tags: []
relations:
  contrastWith:
    - anti-pattern
    - fake-door
  variantOf: []
  partOf: []
  seeAlso:
    - cookie-consent-banner
    - accessibility-overlay
implementations: []
sources:
  - title: "Deceptive Design: Types of deceptive pattern"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: the interface is designed against the person using it
---

A dark pattern is not a mistake. Every ingredient of it is something an honest
interface also uses: emphasis, defaults, wording, placement, timing. What makes it
dark is the direction those tools are pointed. The glowing button is the one that
earns revenue, the greyed link is the one that does not, and the wording of the
refusal is written to make refusing feel like an admission. Nothing on the screen
lies. The screen is simply arranged so that the fastest, calmest path through it is
the one the reader would not have picked if the two options had been drawn as
equals.

Harry Brignull coined the phrase in 2010 and catalogued it at
[darkpatterns.org](https://www.deceptive.design), which now runs as
[deceptive.design](https://www.deceptive.design) under a name that survives
translation and does not lean on "dark" as a synonym for bad. The catalogue is the useful part: the
umbrella word gets you into the argument, and the specific word wins it.
Confirmshaming makes declining an insult ("no thanks, I like paying full price").
A roach motel is easy to enter and deliberately hard to leave, which is what a
one-click subscription with a phone-only cancellation is. Drip pricing hides fees
until the last screen. Preselection ticks the box for you. Misdirection puts the
decoy where the eye lands first. Naming the specific one is what turns a design
review comment from taste into a finding.

The vocabulary now has legal weight, which is why it is worth using precisely. The
US Federal Trade Commission published a staff report on dark patterns in 2022 and
has brought enforcement actions over subscriptions that were hard to cancel. In the
EU, the Digital Services Act bans interfaces that distort or impair a user's ability
to make free choices, and consent under the GDPR has to be as easy to refuse as to
give, which is what makes a cookie banner with a prominent Accept and a buried
Reject a compliance question rather than an aesthetic one. Accessibility rules bite
too: a decline link that fails contrast fails WCAG whatever its intent was.

The honest test is not whether the interface is persuasive. Persuasion is allowed and
is most of what design does. The test is whether the design works against the
person's own interest and would stop working if it were explained to them out loud.
An interface that gets more sign-ups when the cancel path is hidden is not a better
interface. It is the same interface with a hostage.
