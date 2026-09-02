---
name: Braille display
slug: braille-display
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A refreshable braille row that renders the same accessibility tree
  as speech, with abbreviated role names authors can override.
aliases:
  - name: refreshable braille
    source: community
  - name: aria-braillelabel
    source: aria
  - name: aria-brailleroledescription
    source: aria
tags:
  - assistive-tech
relations:
  contrastWith:
    - screen-reader
  variantOf: []
  partOf: []
  seeAlso:
    - verbosity
implementations: []
sources:
  - title: Accessible Rich Internet Applications (WAI-ARIA), W3C editor's draft
    url: https://w3c.github.io/aria/
  - title: "ARIA: aria-braillelabel attribute, MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-braillelabel
demo: inline
exhibit: false
useWhen: output is a braille line, not synthesized speech
---

A refreshable braille display is a row of cells, each one a little cluster of pins that rise
and fall under a fingertip. Portable models carry fourteen or twenty cells, desk models forty
or eighty. It is not a second piece of assistive technology sitting beside the screen reader:
it is an output channel of the same screen reader, fed from the same accessibility tree, so
every role, name and state you got right for speech arrives here too, and so does every one
you got wrong. What changes is the physics. Speech is transient and serial, gone the moment it
is spoken and available only in the order it was said, while braille is persistent and
re-readable, a line you can go back over a word at a time. That is why braille is the channel
people reach for when exactness matters: a password, a code snippet, a name spelled properly,
punctuation you have to be sure about.

The constraint braille adds is width. Twenty cells is roughly three short words, and that line
has to carry the name, the role and the state at once, so screen readers abbreviate hard: `h1`
for a first level heading, `btn` for a button, `lnk` for a link, `edt` for an editable field,
with state drawn in brackets so a checked box reads as `(x)`. The exact spellings and their
order differ between screen readers and between braille tables, which is worth knowing before
you treat any one of them as a spec. The design consequence is sharp and easy to miss: an
[accessible name](/accessible-name) of forty characters is a whole display. A button announced
as "Add to shopping cart" is fine to hear and fills the entire strip to feel, and the reader
has to pan the display to find out what came after it.

ARIA 1.3 answers that with two attributes, `aria-braillelabel` and
`aria-brailleroledescription`, which replace the name and the role description on the braille
channel alone. They are a narrow exception rather than a tool, and
[MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-braillelabel)
says so plainly: use the accessible name alone unless it genuinely fails when converted to
braille, because the name alone is almost always the better experience. The reason to be
careful is that these attributes let two channels say different things about the same control,
and once they diverge nothing keeps them honest. A shortened braille label is legitimate. A
braille label that renames the control, or that gets left behind when the visible label
changes, is a bug only a braille user will ever find.

The audience is not only blind users who prefer reading to listening. For deafblind readers
braille is the only channel there is, which makes it the case where a missing label is not an
inconvenience but a wall. It belongs in the same family as [captions](/captions), a
[transcript](/transcript) and [audio description](/audio-description): each is the same content
rendered into a sense the reader actually has, and each one is only as good as the structure it
was generated from. The relationship to a [screen reader](/screen-reader) is worth stating
exactly, because the two are often spoken about as alternatives: the screen reader is the
software that builds the announcement, and the braille display is one of the two places it
sends it.
