/**
 * Content collections.
 *
 * `work` holds one markdown file per project case study
 * (src/content/work/*.md). The frontmatter below feeds the home-page
 * card and the case header; the markdown body is the case narrative
 * (Problem → Solution → Result). The file name becomes the URL slug:
 * `smart-desk.md` → /work/smart-desk/.
 */
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
		/** YouTube video ID — when set, the case media slot embeds the video. */
		youtube: z.string().optional(),
	}),
});

export const collections = { work };
