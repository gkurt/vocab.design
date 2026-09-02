---
name: Hydration
slug: hydration
category: pattern
status: published
created: 2026-08-25T00:00:00.000Z
modified: 2026-08-25T00:00:00.000Z
definition: The pass where script attaches behaviour to server-rendered HTML,
  turning a page that is already painted and readable into one that answers
  input.
aliases:
  - name: rehydration
    source: community
  - name: client-side hydration
    source: community
tags:
  - perceived-performance
  - web-platform
relations:
  contrastWith:
    - skeleton-screen
    - ghost-click
  variantOf: []
  partOf: []
  seeAlso:
    - flash-of-inaccurate-color-theme
    - speculative-loading
implementations: []
sources:
  - title: "MDN: Server-side rendering (SSR)"
    url: https://developer.mozilla.org/en-US/docs/Glossary/SSR
  - title: "React: hydrateRoot"
    url: https://react.dev/reference/react-dom/client/hydrateRoot
  - title: "web.dev: Rendering on the Web"
    url: https://web.dev/articles/rendering-on-the-web
demo: inline
exhibit: false
useWhen: the window where a page looks ready but answers nothing
---

The server sends finished markup, the browser paints it, and the reader can read the
page immediately. What they cannot yet do is use it. The behaviour lives in a script
that has to be fetched, parsed and run, and hydration is that run: it walks the markup
the server produced, attaches the event listeners, and rebuilds in memory the component
state the server only serialised. Until it finishes, every control on the page is a
picture of a control.

That gap is the whole reason the word matters to designers rather than only to
framework authors. Nothing on screen says which side of it the page is on, so a reader
presses a button that looks perfectly ordinary and nothing happens, then presses it
again, and the second press often lands after the pass has swapped the element
underneath them, which is one of the ways a [ghost click](/ghost-click) is made. The
same ordering explains the theme flicker in
[flash of inaccurate color theme](/flash-of-inaccurate-color-theme): a preference read
after hydration is read after the wrong colours have already been painted. The honest
answers are all about the pre-hydration state rather than about the pass itself. Make
the server-rendered version genuinely work where it can, as a real link or a real form
post, so a press is not lost. Where it cannot work, say so: a control that is visibly
busy or disabled for 400 ms is a smaller insult than one that silently swallows input.
Queueing the press and replaying it after the pass is the third option, and the one
that goes wrong most interestingly, because a queued press can arrive at a control that
has since moved.

Hydration is the mirror image of a [skeleton screen](/skeleton-screen), and the pair is
worth keeping straight: a skeleton is paint arriving late, hydration is behaviour
arriving late. It is also not server-side rendering, though the two are always
discussed together. Server rendering is what produced the HTML; hydration is the price
the client pays to take that HTML over, and the price is real, since the tree is
effectively shipped twice, once as markup and once as the serialised props the script
needs to agree with it. Disagree with it and you get a hydration mismatch, where the
framework finds markup it would not have produced and either patches or discards the
server's work.

Most of the interesting work in this area is about shrinking the pass rather than
speeding it up. Progressive hydration defers whole subtrees until they are needed,
selective hydration lets the framework prioritise the part the reader just touched,
islands architecture ships behaviour only for the few regions that have any, and
resumability tries to abolish the pass altogether by serialising enough state that the
client can carry on rather than start again. They are different bets on the same
observation: the cheapest hydration is the one you never run.
