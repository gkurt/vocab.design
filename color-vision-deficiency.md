---
name: Color vision deficiency
slug: color-vision-deficiency
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Reduced ability to tell certain hues apart, most often red from
  green, which makes hue alone an unreliable way to carry meaning for roughly
  one man in twelve.
aliases:
  - name: color blindness
    source: community
  - name: deuteranopia
    source: community
  - name: protanopia
    source: community
  - name: tritanopia
    source: community
  - name: CVD
    source: community
tags:
  - perception
relations:
  contrastWith:
    - apca
    - use-of-color
  variantOf: []
  partOf: []
  seeAlso:
    - categorical-palette
implementations: []
sources:
  - title: Designing for color blindness
    url: https://colorblind.io/guides/designing-for-color-blindness
demo: inline
exhibit: false
useWhen: checking a palette against reduced hue discrimination
---

About one man in twelve and one woman in two hundred has some form of colour vision
deficiency, which makes it the largest sensory difference most product teams never design
for. The name "colour blindness" oversells it: almost nobody sees in grey. What changes is
discrimination, the ability to tell two particular hues apart, and the pairs that collapse
depend on which cone is missing or shifted. Deuteranomaly and deuteranopia weaken or remove
the green cone and are by far the most common; protanomaly and protanopia do the same to
red, and also darken it; tritanopia, which affects the blue cone, is rare and hits blue
against green rather than red against green.

The practical consequence is narrow and blunt. Red and green stop being opposites. A green
"passing" dot beside a red "failing" dot becomes two dots of the same olive, a red line on a
green chart becomes one line crossing another of its own colour, and a form field turned red
looks exactly like a form field that was always brown. None of that is fixed by picking a
better red. It is fixed by saying the thing twice: a check and a cross, a word, a pattern, a
direct label. That redundancy requirement is the whole content of
[use of colour](/use-of-color), and it is why a
[categorical palette](/categorical-palette) varies lightness a little even while trying to
hold it level.

Simulation is the cheapest way to check a screen, and worth being honest about. A filter
that runs a design through an approximation of dichromatic vision, whether in a browser
extension, a design tool plugin, or something like the
[Coblis simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/), tells
you which pairs merge. It does not tell you what anyone actually experiences, because most
people with a deficiency are anomalous rather than dichromatic, and because someone who has
had this vision since birth has spent a lifetime reading context the simulation strips out.
Treat the output as a test result, not as a portrait.

Two habits catch most of it before a simulator is ever opened. Keep a lightness difference
between any two colours that carry different meanings, since lightness survives every type
of deficiency, and never let a legend be the only bridge between a colour and its name.
Both are cheap at design time and expensive later, which is the usual shape of an
accessibility constraint that turns out to improve the chart for everyone reading it in
sunlight or on a projector.
