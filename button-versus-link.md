---
name: Button versus link
slug: button-versus-link
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: "The rule that decides which element to use: a link goes somewhere,
  a button does something, and the choice sets the keyboard, the cursor, and the
  announced role."
aliases:
  - name: links and buttons
    source: primer
  - name: link-button
    source: primer
  - name: div button
    source: community
  - name: fake button
    source: community
  - name: call-to-action link
    source: primer
tags:
  - keyboard
relations:
  contrastWith:
    - link
    - ghost-button
    - nested-interactive
    - link-purpose
    - bulletproof-button
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Primer: Links and buttons"
    url: https://primer.style/accessibility/design-guidance/links-and-buttons/
demo: inline
exhibit: false
useWhen: a control looks like a button but navigates
---

The test is one question: after this control is used, is the reader somewhere else? If
yes it is a link, and it needs an `href`. If no, if something happened right here, it is
a button. Everything else follows from that answer, and none of it follows from how the
control is painted.

What an `href` buys is a whole set of behaviours nobody reimplements convincingly.
Middle click and modifier click open the destination in a new tab, the context menu
offers to copy the address, the status bar shows where it goes before it is pressed,
the browser remembers it as visited, and a crawler can follow it. An anchor without an
`href` has none of that: it is not in the tab order, it has no link role, and it is a
`<span>` that happens to be blue. A `<button>` brings its own set: it fires on Enter and
on Space, it can be disabled, it can submit or reset a form, and it announces as a
button, which tells a screen reader user that pressing it will change something here
rather than take them away.

The two mistakes are mirror images. A `<div>` with a click handler dressed as a button
reaches nobody using a keyboard and announces as nothing, which is the version ARIA
tries to patch with `role="button"` and `tabindex="0"` and never quite finishes, since
no attribute makes a key press activate anything. The subtler mistake is the anchor used
as a button: it navigates on Enter but ignores Space, and the reader who middle clicks
it gets a new tab full of nothing, or the page's own address again.

Looks are not part of the decision. A link styled as a big filled call to action is
completely fine, and so is a button drawn as plain underlined text, as long as the
element underneath matches what actually happens. If you find yourself unable to answer
the question, the honest tie-breakers are: it changes the address bar, so it is a link;
it opens a menu, a dialog, or a disclosure right here, so it is a button; it posts
something to a server, so it is a button in a form. And if a control has to be reachable
while it cannot be used, keep it in the tab order with `aria-disabled` rather than
removing it from the page's keyboard path altogether.
