---
name: Functional need
slug: functional-need
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A statement of the gap between what a person can do and what a
  design demands, the WCAG 3 draft's way of naming a barrier without sorting
  people into disability categories.
aliases:
  - name: functional needs
    source: w3c
  - name: user need
    source: w3c
tags:
  - wcag
relations:
  contrastWith:
    - situational-disability
    - pour
  variantOf: []
  partOf: []
  seeAlso:
    - curb-cut-effect
implementations: []
sources:
  - title: "W3C: Explainer for WCAG 3.0"
    url: https://www.w3.org/TR/wcag-3.0-explainer/
  - title: WCAG 3.0 editor's draft
    url: https://w3c.github.io/silver/guidelines/
demo: inline
exhibit: false
useWhen: framing a barrier without naming a diagnosis
---

The WCAG 3 drafts define a functional need as a statement describing a specific gap in a person's
ability, or a specific mismatch between an ability and the environment a design puts them in. It is
written as a need, not as a population: "needs to operate a control without a sustained precise
drag" rather than "users with motor impairments". The phrasing is deliberate. A category names who
is affected and leaves the barrier implicit; a need names the barrier and leaves the audience open.

Treat this as draft vocabulary that is still moving. The WCAG 3 structure around it has changed
more than once (outcomes, then core and supplemental requirements, with assertions and methods
beside them), each part carrying its own maturity label, and the explainer says plainly that the
guidelines and the conformance model are still evolving. Functional needs sit mostly in the glossary
and in the working group's derivation work rather than being the spine a reader can cite a clause
from. What has already escaped the draft is the phrase itself: audit reports, procurement answers,
and design briefs use "functional need" today, well ahead of any published requirement written in
terms of one, so it is worth knowing even if you never ship against WCAG 3.

The reframing is useful rather than merely polite, and the difference is visible in what each
version invites you to do next. A category framing invites an estimate: how many users with motor
impairments do we have, and is that enough to justify the work. That number is unknowable, always
argued down, and tells you nothing about what to build. A need framing is closer to a
specification: "must be operable without a sustained precise drag" already contains the fix, and
the same sentence is what
[pointer gestures](/pointer-gestures) and
[dragging alternative](/dragging-alternative) exist to require. It also quietly widens the audience
without any advocacy, because the set of people who cannot make a precise sustained drag includes a
tremor, a trackpad, a wrist in a cast, and one hand on a train, which is
[situational disability](/situational-disability) arriving through the wording rather than through
an argument.

Two limits. A functional need is not a test, so it does not tell you whether something passes: that
is what a criterion and a [conformance level](/conformance-level) are for, and a need statement with
no measurable requirement under it is a value, not an audit finding. And needs are only as good as
their coverage. A list assembled by guessing has holes exactly where the authors had no experience,
which is why the working group builds them from disability research and user testing rather than from
a room. Use the phrase to state a barrier precisely. Do not use it to imply you have enumerated all
of them.
