import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { termSchema } from '#src/lib/schema.ts';

export const collections = {
  terms: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/terms' }),
    schema: termSchema,
  }),
};
