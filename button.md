---
name: Button
slug: button
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A control that runs an action when activated, labelled with the
  thing it does rather than with where it goes.
aliases:
  - name: push button
    source: community
  - name: cta button
    source: community
  - name: action button
    source: community
tags: []
relations:
  contrastWith:
    - link
  variantOf: []
  partOf: []
  seeAlso:
    - focusable-disabled
    - pressed-state
implementations:
  - system: aria-apg
    name: Button
    url: https://www.w3.org/WAI/ARIA/apg/patterns/button/
  - system: material
    name: Buttons
    url: https://m3.material.io/components/buttons/overview
  - system: hig
    name: Buttons
    url: https://developer.apple.com/design/human-interface-guidelines/buttons
  - system: fluent
    name: Button
    url: https://fluent2.microsoft.design/components/web/react/core/button/usage
  - system: carbon
    name: Button
    url: https://carbondesignsystem.com/components/button/usage/
  - system: polaris
    name: Button
    url: https://shopify.dev/docs/api/app-home/polaris-web-components/actions/button
  - system: shadcn
    name: Button
    url: https://ui.shadcn.com/docs/components/button
sources:
  - title: "ARIA Authoring Practices Guide: Button pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/button/
  - title: "MDN: the button element"
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button
demo: inline
exhibit: false
useWhen: the control does something instead of going somewhere
---

A button is judged by what happens after it, so the label is the design. Name the
outcome ("Publish", "Delete draft", "Send invite") rather than the mechanism
("Submit") or the mood ("OK"), because the label is the only part most people
read before pressing. Emphasis is a hierarchy and not decoration: one loud button
for the thing the screen is about, quieter treatments for everything alongside
it. While the action is in flight the button says so and keeps its size, since a
control that grows by a word mid-press moves itself out from under the pointer.

The line worth defending is against the link. If activating it takes you to
another place, it is a link, even when it is painted to look like a button; if it
changes something where you already are, it is a button, even when it is painted
to look like text. The difference is not cosmetic. Links can be copied, opened in
a new tab, and are activated by Enter alone; buttons answer both Enter and Space,
and have no address to hand out. Reach for `<button>` or `<a href>` accordingly,
never a div with a click handler, because the element is what carries the role,
the focus stop, and the keyboard behaviour you would otherwise rebuild by hand.

The names collect confusion. "CTA button" is marketing's word for whichever
button a page most wants pressed, and describes a position in a funnel rather
than a behaviour. "Push button" is the older toolkit name, kept alive in
accessibility guidance to separate the plain kind from a toggle button, which
stays pressed and reports `aria-pressed`. "Action button" usually drifts in from
Material's floating action button. A radio button, despite the name, is not one
of these at all: it picks a value from a set and comes with arrow-key semantics
that a button never has.
