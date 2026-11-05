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

<div id="home" class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
	<header class="pt-6 pb-12 md:pt-8 md:pb-20 lg:pb-28">
		<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-12 md:mb-20">
			<p class="font-body text-sm text-[var(--color-ink-muted)]">Buenos Aires, Argentina</p>
			<SiteControls />
		</div>

		<h1 class="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--color-ink-strong)] leading-[1.05] mb-2">
			{$t('hero.name')}
		</h1>
		<p class="font-body text-base sm:text-lg font-medium text-[var(--color-signal)]">
			{$t('hero.subtitle')}
		</p>
		<p class="font-body text-base sm:text-lg text-[var(--color-ink)] leading-relaxed max-w-xl mt-4 lg:mt-6">
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

	<main id="main-content" class="min-w-0 space-y-16 md:space-y-24 lg:space-y-32">
		<FeaturedProjects />
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
	</main>
</div>
