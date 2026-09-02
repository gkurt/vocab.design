---
name: Multimodal interface
slug: multimodal-interface
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: An interface that accepts and answers in more than one channel at
  once, letting a person speak, type, touch, or point and pick whichever suits
  the moment.
aliases:
  - name: multimodal UX
  - name: voice-first
    source: uistyleguide
  - name: voice user interface
  - name: VUI
  - name: multimodal UI
tags:
  - ai
  - sound
relations:
  contrastWith:
    - voice-control
    - generative-ui
    - zero-ui
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "NN/g: Voice First, the future of interaction?"
    url: https://www.nngroup.com/articles/voice-first/
  - title: "UXmatters: Voice first versus the multimodal user interfaces of the
      future"
    url: https://www.uxmatters.com/mt/archives/2018/10/voice-first-versus-the-multimodal-user-interfaces-of-the-future.php
demo: inline
exhibit: false
useWhen: voice, touch, and screen share one interaction
---

A multimodal interface is not three interfaces bolted together. It is one state machine that
several modalities can drive, which is why the hard part is not adding a microphone but
making sure the channels never disagree about what is currently true. The specimen above
sets the same kitchen timer by tap, by voice, and by gaze plus pinch. Each channel changes
who did it. None of them changes what the timer says, and a design where the voice assistant
and the screen hold different beliefs about the timer is broken in a way no amount of
recognition accuracy will fix.

The reason to build one is that modalities have complementary failures. Voice is the fastest
way to say something with many parameters ("set a ten minute timer") and the worst way to
choose from forty options or to scan a list. Touch is precise and silent and needs a free
hand. Gaze is instant at pointing and hopeless at confirming. So the pattern is not a
fallback ladder where voice is tried first and the screen catches the failures. It is a set
of channels that stay live together, each one available for whatever it is best at, and the
interface answering in whichever channel the person is currently attending to. Nielsen
Norman Group's argument against a strictly [voice-first
future](https://www.nngroup.com/articles/voice-first/) is this same point stated as a
warning: a purely spoken interface throws away the screen's ability to show state, and state
is most of what an interface is for.

Three consequences follow, and they are where implementations usually fail. Discoverability
is the first: a channel with no visible affordance is a channel nobody uses, so a multimodal
design has to advertise what can be said, not just accept it. Feedback is the second: every
channel needs an acknowledgement in a channel the person can perceive right now, which is
why a spoken command should also move something on the screen. And the third is that
switching mid-task must be free. A person who starts by speaking and finishes by tapping is
using the interface correctly, and any design that makes them start over has quietly built
two interfaces that share a logo.

The channels themselves have their own entries here. [Voice control](/voice-control) is the
spoken channel, including the case where speech drives an interface that was never designed
for it. [Look and pinch](/look-and-pinch) is the gaze plus gesture pairing that spatial
systems use, where the eyes aim and the fingers commit. [Pressure
sensitivity](/pressure-sensitivity) is a channel hiding inside an existing one, where how
hard a touch presses carries meaning on top of where it landed. Each is a modality; this
term is the word for wiring several of them to one truth.
