---
name: Soft hyphen
slug: soft-hyphen
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An invisible character placed inside a word that marks where a
  hyphen may appear if the word has to break, and stays hidden otherwise.
aliases:
  - name: shy
    source: html
  - name: discretionary hyphen
  - name: optional hyphen
  - name: U+00AD
tags:
  - i18n
  - web-platform
relations:
  contrastWith:
    - zero-width-space
    - hyphenation
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Optional hyphens (Practical Typography)
    url: https://practicaltypography.com/
  - title: Non-breaking space and soft hyphen (Tilda)
    url: https://help.tilda.cc/unbroken-space
demo: inline
exhibit: false
useWhen: telling the browser where a long word may break
---

The character is U+00AD, written in HTML as `&shy;`, and it is a permission
rather than a mark. Put one inside a word and nothing changes: it has no width,
no ink, and no effect on how the word is measured. If the line breaker then
finds itself unable to fit that word, it may break at the soft hyphen and draws
a real hyphen at the end of the line. Nothing else in the text is a conditional
glyph like this, which is why it surprises people the first time they meet one in
a file.

It works under `hyphens: manual`, which is the default, so a soft hyphen is the
one form of [hyphenation](/hyphenation) that needs no CSS at all and no language
dictionary. `hyphens: auto` honours soft hyphens as well as its own dictionary,
which makes them the reliable half of any automatic setting: the dictionary for a
given language may be missing from a browser, and the words most likely to need
breaking (product names, chemical names, compounds a marketing team invented last
week) are exactly the words no dictionary knows. Placing them by hand is the
scalpel to `auto`'s blunt instrument.

The cost is that the character is really in your content. It travels through
copy and paste, so a reader who copies a word out of your page may paste an
invisible character into a form or a search box that does not normalise it, and
find-in-page will not match a word that has one in the middle unless the browser
strips it first. It also lands in whatever your content is indexed by. That is
the argument for adding soft hyphens at render time rather than typing them into
a database, and for reaching first for `<wbr>`, which permits a break at that
point and draws no hyphen, when the string is a URL or an identifier where a
hyphen would be a lie.

Where it earns its keep is any language that builds long compounds and any layout
too narrow to argue with. German, Dutch and Finnish text will break badly without
it, and so will a table cell or a phone-width column carrying a long English
compound. The tell that you need one is a [rag](/rag) with a hole punched in it,
or a word overflowing its container: put the permission where a typographer would
have broken the word, at a syllable boundary, and let the layout use it only if
it has to.
