---
name: Mouse gesture
slug: mouse-gesture
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A command issued by the shape of a pointer stroke, usually with a
  button held, so a movement stands in for a menu choice.
aliases:
  - name: rocker gesture
    source: community
  - name: gesture navigation
    source: community
  - name: stroke gesture
    source: community
tags:
  - pointer
relations:
  contrastWith:
    - marking-menu
  variantOf: []
  partOf: []
  seeAlso:
    - pointer-gestures
implementations: []
sources:
  - title: "Wikipedia: Pie menu"
    url: https://en.wikipedia.org/wiki/Pie_menu
demo: inline
exhibit: false
useWhen: a drawn stroke that means a command
---

Hold a button, drag a short line to the left, let go, and the page goes back. Nothing was aimed
at. The command came out of the shape of the movement rather than out of where it landed, which
is the whole trick: a gesture has no target to acquire, so it costs the same wherever the pointer
happens to be and takes no screen space at all. Opera shipped these in 2000 and made them
familiar to a generation of readers; today most browsers leave them to extensions, and the
vocabulary survives mainly in drawing tools, tiling window managers, and power-user add-ons.

A recognizer almost never compares the drawn curve to a stored curve. It reduces the stroke to a
sequence of cardinal directions and matches that string against a table, so left is Back, right
is Forward, and down then right is Close. Reducing rather than matching is what makes the
gesture forgiving: a wobbly stroke and a ruled one produce the same string, and the reader never
has to draw well. Two thresholds do the tuning. One says how far the pointer must travel before
a direction counts, which keeps a twitchy hand from writing a letter nobody meant, and one says
how far it must turn before a new direction is recorded, which keeps a curve from being read as
a staircase. The rocker gesture is the degenerate case of the same idea: hold the right button
and click the left one, with no travel at all.

The awkward part is the button. The right button already means the context menu, so a gesture
layer has to decide when to take it away, and the usual answer is to suppress the menu only once
the pointer has actually moved. A press that goes nowhere is still a right click; a press that
travels is a gesture. That rule is invisible and mostly correct, and it is the reason gesture
tools feel broken exactly once, on the day a stroke is too short to register and a context menu
appears instead of the command.

Touch inherited the idea and gave it edges to work against, which is how the swipe and the
edge swipe became system navigation on phones. What none of them solve is discovery. A gesture
is not drawn on the screen, nothing announces it, and a reader who does not already know it
exists will never find it, which is why gesture layers ship a cheat sheet and why a marking menu
is the friendlier relative: it draws the ring for anyone who hesitates and lets the stroke stand
alone for anyone who does not. Whatever a gesture does, some visible control must do as well,
since a command reachable only by drawing is unreachable for anyone who cannot draw.
