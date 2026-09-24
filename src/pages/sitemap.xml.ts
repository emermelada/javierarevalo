/**
 * sitemap.xml, built from the work collection so a new case study is listed
 * without touching this file. /cv/ and /og-card/ are noindex and left out.
 */
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
	const paths = ['/', ...(await getCollection('work')).map((w) => `/work/${w.id}/`)];
	const urls = paths.map((p) => `<url><loc>${new URL(p, site)}</loc></url>`).join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } },
	);
};
