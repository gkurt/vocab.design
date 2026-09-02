---
name: Font subsetting
slug: font-subsetting
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Shipping only the characters a page actually needs, cutting the font
  file down and letting the browser fetch ranges on demand.
aliases:
  - name: subsetting
  - name: unicode-range
    source: css
  - name: font slicing
  - name: character subset
tags:
  - fonts
  - perceived-performance
  - web-platform
relations:
  contrastWith: []
  variantOf: []
  partOf: []
  seeAlso:
    - web-font
    - icon-font
implementations: []
sources:
  - title: CSS fonts module (MDN)
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts
  - title: Font Fallback and Tofu
    url: https://symbolfyi.com/guides/font-fallback-tofu/
demo: inline
exhibit: false
useWhen: cutting a font file down to what the page uses
---

A typeface file carries every character its designer drew: Latin, the accented
extensions, Greek, Cyrillic, arrows, currency, a few hundred pieces of
punctuation nobody has typed since 1994. An English-language interface uses
maybe a hundred of them. Subsetting is the step that throws away the rest before
the file ever reaches a browser, and it is usually the largest single saving
available on a page that uses a [web font](/web-font), because it cuts the bytes
rather than merely rescheduling them.

There are two shapes to it. Static subsetting builds one smaller file: you point
a tool at the font and a character set, and it writes out a face containing only
those [glyphs](/glyph), plus the layout tables that still apply to them.
Dynamic subsetting splits the face into several files, one per script or block,
and declares each with a
[`unicode-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range)
descriptor inside its own `@font-face` rule. The browser then reads the page,
works out which ranges are actually needed, and fetches only those files. This is
what the big hosted font services emit, and it is why a page of English text
served a family with Cyrillic support never downloads the Cyrillic.

The failure mode is cutting too deep. A subset that covers your copy today does
not cover the em dash an editor pastes in tomorrow, the curly apostrophe an
author's word processor inserted, or a customer's name with a diacritic in it.
When a character is missing from every declared range the browser goes looking
elsewhere, and the reader gets either a
[fallback font](/fallback-font) mid-word, which is visible as a change of shape
and colour, or [tofu](/tofu), which is a box where a letter should be. Both are
worse than the kilobytes you saved. The usual insurance is to keep the Latin-1
range whole rather than trimming to observed characters, and to subset from real
content rather than from a guess.

Two smaller notes worth carrying. Subsetting can break things that live in the
font's tables rather than in its outlines: kerning pairs, ligatures, and the
OpenType features a stylesheet later asks for, so a tool that keeps the layout
tables for the glyphs it retains is the one to use. And on a variable font the
saving works the other way around too: dropping unneeded axes, or pinning one to
a single instance, is a subset of the design space rather than of the character
set, and it can be worth more than the characters.
