---
name: Earcon
slug: earcon
category: interaction
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A brief synthesized sound standing for an event, abstract by design,
  so a rising figure means success only because the interface taught you it
  does.
aliases:
  - name: audio cue
    source: community
  - name: UI sound
    source: community
  - name: interface sound
    source: community
tags:
  - icons
  - sound
relations:
  contrastWith:
    - auditory-icon
    - sonification
  variantOf: []
  partOf:
    - microinteraction
  seeAlso:
    - haptic-feedback
implementations: []
sources:
  - title: "Wikipedia: Earcon"
    url: https://en.wikipedia.org/wiki/Earcon
  - title: "Blattner, Sumikawa and Greenberg: Earcons and Icons, Their Structure and
      Common Design Principles (Human-Computer Interaction, 1989)"
    url: https://doi.org/10.1207/s15327051hci0401_1
demo: inline
exhibit: false
useWhen: the abstract tone that reports an event
---

The word is a pun, and the pun is the definition. D. A. Sumikawa coined it in 1985, in a
paper on integrating audio cues into computer interfaces, on the model of "icon": a small
thing that stands for something else, except heard rather than seen. Four years later
Blattner, Sumikawa and Greenberg gave the idea a grammar. Their earcons are built from
motives, short rhythmicised pitch figures, and motives are combined into families, so that
a related set of messages shares a musical shape the way a related set of icons shares a
silhouette. That structure is the reason the word outlasted a hundred other names for
interface noises: it names a designed vocabulary rather than a sound effect.

Abstraction is the defining property and the whole cost. Nothing in the world sounds like
"your message was sent", so a rising two-note figure means sent only because this interface
said so and you learned it. That has to be paid for in teaching, or in a first hearing that
comes attached to something visible, and it caps how many an interface can afford: a person
will learn four or five and no more. What abstraction buys is worth the price. A synthesized
figure can be forty milliseconds long, can be transposed and inverted into a family, survives
a bad speaker, and carries no accidental connotation, which is why the alert vocabularies of
aircraft cockpits and hospital monitors are earcons and not recordings.

Two neighbours are commonly confused with it. An [auditory icon](/auditory-icon) is the
opposite strategy on the same channel, a recorded everyday sound that works by resembling
what happened, so a crumple means delete without anyone being told. And
[sonification](/sonification) is not about events at all: it maps a continuous variable to
sound so a shape can be heard, where an earcon reports one discrete thing that just
happened. In the loop that a [microinteraction](/microinteraction) is made of, an earcon is
feedback delivered on the audio channel, exactly as [haptic feedback](/haptic-feedback) is
feedback delivered by touch.

Sound has duties the other channels do not. It plays into a room rather than onto a screen,
so it is never the only report of anything: pair every earcon with something visible, a
[toast](/toast) or a [state layer](/state-layer) or a changed count, both because a muted
device is the normal case and because a person who cannot hear it is owed the same
information. Nothing may start playing without the reader having done something, volume
belongs to the system and not to the app, and the repetition budget is brutal, since a tone
attached to an act performed forty times a day is the fastest way to make someone turn all
your sounds off. The most disciplined interfaces keep two or three: a confirmation, a
refusal, and an arrival.
