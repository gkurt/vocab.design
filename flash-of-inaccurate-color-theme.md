---
name: Flash of inaccurate color theme
slug: flash-of-inaccurate-color-theme
category: color
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-25T00:00:00.000Z
definition: The moment a page paints in the wrong theme before the stored
  preference is applied, showing a light flash to a reader who chose dark.
aliases:
  - name: FART
    source: community
  - name: dark mode flash
    source: community
  - name: theme flash
    source: community
  - name: flash of unstyled theme
    source: community
tags:
  - errors
  - perceived-performance
  - theming
relations:
  contrastWith:
    - fout
    - foit
  variantOf: []
  partOf: []
  seeAlso:
    - color-scheme
    - hydration
implementations: []
sources:
  - title: Flash of inAccurate coloR Theme (FART)
    url: https://css-tricks.com/flash-of-inaccurate-color-theme-fart/
  - title: Avoiding Flash of Inaccurate Theme Color
    url: https://blog.jim-nielsen.com/2022/avoiding-flash-of-inaccurate-theme-color/
demo: inline
exhibit: false
useWhen: the wrong theme showing for a frame on page load
---

A reader picked dark once, months ago, and the site remembered. Then a page loads and for
one frame it is white. That frame is the term, and the deliberately awful acronym FART
comes from the [CSS-Tricks post](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/)
that named it. It belongs to the same family as [FOIT](/foit) and [FOUT](/fout): a resource
the first paint needed had not arrived yet, so the browser painted what it had. The
difference is that a font arriving late costs a moment of reading, while a theme arriving
late fires a white screen at someone sitting in a dark room, which is the exact discomfort
they chose [dark mode](/dark-mode) to avoid.

The cause is an ordering problem, not a styling one. A preference chosen by hand lives
somewhere only scripting can read, usually local storage or a cookie, and a script that runs
at the end of the body, or as a module, or after hydration, necessarily runs after the
browser has already painted. The stylesheet cannot help, because at first paint the class or
`data-theme` attribute the stylesheet keys off is not on the element yet. Nothing is broken;
the work is simply being done in the wrong order.

Which makes the fix precise. The theme has to be resolved before the first paint, and that
means a small synchronous inline script in the head that reads the stored value and sets the
attribute on `<html>` before the parser reaches the body. This is one of the very few
defensible uses of a render-blocking inline script: it is a few lines, it has no network
cost, and the thing it blocks on is the paint it exists to correct. A cookie plus
server-side rendering achieves the same ordering without any script at all, which is the
better answer when the stack allows it. What does not work is putting the script anywhere
that is deferred, async, or bundled.

Two things are often confused with this. A site themed only by
[prefers-color-scheme](/prefers-color-scheme) never flashes, because a media query is
already in the cascade at first paint; the flash is the price of an explicit override that
outranks the system. And the browser's own surfaces have a separate version of the same bug:
`<meta name="theme-color">` and the `color-scheme` property tell the user agent what to
paint the scrollbar, form controls and address bar with, so a page whose
[colour theme](/color-theme) is right can still show the wrong chrome around it until they
agree. Getting one right does not get the other for free.
