---
name: Soft delete
slug: soft-delete
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Removing an item from view but keeping it recoverable in a trash or
  archive for a period, so deletion is reversible without a confirmation step.
aliases:
  - name: trash
    source: community
  - name: recycle bin
    source: community
  - name: archive
    source: community
  - name: deleted items
    source: community
  - name: recently deleted
    source: hig
tags:
  - errors
relations:
  contrastWith:
    - type-to-confirm
    - confirmation-dialog
    - undo
  variantOf: []
  partOf: []
  seeAlso:
    - save-for-later
    - strikethrough
implementations: []
sources:
  - title: "Cloudscape: Delete patterns"
    url: https://cloudscape.design/patterns/
demo: inline
exhibit: false
useWhen: deleted things go to a bin you can dig them out of
---

Soft delete buys back a decision after the fact. Because the item is still there,
the interface can act immediately and ask nothing, which is why the pattern
replaces a confirmation dialog rather than joining one: a reader who can undo does
not need to be asked whether they meant it. That trade is only honest if the
recovery route is real and findable, so soft delete is two mechanisms rather than
one.

The first is the grace window: an inline row or a toast, live for a few seconds,
carrying the name of what just left and a single Undo. It answers the misclick,
which is the failure it exists for, and it has to name the item, because a bare
"Deleted" is no use to someone who clicked the wrong row. The second is the holding
place: Trash, Archive, Recently deleted. It answers the mistake noticed tomorrow,
and it needs a stated retention period, a count so the reader knows there is
something in there, and both restore and permanent delete. Ship only the toast and
the pattern collapses into a nicer confirmation dialog. Ship only the bin and every
misclick becomes a trip to another screen.

Vocabulary matters here. Trash means discarded with a chance to change your mind,
so it empties on a schedule. Archive means kept on purpose but out of the way, so
it does not expire, and a system that says Archive while quietly deleting after
thirty days has misnamed the thing. Whichever word is used, the label should imply
its own reversibility, and "Delete" is a reasonable label for a soft delete only
when the recoverable bin is somewhere the reader can see.

Some deletions cannot be soft. A legal erasure request, a leaked credential, or
anything the reader was promised would be gone has to actually be gone, and a
tombstone row marked deleted is not that. Nor does soft delete rescue a
consequential destructive action: deleting a repository or a production database
takes effect elsewhere the moment it happens, so those keep an explicit guard.
Behind the interface the pattern is a flag rather than a removal, which means every
query, every count, and every uniqueness rule has to remember the flag exists. The
bug is always the same one: a deleted item still counted, still blocking a name, or
reappearing in a list that forgot to ask.
