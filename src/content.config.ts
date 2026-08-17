/**
 * Content collections.
 *
 * `work` holds one markdown file per project case study
 * (src/content/work/*.md). The frontmatter below feeds the home-page
 * index row and the case header; the markdown body is the case narrative
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
		/**
		 * Where the project actually is. Rendered as its own column in the
		 * work index, so "in progress" reads as a stated fact rather than
		 * something the page is hiding.
		 */
		status: z.enum(['shipped', 'in-progress']),
		/** Short qualifier shown next to the status — what is or isn't done. */
		statusNote: z.string().optional(),
		/**
		 * External destinations (repo, live site, backend…). A list, because
		 * one project can legitimately be two repositories.
		 */
		links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
		/**
		 * Sibling project this one forms a system with. Rendered as
		 * "<prefix> <name>", where the name links to the sibling's case.
		 */
		related: z
			.object({ slug: z.string(), prefix: z.string(), name: z.string() })
			.optional(),
		/**
		 * Renders as a sub-numbered row (02.1 under 02) instead of its own
		 * number. Same type size and same columns — the numbering shows
		 * adjacency, not subordination.
		 */
		sub: z.boolean().default(false),
		/** YouTube video ID — when set, the case media slot embeds the video. */
		youtube: z.string().optional(),
	}),
});

export const collections = { work };
