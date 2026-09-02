---
name: Overflow menu
slug: overflow-menu
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A menu holding the actions that do not fit in the visible interface,
  opened from one compact trigger.
aliases:
  - name: more menu
  - name: more actions
tags:
  - menus
relations:
  contrastWith:
    - priority-plus-navigation
    - toolbar
    - menu-button
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: carbon
    name: Overflow menu
    url: https://carbondesignsystem.com/components/overflow-menu/usage/
sources:
  - title: Overflow menu, Carbon Design System
    url: https://carbondesignsystem.com/components/overflow-menu/usage/
demo: inline
exhibit: false
useWhen: the actions that did not fit, behind one trigger
---

What makes a menu an overflow menu is what is in it, not what its trigger looks
like. The contents are defined by subtraction: these are the actions that belong to
the same object as the visible ones and lost the competition for room. That is why
the same component is a [toolbar](/toolbar) overflow in one place and a row overflow
in another, and why its list is rarely stable. Add a button to the toolbar and an
action falls into the menu; widen the window and one climbs back out.

The trigger is a detail, and the folk names all describe it rather than the menu.
Three dots, an ellipsis, a chevron, or the word "More" are interchangeable, and
choosing between them is a question of how much width the row can spare. Because the
trigger is usually a glyph, its accessible name is the part most often missed: a
control that reads as nothing has hidden every action behind it from anyone not
using a mouse.

Three rules keep an overflow menu honest. Nothing may live only in it, so every
action inside also has a route through a menu bar, a details panel, or a keyboard
shortcut, because a reader who never opens the trigger should not be locked out of
half the product. The order inside follows the same priority that decided what fell
in, so the first item is the one that most nearly made the cut. And the menu holds
actions for one object, not a junk drawer: settings, help, and account links that
have nothing to do with the row belong in their own control, not in the same three
dots.

The neighbour worth separating is [priority plus navigation](/priority-plus-navigation),
which is a rule rather than a component. Priority plus decides which items are
visible at the current width and recalculates as that width changes; the overflow
menu is the place the losers go. A [menu button](/menu-button) is the other near
miss: it names the trigger's relationship to a menu, whatever that menu holds, so
every overflow menu has a menu button in front of it while plenty of menu buttons
open menus that overflowed from nothing at all.
