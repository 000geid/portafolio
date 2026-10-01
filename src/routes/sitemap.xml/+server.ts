import { sectionDefinitions } from '$lib/data/sections';
import { resolveSiteOrigin } from '$lib/seo/site';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const origin = resolveSiteOrigin(url.origin);
	// `/projects` is already one of the section paths.
	const paths = ['/', ...sectionDefinitions.map((s) => s.path)];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
