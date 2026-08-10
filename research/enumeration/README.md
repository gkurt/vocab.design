# Enumeration working data (SPEC §11, stage 1)

Pipeline working data, not site content. Nothing here is rendered or validated by the
site's CI gates; it feeds stage 2 (canonicalize), where a human approves the taxonomy
before any term file is authored.

## Files

- `<category>.json` — one file per category (`component`, `layout`, `pattern`,
  `interaction`, `motion`, `typography`, `color`, `aesthetic`, `accessibility`),
  each a JSON array of candidate-term records produced by an enumeration sweep.
- `systems.json` — registry of implementation sources (design systems, component
  libraries, specs, pattern catalogs) with availability and trust data. Term records
  reference these by `systemId`, so deciding what to show, hide, or rank later is a
  join against this file, never an edit across hundreds of term records.
- `candidates.json` — merged, deduped output of all category files (generated).

## Candidate term record

```jsonc
{
  "name": "Command palette",          // display headword
  "slug": "command-palette",          // kebab-case, unique
  "category": "component",            // exactly one of the nine categories
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
  "notes": "…"                        // optional: naming disputes, merge candidates
}
```

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
