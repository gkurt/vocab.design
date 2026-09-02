---
name: Word break
slug: word-break
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Whether a long unbroken string is allowed to split mid-word rather
  than overflow its container, and where that split may happen.
aliases:
  - name: overflow-wrap
    source: css
  - name: word-wrap
    source: css
  - name: break-word
  - name: anywhere breaking
tags:
  - i18n
  - web-platform
relations:
  contrastWith:
    - hyphenation
    - truncation
    - zero-width-space
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: CSS text module (MDN)
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text
demo: inline
exhibit: false
useWhen: a long URL or token is bursting out of its box
---

Line breaking normally happens at break opportunities the writing system provides:
spaces, some punctuation, the boundaries a language allows. A URL, a hash, an API key,
a filename, a German compound noun has none of them, so the browser does the only thing
left and lets the string run past the edge of its box. It does not stop at the card, or
the column, or the viewport. Word breaking is the escape valve: permission to split
inside a word, given by the layout because the text will not give it.

Two properties grant that permission and they are not the same grant.
`overflow-wrap: break-word` breaks only as a last resort, when a word would not fit on a
line of its own, and leaves every other word intact. `word-break: break-all` breaks
wherever the line runs out, so ordinary words get chopped as readily as the token that
caused the problem. `overflow-wrap: anywhere` behaves like `break-word` with one extra
effect that is often the actual fix: it lets the element's min-content size shrink, which
is what finally persuades a flex or grid item to stop being as wide as its longest word.
`word-wrap` is the old name for `overflow-wrap` and still works. In the other direction,
`word-break: keep-all` forbids the breaks that CJK text would otherwise take between
characters.

This is not [hyphenation](/hyphenation), and the difference is visible in the result.
Hyphenation is linguistic: a dictionary or a [soft hyphen](/soft-hyphen) says where a
word may legitimately come apart, and a hyphen is drawn to tell the reader it did.
Emergency word breaking asks no dictionary and draws no mark, so a line can end in the
middle of a syllable with nothing to say it has. That is fine for a token nobody reads
as language and poor for prose, which is the whole reason to prefer `break-word` over
`break-all` in body text and to reach for `break-all` only where the content really is a
column of identifiers.

In practice, put the rule on the containers that hold text you did not write: chat
messages, comments, user-supplied titles, table cells of ids. Do not put it on the whole
page, because a global `break-all` will quietly chop ordinary paragraphs at the measure.
And know the alternative: where the string is not meant to be read in full,
[truncation](/truncation) with an accessible full value beats breaking it across four
lines.
