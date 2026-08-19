// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
	/**
	 * Public origin of the deployed site. Base.astro builds canonical and
	 * Open Graph URLs from it, so it has to match the custom domain in
	 * public/CNAME.
	 */
	site: 'https://cv.javierarevalo.dev',
	/**
	 * GitHub Pages serves /work/smart-desk and /work/smart-desk/ as the same
	 * document, so neither form is treated as wrong in dev either.
	 */
	trailingSlash: 'ignore',
});
