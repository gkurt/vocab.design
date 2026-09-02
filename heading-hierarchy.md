---
name: Heading hierarchy
slug: heading-hierarchy
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The nested outline formed by heading levels, navigated directly by
  assistive technology and broken by skipping a level or picking a level for its
  size.
aliases:
  - name: heading levels
    source: community
  - name: heading structure
    source: webaim
  - name: document outline
    source: community
  - name: skipped heading level
    source: community
  - name: headings and labels
    source: wcag
  - name: section headings
    source: wcag
tags:
  - assistive-tech
  - content-design
relations:
  contrastWith:
    - type-scale
    - landmark
    - heading
    - page-title
  variantOf: []
  partOf: []
  seeAlso:
    - semantic-html
    - rotor
    - layer-cake-pattern
    - table-of-contents
implementations:
  - system: polaris
    name: Heading hierarchy
    url: https://github.com/Shopify/polaris/blob/main/documentation/Accessibility.md
  - system: fluent
    name: Structure, hierarchy, and navigation
    url: https://fluent2.microsoft.design/accessibility
sources:
  - title: "WCAG 2.2: Headings and Labels"
    url: https://www.w3.org/TR/WCAG22/#headings-and-labels
  - title: A11y Project checklist
    url: https://www.a11yproject.com/checklist/
demo: inline
exhibit: false
useWhen: structuring a page so it can be skimmed by heading
---

Headings are the table of contents a page never printed. Screen readers expose them
as a list, and jumping between them is how most experienced users read a long page:
pull up the headings, pick the one that sounds right, land there. That list is built
from the levels alone, so `h1` through `h6` are not six sizes of bold text. They are
the depth of each section in an outline, and the words in them are the only clue a
reader has about what is inside.

Two things break the outline, and they usually happen together. The first is skipping
a level: an `h1` followed by an `h3` leaves a rung missing, and a reader who was
counting depth now has to guess whether the section is a sibling or a child. The
second is the cause of the first. Someone wants smaller text, picks the level whose
default size looks right, and the outline quietly reorganizes itself around a
typographic decision. Size belongs to CSS. Level belongs to structure, and the two
are allowed to disagree.

The practical rules are short. One `h1` that names the page. Every step down goes one
level at a time, while steps back up may jump as far as they like, because closing
three sections at once is normal. Headings say what their section is about in words
that still work read out of context, which is what WCAG's Headings and Labels
criterion is asking for: "More" and "Details" fail that test in a list of twelve
headings. And a `<section>` does not renumber anything. The HTML outline algorithm
that would have made nesting compute levels for you was specified, never implemented
by a single browser or screen reader, and eventually removed, so the levels you write
are the levels the reader gets.

The fastest audit is to read only the headings. Any browser extension, or the
headings list in a screen reader, will show them as a tree. If that tree reads as a
sensible summary of the page, the hierarchy is doing its job. If it has holes, repeats
itself, or contains a heading over something that is not a section, the page is
describing a structure it does not have.
