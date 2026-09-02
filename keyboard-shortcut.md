---
name: Keyboard shortcut
slug: keyboard-shortcut
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A key or key combination that runs a command directly, giving
  practised users a path that skips the menus and the pointer entirely.
aliases:
  - name: hotkey
  - name: accelerator
  - name: key binding
  - name: shortcut key
tags:
  - keyboard
relations:
  contrastWith:
    - kbd
    - command-palette
    - character-key-shortcuts
    - chorded-shortcut
  variantOf: []
  partOf: []
  seeAlso:
    - keyboard-shortcuts-dialog
    - key-repeat
implementations:
  - system: aria-apg
    name: Keyboard shortcuts
    url: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
sources:
  - title: "ARIA APG: Developing a keyboard interface"
    url: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
  - title: "Wikipedia: Keyboard shortcut"
    url: https://en.wikipedia.org/wiki/Keyboard_mnemonic
demo: inline
exhibit: false
useWhen: a command reachable by keys instead of controls
---

A shortcut is an accelerator, not a mechanism. The APG is blunt about this: it
enhances keyboard access, it never replaces it. Every command a shortcut runs has
to be reachable another way, by tabbing to a control and pressing it, because a
key nobody was told about is not an affordance. The corollary is that shortcuts
have to be advertised. Print the key next to its command in the menu, on the
button's tooltip, or in a shortcuts panel behind a question mark, and use the
same notation everywhere.

There are two families and they behave differently. A single-key shortcut (Gmail's
`e` for archive, `j` and `k` to move down and up) is fast and cheap to learn, but
it fires while the reader is typing unless you check the event target, and it is
hostile to screen reader users whose software already owns most letters in its
browse mode. A chorded shortcut (Ctrl or Cmd plus a key) avoids both problems and
is what you want for anything destructive or global. Follow the platform on the
familiar ones: Cmd or Ctrl S saves, Z undoes, and the modifier itself differs by
platform, so read it from the user agent rather than shipping Ctrl to a Mac.

Watch what you are taking away. The browser and the operating system got the
keyboard first, and rebinding Ctrl W, Ctrl T, or Cmd Q either fails or breaks
something the reader relies on. Assistive technology reserves more keys than most
teams expect, which is why the APG's advice is to prefer combinations that include
a modifier and to test with a screen reader running rather than assuming a letter
is free.

Two habits make the rest easier: keep the bindings in one table so a conflict is
visible when it is created, and let people see that table from inside the product,
conventionally by pressing the question mark key.
