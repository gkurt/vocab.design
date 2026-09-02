---
name: Model selector
slug: model-selector
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The control in an assistant interface that picks which model
  answers, usually a menu carrying a short description of each option.
aliases:
  - name: model picker
    source: community
  - name: model switcher
    source: community
  - name: engine selector
    source: community
tags:
  - ai
  - menus
relations:
  contrastWith:
    - select
  variantOf: []
  partOf: []
  seeAlso:
    - prompt-input
    - segmented-control
implementations: []
sources:
  - title: UX Patterns for Developers
    url: https://uxpatterns.dev/patterns
demo: inline
exhibit: false
useWhen: choosing which model answers the request
---

A model selector is the control that decides who answers. It sits in or beside the composer
of an assistant interface, shows the model currently in effect, and opens a list of the
alternatives. What separates it from an ordinary picker is the list itself: each row carries a
name plus a line saying what that option is for, and often a small hint about speed, cost, or
capability, because the names alone mean nothing to most of the people reading them. The
choice usually applies to the next message rather than retroactively, so the control has to
make clear which of its answers is in force.

The vocabulary here is still settling, which is exactly why the term earns an entry. Products
ship it as a model picker, a model switcher, sometimes an engine selector, and sometimes with
no visible name at all, just a version string in the corner of the composer. Anyone writing
about assistant interfaces needs one word for the thing, and model selector is the phrase
that has the most currency and the least ambiguity. Expect the shape to keep moving too: some
products have already replaced the explicit list with automatic routing, which turns the
control into a disclosure of what was chosen rather than a way to choose.

The interesting design problem is writing the options. The real differences between models are
latency, cost per token, context length, and reasoning depth, and none of those are things a
person choosing between them wants to think about. Descriptions that survive contact with
readers are task-shaped: "fastest, for short questions", "best for long documents", "slower,
for problems worth thinking about". Numbers help only when they are the point, as a context
length is when the person is about to paste a book in. Keep the list short enough to read in
one glance, order it by how often each option is the right answer rather than by version
number, and never hide the deprecation of an option people rely on inside a tooltip.

Mechanically this is a [dropdown](/dropdown) trigger with a menu, and often a plain
[select](/select) would do the job, so it is worth being clear about what the extra term buys.
Select and dropdown name the mechanism, the widget shape a form or a toolbar uses. Model
selector names a job: choosing the responder in a conversation, with the descriptions and the
scope rules that job requires. It is one of the few controls that a
[natural language interface](/natural-language-interface) has not absorbed, because a request
cannot reliably choose the model that will read it.
