---
name: Accordion
slug: accordion
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A stack of headers, each expanding to reveal its own section of content.
aliases:
  - name: expansion panel
    source: material
  - name: collapsible list
    source: community
tags: []
relations:
  contrastWith:
    - disclosure
    - progressive-disclosure
    - expandable-row
    - tabs
  variantOf: []
  partOf: []
  seeAlso:
    - height-animation
implementations:
  - system: aria-apg
    name: Accordion pattern
    url: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
  - system: carbon
    name: Accordion
    url: https://carbondesignsystem.com/components/accordion/usage/
  - system: radix
    name: Accordion
    url: https://www.radix-ui.com/primitives/docs/components/accordion
sources:
  - title: "ARIA APG: Accordion pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
demo: inline
exhibit: false
useWhen: a stack of sections, each opening in place
---

The discrimination here is arithmetic, and it is worth getting right because three
words sit on top of each other. One header over one region is a
[disclosure](/disclosure), and it answers to nobody: nothing on the page coordinates
it. A stack of those headers, presented as one component with one set of rules, is an
accordion. And [progressive disclosure](/progressive-disclosure) is neither of them, it
is the principle both can serve, the decision about what waits behind a second step at
all. You can build progressive disclosure with an accordion, with a wizard, or with a
link to another page.

The policy question every accordion has to answer is whether more than one section may
be open at once. The instrument the name comes from could only be in one shape at a
time, and early implementations followed it: opening a section closed whichever one was
open. Most now allow any number, and that is usually the better default, because
forcing single-open takes something real away from the reader. They can no longer put
two sections side by side and compare them, and the section they were reading vanishes
because they opened a different one. Keep single-open for the cases where the sections
are genuinely alternatives rather than parts of one document, and where losing the
previous section costs nothing.

The markup is a list of header buttons, each carrying `aria-expanded` and an
`aria-controls` pointing at the region it owns, with the region hidden outright rather
than merely made transparent. Each header is its own tab stop, and the ARIA Authoring
Practices Guide treats arrow keys between headers as optional rather than required,
which is the opposite of [tabs](/tabs): a tab set is one stop with arrows inside it,
while an accordion is a plain stack of buttons that Tab walks through. The rotating
[chevron](/chevron) is the visual half of `aria-expanded` and never a substitute for it.
An [expandable row](/expandable-row) is the same mechanism inside a table, where the
revealed content belongs to one row of data rather than to a section of a page.

Two things go wrong in practice. The first is that an accordion sitting inside a page
that already has few sections is just a page with its content hidden: if almost everyone
opens almost everything, the stack was a table of contents with an extra click. The
second is the animation. Growing a section to fit its content is the exact problem
[height animation](/height-animation) is about, and the cheap fix, a transition on
`max-height` to a guessed maximum, is why so many accordions finish their open early and
snap the rest of the way.
