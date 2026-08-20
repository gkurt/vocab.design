# vocab.design

A linked visual dictionary of design and UI vocabulary: every term with a live
specimen, its aliases, and the connections between them. Built on the observation that
working with AI agents is mostly about knowing the vocabulary and using it correctly.

Every term has one category (what kind of thing it is), any number of cross-cutting
facets browsable at `/tags`, and a graph of relations: what it contrasts with, what it
is a variant or part of, what to read next. The contrast edges answer a discrimination
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

## Licensing

Code is [MIT](LICENSE). Term content (definitions, articles, and demo compositions as
published) is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
