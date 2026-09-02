---
name: Empty state
slug: empty-state
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The screen a container shows when it holds nothing, naming the
  absence and offering the action that ends it.
aliases:
  - name: non-ideal state
    source: blueprint
  - name: blankslate
    source: primer
  - name: blank slate
    source: ui-patterns
  - name: blank state
tags:
  - content-design
  - onboarding
relations:
  contrastWith:
    - zero-state
    - skeleton-screen
    - no-results-state
  variantOf: []
  partOf: []
  seeAlso:
    - agenda-view
implementations:
  - system: carbon
    name: Empty states
    url: https://carbondesignsystem.com/patterns/empty-states/
sources:
  - title: "Nielsen Norman Group: Empty states in application design"
    url: https://www.nngroup.com/articles/empty-state-interface-design/
demo: inline
exhibit: false
useWhen: the screen for a container with nothing in it yet
---

An empty state has three jobs and usually gets one. It says what is missing, says
what would be here, and gives you the single action that fills it. Skip the third
and you have a dead end; skip the second and people assume something is broken.

Empty is not one situation. Nothing created yet, nothing matching a filter, and
nothing left after clearing a list are three different messages, and only the first
should be a cheerful invitation. A search that found nothing needs the query
repeated back and a way to widen it, not an illustration.

Two neighbours to keep apart. A [zero state](/zero-state) is the first-run version,
where the goal is teaching a feature nobody has used yet. A [skeleton
screen](/skeleton-screen) means the data may still arrive, so showing an empty
state before the request settles tells the user something false.
