---
name: Direct manipulation
slug: direct-manipulation
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Acting on an object by handling the object itself, dragging,
  resizing, or typing into it, rather than describing the change in a separate
  control.
aliases:
  - name: in-place manipulation
    source: community
  - name: WYSIWYG
    source: ui-patterns
  - name: handles and grips
    source: community
  - name: on-canvas editing
    source: community
tags:
  - canvas
  - dragging
relations:
  contrastWith:
    - inline-edit
  variantOf: []
  partOf: []
  seeAlso:
    - affordance
    - drag-and-drop
implementations: []
sources:
  - title: "GoodUI: Try Direct Manipulation instead of contextless menus"
    url: https://goodui.org/
demo: inline
exhibit: false
useWhen: you change the thing by grabbing the thing
---

Ben Shneiderman named this in the early 1980s, and his three conditions have not
aged: the objects of interest are continuously represented on screen, they are
acted on by physical gestures rather than by typed syntax, and the operations are
rapid, incremental, and reversible, with the result visible immediately. Dragging a
rectangle is direct. Selecting a rectangle, opening a position dialog, typing 240,
and pressing Apply is the same edit described from a distance.

What direct manipulation buys is the shortest possible loop between intent and
feedback. There is no naming step, so nothing has to be identified by a coordinate
or a row number; the reader points at the thing. There is no commit step, so a
wrong move is visible while it is still a move rather than after it has been
applied. That is why the gestures are worth so much when they are paired with
[undo](/undo): if any act can be taken back, the reader can find the right answer
by trying, and trying is much faster than calculating.

It is a principle rather than a component, and the site's components are its
vocabulary. Dragging an object to a new place is
[drag and drop](/drag-and-drop); the small ridged patch that says an object is
draggable at all is a [drag handle](/drag-handle); editing a value where it is
displayed instead of in a form is [inline editing](/inline-edit). A
[slider](/slider) is a borderline case worth thinking about: the value is not the
object, but the thumb is a continuous representation of it, which is exactly why a
slider feels so much more direct than the number field beside it.

Indirection is not the enemy, and treating it as one is how canvases get hard to
use. Handles cannot hit a target one pixel wide, cannot align forty objects at
once, cannot be reached without a pointer, and cannot be discovered by browsing,
because a gesture leaves no trace of itself the way a menu item does. The good
answer is almost always both: the handle for the gross move and the number field
for the exact one, kept in sync, so nobody has to choose between fast and precise.
Where only one can exist, remember that the numeric route is usually the one that a
keyboard, a screen reader, and a script can all take.
