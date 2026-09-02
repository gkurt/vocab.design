---
name: Copy button
slug: copy-button
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A small control beside a value that copies it to the clipboard and
  confirms by turning into a tick for a second or two.
aliases:
  - name: copy to clipboard
    source: cloudscape
  - name: clipboard button
    source: chakra
  - name: copy icon
    source: community
tags: []
relations:
  contrastWith:
    - share-sheet
  variantOf:
    - microinteraction
  partOf: []
  seeAlso:
    - icon-button
implementations: []
sources:
  - title: "Cloudscape: components"
    url: https://cloudscape.design/components/
demo: inline
exhibit: false
useWhen: copying a value with one press
---

Copying is the rare action with no visible result. The clipboard is somewhere
else, the page does not change, and the value the reader wanted is still sitting
exactly where it was. That is why the confirmation is not decoration on this
control: it is the only evidence the press worked. The usual form is the button
answering for itself, the copy glyph becoming a tick and the word becoming
"Copied" for a beat or two, then quietly changing back so the affordance is ready
again.

Two details separate a good one from an annoying one. It keeps its size while it
changes, because a control that grows by a word rearranges the row under a
pointer that may be about to press it again. And it reverts on its own rather
than staying ticked, since a permanent tick stops being a report about the last
press and starts looking like a state the value is in.

The button belongs beside the thing it copies (an API key, an invoice number, a
share URL), close enough that no label is needed to say what "copy" refers to.
Icon-only versions still need an accessible name that includes the value's role,
like "Copy project ID", because "copy" alone is meaningless out of its row. The
glyph swap is invisible to a screen reader, so the confirmation has to be
announced somewhere: a small live region beside the control, or a status message,
rather than the icon alone.

Real implementations write to the clipboard through the asynchronous Clipboard
API, which can be refused (an insecure context, a denied permission, a browser
that only allows it inside a user gesture). A copy button that cannot report the
failure is worse than no button at all, so treat the rejected promise as a real
state and not as an edge case. The specimen here changes nothing outside itself:
it never touches the system clipboard, because the affordance and its confirming
beat are the term, not the transport underneath.
