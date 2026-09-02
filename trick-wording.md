---
name: Trick wording
slug: trick-wording
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Phrasing a choice so its plain reading is the opposite of its
  effect, typically through double negatives or a label that describes the wrong
  outcome.
aliases:
  - name: trick question
    source: community
  - name: double negative checkbox
    source: community
  - name: confusing wording
    source: community
tags:
  - content-design
relations:
  contrastWith:
    - confirmshaming
    - misdirection
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Deceptive Design: Trick wording"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: untick this box to not stop receiving emails
---

Trick wording puts the deception in the sentence. The control is ordinary and it does
exactly what a control of its kind does: the checkbox stores a boolean, the toggle flips
a setting, the button submits. What has been engineered is the label, so that a person who
reads it at normal speed comes away believing the opposite of what their click will do.
Untick this box to not stop receiving emails. Two negatives, one boolean, and a reader who
has to parse a sentence like a logic exercise to keep their inbox.

Naming it precisely matters, because the neighbouring patterns are about different parts
of the same row. A [preselected opt-in](/preselected-opt-in) is about the state the
control starts in, and its label may be perfectly clear. Trick wording leaves the state
alone and rewrites the sentence, which is why it survives audits that only check
defaults, and why the fix is editorial rather than technical: one positive statement of
what ticking does, no negatives, no exceptions clause.

It is one of the named types in Harry Brignull's catalogue on
[deceptive.design](https://www.deceptive.design), and it is regulated as well as
catalogued. Consent obtained through a sentence a reasonable person would misread is not
informed consent under the GDPR, and the same reasoning appears in unfair-practices
enforcement elsewhere. That is a useful thing to be able to say in a review, because trick
wording is often defended as tone or brevity rather than recognised as the
[dark pattern](/dark-pattern) it is.

The tell is that the sentence needs re-reading. If the copy has more than one negative, or
describes the outcome of the state the reader is not in, or leans on words like unless,
except, and prefer not to, it is worth rewriting as the plainest possible sentence and
seeing whether anyone objects to the plain version. Objections to plain phrasing are the
proof: the same instinct produces
[confirmshaming](/confirmshaming), where the way out is worded to make refusing feel like
a confession. One writes the refusal to hurt, the other writes the choice to be misread.
