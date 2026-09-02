---
name: Font stack
slug: font-stack
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The ordered list of typefaces a rule names, each tried in turn until
  one is available, ending in a generic family.
aliases:
  - name: font-family stack
    source: css
  - name: fallback chain
  - name: font list
  - name: system font stack
tags:
  - fonts
  - web-platform
relations:
  contrastWith:
    - fallback-font
    - web-font
    - system-font
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Font Stacks and Fallbacks
    url: https://designhubs.dev/typography/t16-font-stacks/
  - title: Creating Perfect Font Fallbacks in CSS
    url: https://www.aleksandrhovhannisyan.com/blog/perfect-font-fallbacks/
demo: inline
exhibit: false
useWhen: listing which fonts to try and in what order
---

`font-family` takes a list, not a name, and the browser walks it left to right
until it finds a face it can use. The last entry should always be a generic
family (`serif`, `sans-serif`, `monospace`, `system-ui`, and friends), because
that is the only entry guaranteed to resolve to something: without it, a stack
that runs out falls back to whatever the browser's default font happens to be,
which is a decision nobody made.

The step people miss is that matching happens per character, not per element.
The browser takes the first font in the list that has a glyph for the character
it is setting, so a stack can be resolved for the Latin text and fall through to
the third entry for a curly quote or an arrow the first font never drew. This is
why a page can show one word in a subtly different face, and why a stack ending
in a well covered fallback matters for anything multilingual.

Names are matched against installed and declared faces, so the same list serves
web fonts and local ones: put the `@font-face` family first and the local names
after it, and the stack becomes what renders during the load as well as what
renders if it fails. Quote family names containing spaces or reserved words, and
remember the CSS-wide keywords are off limits as unquoted names. `system-ui`
asks for the interface face of the platform (San Francisco, Segoe UI, Roboto),
which is why the long "system font stack" that used to be pasted into every
project has mostly collapsed into that one keyword plus a couple of insurance
entries.

Every entry in the stack is a different set of proportions, so a fallback is a
layout change waiting to happen: swapping to a face with a different
[x-height](/x-height) or width shifts line breaks, retotals the space a heading
needs, and produces the visible jump when the real font finally arrives. Choose
fallbacks by metric similarity rather than by taste, then close the remaining gap
with `size-adjust`, `ascent-override`, and `descent-override` on a local
`@font-face` rule, which lets a fallback occupy exactly the space the intended
face will. Keep the list short. Three or four entries is a decision; nine is a
paste, and nobody has checked what the seventh one looks like.
