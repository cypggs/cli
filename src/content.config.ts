import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cli = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/cli' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['ai', 'cloud', 'dev', 'knowledge', 'search', 'files']),
    tagline: z.string(),
  }),
});

export const collections = { cli };
