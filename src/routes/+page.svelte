<script lang="ts">
	import { page } from '$app/stores';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import Home from '$lib/components/Home.svelte';
	import { absoluteUrl, resolveSiteOrigin } from '$lib/seo/site';
	import { t } from '$lib/stores/i18n';

	const personJsonLd = $derived.by(() => {
		const origin = resolveSiteOrigin($page.url.origin);
		const siteUrl = absoluteUrl(origin, '/');
		return {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Diego Alvarado',
			url: siteUrl,
			jobTitle: 'Product Engineer',
			email: 'mailto:dmalvaradog26@gmail.com',
			sameAs: ['https://github.com/000geid', 'https://www.linkedin.com/in/ogeid/'],
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Buenos Aires',
				addressCountry: 'AR'
			}
		};
	});
</script>

<SeoMeta
	title="{$t('hero.name')} — {$t('home.meta.title')}"
	description={$t('home.meta.description')}
	jsonLd={personJsonLd}
/>

<Home />
