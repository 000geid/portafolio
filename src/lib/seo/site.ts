import { env } from '$env/dynamic/public';

/** Cookie mirrored from client language preference so SSR `<html lang>` matches content. */
export const SITE_LANG_COOKIE = 'site-lang';

/** Default Open Graph image under `static/` (1200×630). */
export const DEFAULT_OG_IMAGE_PATH = '/og-default.png';

export function resolveSiteOrigin(pageOrigin: string): string {
	const configured = env.PUBLIC_SITE_URL?.replace(/\/$/, '').trim();
	return configured && configured.length > 0 ? configured : pageOrigin.replace(/\/$/, '');
}

export function absoluteUrl(siteOrigin: string, pathnameOrPath: string): string {
	const origin = siteOrigin.replace(/\/$/, '');
	const path = pathnameOrPath.startsWith('/') ? pathnameOrPath : `/${pathnameOrPath}`;
	return `${origin}${path}`;
}
