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

	const cvHref = $derived($language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf');

	onMount(() => {
		if (window.location.hash === '#projects') {
			document.getElementById('featured-work')?.scrollIntoView();
		}
	});
</script>

<div id="home" class="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 lg:flex lg:items-start lg:gap-12 xl:gap-20">
	<header class="pt-6 pb-8 md:pt-8 lg:sticky lg:top-0 lg:w-[40%] lg:shrink-0 lg:py-12 lg:max-h-svh lg:overflow-y-auto">
		<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6 lg:mb-9">
			<p class="font-body text-sm text-[var(--color-ink-muted)]">Buenos Aires, Argentina</p>
			<SiteControls />
		</div>

		<h1 class="font-display font-semibold text-4xl sm:text-5xl xl:text-6xl tracking-tight text-[var(--color-ink-strong)] leading-[1.05] mb-2">
			{$t('hero.name')}
		</h1>
		<p class="font-body text-base sm:text-lg font-medium text-[var(--color-signal)]">
			{$t('hero.subtitle')}
		</p>
		<p class="font-body text-base sm:text-lg text-[var(--color-ink)] leading-relaxed max-w-sm mt-3 lg:mt-5">
			{$t('hero.description')}
		</p>

		<div class="mt-5 lg:mt-7 flex flex-wrap items-center gap-x-4 gap-y-1">
			<a
				href="#featured-work"
				class="px-4 min-h-11 rounded-lg bg-[var(--color-ink-strong)] text-[var(--color-parchment)] hover:bg-[var(--color-ink)] font-body font-semibold text-sm inline-flex items-center gap-2 transition-colors duration-200"
			>
				{$t('about.ctaProjects')}
				<ArrowDown class="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
			</a>
			<a
				href={cvHref}
				target="_blank"
				rel="noopener noreferrer"
				class="min-h-11 px-1 inline-flex items-center font-body text-sm font-medium text-[var(--color-ink-muted)] underline decoration-current/35 underline-offset-4 hover:text-[var(--color-signal)]"
			>
				{$t('contact.downloadCv')}
				<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
			</a>
		</div>

		<nav aria-label={$t('nav.sections')} class="mt-3 lg:mt-6 flex flex-wrap gap-x-5">
			<a href="#career" class="inline-flex items-center min-h-11 font-body text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-signal)] hover:underline underline-offset-4">
				{$t('careerPath.title')}
			</a>
			<a href="#contact" class="inline-flex items-center min-h-11 font-body text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-signal)] hover:underline underline-offset-4">
				{$t('contact.title')}
			</a>
		</nav>
	</header>

	<main id="main-content" class="min-w-0 lg:flex-1 lg:py-12 space-y-16 md:space-y-20">
		<FeaturedProjects />
		<Timeline embedded={true} />
		<Skills embedded={true} />
		<Education embedded={true} />
		<Contact embedded={true} />
	</main>
</div>
