---
name: Fluid hybrid
slug: fluid-hybrid
category: layout
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: "A mail layout that reflows with no media query at all: percentage
  widths held in by max-width, with fixed-width ghost tables that only Outlook
  can see."
aliases:
  - name: hybrid email design
    source: litmus
  - name: ghost table
    source: community
  - name: fluid email
    source: community
tags:
  - email
  - screen-size
relations:
  contrastWith:
    - switcher
  variantOf:
    - responsive-web-design
  partOf: []
  seeAlso:
    - table-based-layout
implementations: []
sources:
  - title: "Email on Acid: a fluid hybrid design primer"
    url: https://www.emailonacid.com/blog/article/email-development/a-fluid-hybrid-design-primer/
  - title: "Litmus: understanding responsive and hybrid email design"
    url: https://www.litmus.com/blog/understanding-responsive-and-hybrid-email-design
  - title: "Cerberus: hybrid responsive patterns"
    url: https://www.cerberusemail.com/hybrid-responsive
demo: inline
exhibit: false
useWhen: a mail that reflows without media queries
---

Responsive design has three ingredients and mail cannot rely on one of them. A meaningful share
of clients discard media queries, or apply them against a window that has nothing to do with the
space your mail is in, so a layout whose only reflow lives in a `@media` block renders as a
desktop layout squeezed onto a phone. The fluid hybrid answer is to move the decision into the
box. Columns are declared at `width: 100%` with a `max-width` ceiling and a `min-width` floor,
set to `display: inline-block`, and left to wrap. A column's width is its percentage clamped
between the two, so two of them sit side by side while twice that width still fits across the
container, and the moment it does not, the second one drops to its own line. No breakpoint is
named anywhere, and nothing has to know how wide the window is.

Then there is Outlook. Several desktop versions render through the Word engine, which ignores
`max-width` and treats `display: inline-block` as nothing at all, so the fluid rules leave it
with a single stretched column. It is handed its own layout instead: fixed-width tables written
inside an `<!--[if mso]>` conditional comment, invisible to every other client, which is where
the name **ghost table** comes from. The mail therefore contains two layouts, one fluid for
everybody and one fixed for the engine that cannot do fluid, and the fixed one never reflows
because the engine it is for is only ever on a desktop. Cerberus published the canonical set of
these patterns, and [Email on Acid](https://www.emailonacid.com/blog/article/email-development/a-fluid-hybrid-design-primer/)
and [Litmus](https://www.litmus.com/blog/understanding-responsive-and-hybrid-email-design) both
document the same skeleton.

The web has a tidier cousin. A [switcher](/switcher) flips a row to a column at a threshold
compared against the container's own width, which is the same idea reached by a different route:
a flex-basis expression, or a container query where support allows. The difference is what each
one is for. A switcher is a layout primitive, one rule with no fallback and nothing to hide from
any renderer. A fluid hybrid is a technique for a hostile medium: it accepts wrapping rather than
choosing a threshold, ships a second fixed layout for the client that cannot follow the first,
and lives inside a [table based layout](/table-based-layout) because everything in mail does.

Two cautions. The ceiling and the floor are the design, and they are not decoration: twice the
ceiling is where the mail stacks, and the floor is how narrow a column is allowed to get before
it refuses, which in some clients is what forces the stack in the first place. Pick both from
what the content needs, because between them they do the job a breakpoint used to. And the two
layouts drift. A change made to the fluid half and not to the ghost half is invisible in
every preview except the one client nobody tests, which is the standing tax on the technique and
the reason to keep the two halves next to each other in the source.
