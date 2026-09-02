---
name: Feature spotlight
slug: feature-spotlight
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A one-time announcement pointing at something newly added, shown in
  place next to the feature and dismissed for good once acknowledged.
aliases:
  - name: what's new
    source: community
  - name: release announcement
    source: community
  - name: new feature callout
    source: community
  - name: announcing new features
    source: cloudscape
  - name: changelog popover
    source: community
tags:
  - onboarding
  - overlays
relations:
  contrastWith:
    - welcome-mat
  variantOf: []
  partOf: []
  seeAlso:
    - coach-mark
implementations: []
sources:
  - title: "Cloudscape: Announcing new features"
    url: https://cloudscape.design/patterns/
demo: inline
exhibit: false
useWhen: the one-time New badge pointing at a change
---

One pointer, one thing, once. A feature spotlight is the smallest member of the
announcement family: a dot on a menu item, a "New" pill on a control, a short
popover anchored to the button that just gained an ability. It is shown where the
change is rather than in a modal at the door, so the sentence explaining it arrives
in the place where it can actually be tried.

It is often confused with the pattern it is one step of. An
[onboarding tour](/onboarding-tour) is a sequence delivered before anyone asked a
question, and the reader's incentive is to reach the end of it. A spotlight has
nothing to reach the end of, which is where its power comes from: a single pointer
at the one control that moved does work that five pointers at five controls do not.
When the announcement has more than one thing to say, that is a signal it should be
a changelog page with a link, not a chain of bubbles over a live screen.

The obligations are short and skipped often. It must be dismissible, and dismissal
has to be remembered per person and per feature, because the second showing is what
turns a helpful pointer into an obstacle. It must expire on its own: a "New" badge
still sitting there six months later has become furniture, and the word stops
meaning anything. It must never block the control it points at, which is the
classic implementation bug when the announcement brings a scrim with it. And it has
to be an interruption worth its cost, which in practice means announcing changes
that alter what someone would do, not every shipped ticket.

The pointing device has its own vocabulary. A coach mark is the older name for the
annotated overlay, usually a beak or a line drawn from a card to a control, and it
carries a whiff of the era when apps opened onto a hand-drawn diagram of their own
toolbar. The quieter versions are usually better: an unobtrusive dot that
disappears the first time the control is used says the same thing as a bubble and
costs the reader nothing to dismiss.
