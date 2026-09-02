---
name: Dropdown
slug: dropdown
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The loose everyday word for any panel that opens downward from a
  trigger, whatever the panel holds and whatever the trigger does with it.
aliases:
  - name: drop-down
  - name: dropdown menu
tags:
  - forms
  - menus
  - overlays
relations:
  contrastWith:
    - select
    - combobox
    - menu-button
    - context-menu
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: radix
    name: Dropdown Menu
    url: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
  - system: carbon
    name: Dropdown
    url: https://carbondesignsystem.com/components/dropdown/usage/
sources:
  - title: Dropdown Menu, Radix Primitives
    url: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
  - title: Dropdown, Carbon Design System
    url: https://carbondesignsystem.com/components/dropdown/usage/
demo: inline
exhibit: false
useWhen: the loose word for anything that opens downward
---

This entry exists because the word is contested, not because the widget is unnamed.
A dropdown is a shape: something small that you press, and a panel that appears
below it. That is the whole of what the word promises. It says nothing about whether
the panel holds values or verbs, whether the trigger keeps what you choose, or
whether you can type into it, which is why two people using the word confidently can
be describing two different components.

Almost everything called a dropdown is really one of three things. If the panel holds
values and the trigger afterwards reads back the one you picked, it is a
[select](/select). If the panel holds commands and the trigger reads the same after
you choose, the trigger is a [menu button](/menu-button) and the panel is its menu,
often built from an [action list](/action-list). If there is a text field you can
type into and the list narrows as you type, it is a [combobox](/combobox). A
[context menu](/context-menu) is the near miss that proves the geometry is the whole
of the word: it holds commands like a menu but has no trigger to drop from, appearing
at the pointer instead, so nobody calls it a dropdown.

The loose word survives anyway because the geometry is real and worth naming. Two
controls that behave nothing alike still share a placement problem: the panel has to
be anchored to the trigger, has to flip above it near the bottom of the viewport, has
to be out of flow so opening it does not shove the layout around, and has to be
dismissed the same three ways (choose, Escape, click outside). Every design system
ends up with one positioning primitive serving all of them, and "dropdown" is the
name that primitive usually gets. Radix even keeps the loose word for the precise
thing: its Dropdown Menu is a menu button plus a menu, nothing else. When the panel
outgrows one column and shows a whole section of a site at once, it has become a
[mega menu](/mega-menu); when the options form a tree explored one level at a time,
a [cascader](/cascader).

The practical rule is short. In conversation, dropdown is fine and everyone will
follow you. In a ticket, a spec, a component name, or an accessibility review, use
the precise word, because the three candidates have three different keyboard
contracts and three different ARIA shapes, and a ticket that says "fix the dropdown"
does not say which one is owed. If you inherit a component actually named Dropdown,
read its markup before you trust the name: `role="menu"` and `aria-haspopup="listbox"`
are the two answers, and plenty of libraries ship the first while documenting the
second.
