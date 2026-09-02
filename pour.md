---
name: POUR
slug: pour
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The four principles WCAG is built on, perceivable, operable,
  understandable, and robust, used as a shorthand for sorting an accessibility
  problem into a bucket.
aliases:
  - name: perceivable operable understandable robust
    source: wcag
  - name: four principles
    source: wcag
tags:
  - wcag
relations:
  contrastWith:
    - functional-need
    - conformance-level
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "WCAG 2.2: Introduction"
    url: https://www.w3.org/TR/WCAG22/
demo: inline
exhibit: false
useWhen: classifying what kind of barrier you are looking at
---

WCAG is not a flat list of rules. It is four principles, thirteen guidelines under them, and the
testable success criteria under those, and the four at the top spell POUR: perceivable, operable,
understandable, robust. Content must be able to reach the senses, controls must be able to be
worked, content and behaviour must make sense, and the whole thing must survive being read by
software the author never chose. Every criterion in the standard hangs off exactly one of them,
which is why the numbering starts the way it does: 1.x is perceivable, 2.x operable, 3.x
understandable, 4.x robust.

The value of the acronym is not that it helps you remember four adjectives. It is that it tells you
what kind of problem you are looking at, and therefore who is blocked and what sort of fix is owed.
A missing [alt text](/alt-text) is perceivable: information exists that a reader cannot receive at
all, and the fix is to provide it in another form. A control that only answers a drag is operable:
the reader knows exactly what they want and cannot reach it, and the fix is another input path, per
[dragging alternative](/dragging-alternative). A field labelled in internal jargon is
understandable: everything is perceivable and operable and still unusable, and the fix is
[plain language](/plain-language) or [helper text](/helper-text). A div dressed as a button is
robust: it may work in the browser you tested and vanish in the one you did not, so
[name, role, value](/name-role-value) is the fix, not more styling.

The sorting is a triage tool more than a taxonomy, and its bluntest use is the most valuable one.
Perceivable and operable failures are hard blocks: the reader cannot proceed. Understandable
failures are usually softer, expensive in errors and abandonment rather than absolute. Robust
failures are the ones that pass every manual test in the room you are sitting in and fail on
somebody else's software six months later. Knowing which bucket a bug is in tells you roughly how
loudly to argue about it.

Two cautions. Buckets have edges, and plenty of real barriers touch two: an unlabelled icon button
is usually filed under robust as a missing name, but the reader's experience of it is a
perceivable one. Argue about the fix, not the filing. And POUR is a classification, not a
[conformance level](/conformance-level): being able to say a problem is operable does not say
whether it fails at A, AA, or AA plus, which is a separate question answered by the criterion
itself. The acronym is a way of thinking, and it works best used out loud, as the first question
asked of any bug report: which of the four is this?
