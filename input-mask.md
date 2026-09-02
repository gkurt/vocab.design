---
name: Input mask
slug: input-mask
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A field that imposes a fixed shape as you type, inserting the
  slashes, spaces or brackets a phone number or card number needs.
aliases:
  - name: masked input
    source: mantine
  - name: format mask
    source: community
  - name: pattern input
    source: community
tags:
  - forms
relations:
  contrastWith:
    - forgiving-format
    - structured-format
    - placeholder-as-label
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: Mantine components
    url: https://mantine.dev/core/package/
demo: inline
exhibit: false
useWhen: the field types its own punctuation for you
---

An input mask makes the field responsible for the punctuation. You type ten digits and
the field supplies the brackets, the space and the hyphen; you type eight and it
supplies the slashes in a date. Two things follow from that. The reader never has to
guess whether this form wants dashes, and the value shown on screen stops being the
value the form submits, so a masked field always has a display string and a raw
string, and the raw one is what goes to the server.

The good version shows the whole shape before a single character is typed, greyed out
ahead of the caret, so the field advertises how long the answer is and what it will
look like. That is not a hint that vanishes on first keystroke, which is the failure
[placeholder as label](/placeholder-as-label) is named after. It is a template that
stays put and gets consumed. The same idea split into separate boxes is a
[PIN input](/pin-input), which is worth reaching for when the value is short and fixed
and worth avoiding when it is not.

The hazard is the caret. Reformatting on every keystroke means rewriting the field's
value on every keystroke, and a naive implementation drops the caret at the end each
time, which makes editing the third digit of a card number impossible. Fixing a
character in the middle, deleting a separator the mask inserted, and pasting a number
that already carries its own punctuation are the three cases every masked field gets
wrong first. Accept a paste in any shape and normalise it. Never silently swallow a
character someone typed, because a field that ignores keystrokes without saying why
reads as broken hardware.

The gentler alternative is a [forgiving format](/forgiving-format), which accepts
anything and cleans it up quietly: let the field
take spaces, dashes, brackets or none of them, strip what you do not need, and format
the result once the field is left. That costs the reader nothing and it never fights
the caret, which is why it is usually the better default for anything whose shape
varies by country. Reserve the mask for formats that genuinely are fixed and familiar,
say a card number or a local phone number, keep the accessible name describing the
whole field rather than the template, and make sure the pattern you are enforcing is
the one your validation actually wants, or the field will insist on a shape that
[validation](/inline-validation) then rejects.
