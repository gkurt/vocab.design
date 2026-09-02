---
name: Tracking
slug: tracking
category: typography
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The uniform space added to or removed from every letter across a run of text.
aliases:
  - name: letter-spacing
    source: css
  - name: letterspacing
tags:
  - fonts
  - spacing
relations:
  contrastWith:
    - leading
    - kerning
    - optical-kerning
    - word-spacing
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "MDN: letter-spacing"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
  - title: Letterspacing (Practical Typography)
    url: https://practicaltypography.com/letterspacing.html
demo: inline
exhibit: false
useWhen: space added to every letter across a run
---

Designers say tracking, CSS says `letter-spacing`, and the operation is the same
one: take a run of text and add the same amount of space after every letter in it,
or take the same amount away. The name comes from phototypesetting, where a whole
line was tracked tighter or looser as a unit. The word it gets confused with is
the one next door. [Kerning](/kerning) adjusts the space between two particular
letters; tracking adjusts the space between all of them. If the fix names two
letters, it is kerning. If it names a line, a heading, or a label, it is tracking,
and [optical kerning](/optical-kerning) is neither, since it is a method of
deciding a pair value rather than an amount applied to a run.

Body text at a reading size wants none of it. The face was fitted by its designer
for exactly that job, so zero is the answer, and the values worth setting live at
the two ends of the size range. Display type is drawn apart by scale alone: at
48px the gaps tuned for 16px read as holes, so headlines are usually pulled in,
somewhere between -0.01em and -0.03em depending on the face. Small text goes the
other way, and [all caps](/all-caps) goes furthest, because capitals were fitted
to sit beside lowercase rather than beside each other. A caps label or an
[eyebrow](/eyebrow) at 11px needs roughly 5 to 10 percent of its size opened out
before it stops looking cramped, and the smaller it is set, the more it wants.

The unit is the reason all of this is stated in ems. Tracking written in the
[em unit](/em-unit) is a fraction of the type size, so 0.16em on an eyebrow is
still the right amount when that eyebrow grows on a wide screen, while the same
correction in pixels is a value tuned for one size and wrong at every other. That
is also how a heading looks right at 32px and loose at 20px: the tracking did not
scale with the type. One CSS detail follows from the definition. The value lands
after every character, the space character included, so `letter-spacing` widens
the gaps between words a little as well, which is worth knowing when the thing you
actually want to change is [word spacing](/word-spacing).

There is a limit in both directions. Tighten far enough and letters begin to touch,
which is where a fused [ligature](/ligature) starts to look wrong beside its
neighbours and where the counters of round letters close up. Open far enough and
the run stops reading as words at all: the space between letters passes the space
between words, and the eye has nothing left to group. Loosening also has a reader
on the other side of it, since WCAG's [text spacing](/text-spacing) criterion lets
someone push letter spacing to 0.12em on any page they visit, so a label sized to
the pixel around its own tracking is a label that will one day be clipped.
