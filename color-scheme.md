---
name: Color scheme
slug: color-scheme
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The declaration that a page or element supports light or dark
  rendering, which also tells the browser which palette to use for scrollbars
  and form controls.
aliases:
  - name: theme preference
    source: community
  - name: supported color schemes
    source: community
tags:
  - theming
  - web-platform
relations:
  contrastWith:
    - color-theme
    - dark-mode
    - light-dark
  variantOf: []
  partOf: []
  seeAlso:
    - flash-of-inaccurate-color-theme
implementations: []
sources:
  - title: "MDN: <color> CSS type"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value
  - title: "MDN: accent-color respects color schemes"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/accent-color
demo: inline
exhibit: false
useWhen: telling the browser which themes your page supports
---

A colour scheme is a conversation with two sides. The reader's operating system states a
preference, which CSS reads with the `prefers-color-scheme` media query, and the page
states what it can honour, which is the `color-scheme` property. Declaring
`color-scheme: light dark` on the root says both renderings exist here; declaring one
value says only that one does, and the system preference is then ignored for this page.
The keyword `only` hardens that ("only light" refuses dark even where a browser would
otherwise force it), and the same property works on any element, so a widget can commit
to a scheme its container did not.

The declaration matters because a page does not paint everything on it. Scrollbars,
checkbox and radio glyphs, the default canvas behind your background, date pickers,
spellcheck squiggles, and the text selection highlight are all drawn by the browser, and
without `color-scheme` they come from the light set no matter how dark your own tokens
are. This is the origin of the familiar bug where a beautifully dark page has a bright
white scrollbar down its right edge and a dropdown that flashes white when opened. Set
the property and every one of those switches over, along with
[accent colour](/accent-color), which resolves against the current scheme too.

The property also unlocks `light-dark()`, a function that takes two values and returns
the one matching the element's used scheme. Where a token file would otherwise carry a
media query per value, `--surface: light-dark(#ffffff, #1c1f26)` states both at once, and
it works only when the element has actually declared a scheme, which is the usual reason
it silently returns the first argument. There is a `<meta name="color-scheme">` spelling
as well, useful because it applies before the stylesheet arrives and so removes the white
flash a dark page shows during load.

The neighbouring words are worth keeping straight. [Dark mode](/dark-mode) is the design:
the second palette, its elevation model, its rebalanced accents.
`prefers-color-scheme` is the question, and `color-scheme` is the answer plus the
plumbing that carries it into the parts of the interface you never styled. A product with
its own light, dark, and system control is choosing an override for the query, and it
still has to write the property, because the browser's own widgets have no idea what that
control does.
