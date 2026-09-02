---
name: Ribbon
slug: ribbon
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A tall tabbed toolbar that replaces menus, grouping commands into
  labelled sections with the important ones drawn larger.
aliases:
  - name: ribbon bar
    source: community
  - name: office ribbon
    source: community
  - name: fluent ribbon
    source: community
tags:
  - menus
  - platform-registers
  - windowing
relations:
  contrastWith:
    - toolbar
    - menu-bar
    - rich-text-toolbar
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Nielsen Norman Group: User interface elements glossary"
    url: https://www.nngroup.com/articles/ui-elements-glossary/
demo: inline
exhibit: false
useWhen: the tall tabbed command strip in Office style apps
---

The ribbon is Microsoft's 2007 answer to menu overload, and it is a specific enough thing to
deserve its own word. Instead of a [menu bar](/menu-bar) whose commands are hidden until you
open it, plus a thin strip of icons beneath, Office 2007 put every command on a tall surface
with tabs across the top: pick a tab, and a band of labelled groups appears, each group holding
its own little cluster of controls. The band is deliberately expensive in vertical space,
because the bet was that seeing commands beats remembering where they were filed.

Four properties define it, and dropping any of them means you have something else. It is
tabbed, so the surface swaps its whole contents rather than growing. It is multi-row, so
controls can sit above and beside one another inside a group. Its groups are named, with the
label printed under the cluster, which is the ribbon's real innovation: the group name is a
category heading that stays visible while you look at what is in it. And it has size hierarchy,
with the most-used command in each group drawn as a large icon with a label and the rest small,
so the eye lands on Paste before it lands on Format Painter.

Against a [toolbar](/toolbar) the distinction is not merely size. A toolbar is one row of
controls sharing a tab stop, all present at once, with no categories and no notion of a
current tab; the same commands the ribbon shows under Insert would be an overflow menu on a
toolbar. Against a menu bar the distinction is exposure: a menu bar is a hierarchy that costs
a click to see and almost no space to keep, and a ribbon is the same hierarchy flattened onto a
surface that costs a fifth of the window. Everything else about the ribbon follows from that
trade: contextual tabs that appear only when a table or a picture is selected, a collapse
control that hides the band until a tab is clicked, and the quick access toolbar above it for
the handful of commands you want regardless of tab.

It remains one of the most argued-about components in interface history. The gains were real
for occasional users, who could find commands they never knew existed, and the losses were real
for experts, whose muscle memory for menu paths was worth years. Microsoft's own vocabulary has
moved on (the Fluent design language calls it a command bar in newer surfaces, and the
simplified ribbon of Office 365 is one row tall by default), but the word survives everywhere
outside Redmond, and it is still the right word for any tall tabbed command surface with named
groups, whoever built it.
