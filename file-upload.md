---
name: File upload
slug: file-upload
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A control that takes files, by opening the system picker from a
  button or by accepting a drop into a marked area.
aliases:
  - name: file input
    source: cloudscape
  - name: file picker
    source: community
  - name: upload
    source: ant-design
  - name: file dropzone
    source: cloudscape
tags:
  - dragging
  - forms
relations:
  contrastWith:
    - drop-zone
    - file-attachment
    - image-well
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Cloudscape components
    url: https://cloudscape.design/components/
demo: inline
exhibit: false
useWhen: the form takes files rather than text
---

A file upload is the one control in a form that reaches outside the browser. Every
other field takes what the reader types; this one asks the operating system for a
handle on something they already have, which is why it has two routes into it. The
button opens the system picker, and the marked area accepts a file released onto
it. Both are the same control, and shipping only the second one is the common
mistake: a drop target is a gesture, and a gesture with no button beside it is
unreachable by keyboard and invisible to anyone who does not already know it is
there.

The part people underestimate is everything after the file arrives. A chosen file
needs a name, a size, and a state, because "did that work" is the question the
reader is left holding: uploading with a determinate bar if the size is known,
done, or failed with a reason and a way to try again. Each of those states has to
live in room the control already reserved, or the form jumps every time a transfer
ticks over.

Constraints belong in the open, not in the error. Say the accepted types and the
size ceiling next to the control, enforce them on selection rather than after a
transfer has run, and name what was wrong with the file that was rejected. If more
than one file can be chosen, the list becomes the interface: each row removable on
its own, with the total counted where the reader can see it.

The vocabulary is split across the two halves. Cloudscape calls the whole thing a
file input and the region a file dropzone; Shopify's Polaris names the region
[drop zone](/drop-zone) and treats the button as part of it; Ant Design just calls
it Upload. Drop zone is the more precise word for the target alone, and file
upload is the word for the control that owns it.
