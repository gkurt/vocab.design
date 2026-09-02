---
name: Divider
slug: divider
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A thin line separating groups of content, decorative when the
  grouping is already clear and semantic when it is the only cue.
aliases:
  - name: separator
    source: aria-apg
  - name: rule
  - name: horizontal rule
  - name: hr
tags:
  - spacing
relations:
  contrastWith:
    - outline-color
    - splitter
    - zebra-striping
    - keyline
  variantOf: []
  partOf: []
  seeAlso: []
implementations:
  - system: fluent
    name: Divider
    url: https://fluent2.microsoft.design/components/web/react
  - system: base-ui
    name: Separator
    url: https://base-ui.com/react/components/separator
  - system: polaris
    name: Divider
    url: https://shopify.dev/docs/api/app-home/polaris-web-components
sources:
  - title: "Fluent 2: web components"
    url: https://fluent2.microsoft.design/components/web/react
demo: inline
exhibit: false
useWhen: a line that groups content by separating it
---

A divider groups by separating. The line itself carries no information: what it
does is tell a reader that the things above it and the things below it are two
sets rather than one run. That makes it a grouping device with a negative
signature, and it explains why dividers are so easy to overuse. A rule between
every row does not create groups, it creates a table of one-item groups, and the
eye stops reading the lines as meaningful at about the third one.

Space does the same job, usually better. If a generous gap already makes the
grouping obvious, the line is decoration and can be deleted with nothing lost.
The line earns its place where space is scarce (a dense menu, a settings list, a
toolbar) or where the surface cannot afford the room that a convincing gap would
take.

Whether a divider means anything to assistive technology is a decision, not an
accident. Where the line is the only signal that the grouping exists, it should
be exposed (`role="separator"`, or an `<hr>`); where a heading, a landmark or a
labelled group already says the same thing, the line is presentational and should
be hidden, so a screen reader is not read a series of separators nobody needed.

Two variants show up often enough to name: an inset divider, which stops short of
the container edge to align with the content rather than the box, and a vertical
one, which needs an explicit orientation because assistive technology cannot see
which way a one-pixel box is pointing.
