---
name: Context menu
slug: context-menu
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A menu of actions for one specific object, opened on that object by
  right click, long press, or the context menu key.
aliases:
  - name: right-click menu
  - name: contextual menu
    source: hig
  - name: shortcut menu
tags:
  - menus
  - pointer
relations:
  contrastWith:
    - kebab-menu
    - dropdown
    - action-sheet
    - swipe-actions
    - secondary-click
    - radial-menu
  variantOf: []
  partOf: []
  seeAlso:
    - action-list
    - share-sheet
    - bubble-toolbar
implementations:
  - system: radix
    name: Context Menu
    url: https://www.radix-ui.com/primitives/docs/components/context-menu
sources:
  - title: "MDN: Element contextmenu event"
    url: https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event
demo: inline
exhibit: false
useWhen: actions for the exact thing you invoked them on
---

What separates a context menu from every other menu is not how it looks but what
it is attached to. It belongs to the object you invoked it on, it appears at the
pointer rather than at a fixed anchor, and its contents change with the target.
Right-click a file and it offers Rename; right-click empty space in the same
window and it offers New folder.

That is the line against a [kebab menu](/kebab-menu). Both hold secondary actions,
but a kebab is a visible trigger sitting in the layout, discoverable by looking,
and it opens in the same place every time. A context menu has no trigger at all.
Nothing on screen advertises it, which is its cost and the reason for the rule
that follows.

**Never put an action only in a context menu.** An invisible affordance cannot be
found by anyone browsing, cannot be reached on a touch device without a long press
nobody was told about, and is a dead end for keyboard and screen reader users
unless the context menu key is wired up. Treat it as an accelerator for people who
already know the action exists somewhere else.

If you build one on the web, `contextmenu` is the event, and you must call
`preventDefault()` or the browser's own menu opens over yours. Weigh that
carefully. Replacing the native menu takes away Copy, Paste, Inspect, and Open in
new tab, so it is worth doing over a canvas or a file row and rarely worth doing
over ordinary text.
