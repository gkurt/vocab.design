---
name: Slash command
slug: slash-command
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Typing a forward slash in a composer to open a menu of actions,
  where choosing one runs it rather than inserting the words into the message.
aliases:
  - name: slash menu
    source: community
  - name: inline command menu
    source: community
  - name: block menu
    source: community
  - name: slash command menu
    source: merged-candidate
  - name: slash commands
    source: merged-candidate
tags:
  - ai
  - menus
  - messaging
  - text-editing
relations:
  contrastWith:
    - command-palette
    - mention-autocomplete
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "AI UX Playground: slash commands"
    url: https://aiuxplayground.com/pattern/slash-command/
demo: inline
exhibit: false
useWhen: typing / in the message box opens a command menu
---

A slash command turns the composer into a command line without making it look like one.
Typing a forward slash at a word boundary opens a menu anchored to the caret, each further
character filters it, and choosing an entry runs the command. The crucial half of the
definition is the second one: the typed characters are consumed rather than sent. A slash
command is not a shorthand that expands into text, it is a command whose name happened to
be typed where the message goes.

The trigger has to be careful, because the slash is a real character people type. The
conventional rule is that it counts only at the start of a line or after whitespace, so a
date, a fraction, or a path never opens the menu, and that any whitespace closes the query
again. When the menu is open the arrow keys and Enter belong to it rather than to the
composer, and Escape has to give them back without deleting what was typed. Get that last
part wrong and the pattern becomes hostile: a reader who opened the menu by accident
should be able to dismiss it and carry on writing the sentence they were in the middle of.

It is worth being precise about the neighbours, because they are all the same machinery
pointed at different things. [Mention autocomplete](/mention-autocomplete) is the identical
mechanism keyed to `@`, and the difference is what it produces: a mention leaves a token in
the message, while a slash command leaves nothing and does something instead. A
[command palette](/command-palette) is the global version, opened with a keystroke from
anywhere and acting on the application rather than on the caret. Ordinary inline
autocompletion is a third thing again, since it is completing what you were already
writing rather than offering a list of actions. In a
[rich text editor](/rich-text-editor) the slash menu has largely replaced the block-insert
toolbar, which is why so many of its entries are structures (heading, list, table) rather
than verbs.

Two design details decide whether it feels good. Reserve the menu's space by drawing it
over the document rather than pushing the composer around, because a composer that jumps
while someone is typing into it is unusable. And keep the entries short and stable: the
whole value of the pattern is that a practised reader stops reading the menu, types three
characters and Enter, and never looks. That only works if the ordering is predictable, so
resist reordering by recency unless the list is long enough that scanning it was the cost
in the first place.
