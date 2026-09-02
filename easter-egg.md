---
name: Easter egg
slug: easter-egg
category: interaction
status: published
created: 2026-08-28T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: A reward hidden behind an action nobody was told about, put there to
  be found rather than to be used.
aliases:
  - name: easter eggs
    source: community
  - name: hidden feature
    source: community
  - name: secret feature
    source: community
  - name: konami code
    source: community
tags: []
relations:
  contrastWith:
    - hidden-gesture
  variantOf: []
  partOf: []
  seeAlso:
    - signifier
    - affordance
implementations: []
sources:
  - title: "The Jargon File: Easter egg"
    url: http://www.catb.org/jargon/html/E/Easter-egg.html
  - title: "Wikipedia: Easter egg (media)"
    url: https://en.wikipedia.org/wiki/Easter_egg_(media)
demo: inline
exhibit: false
useWhen: a hidden extra whose whole value is the surprise of finding it
---

The word comes from console programming. In 1980 Warren Robinett hid his name in a locked
room inside Atari's Adventure, because Atari did not credit its programmers, and a boy in
Utah found it anyway. The name stuck,
[the Jargon File](http://www.catb.org/jargon/html/E/Easter-egg.html) wrote it down, and the
practice outlived the console: a flight simulator inside a spreadsheet, dessert artwork
behind repeated taps on a version number, the Konami code typed into a web page that has no
business knowing it. What those share is not the joke. It is the shape. A reward sits behind
an action nobody advertised, reachable by an input the reader was never asked to learn.

That shape is also the shape of a defect, which is why the first rule is absolute: an easter
egg may never be the only route to anything a reader could want. Put a setting, an export, or
a way out of a screen behind it and you have not made an egg, you have made a
[hidden gesture](/hidden-gesture), an action reachable only by a guess, and that one has a
WCAG number on it. The egg escapes the charge on a technicality that happens to be the whole
design: its reward is a drawing, a credit, a sound, a theme that changes nothing. Nothing
depends on it, and that is precisely what buys it the right to be hidden. The test is not
whether the thing is fun, it is whether a reader who never finds it has lost anything at all.

The second rule is the one teams forget. An egg nobody finds is dead code with a maintenance
bill: it ships in the bundle, it breaks in a refactor, and no analytics will ever tell you it
is broken, because zero uses is what a hidden thing and a dead thing both look like. So the
good ones are hidden from the interface and not from the culture. The Konami code is the
clearest case: nothing on the page carries a [signifier](/signifier) for it, and nothing
needs to, because a generation already knows the sequence, so the convention does the work a
cue would. An arbitrary secret has no such backing and has to be seeded some other way,
through a hint in a changelog, a line left in the source, or the channel that has always
carried these things, which is one person telling another. Word of mouth is not a fallback
here. It is the distribution mechanism, and an egg is designed for it or it is not found.

Two failure modes are worth naming. An egg that fires by accident is worse than no egg,
because a reward nobody meant to summon reads as a bug: the trigger has to be something a
hand does not do on its own, which is why counts of six or seven taps and long fixed
sequences keep turning up. And a real [affordance](/affordance) that starts reading as an egg
has lost its cue rather than gained a secret.
[Press, drag, release](/press-drag-release) is the standing example, a menu gesture desktop
platforms have always answered that most people now meet by surprise, which is a fair
judgment on it and an unflattering one. Between those two, the register is the easy part: an
egg is a product speaking in its own voice with nothing at stake, so the only question left
is whether that voice suits the product on a day when the reader is not in the mood.
