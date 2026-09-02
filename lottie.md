---
name: Lottie
slug: lottie
category: motion
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A JSON format for vector animations exported from design tools and
  played natively on the web and mobile, so complex motion ships without video.
aliases:
  - name: Lottie animation
    source: community
  - name: Bodymovin
    source: community
  - name: dotLottie
    source: community
tags:
  - design-tools
  - illustration
relations:
  contrastWith:
    - line-drawing-animation
  variantOf: []
  partOf: []
  seeAlso:
    - icon-morph
implementations: []
sources:
  - title: "School of Motion: motion design dictionary"
    url: https://schoolofmotion.com/blog/motion-design-dictionary
  - title: "Lottie: documentation"
    url: https://airbnb.io/lottie/
demo: inline
exhibit: false
useWhen: designed animation must ship as an asset, not as code
---

Lottie is tooling vocabulary rather than a design concept, and it is worth saying so before defining
it: nothing about an interface is more or less well designed for using it. It is a file format. A
motion designer animates in a vector tool, an exporter writes the layers, shapes, keyframes and
easing curves out as JSON, and a small runtime on the target platform reads that JSON and redraws the
animation with the platform's own vector primitives. The format came out of Airbnb, where the
After Effects exporter is [Bodymovin](https://github.com/bodymovin/bodymovin) and the players are the
[Lottie](https://airbnb.io/lottie/) libraries for web, iOS and Android;
[dotLottie](https://dotlottie.io) is the newer packaging, a zipped bundle holding the JSON plus any
images and a manifest, which is what a hosting service like [LottieFiles](https://lottiefiles.com)
hands you.

The reason it caught on is that the alternatives are all bad in the same place. A designed
illustrated animation, a mascot, a success celebration, an empty-state loop, is far too fiddly to
hand-code, and every other way of shipping it degrades: video carries no cheap transparency and no
crisp scaling, an animated GIF is enormous and limited to 256 colours, and a raster frame sequence
has to be exported per density and is soft the moment anything scales it. Because Lottie ships
shapes and keyframes instead of pixels, one file is sharp at any size on any density, is usually
measured in kilobytes, and can be recoloured, paused, seeked, or played to a specific marker at
runtime. That last part is what makes it a component rather than a picture.

What it is not is a way to build interface motion. State changes, [easing](/easing) on a real
control, and the transitions between views belong to the platform, where they can be interrupted and
reversed by the person doing the interrupting; a Lottie is a timeline, and a timeline cannot respond
to a half-finished gesture. Reach for it where the motion is a piece of authored artwork with a
beginning and an end, such as an onboarding illustration or a [confetti burst](/confetti-burst), and
keep the everyday movement of the interface in code.

The costs are real and mostly invisible until late. Each platform needs its runtime, which is a
dependency and a few tens of kilobytes; the exporters support a subset of the source tool, so
expressions, some blend modes and most effects silently do not survive; a long loop redrawing complex
vector paths every frame can cost more than the video it replaced; and an autoplaying loop is motion
nobody asked for, so it has to answer [prefers-reduced-motion](/prefers-reduced-motion) like anything
else. Ask for a still frame or a shorter loop as the reduced-motion variant, and ask the animator for
the file at the size it will actually be shown, because a shape-heavy asset drawn tiny is paying for
detail nobody can see.
