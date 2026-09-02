---
name: Data table
slug: data-table
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: "A table built for working with data rather than reading it:
  sortable columns, selectable rows, and controls that act on the rows you
  select."
aliases:
  - name: table
    source: aria-apg
  - name: index table
    source: polaris
  - name: list view
    source: community
  - name: grid
    source: community
tags:
  - tables
relations:
  contrastWith:
    - list
    - comparison-table
    - data-grid
    - treegrid
    - table-based-layout
  variantOf: []
  partOf: []
  seeAlso:
    - density
    - chart-description
    - table-header-association
    - description-list
    - zebra-striping
implementations:
  - system: aria-apg
    name: Grid (interactive tabular data)
    url: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
  - system: carbon
    name: Data table
    url: https://carbondesignsystem.com/components/data-table/usage/
  - system: shadcn
    name: Data Table
    url: https://ui.shadcn.com/docs/components/data-table
sources:
  - title: Data table, Carbon Design System
    url: https://carbondesignsystem.com/components/data-table/usage/
  - title: "ARIA Authoring Practices Guide: Grid pattern"
    url: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
demo: inline
exhibit: false
useWhen: rows of data you sort, select and act on
---

A plain table is read. A data table is worked. The moment people need to reorder
rows by a column, pick some of them out, and run something on what they picked, the
markup stops being a block of prose in a grid and becomes a small application:
header cells turn into controls that carry a sort direction, rows carry a selected
state, the header stays put while the body scrolls, and a bar above or below the
rows reports how many are selected and offers the actions that apply to them.

Two decisions separate a good one from a bad one. Sorting and filtering must run
over the whole set, not over the page of rows that happens to be on screen, or the
control quietly lies about what it did. And selection must survive whatever sorting
does next: picking three invoices and then sorting by amount should leave the same
three invoices picked, wherever they land. The demo here sorts a column and holds a
selection across the reordering for exactly that reason.

The accessibility vocabulary is where the aliases come from. A static tabular
structure is `role="table"`, which is the name the ARIA Authoring Practices Guide
gives it; once the cells are interactive and arrow keys move between them, the same
markup becomes `role="grid"`, documented as a separate pattern. That is why people
say "grid" for this component and why "data grid" reads as the heavier end of the
family: spreadsheet behaviour, inline cell editing, frozen columns, virtualized
scrolling. Shopify's Polaris calls its version an index table, and "list view" is
inherited from desktop file managers, where it names the columned view rather than
the icon one.

Reach for something else when the rows are not comparable across columns. If each
record is a paragraph of mixed shapes (an avatar, a title, a timestamp, a status),
a list of rows reads better than a table whose columns are mostly empty, and if
there is only one attribute worth showing, a plain list is the honest answer.
