# vocab.design

A linked visual dictionary of design and UI vocabulary — every term with a live
specimen, its aliases, and the connections between them. Built on the observation that
working with AI agents is mostly about knowing the vocabulary and using it correctly.

[SPEC.md](SPEC.md) is the canonical design document: content model, the two design
systems, the specimen stage and attract mode, and the content pipeline.

## Development

```bash
bun i              # install
bun run dev        # dev server
bun run checks     # biome + typecheck + tests + content validation
bun run build      # static build
```

## Licensing

Code is [MIT](LICENSE). Term content (definitions, articles, and demo compositions as
published) is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
