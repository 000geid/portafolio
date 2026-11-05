<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import SiteControls from '$lib/components/SiteControls.svelte';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	const cvHref = $derived($language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf');

	onMount(() => {
		function revealHashTarget() {
			const hash = window.location.hash.slice(1);
			const target = document.getElementById(hash === 'projects' ? 'featured-work' : hash);
			const disclosure = target?.closest('details');
			if (disclosure && !disclosure.open) {
				disclosure.open = true;
				requestAnimationFrame(() => target?.scrollIntoView());
			} else if (hash === 'projects') {
				target?.scrollIntoView();
			}
		}

		revealHashTarget();
		window.addEventListener('hashchange', revealHashTarget);
		return () => window.removeEventListener('hashchange', revealHashTarget);
	});
</script>

<div id="home" class="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12">
	<header class="flex flex-wrap items-center justify-between gap-x-5 border-b-2 border-[var(--color-ink-strong)] py-3 md:py-4">
		<p class="text-sm text-[var(--color-ink-muted)]">Buenos Aires, Argentina</p>
		<div class="md:ml-auto"><SiteControls /></div>
		<nav aria-label={$t('nav.sections')} class="flex w-full flex-wrap gap-x-3 text-sm md:w-auto md:gap-x-5">
			<a href="#featured-work">{$t('about.ctaProjects')}</a>
			<a href="#career">{$t('careerPath.title')}</a>
			<a href={cvHref} target="_blank" rel="noopener noreferrer">
				{$t('contact.downloadCv')}
				<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
			</a>
			<a href="#contact">{$t('contact.title')}</a>
		</nav>
	</header>

	<main id="main-content" class="min-w-0">
		<section aria-labelledby="intro-title" class="border-b border-[var(--color-rule)] pt-9 pb-8 md:pt-14 md:pb-12">
			<h1 id="intro-title" class="max-w-[26ch] font-display text-[clamp(2.5rem,6.6vw,6rem)] leading-[0.98] font-semibold tracking-tight text-balance text-[var(--color-ink-strong)]">
				{$t('hero.headline')}
			</h1>
			<p class="mt-4 text-sm text-[var(--color-ink-muted)] md:mt-5 md:text-base">
				<strong class="font-semibold text-[var(--color-ink-strong)]">{$t('hero.name')}</strong>
				<span class="mx-1" aria-hidden="true">·</span>{$t('hero.subtitle')}
			</p>
			<p class="mt-2 max-w-[54ch] leading-relaxed text-pretty md:text-lg">{$t('hero.scope')}</p>
			<a href="#featured-work" class="mt-5 inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-[var(--color-ink-strong)] px-4 text-sm font-semibold text-[var(--color-parchment)] hover:bg-[var(--color-ink)] md:mt-6">
				{$t('about.ctaProjects')}
				<ArrowDown class="size-4" strokeWidth={1.75} aria-hidden="true" />
			</a>
		</section>

		<FeaturedProjects editorial={true} />

		<div class="mt-16 space-y-16 md:mt-24 md:space-y-24 lg:mt-32 lg:space-y-32">
			<Timeline embedded={true} />
			<div class="border-t border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
				<details class="group border-b border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
					<summary class="flex items-center justify-between gap-4 min-h-16 cursor-pointer list-none font-display font-semibold text-2xl text-[var(--color-ink-strong)] hover:text-[var(--color-signal)] [&::-webkit-details-marker]:hidden">
						{$t('skills.title')}
						<ChevronDown class="w-5 h-5 shrink-0 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
					</summary>
					<Skills embedded={true} />
				</details>
				<details class="group border-b border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
					<summary class="flex items-center justify-between gap-4 min-h-16 cursor-pointer list-none font-display font-semibold text-2xl text-[var(--color-ink-strong)] hover:text-[var(--color-signal)] [&::-webkit-details-marker]:hidden">
						{$t('education.title')}
						<ChevronDown class="w-5 h-5 shrink-0 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
					</summary>
					<Education embedded={true} />
				</details>
			</div>
			<Contact embedded={true} />
		</div>
	</main>
</div>

<style>
	nav a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}

	nav a:hover {
		color: var(--color-signal);
	}
</style>
