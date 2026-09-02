---
name: Pronunciation
slug: pronunciation
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: How a synthetic voice says a word, and the hints an author can give
  when the default reading turns a product name, a units string, or a homograph
  into nonsense.
aliases:
  - name: phonetic spelling
    source: community
  - name: speech pronunciation
    source: community
tags:
  - assistive-tech
  - sound
relations:
  contrastWith:
    - ruby-annotation
    - abbreviation
  variantOf: []
  partOf: []
  seeAlso:
    - screen-reader
implementations: []
sources:
  - title: "WCAG 2.2: Pronunciation"
    url: https://www.w3.org/TR/WCAG22/#pronunciation
demo: inline
exhibit: false
useWhen: the screen reader mangles a name or a number
---

Speech synthesis guesses. Given `lead` it has to decide between the metal and the verb, given
`SQL` between three letters and a word, given `2-4` between a range and a subtraction, and given
your product name between whatever pieces of English it can find inside it. Most of the time the
guess is right and nobody notices. When it is wrong the sentence stops making sense, and the
reader has no way to tell whether the interface said something strange or the voice did.

WCAG 3.1.6 Pronunciation sits at level AAA and asks for a mechanism when meaning is ambiguous
without the pronunciation. What it does not do is hand you an attribute, because the web platform
never shipped one. CSS Speech defined `speak-as` and no [screen reader](/screen-reader)
implements it; SSML is available inside spoken media, not inside HTML. So the techniques in
practice are all workarounds: write the reading out in visible text beside the word, mark the
word `aria-hidden="true"` and put a respelling next to it in visually hidden text, or use ruby
for the languages that have a real annotation convention for this. The respelling trick is the
one authors reach for most, and it is worth knowing that it costs you the visible word in the
accessibility tree, so it should be used on a name or two and not on prose.

Two neighbouring terms carry more of this load than people expect. Getting the
[language attribute](/language-attribute) right is the single highest-value pronunciation fix
available, because it chooses the voice: a French name inside an English page is read by an
English voice until `lang="fr"` says otherwise, and no amount of respelling will beat simply
telling the reader which language it is in. An [abbreviation](/abbreviation) marked up properly
does not change pronunciation on its own, but writing out the expansion gives the reader a form
the voice can say, which is often the real reason the shortening was unreadable.

Test with a real voice before writing any of it. Most pronunciation bugs are in three places:
proper nouns, units and quantities, and strings people read as letters when the voice reads them
as words. Fix those and leave the rest of the page alone, because every hint you author is a
piece of markup that lies to a search engine, to a copy-and-paste, and to the next person who
edits the sentence.
