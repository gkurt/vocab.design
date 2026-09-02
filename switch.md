---
name: Switch
slug: switch
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A control shaped like a sliding track that turns one setting on or
  off and applies the change the moment it is flipped, with no separate save
  step.
aliases:
  - name: toggle switch
    source: primer
  - name: toggle
    source: community
  - name: on off switch
    source: community
tags:
  - forms
relations:
  contrastWith:
    - checkbox
    - quick-settings-tile
    - toggle-button
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: aria-apg
    name: Switch
    url: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
  - system: material
    name: Switch
    url: https://m3.material.io/components/switch/overview
  - system: hig
    name: Toggle
    url: https://developer.apple.com/design/human-interface-guidelines/toggles
  - system: carbon
    name: Toggle
    url: https://carbondesignsystem.com/components/toggle/usage/
  - system: polaris
    name: Switch
    url: https://shopify.dev/docs/api/app-home/polaris-web-components/forms/switch
  - system: base-ui
    name: Switch
    url: https://base-ui.com/react/components/switch
sources:
  - title: "ARIA Authoring Practices Guide: Switch pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
  - title: "Nielsen Norman Group: Toggle-Switch Guidelines"
    url: https://www.nngroup.com/articles/toggle-switch-guidelines/
demo: inline
exhibit: false
useWhen: a setting that takes effect immediately
---

A switch is a setting, not a command. Flipping it *is* the commit: there is no Save
button waiting downstream and no Apply to forget, which is why it belongs in
preferences and control panels rather than in forms. Label it with the setting's
name (*Do not disturb*, *Two-factor authentication*) rather than with an
instruction, because the thumb's position already says which way it is set, and a
label that reads "Turn on notifications" leaves a reader working out what "off"
means.

The near neighbour is the checkbox, and the difference is when the change lands. A
checkbox states a value that something later collects, so it can sit in a group,
carry a mixed state, and be undone by never submitting the form. A switch has no
later: it is alone with one setting, it is on or off with no third state, and undo
means flipping it back. A toggle button is a third thing again, a button that stays
pressed, and it issues a command (bold this text) rather than holding a preference.

"Toggle" is the loosest word in this corner of the vocabulary. Apple and Carbon name
the component Toggle, Material, Polaris, and the ARIA Authoring Practices Guide name
it Switch, and in conversation "toggle" gets applied to anything with two states,
including toggle buttons and disclosure triggers. Say switch when you mean the
sliding on or off setting. In code, give it `role="switch"` (or a checkbox input
carrying that role) so it announces on and off rather than checked and unchecked.

The immediacy is a promise, so a switch has to keep it. If the change is slow or can
fail, either show the new state at once and roll it back with an explanation, or use
a control that admits to a save step. Leaving the thumb sitting mid-flip while a
request is in the air teaches readers that the position cannot be trusted, and that
is the one thing the shape is for.
