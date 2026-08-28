# Enumeration working data (SPEC §11, stage 1)

Pipeline working data, not site content. Nothing here is rendered or validated by the
site's CI gates; it feeds stage 2 (canonicalize), where a human approves the taxonomy
before any term file is authored.

## Files

- `<category>.json`: one file per category (`component`, `layout`, `pattern`,
  `interaction`, `motion`, `typography`, `color`, `surface`, `aesthetic`,
  `accessibility`), each a JSON array of candidate-term records produced by an
  enumeration sweep. `surface.json` does not exist yet: the category was carved out of
  `aesthetic` on 2026-08-26, after these files were written, so the check pass reports it
  missing until a sweep produces one.
- `systems.json`: the registry of implementation sources (design systems, component
  libraries, specs, pattern catalogs) with availability and trust data. Term records
  reference these by `systemId`, so deciding what to show, hide, or rank later is a
  join against this file, never an edit across hundreds of term records.
- `candidates.json`: THE LIVE POOL, and the file the authoring round reads. Nominally
  the merged, deduped output of the category files, but in practice hand maintained:
  every sweep since the enumeration phase has appended to it and left the category files
  frozen. The two have drifted (87 records in the pool that no category file has, 56 in
  the category files the pool retired as they were authored), so
  `scripts/merge-enumeration.ts` can no longer regenerate it faithfully and does not try
  by default. Reconciling the two is an open job; until then, append.

## Candidate term record

```jsonc
{
  "name": "Command palette",          // display headword
  "slug": "command-palette",          // kebab-case, unique
  "category": "component",            // exactly one of the ten categories
  "definition": "…",                  // draft: one sentence, <= 200 chars, NO em-dashes
  "useWhen": "…",                     // optional, <= 90 chars: the situation the word is for
  "aliases": [
    { "name": "command menu", "source": "vercel" }   // source optional
  ],
  "relatedSlugs": ["combobox"],       // loose links; canonicalize decides real relations
  "priority": "head",                 // head | core | tail (tail is the product)
  "demo": "inline",                   // inline | iframe | none (iframe only for document-scope subjects)
  "sources": [
    { "title": "ARIA APG: …", "url": "https://…" }
  ],
  "implementations": [
    {
      "systemId": "cmdk",             // references systems.json id; new ids allowed
      "name": "Command",              // the system's own name for the concept
      "url": "https://…",             // docs URL, never invented
      "verified": true                // true only if confirmed by search/fetch this sweep
    }
  ],
  "notes": "…",                       // optional: naming disputes, merge candidates
  "resolved": "folded into badge, which carries \"dock badge\""  // see below
}
```

### `resolved`: the field that keeps settled records out of a round

A candidate can leave the pool two ways. It can be AUTHORED, which produces
`src/content/terms/<slug>.mdx` and is therefore visible to a filename check. Or it can be
FOLDED into a term published under a different headword (`dock-badge` into `badge`), or
DROPPED as not a term at all (`icon-button-label`, a technique of `accessible-name`). The
second kind never becomes a file, so nothing mechanical can tell it from an unauthored
candidate, and it reads as pool for ever.

`resolved` is where that knowledge lives. Set it to a sentence naming the term the record
went into and the spelling that carries it, so the claim can be re-checked later:

```jsonc
"resolved": "folded into coach-mark, which carries \"hotspot\" and \"beacon\""
"resolved": "retired 2026-08-18: already an alias of glassmorphism"
"resolved": "dropped from the pool (2026-08-15): it is a technique of accessible-name, not a term"
```

`merge-enumeration.ts` skips a resolved record without checking or reporting it, and
`pool-remaining.ts` keeps it off the roster. Nothing enforces the sentence, so assert the
alias against the published term before writing it rather than assuming it.

## System record (`systems.json`)

```jsonc
{
  "id": "radix",
  "name": "Radix Primitives",
  "vendor": "WorkOS",
  "kind": "component-library",        // design-system | component-library | spec |
                                      // pattern-catalog | css-framework
  "docsUrl": "https://…",
  "repoUrl": "https://…",             // null when closed source
  "availability": "open-source",      // open-source | free-docs | paid | private
  "license": "MIT",                   // null when closed
  "trust": {
    "githubStars": 17000,             // null when not applicable
    "npmPackage": "@radix-ui/react-dialog",
    "npmWeeklyDownloads": 5000000,
    "official": false,                // platform-vendor authority (HIG, Material, ARIA APG)
    "maintained": true,
    "asOf": "2026-08-10"              // when the numbers were read
  },
  "tracked": true,                    // already in the SPEC §9 registry / schema.ts SYSTEMS
  "notes": ""
}
```

Availability and `trust` exist so the site can later exclude or de-rank sources
(private systems, paid walls, abandoned libraries) without touching term data.

## Rules carried over from the content model

- Definitions and every other prose field: never an em-dash (SPEC §2.4).
- Slugs are kebab-case and globally unique across all categories.
- Implementation URLs are only recorded when actually verified against the live web
  during the sweep; `verified: false` marks rows recalled from memory that still need
  a probe.
