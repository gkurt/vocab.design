---
name: Underline
slug: underline
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A rule drawn under text, on the web the default marker for a link,
  ideally set to skip the descenders it would otherwise cross.
aliases:
  - name: "text-decoration: underline"
    source: css
  - name: underscore
  - name: skip ink
    source: css
  - name: text-decoration-skip-ink
    source: css
tags:
  - a11y
relations:
  contrastWith:
    - link
    - strikethrough
  variantOf: []
  partOf: []
  seeAlso:
    - italic
implementations: []
sources:
  - title: Underlining (Practical Typography)
    url: https://practicaltypography.com/
  - title: CSS text module (MDN)
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text
demo: inline
exhibit: false
useWhen: marking a link without relying on color alone
---

In typography the underline has a bad name, and deservedly. It is a typewriter
substitute for emphasis, which is what [italic](/italic) is for, and it collides
with the letters it passes under. On the web it is a different animal entirely: it
is the one visual convention every reader already knows means "this is a link",
and it does not rely on colour, which is what makes it the answer to WCAG's
use-of-colour requirement. A link distinguished by colour alone fails for readers
who cannot see the difference; a link that is underlined does not.

The craft is in three properties browsers only recently gave us. Left alone, the
rule sits too close to the text and cuts straight through the descenders on `g`,
`p` and `y`, which is most of what makes underlined text look cheap.
`text-underline-offset` pushes the rule down away from the baseline,
`text-decoration-thickness` sets its weight (`from-font` takes the value the
typeface itself specifies), and `text-decoration-skip-ink: auto`, now the default
in most browsers, breaks the rule around the glyphs that cross it. Together they
turn the browser default into something a typographer would sign.

Hiding underlines until hover is a common pattern and mostly a bad trade. It
saves texture at the cost of discoverability: on touch there is no hover at all,
and a reader scanning for the way out of a paragraph has nothing to scan for. The
defensible version keeps a visible marker at rest, usually a thinner or lighter
rule, and makes hover the emphasis rather than the reveal. In dense navigation and
in card titles, where position and shape already say "clickable", dropping the
underline is reasonable; inside running prose it is not, and that distinction is
worth writing into a design system rather than leaving to taste.

Two things the rule is not for. It is not for emphasis, since a reader will try to
click it, and it is not the same thing as a border on the block, which is what a
[divider](/divider) or an input's bottom rule is. If you need a line under a run
of text that is not a link, `border-bottom` on an inline element gives you full
control over colour and distance, at the cost of the skip-ink behaviour a real
text decoration gets for free.
