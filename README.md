# vocab.design

A linked visual dictionary of design and UI vocabulary: every term with a live
specimen, its aliases, and the connections between them. Built on the observation that
working with AI agents is mostly about knowing the vocabulary and using it correctly.

Every term has one category (what kind of thing it is), any number of cross-cutting
facets, and a graph of relations: what it contrasts with, what it is a variant or part of,
what to read next. The front page is the directory: the nine categories, every facet, and
the name of every term A to Z. From there, `/browse/{category}` lists one category with
definitions, `/tags/{tag}` lists one facet, `/glossary` carries every name and alias A to
Z, and `/search` is full text over every article, narrowable to a category or a facet.
A few facets are words in their own right (dark pattern, microinteraction), so they have
a definition and a specimen as well as a page of members.
Search is also a modal from any page (the nav link, `/` or Cmd/Ctrl+K), and it is the one
thing on the site that needs JavaScript. It corrects a misspelled headword against the
dictionary itself (`skeumorphism` finds skeuomorphism, and says which spelling it ran),
the same way a mistyped URL is answered by the 404 page. The contrast edges answer a discrimination
test rather than a similarity one, so a term's "Which word?" table lists the words a
person might reach for instead of this one.

[SPEC.md](SPEC.md) is the canonical design document: content model, the two design
systems, the specimen stage and attract mode, and the content pipeline.

## Development

```bash
bun i              # install
bun run dev        # dev server
bun run checks     # biome + typecheck + tests + content validation + specimen smoke tests
bun run build      # static build
```

Specimens are smoke-tested by their own choreographies. The suite needs a browser once:

```bash
bunx playwright install chromium
bun run test:e2e   # plays every choreography, photographs every identify state,
                   # and checks that waking a posed specimen does not eat the click
```

It builds the site and serves it on port 4322, so it never collides with `bun run dev`.
Each run leaves a contact sheet at `e2e/__artifacts__/identify.html`: every specimen with
identify engaged, side by side.

Every term page's link preview is its own specimen, photographed in the pose the identify
control holds: the subject picked out, the rest of the canvas faded back. The pictures are
committed under `public/og/`, and `bun run og --build` re-shoots the ones that are missing
(`--force` for all 1,066, about 40 seconds). What the frame is and why it is not a text
card is [SPEC §10](SPEC.md).

Analytics is off unless a build is given one: `PUBLIC_GA_ID=G-XXXXXXXXXX bun run build`
bakes in a GA4 tag, and without it nothing at all is shipped or loaded. Even with an ID,
the tag refuses to load under Global Privacy Control, under Do Not Track, and on any
localhost, so a local production build cannot pollute a property. What it measures, and
why the failed searches are the interesting part, is [SPEC §10](SPEC.md).

## Licensing

Code is [MIT](LICENSE). Term content (definitions, articles, and demo compositions as
published) is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
