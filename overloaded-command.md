---
name: Overloaded command
slug: overloaded-command
category: pattern
status: published
created: 2026-08-25T00:00:00.000Z
modified: 2026-08-25T00:00:00.000Z
definition: One command word or icon wired to different outcomes depending on
  where it sits, so having used it once teaches the reader nothing about the
  next one.
aliases:
  - name: overloaded control
    source: community
  - name: overloaded icon
    source: nngroup
  - name: overloaded button
    source: community
tags:
  - menus
  - perception
relations:
  contrastWith:
    - consistent-identification
    - split-button
  variantOf: []
  partOf: []
  seeAlso:
    - signifier
implementations: []
sources:
  - title: "NN/g: Overloaded vs. Generic Commands"
    url: https://www.nngroup.com/articles/overloaded-vs-generic-commands/
demo: inline
exhibit: false
useWhen: the same label doing different jobs in different places
---

A command is overloaded when the same word, or the same icon, is wired to genuinely different
outcomes in different places. The toolbar says Home and means the workspace dashboard; the sidebar
says Home and means the reader's own files. Both are defensible on their own. Together they are a
word that has stopped predicting anything, so the reader who learned one has learned nothing about
the other and has to find out by pressing.

The failure is a learning failure rather than a labelling one, which is why it survives every review
that reads the screens separately. Nobody writes an overloaded command deliberately: two teams ship
two features a year apart, each picks the most natural word for its own job, and the collision only
exists in the head of somebody who uses both. Icons make it worse, because an icon carries less
meaning to begin with and a star is favourite here, rating there, and mark as important in the third
place, with nothing on screen to say they are different.

The counterweight, in Nielsen's pairing, is the generic command: one command that means conceptually
the same thing everywhere and simply acts on whatever is in front of it, the way Print, Undo and
Find do. Generic is not vague. It is a single meaning with a local object, and that is exactly the
property an overloaded command lacks. So the repair is usually not to invent a third word but to
decide which of the two jobs owns the name and rename the other one honestly, even where the honest
name is longer.

When two jobs really do belong to one place, say so in the control instead of in the label. A
[split button](/split-button) puts a default action beside a divider and a menu, which is a control
admitting out loud that it has more than one outcome. Underneath all of it is the same rule a
[signifier](/signifier) lives by: the label is a promise about what will happen, and a promise that
resolves two ways is not a promise. Keeping it single is also an accessibility duty rather than a
matter of taste, since [consistent identification](/consistent-identification) asks that the same
function carry the same name and icon throughout, and its mirror image is this term.
