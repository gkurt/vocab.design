---
name: Pancake stack
slug: pancake-stack
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A three row page where the header and footer take only the height
  they need and the middle row absorbs every remaining pixel, even when the
  content is short.
aliases:
  - name: pancake
    source: web-dev
  - name: auto 1fr auto
    source: css
  - name: full height page
    source: community
tags:
  - grids
relations:
  contrastWith:
    - sticky-footer
    - cover
    - holy-grail-layout
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Pancake stack, web.dev layout patterns
    url: https://web.dev/patterns/layout/pancake-stack/
demo: inline
exhibit: false
useWhen: header, body, footer with the body taking the slack
---

Almost every page is three rows: something at the top that names where you are, something in
the middle that is the point, and something at the bottom with the small print. The rows are
easy. What was hard for about fifteen years was the case where the middle row has almost
nothing in it, because then the footer floats up to meet the content and sits marooned in the
middle of a mostly empty screen. The pancake stack is the arrangement that fixes it, and the
name comes from [web.dev's layout patterns](https://web.dev/patterns/layout/pancake-stack/),
where it is one of a small set of shapes worth knowing by name.

The whole thing is two declarations: `display: grid` with
`grid-template-rows: auto 1fr auto`, on a container with a minimum height of the viewport.
The two `auto` tracks size themselves to the header and the footer, which is what you always
wanted from them. The `1fr` is the part that earns the name: it claims whatever is left over
when the content is short, and yields gracefully when the content is tall, so the same rule
covers both cases without a media query or a measurement. Flexbox spells the same idea as
`flex-direction: column` with `flex: 1` on the middle child, and either is fine; the grid
spelling is preferred mostly because the three tracks are written out in one line where a
reader can see them.

Two details decide whether it survives real content. Use a minimum height rather than a
height: a fixed height turns a long article into clipped or doubly scrolled content, while a
minimum lets the container grow past the viewport and the footer sit honestly below the fold.
And reach for the dynamic viewport units on small screens, since the mobile browser toolbars
that appear and disappear are exactly what `100vh` measures wrongly. If the middle row is
meant to scroll on its own rather than scrolling the page, that is a different arrangement:
the container takes a real height, and the middle track needs `min-height: 0` so it is allowed
to be shorter than its contents.

The pattern replaced a long list of hacks, and the vocabulary it replaced is still in the
wild: [sticky footer](/sticky-footer) usually names this same goal from the footer's point of
view, and the old recipes involved negative margins, table display, or a footer of a known
fixed height subtracted with `calc()`. The pancake is also the frame other layouts sit inside:
put three columns in the middle row and you have a [holy grail layout](/holy-grail-layout),
and put persistent navigation in the top row and you have the beginnings of an
[app shell](/app-shell). Its own responsive sibling, the deconstructed pancake, is the version
where the middle row's contents wrap onto their own lines instead of holding one row.
