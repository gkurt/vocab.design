---
name: Streaming announcement
slug: streaming-announcement
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: How a screen reader is told about text that arrives token by token,
  holding the region quiet while it streams and speaking once when the answer is
  complete.
aliases:
  - name: token flood
    source: community
  - name: streaming live region
    source: community
  - name: generation complete announcement
    source: community
tags:
  - ai
  - assistive-tech
  - messaging
relations:
  contrastWith:
    - typing-indicator
  variantOf: []
  partOf: []
  seeAlso:
    - live-region
    - typewriter-effect
implementations: []
sources:
  - title: "Primer: Copilot accessibility principles"
    url: https://primer.style/accessibility/foundations/copilot-principles/
  - title: "Harvard User Research Center: Review of generative AI chatbots
      accessibility"
    url: https://urc.library.harvard.edu/blog/review-generative-ai-chatbots-accessibility
demo: inline
exhibit: false
useWhen: a reply types itself in and floods the announcer
---

Streamed text breaks the assumption a [live region](/live-region) is built on: that an update is an
event. A generated reply is not one update, it is two hundred, and a region wired the obvious way
announces every one of them. The reader hears the first two words of a sentence, then the first
three, then a fragment of the fourth as the queue jumps ahead, and by the time the answer is on
screen the speech has said nothing usable at all. That failure mode has a name in practice, the
token flood, and it is the single most common accessibility bug in a
[natural language interface](/natural-language-interface).

The fix is to separate the writing from the announcing. Let the tokens land in the transcript as
they arrive, because a sighted reader and a braille reader following along both want that, and keep
the region that speaks quiet until the answer settles. This is one of the few places
[busy state](/busy-state) genuinely earns its keep: `aria-busy="true"` on the region for the
duration of the generation, cleared when the last token lands, is exactly the "this is halfway
written, do not read it yet" signal streaming needs, and it is one attribute rather than a custom
queue. What speaks at the end is one [status message](/status-message): the reply is complete, and
usually how long it is, so a reader knows whether to read on or move past.

The choice you actually have to make is what "complete" means. Waiting for the whole answer is right
for a short reply and wrong for a long one, because a reader who asked a question two minutes ago has
been staring at silence. Announcing at sentence or paragraph boundaries is the middle ground, and it
holds up as long as the boundary is real: chunking every N tokens produces the same flood, just
slower. Whatever you pick, say when generation starts as well ("generating a reply"), because the
gap between the question and the answer is otherwise indistinguishable from nothing having happened.

Two smaller things worth wiring while you are there. Give the reader a way to stop generation and
announce that it stopped, since a stream that ends early is a state, not an absence. And do not put
the streaming text itself inside an `aria-live` container "just to be safe": a region that is both
the transcript and the announcer is the flood by construction, and no amount of politeness setting
will save it.
