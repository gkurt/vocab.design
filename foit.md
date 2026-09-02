---
name: FOIT
slug: foit
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The blank period when a browser hides text entirely rather than show
  it in a fallback face while the web font loads.
aliases:
  - name: flash of invisible text
  - name: invisible text
  - name: font blocking period
    source: css
tags:
  - fonts
  - perceived-performance
relations:
  contrastWith:
    - flash-of-inaccurate-color-theme
    - fout
    - foft
    - font-metric-override
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Ensure text remains visible during webfont load (Lighthouse)
    url: https://developer.chrome.com/docs/lighthouse/performance/font-display
  - title: Fighting FOIT and FOUT Together (CSS-Tricks)
    url: https://css-tricks.com/fighting-foit-and-fout-together/
demo: inline
exhibit: false
useWhen: the text is missing, not just wrong, on load
---

FOIT is the flash of invisible text, and the word flash undersells it. For as
long as the block period runs, the browser has laid the page out, reserved every
line box, and painted no words in them. Nothing is broken and nothing is
missing: the text is there, with a font applied that has not arrived yet, and
the browser has decided that showing it in anything else would be worse than
showing nothing. `font-display: block` asks for this on purpose, and `auto` gets
it by default in most browsers, which hold for around three seconds before
giving up and painting a fallback anyway.

There is one honest case for it. An icon font maps ordinary letters to glyphs,
so a fallback paints the letters instead, and a toolbar that briefly reads
`a b c` is worse than a toolbar that is briefly empty. Some teams make the same
argument about a logotype set in live text. Everywhere else the trade is a bad
one, because content exists to be read and a reader who waits three seconds for
a heading on a slow connection has already decided the page is broken.
[FOUT](/fout) makes the opposite trade, painting the fallback immediately and
paying for it with a reflow, and [web font](/web-font) covers the loading story
the two of them split between them.

Ending a FOIT is a one-line change. `font-display: swap` cuts the block period
to zero, `fallback` keeps a block period of about 100 ms and then stops waiting
for good, and `optional` lets the browser abandon the file entirely on a
connection that is not going to deliver it in time. Preloading the one or two
files above the fold shortens the window without removing it, so it is a
complement to a display strategy rather than a substitute for one. This is also
one of the few typography faults a build pipeline can catch by itself: the
[Lighthouse font-display audit](https://developer.chrome.com/docs/lighthouse/performance/font-display)
flags every face declared without one.
