---
name: Dolly and zoom
slug: dolly-zoom
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: "Borrowing the camera's vocabulary: dolly moves the viewer through
  the scene, zoom scales the scene itself, and the interface reads as travelling
  rather than rearranging."
aliases:
  - name: vertigo effect
    source: community
  - name: camera move
    source: community
  - name: push in
    source: community
  - name: truck and pan
    source: community
tags:
  - depth
  - media
relations:
  contrastWith:
    - parallax
    - ken-burns-effect
  variantOf: []
  partOf: []
  seeAlso:
    - zoom-transition
implementations: []
sources:
  - title: "UX Magazine: creating usability with motion, the UX in Motion Manifesto"
    url: https://uxmag.com/articles/creating-usability-with-motion-the-ux-in-motion-manifesto
  - title: "School of Motion: motion design dictionary"
    url: https://schoolofmotion.com/blog/motion-design-dictionary
demo: inline
exhibit: false
useWhen: the reader should feel moved through the interface
---

Film has had precise words for this for a century, and interface work keeps reinventing vaguer ones.
A **dolly** moves the camera itself through the scene, which changes where the viewer is standing. A
**zoom** changes the lens, which scales the picture without the viewer going anywhere. In a single
frame the two are almost indistinguishable, since both make the subject bigger. In motion they are
nothing alike, because a dolly changes the relationship between near things and far things and a zoom
cannot: walk toward a doorway and the wall beside you sweeps past while the hills behind barely move,
but zoom in on the same view and the doorway, the wall and the hills all grow by exactly the same
factor. The rest of the family is worth knowing for the same reason: **truck** slides the camera
sideways, **pan** and **tilt** rotate it in place, and **pedestal** raises it.

The famous combination is the dolly zoom, invented for Hitchcock's *Vertigo* and named after it ever
since. Dolly in and zoom out at matched rates and the subject holds its size exactly while everything
behind it falls away, or run it the other way and the background looms in. Nothing in the frame is
moving except the space itself, which is why the shot reads as dread rather than as motion. In an
interface the same trick has a plainer job: it is the strongest available way of saying *you moved*
rather than *the content changed*, because holding one element still while its surroundings deform is
something only a change of viewpoint can do.

This is exactly where it must not be confused with [parallax](/parallax), which is the other way to
imply depth and is a different claim.
Parallax moves layers at different rates as the reader scrolls, so depth is inferred from how fast
each layer travels sideways. A dolly zoom changes the field of view while the camera moves, so the
subject is held and the space around it warps, and the depth is inferred from how differently near
and far things scale. One is about speed, the other about scale.

Practically, a zoom is cheap and a dolly is not. A zoom is one transform on one container. A dolly
needs the scene to have real depth: either per-layer scale factors derived from each layer's distance
(near layers change most, far layers barely at all), or a genuine `perspective` on the container with
each layer at its own `translateZ`, which lets the browser do the arithmetic. The 3D route is usually
the better one, since it keeps the depths as one number per layer rather than as a table of scales
someone has to keep consistent. Two cautions. The vocabulary only pays off if the space is stable,
which means a card that dollied in has to dolly back out along the same path, and a scene that
rearranges between moves has forfeited the metaphor. And strong camera moves are a vestibular
trigger, more so than anything else in this category, so a push-in belongs behind
[prefers-reduced-motion](/prefers-reduced-motion) with a cut or a fade as its alternative. The mildest
member of the family, a slow drift across a still image, has its own name: the
[Ken Burns effect](/ken-burns-effect).
