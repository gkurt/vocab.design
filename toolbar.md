---
name: Toolbar
slug: toolbar
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A grouped row of controls acting on the current view, sharing one
  tab stop and moving focus between its items with arrow keys.
aliases:
  - name: tool bar
    source: community
  - name: action bar
    source: community
  - name: command bar
    source: fluent
tags:
  - menus
relations:
  contrastWith:
    - navigation-bar
    - button-group
    - menu-bar
    - ribbon
    - rich-text-toolbar
    - utility-bar
    - overflow-menu
    - app-bar
  variantOf: []
  partOf: []
  seeAlso:
    - title-bar
implementations:
  - system: aria-apg
    name: Toolbar
    url: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
  - system: radix
    name: Toolbar
    url: https://www.radix-ui.com/primitives/docs/components/toolbar
  - system: base-ui
    name: Toolbar
    url: https://base-ui.com/react/components/toolbar
sources:
  - title: "ARIA Authoring Practices Guide: Toolbar pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
demo: inline
exhibit: false
useWhen: a row of controls acting on what is on screen
---

A toolbar is a set of controls collected into one strip because they all act on the
same thing: the document, the selection, the list below them. The collection is the
component. Any one of its buttons would work perfectly well on its own, and putting
them in a row is what tells a reader they belong to the same subject and can be
reached in one place.

The part people underestimate is the keyboard contract. A toolbar is a **composite
widget**: it takes a single stop in the tab order, and once focus is inside it,
Left and Right arrows move between the items, with Home and End jumping to the ends.
That is the roving tabindex pattern, and it exists so that a formatting strip with
fourteen buttons does not add fourteen stops between a person and the text they were
editing. Skipping it is the most common way a toolbar is built wrong: everything
looks right and every icon is a separate stop.

The word is contested at the edges. Fluent calls the same idea a **command bar**;
plenty of teams say **action bar**. Some vocabularies use toolbar for the whole strip
across the top of a window, which is closer to what this site calls an
[app bar](/app-bar) or a [navigation bar](/navigation-bar). The test that keeps them
apart is what the controls act on: a toolbar acts on the current view, while a
navigation bar takes you to another one. Do not put `role="toolbar"` on a row of
links.

Inside the strip, keep related controls adjacent and separate the groups with a thin
rule, since the grouping is doing real work for anyone scanning it. Icon-only buttons
need accessible names and, for pointer users, [tooltips](/tooltip). Toggles carry
`aria-pressed`, and a set of mutually exclusive options is a radio group rather than
several unrelated toggles, so assistive technology reports "one of three" instead of
three separate states that happen to agree.
