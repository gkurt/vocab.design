---
name: Tabbable
slug: tabbable
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "Reachable by the Tab key, as opposed to merely focusable: an
  element with tabindex of -1 can take focus from script but never from Tab."
aliases:
  - name: focusable vs tabbable
    source: community
  - name: programmatically focusable
    source: community
  - name: sequentially focusable
    source: html
tags:
  - keyboard
relations:
  contrastWith:
    - tab-stop
    - positive-tabindex
    - focusable-disabled
  variantOf: []
  partOf: []
  seeAlso:
    - focusable-scroll-region
implementations: []
sources:
  - title: "MDN: tabindex"
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex
  - title: "Eric Eggert: Two different kinds of focusable UI elements"
    url: https://yatil.net/blog/focusable-ui-elements
  - title: "TetraLogical: When to use tabindex=0"
    url: https://tetralogical.com/blog/2024/04/04/when-to-use-tabindex-0/
demo: inline
exhibit: false
useWhen: distinguishing script focus from Tab reachability
---

Two properties, one attribute, and endless confusion. Focusable means an element can hold focus
at all. Tabbable, which the HTML specification calls sequentially focusable, means the Tab key
will stop there while walking the page. Every tabbable element is focusable; plenty of focusable
elements are not tabbable. `tabindex="-1"` is precisely the pair "yes to focus, no to Tab", and
`tabindex="0"` is "both, in document order".

The distinction earns its keep as soon as you manage focus yourself. A dialog's heading, a panel
that has just opened, an error summary, the results region a search updated, the target of a skip
link: all of these want `.focus()` pointed at them so the next thing a screen reader reads is the
thing that changed, and none of them wants to be an extra Tab stop for everybody else forever
after. `tabindex="-1"` is how [initial focus](/initial-focus) is placed on something that is not
a control. It is also how a composite widget hides its inactive parts from Tab while the arrow
keys still reach them, which is the whole mechanism behind a roving tabindex.

Two neighbours mark the boundaries. [Positive tabindex](/positive-tabindex) is the failure on the
other side of zero: it does not just add an element to the sequence, it jumps it to the front of
the whole page and breaks [focus order](/focus-order) for every element around it.
[Inert](/inert) is the stronger tool for the opposite job: `tabindex="-1"` removes an element from
the Tab sequence but leaves it clickable and still findable by a screen reader in browse mode,
while `inert` takes the whole subtree out of interaction and out of the accessibility tree.
Removing something from the Tab sequence is not the same as hiding it.

The mistake this word exists to prevent is a check that reads "can it be focused?" and concludes
"then it is reachable". `element.focus()` succeeding proves nothing about whether a keyboard user
can ever get there. Walk the interface with Tab and count the stops. Anything you can only reach
by script is something a keyboard user cannot reach at all, and if it is a control, that is a
2.1.1 failure however focusable it is.
