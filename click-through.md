---
name: Click-through
slug: click-through
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A click that both focuses an inactive surface and reaches the
  control underneath, instead of being spent activating the window first.
aliases:
  - name: click-through activation
    source: community
  - name: focus-stealing click
    source: community
  - name: pass-through click
    source: community
tags:
  - pointer
  - windowing
relations:
  contrastWith:
    - nested-interactive
    - focus-follows-mouse
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "LWN: Focus follows mouse or click to focus?"
    url: https://lwn.net/Articles/467703/
demo: inline
exhibit: false
useWhen: the first click also does the thing, or does not
---

When several windows overlap, the first click on one that is not currently active has two jobs
competing for it: bring the window forward, and press whatever sits under the pointer.
Click-through is the policy that lets one click do both. Without it the click is spent on the
activation and the control never hears about it, so the reader clicks a second time on a button
that was already under their finger.

The two policies are split down the middle of the desktop world. Windows generally clicks
through, so the first click lands on the control. macOS generally does not: the activating click
is swallowed, and only a small whitelist of controls is allowed to accept it, mostly the ones
where a wrong press costs nothing, such as scrollbars, some toolbar buttons, and a background
window's own close box. The tension is honest on both sides. Click-through saves a click every
single time, and costs a mistake the one time the reader meant only to bring the window forward
and happened to put the pointer over Delete. That is why the exception list runs in the other
direction as well: even in a click-through interface, destructive and irreversible controls tend
to be excluded, because the click that reaches them was never aimed at them.

The same argument appears wherever one surface sits over another. A modal dialog's scrim exists
precisely to refuse click-through, so a click outside the dialog is spent on the dialog and
never on the interface behind it. Nested inside a page, a floating panel that has just been
opened faces the same choice about the click that opens it, and the answer is usually no for the
same reason: the reader was aiming at the panel, not through it.

Two other uses of the phrase are worth keeping apart, since both are common. On the web,
click-through often means a click passing through an overlay to what is underneath, which is
`pointer-events: none` and a question about hit testing rather than about focus. In advertising
it means a click that follows a link to its destination, as in click-through rate. Only the
first sense is about the cost of activating a window, and it is the one that pairs with the
focus models: click to focus and focus follows mouse decide *when* a surface becomes active,
while click-through decides what the activating click is additionally allowed to do.
