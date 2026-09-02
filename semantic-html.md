---
name: Semantic HTML
slug: semantic-html
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Reaching for the element that already means what you mean, so name,
  role, keyboard behaviour, and platform conventions arrive for free instead of
  being rebuilt.
aliases:
  - name: native semantics
    source: primer
  - name: implicit role
    source: primer
  - name: use the platform
    source: community
  - name: div soup
    source: community
  - name: divitis
    source: community
tags:
  - assistive-tech
  - web-platform
relations:
  contrastWith:
    - first-rule-of-aria
    - name-role-value
  variantOf: []
  partOf: []
  seeAlso:
    - heading-hierarchy
    - accessibility-trait
    - accessibility-tree
    - reader-mode
implementations:
  - system: polaris
    name: Semantic markup
    url: https://github.com/Shopify/polaris/blob/main/documentation/Accessibility.md
sources:
  - title: "Primer: Semantic HTML and ARIA"
    url: https://primer.style/accessibility/design-guidance/semantic-html-and-aria/
demo: inline
exhibit: false
useWhen: choosing between a native element and a rebuilt one
---

Every HTML element arrives with meaning attached. A `<button>` has the role button, it
is in the tab order, it fires on Enter and on Space, it takes its name from its own
text, it participates in a form, and on every platform it already looks and behaves
like the thing users press. A `<div>` with a click handler has none of that. It has an
implicit role of generic, which is a polite way of saying it is invisible to anyone
navigating by role, and it answers exactly one input: a mouse click.

Div soup is what happens when the meaning is rebuilt by hand, and the rebuild is
almost never finished. The usual result is a control that a screen reader announces as
nothing, that keyboard users cannot reach, that ignores Space, that has no disabled
state, and that a browser's own find-in-page and form autofill walk straight past.
ARIA can put some of it back: `role="button"` restores the role, `tabindex="0"`
restores the tab stop. It restores no behaviour at all. Nothing in ARIA makes a key
press activate anything, which is why "no ARIA is better than bad ARIA" is the first
rule of the ARIA spec's own authoring practices, and why the shortest correct answer
to most ARIA questions is a native element.

The same argument runs through the document. `<header>`, `<nav>`, `<main>`, and
`<footer>` are landmarks, and landmarks are the fastest way to move around a page
with a screen reader. Headings form the outline. A `<ul>` tells the reader how many
items are coming before they commit to listening. A `<table>` with real `<th>` cells
lets a reader ask which column they are in. Replace any of those with styled divs and
the page still looks correct while every one of those shortcuts disappears.

Native elements do run out. A `<select>` is famously hard to style, `<input type="date">`
varies by platform, and some interactions have no element at all: there is no HTML
combobox, no tabs, no tree. That is what the ARIA patterns are for, and it is real
work, which is the point. Rebuilding is a decision with a cost, so it is worth paying
only where the platform genuinely has nothing, and never as the default way to make a
box you can click.
