---
name: Accessibility annotation
slug: accessibility-annotation
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: "Notes attached to a design file that spell out the things a mockup
  cannot show: heading levels, focus order, names, roles, live regions, and alt
  text."
aliases:
  - name: a11y annotation kit
    source: community
  - name: annotation toolkit
    source: primer
  - name: design spec annotations
    source: community
  - name: focus order annotation
    source: primer
tags:
  - design-tools
relations:
  contrastWith:
    - name-role-value
  variantOf: []
  partOf: []
  seeAlso:
    - accessibility-tree
    - focus-order
    - mockup
implementations:
  - system: fluent
    name: Design accessibility specs
    url: https://fluent2.microsoft.design/accessibility
sources:
  - title: "Primer: Annotation Toolkit"
    url: https://primer.style/accessibility/tools-and-resources/annotation-toolkit/
demo: inline
exhibit: false
useWhen: handing a design over without losing the semantics
---

A mockup is a picture of a rendered result, and a good half of accessibility is not in the picture.
Nothing in a comp says whether that bold line is a level two [heading](/heading) or a styled
paragraph, what the icon button is called, which of the six controls is reached first, whether the
count that updates is a [live region](/live-region), or what the photograph should say when it
cannot be seen. Those decisions exist whether or not anyone writes them down. Annotation is the
practice of writing them down, in the file, next to the thing they describe.

The alternative is not that the decisions get skipped. It is that they get made silently, at
implementation time, by whoever is closest to the markup and furthest from the intent, usually in
whatever order the elements happened to be built in. That is where an [accessible
name](/accessible-name) becomes "button", where [focus order](/focus-order) follows the DOM instead
of the task, and where a heading hierarchy turns into a set of font sizes. None of it shows up in a
visual review, because visually the build matches the comp exactly.

What is worth annotating is short and fairly fixed: heading levels and the document outline, focus
order and any initial focus, [roles](/name-role-value) and accessible names for anything whose
label is an icon, [alt text](/alt-text) for images and the ones that are decorative, live regions
and their politeness, keyboard behaviour for custom widgets, and what happens at
[reflow](/reflow) when the layout changes. Published kits exist for all of it. Primer's annotation
toolkit and the Microsoft accessible design toolkit both ship stamps for exactly these categories,
which matters mostly because a shared vocabulary stops every designer inventing their own notation.

Two failure modes are common enough to name. The first is annotating everything, which produces a
file nobody reads: annotate what the picture cannot say, not what it already says. The second is
annotating once, at handoff, and never again, so the notes describe a design two revisions old and
the developer learns to ignore them. The healthier version treats annotations like any other spec
detail, kept beside the component in the design system so most screens inherit their semantics and
only the genuinely new parts need a note. A design system that documents the accessible behaviour
of its own components is the reason most screens need no annotation at all.
