---
name: Mixed state checkbox
slug: mixed-state-checkbox
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A checkbox showing a third, indeterminate state when only some of
  the boxes it governs are checked.
aliases:
  - name: indeterminate checkbox
    source: html
  - name: tri-state checkbox
    source: community
  - name: partial checkbox
    source: community
  - name: aria-checked mixed
    source: aria
  - name: dash checkbox
    source: community
tags:
  - forms
  - selection
relations:
  contrastWith:
    - checkbox
  variantOf: []
  partOf: []
  seeAlso:
    - treeview
implementations: []
sources:
  - title: "MDN: aria-checked"
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-checked
  - title: "APG patterns: Checkbox"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/
demo: inline
exhibit: false
useWhen: a parent box stands over a partly checked group
---

A [checkbox](/checkbox) that governs a group has three honest answers, not two: all of
them, none of them, and some of them. The third is drawn as a dash rather than a
half-drawn tick, because a partial tick reads as a tick that failed rather than as a state
of its own, and it is announced as `aria-checked="mixed"`. Mixed is a summary of the
children, never an opinion of its own: the parent is only ever reporting what the group
below it currently says.

The platform gives you two halves of this. In HTML, `indeterminate` is a property of the
input set from script, not an attribute and not a value: an indeterminate box still
submits whatever `checked` says, which is the detail that surprises people. In ARIA, a
`role="checkbox"` element carries `aria-checked="mixed"`, which is what assistive
technology actually announces. A custom control needs both halves stated deliberately,
which is one more reason to build it once.

The click cycle is a convention worth following exactly. Pressing a mixed parent checks
everything, and pressing it again clears everything: two states under the pointer, with
mixed only ever arriving from below when a child changes. A control that cycled back
through mixed on its own would offer the reader a state they cannot mean, since "some" is
not a thing you can ask for without saying which. That is the one place a toggle is the
whole point rather than a shortcut, and this specimen toggles for exactly that reason.

Where it turns up uninvited is bulk selection: the header box of a table with
[bulk actions](/bulk-actions), a permissions tree, a filter panel with nested groups. Two
mistakes recur. The first is using mixed to mean "unknown" or "loading", which it does not
mean and which no screen reader will read that way. The second is leaving the parent
checked while a child is cleared underneath it, which turns the summary into a lie. Derive
the parent from its children on every change and the state stays honest by construction.
