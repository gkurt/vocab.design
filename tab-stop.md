---
name: Tab stop
slug: tab-stop
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "One position in the tab sequence: a place the Tab key can reach,
  counted once even when the widget it belongs to holds many focusable parts."
aliases:
  - name: tab index position
    source: community
  - name: single tab stop
    source: aria-apg
tags:
  - keyboard
relations:
  contrastWith:
    - roving-tabindex
    - tabbable
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "ARIA APG: Developing a Keyboard Interface"
    url: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
  - title: "Erik Kroes: A glossary of web accessibility terms"
    url: https://www.erikkroes.nl/glossary/
demo: inline
exhibit: false
useWhen: counting how many Tab presses a widget costs
---

Tab does not visit every focusable element on a page. It visits stops, and a stop is a
position rather than an element: a text field is one, a link is one, and a whole toolbar
of twelve buttons is also one if it is built the way the ARIA Authoring Practices Guide
asks for. The guidance is blunt about it. The tab sequence should include only one
focusable element of a composite widget, and once the reader is inside, arrow keys move
between the parts. [Focus order](/focus-order) is the sequence itself, the order the
stops come in; a tab stop is one position within it.

Two techniques keep the count at one, and they are the same idea from different
directions. [Roving tabindex](/roving-tabindex) puts `tabindex="0"` on whichever child is
currently the active one and `tabindex="-1"` on every other, moving the pair as the arrow
keys move, so the browser's own tab sequence sees a single entry point.
[Active descendant](/active-descendant) leaves only the container in the sequence and
names the active child by id in `aria-activedescendant`, so real focus never moves at all.
Composite patterns that are expected to behave this way include the
[toolbar](/toolbar), [radio group](/radio-group), [listbox](/listbox),
[tabs](/tabs), [treeview](/treeview), [data grid](/data-grid), and
[calendar](/calendar); a [button group](/button-group) is the borderline case, since a
group of independent commands is often better left as one stop per button.

Counting stops is how a layout gets priced for someone who navigates by keyboard. A
formatting toolbar rebuilt as twelve separate stops puts twelve presses between the field
above it and the Save button below, every time, and the reader pays that toll on every
pass through the page. The same arithmetic explains why
[hidden but focusable](/hidden-but-focusable) content is such a sharp bug: an off-screen
drawer that keeps its links in the sequence spends the reader's presses on stops that show
nothing, which is exactly what [inert](/inert) exists to remove. It also explains why
[positive tabindex](/positive-tabindex) is a mistake rather than a shortcut: a positive
value does not add a stop where you want one, it promotes that element ahead of every
stop in document order.

Not everything focusable is a stop. An element carrying `tabindex="-1"` can be focused by
script, which is what [focus management](/focus-management) does after a dialog opens, but
Tab will never land on it. A disabled control leaves the sequence entirely, while a control
marked `aria-disabled` stays in it on purpose, so it can still be reached and can still say
why it cannot be used. And a stop is not the same thing as a visible
[focus ring](/focus-ring): the stop is where the keyboard goes, the ring is whether the
reader can see that it went there.
