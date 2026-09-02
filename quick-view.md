---
name: Quick view
slug: quick-view
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Opening a summary of an item over the list it came from, so the
  reader can inspect it and return without losing scroll position or filters.
aliases:
  - name: quick look
    source: hig
  - name: peek
    source: community
  - name: preview modal
    source: community
  - name: item preview
    source: community
  - name: hover preview
    source: community
tags:
  - commerce
  - overlays
relations:
  contrastWith:
    - modal-dialog
    - hover-card
    - lightbox
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: peeking at an item without leaving the list
---

Quick view exists because a list is expensive to rebuild in the reader's head. Someone
scanning a catalogue has filters applied, a scroll position, and a mental shortlist of
three or four candidates, and following a link to a detail page throws all of that away
for one question: is this the right size, is it in stock, how much is it really. The
pattern answers the question in place and hands the list straight back, which is why it
is worth building even though the detail page already exists.

The content is a summary, not a copy of the page. A working quick view carries the
picture, the name, the price, the one or two facts that decide the question, and a single
primary action such as add to bag or open the full record. Anything more and it becomes a
second detail page that has to be maintained alongside the first, drifting out of sync
until the two disagree about the price. Because it is a summary, it needs a way through
to the whole thing, and that link should keep the list underneath so returning is still
free.

It looks like a [modal dialog](/modal-dialog) and is often built as one, but the two ask
for different things. A modal dialog interrupts to get a decision and its dismissal is a
choice with consequences, while a quick view interrupts nothing: the reader opened it to
look, and closing it is the expected ending rather than a cancelled action. That is why a
quick view gets a plain close, an Escape, and a click outside, and never a confirmation
about leaving. A [hover card](/hover-card) sits on the other side: it appears from a
pointer resting somewhere rather than from a decision, and it leaves once the pointer
moves on. Quick view is deliberate, opened by a real click and dismissed by one.

Two failures are common. The first is a quick view opened by hover, which turns every
pass over a grid into a slideshow of surfaces the reader did not ask for, and which no
touch device can produce at all. The second is losing the list anyway: a surface that
reloads the page behind it, resets the filters, or returns the reader to the top of the
results has spent the pattern's whole budget and delivered none of it. Keep the item's
identity in the URL so a peek can still be shared or reloaded, and keep the list exactly
as it was found.
