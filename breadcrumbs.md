---
name: Breadcrumbs
slug: breadcrumbs
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A trail of links showing the path from the top of a hierarchy down
  to the current page, with every level above it clickable on the way back up.
aliases:
  - name: breadcrumb trail
  - name: breadcrumb
    source: aria-apg
  - name: path bar
    source: macos
  - name: crumbs
tags:
  - navigation
relations:
  contrastWith:
    - current-page-indicator
  variantOf: []
  partOf: []
  seeAlso:
    - page-title
implementations:
  - system: aria-apg
    name: Breadcrumb
    url: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
  - system: fluent
    name: Breadcrumb
    url: https://fluent2.microsoft.design/components/web/react/core/breadcrumb/usage
  - system: carbon
    name: Breadcrumb
    url: https://carbondesignsystem.com/components/breadcrumb/usage/
sources:
  - title: "ARIA Authoring Practices Guide: Breadcrumb pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
demo: inline
exhibit: false
useWhen: showing where a page sits in a hierarchy
---

A breadcrumb trail answers two questions at once: where am I, and what is above
me. It is secondary navigation, never the primary kind, and it only earns its
space when the hierarchy runs deeper than two levels. The first crumb is the
root, the last is the page being read, and everything between is a way back up.

By convention the current page sits last and is not a link, carrying
`aria-current="page"` so assistive technology names it as the place you are. The
trail belongs in a labelled `nav` landmark, and the levels belong in an ordered
list, because the order is the meaning. Separators (a slash, a chevron) are
decoration and are hidden from screen readers. When the trail outgrows its room,
the middle collapses into an overflow menu; the first and last crumbs stay.

Breadcrumbs are regularly confused with a step indicator, which looks similar and
says something else: steps describe progress through a task, crumbs describe
position in a structure. They are not a back button either. Back retraces the
route you actually took, while a breadcrumb draws the shape of the site, which may
be a path you never walked (arriving from search drops you three levels deep with
no history behind you).

The name comes from Hansel and Gretel, whose crumbs were meant to lead them home
and were eaten by birds. The metaphor is imperfect in the same way the pattern
often is: the trail in the tale records where you have been, while the one in an
interface records where the page sits. macOS is more literal about it, calling the
file system version a path bar (a path control, to developers).
