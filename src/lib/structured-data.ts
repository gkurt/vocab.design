import { CATEGORIES } from '#src/lib/schema.ts';
import { absoluteUrl } from '#src/lib/url.ts';

/**
 * What the site itself is, as structured data (SPEC §10). A term page already says what
 * one word means; this answers the question asked once, on the front page, before any of
 * that is trusted: who publishes this, what the whole set is, and where the machine
 * readable copies of it are. One `@graph` rather than four blocks, so the nodes can
 * reference each other by `@id` instead of repeating the publisher four times.
 */

const REPOSITORY = 'https://github.com/gkurt/vocab.design';
const LICENSE = 'https://creativecommons.org/licenses/by/4.0/';

/** Stable names for the four things the front page introduces, so other pages can point at them. */
export const IDS = {
  publisher: `${absoluteUrl('/')}#publisher`,
  author: `${absoluteUrl('/')}#author`,
  website: `${absoluteUrl('/')}#website`,
  dictionary: `${absoluteUrl('/')}#dictionary`,
  dataset: `${absoluteUrl('/')}#dataset`,
} as const;

export interface SiteFacts {
  /** The front page's own description, so the markup and the meta tag cannot disagree. */
  description: string;
  /** Published terms, for the dataset's own description. */
  termCount: number;
}

/** JSON-LD is an open vocabulary, so a node is shaped by schema.org rather than by us. */
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type Node = Record<string, JsonValue>;

/** The one script tag the front page ships: a context, and every node under it. */
export interface SiteGraph {
  '@context': 'https://schema.org';
  '@graph': Node[];
}

export function siteGraph({ description, termCount }: SiteFacts): SiteGraph {
  const site = absoluteUrl('/');
  const publisher: Node = {
    '@type': 'Organization',
    '@id': IDS.publisher,
    name: 'vocab.design',
    url: site,
    description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/apple-touch-icon.png'),
      width: 180,
      height: 180,
    },
    sameAs: [REPOSITORY],
    founder: { '@id': IDS.author },
    /* The site publishes no address and no mailbox: it is one person's project, and the
       only postal address behind it is a home one. The issue tracker is the contact that
       actually reaches someone, so it is the one stated. */
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        url: `${REPOSITORY}/issues`,
        availableLanguage: ['English'],
      },
    ],
  };

  const author: Node = {
    '@type': 'Person',
    '@id': IDS.author,
    name: 'Gokhan Kurt',
    description: 'The author of vocab.design.',
    url: 'https://github.com/gkurt',
    sameAs: ['https://github.com/gkurt', 'https://x.com/gkurttech'],
  };

  const website: Node = {
    '@type': 'WebSite',
    '@id': IDS.website,
    name: 'vocab.design',
    url: site,
    description,
    inLanguage: 'en',
    license: LICENSE,
    publisher: { '@id': IDS.publisher },
    author: { '@id': IDS.author },
    mainEntity: { '@id': IDS.dictionary },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/search')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  /* The category pages carry their own DefinedTermSet with the terms in it, so this names
     them rather than restating 1,000 headwords the front page already lists in full. */
  const dictionary: Node = {
    '@type': 'DefinedTermSet',
    '@id': IDS.dictionary,
    name: 'vocab.design',
    url: site,
    description,
    inLanguage: 'en',
    license: LICENSE,
    publisher: { '@id': IDS.publisher },
    hasPart: CATEGORIES.map((category) => ({
      '@type': 'DefinedTermSet',
      '@id': absoluteUrl(`/browse/${category}`),
      name: category,
      url: absoluteUrl(`/browse/${category}`),
    })),
  };

  /* The exports, named as what they are. An agent that reads this does not have to parse
     llms.txt to find out that the whole vocabulary is one request away. */
  const dataset: Node = {
    '@type': 'Dataset',
    '@id': IDS.dataset,
    name: 'vocab.design vocabulary',
    description: `All ${termCount.toLocaleString('en-US')} terms with their definitions, aliases, relations, tags and implementations.`,
    url: site,
    license: LICENSE,
    inLanguage: 'en',
    isAccessibleForFree: true,
    creator: { '@id': IDS.publisher },
    distribution: [
      { '@type': 'DataDownload', name: 'terms.json', encodingFormat: 'application/json', contentUrl: absoluteUrl('/terms.json') },
      { '@type': 'DataDownload', name: 'llms-full.txt', encodingFormat: 'text/markdown', contentUrl: absoluteUrl('/llms-full.txt') },
      { '@type': 'DataDownload', name: 'paths.json', encodingFormat: 'application/json', contentUrl: absoluteUrl('/paths.json') },
    ],
  };

  return { '@context': 'https://schema.org', '@graph': [publisher, author, website, dictionary, dataset] };
}
