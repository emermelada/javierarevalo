import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		year: z.string(),
		role: z.string(),
		stack: z.array(z.string()),
		summary: z.string(),
		order: z.number(),
		/** Optional external link shown on the case page (repo, live site…). */
		linkLabel: z.string().optional(),
		linkUrl: z.string().optional(),
	}),
});

export const collections = { work };
