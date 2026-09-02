---
name: Chorded shortcut
slug: chorded-shortcut
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A shortcut whose keys are held down together like a chord, in
  contrast to one typed as a sequence of separate presses.
aliases:
  - name: key chord
    source: community
  - name: chording
    source: community
  - name: key combination
    source: community
  - name: combo key
    source: community
tags:
  - keyboard
relations:
  contrastWith:
    - key-sequence
    - modifier-key
    - keyboard-shortcut
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Wikipedia: chorded keyboard"
    url: https://en.wikipedia.org/wiki/Chorded_keyboard
demo: inline
exhibit: false
useWhen: keys pressed together rather than one after another
---

The name comes from music, and it is the right metaphor: several keys sounded at once make
one thing, not several. A chorded shortcut is held rather than typed. The modifiers go down
first and stay down, the letter is struck while they are still there, and the command fires
once, on that letter's keydown, carrying the modifiers with it as flags on a single event.
Nothing is remembered between presses, because there is nothing between presses. The idea
predates the personal computer: stenotype machines and Douglas Engelbart's five key keyset
were built entirely on chords, on the argument that the hand can hold a shape faster than it
can spell a word.

Its opposite number is the key sequence, where keys are pressed one after another and the
interface has to hold a pending state between them, with a timeout and a way to cancel.
Almost every editor with a serious keyboard interface ships both, and the split is usually
about how much room the vocabulary needs: chords are limited to what a few modifiers can
multiply out, while sequences can go as deep as anyone can remember. Keyboard shortcut is the
umbrella over both, so a shortcut is not chorded because it is a shortcut, it is chorded
because of when the keys are down.

Worth setting against a quasimode as well, since both involve a key held down and they do
opposite things with it. A chord fires a command once, at the moment the keys come together,
and the holding is only how the keys were collected. A quasimode fires nothing and instead
changes what other input means, for exactly as long as the hold lasts. Holding Ctrl and
striking K is a chord. Holding space so the pointer becomes a pan tool is a quasimode.

The practical constraints are all about supply. There are only a handful of modifiers, and the
operating system and the browser have already claimed most of the useful combinations, so a
web application that binds Ctrl and W is binding something it will never receive. Chords are
also physically awkward for anyone typing with one hand or one finger, which is what sticky
keys exist to fix, and awkward for anyone whose keyboard layout puts the letter somewhere
else. And they are invisible: a chord that is not printed next to the command it runs is a
feature only its author will ever use.
