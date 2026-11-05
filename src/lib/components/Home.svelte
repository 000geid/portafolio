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
		<section aria-labelledby="intro-title" class="intro grid items-end gap-3 border-b border-[var(--color-rule)] py-6 md:py-8">
			<div>
				<h1 id="intro-title" class="font-display text-[clamp(2.45rem,5.1vw,4.25rem)] leading-none font-bold tracking-tight text-[var(--color-ink-strong)]">
					{$t('hero.name')}
				</h1>
				<p class="mt-1.5 text-[var(--color-ink-muted)]">{$t('hero.subtitle')}</p>
			</div>
			<p class="max-w-[34ch] text-lg leading-snug md:text-xl lg:text-[1.375rem]">{$t('hero.description')}</p>
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

	@media (min-width: 768px) {
		.intro {
			grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
			column-gap: clamp(2.5rem, 8vw, 7.625rem);
		}
	}
</style>
