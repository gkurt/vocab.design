---
name: Shimmer
slug: shimmer
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The moving highlight that sweeps across placeholder shapes to signal
  that content is still on its way.
aliases:
  - name: shimmer effect
  - name: loading shimmer
  - name: wave
    source: mui
tags:
  - perceived-performance
  - progress
relations:
  contrastWith:
    - pulse-animation
    - specular-highlight
  variantOf: []
  partOf: []
  seeAlso:
    - skeleton-screen
    - prefers-reduced-motion
implementations: []
sources:
  - title: "WCAG 2.2 Understanding SC 2.2.2: Pause, Stop, Hide"
    url: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
  - title: "MDN: prefers-reduced-motion"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
demo: inline
exhibit: false
useWhen: the highlight travelling across a placeholder
---

A shimmer is a band of lighter tone that crosses a set of placeholder shapes and
leaves the far side, once every second or so, in the same direction every time. The
shapes belong to the [skeleton screen](/skeleton-screen); the shimmer is only the
sweep over them, which is why the two come apart cleanly. A skeleton with no shimmer
is still a skeleton, and the sweep is the decoration that says the page is waiting on
something rather than simply built out of grey rectangles.

The word worth separating it from is [pulse](/pulse-animation), and the whole
difference is travel. A pulse fades in place, has no direction and no beginning, and
reads as one element being alive. A shimmer has a leading edge and a trailing one, so
a single pass can cross an avatar, three lines and a thumbnail and bind them into one
event. That direction is also the reason it reads as progress, and it is worth being
honest that this is a fiction. The sweep knows nothing about the request. It is on a
loop, it will run at exactly the same rate whether the response is 80 milliseconds
away or has already failed, and a reader who takes it for motion toward something is
being told a story the interface cannot back up.

Which is fine for a moment and corrosive after that. Past roughly two seconds the
sweep stops meaning "soon" and starts meaning "stuck", so a wait that runs long
should be handed over to something that actually reports: a message, a progress bar,
a retry. Keep the highlight quiet while it lasts. One reliable way to do that is to
make the band's brightest point the same colour as the surface behind the shapes, so the highlight only shows
where a placeholder is and washes out over the gaps between them instead of streaking
across the whole panel. Do not confuse the effect with a
[specular highlight](/specular-highlight), which is a material lighting itself: a
shimmer is a status signal wearing a highlight's clothes, and putting one on content
that has already arrived just makes the page look unfinished.

It is also an animation that repeats forever beside other content, which is exactly
the case WCAG's Pause, Stop, Hide criterion is written about, and the reason
[prefers-reduced-motion](/prefers-reduced-motion) is not optional here. The resting
state has to work on its own: plain placeholder shapes, no sweep, nothing lost except
the movement. That is the same discipline any looping decoration owes, and a shimmer
has less excuse than most, because it was never carrying information in the first
place.
