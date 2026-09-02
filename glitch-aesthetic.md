---
name: Glitch aesthetic
slug: glitch-aesthetic
category: aesthetic
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A look that fakes signal failure with colour channel offset, torn
  scan bands, and jitter, used for emphasis or as a whole visual identity.
aliases:
  - name: glitch art
  - name: RGB split
    source: community
  - name: chromatic aberration
    source: community
  - name: datamosh
tags:
  - retro
relations:
  contrastWith:
    - vhs-aesthetic
    - scanlines
  variantOf: []
  partOf: []
  seeAlso:
    - dithering
implementations: []
sources:
  - title: "Photoshop Supply: Dither Patterns"
    url: https://www.photoshopsupply.com/patterns-textures/dither-patterns
demo: inline
exhibit: false
useWhen: deliberate corruption used as decoration
---

Three effects do almost all the work. Channel offset separates a red and a cyan copy of
the same element by a few pixels, as though the colour components had lost sync. Slice
displacement cuts the element into horizontal bands and shoves alternate bands sideways,
the way a torn video frame tears. Jitter fires both at random for a few frames and then
snaps back, because the look depends on being read as an interruption rather than as a
resting state. Scan lines, dither, and noise fill in behind them.

The vocabulary comes from real failures. Glitch art proper predates the web treatment by
decades and is about actually breaking things: corrupting the bytes of an image file,
bending a circuit until the signal misbehaves, datamoshing a video by deleting the
keyframes so motion vectors paint the wrong frame. The interface version simulates all
of that with layered shadows and clipped copies, which is a different practice and worth
naming honestly. "Chromatic aberration" is borrowed loosely too: in optics it is a lens
failing to focus every wavelength on the same plane, and it shows up at the edges of a
frame rather than as a clean two colour offset across a headline.

It carries strong connotations, mostly cyberpunk and rave, and it works when the product
is already in that register: music, games, hacking and security tooling, event
identities. It pairs naturally with the
[terminal aesthetic](/terminal-aesthetic) for the same reason, since both are borrowing
the visual grammar of a machine you are not supposed to see the insides of. Used on a
banking dashboard it reads as an error, which is the one thing an interface most needs to
be able to say clearly.

Three cautions, all practical. Flickering and rapid jitter are a seizure and vestibular
risk, so the motion belongs behind `prefers-reduced-motion`, must never loop endlessly,
and has to keep flashes under three per second. The duplicated copies of a headline are
decorative and need to be hidden from assistive technology, or a screen reader announces
the word three times. And a split headline has no single foreground colour, so contrast
has to be checked against the legible base layer with the offsets treated as decoration
sitting on top of it.
