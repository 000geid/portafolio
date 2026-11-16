<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { selectedProjects } from '$lib/data/projects';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import SiteControls from '$lib/components/SiteControls.svelte';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	const cvHref = $derived($language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf');

	// Split the measured result from its explanatory sentence for the proof ledger.
	const METRIC_PATTERN = /([+~≈]?\d[\d.,]*%?)/;

	const proof = $derived(
		selectedProjects
			.filter((project) => project.featured)
			.map((project) => {
				const copy = project[$language];
				const parts = copy.impact.split(METRIC_PATTERN);
				return {
					id: project.id,
					title: copy.title,
					metric: parts[1] ?? '',
					context: (parts[2] ?? '').trim(),
					role: copy.role,
					year: project.year
				};
			})
	);

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

<div id="home" class="px-5 md:px-8 lg:px-12">
	<header class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b-2 border-[var(--color-ink-strong)] py-1 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6">
		<p class="flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase text-[var(--color-ink-muted)] md:tracking-[0.14em]">
			<span class="inline-block size-1.5 shrink-0 bg-[var(--color-signal)]" aria-hidden="true"></span>
			Buenos Aires, Argentina
		</p>
		<div class="justify-self-end lg:order-3 lg:border-l lg:border-[var(--color-rule)] lg:pl-6"><SiteControls /></div>
		<nav
			aria-label={$t('nav.sections')}
			class="col-span-2 flex w-full items-center justify-between border-t border-[var(--color-rule)] lg:order-2 lg:col-span-1 lg:w-auto lg:justify-end lg:gap-x-6 lg:border-t-0"
		>
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
		<section aria-labelledby="intro-title" class="pt-8 pb-9 md:pt-12 md:pb-12">
			<h1 id="intro-title" class="max-w-[26ch] font-display text-[clamp(2.5rem,6.6vw,6rem)] leading-[0.98] font-semibold tracking-tight text-balance text-[var(--color-ink-strong)]">
				{$t('hero.headline')}
			</h1>

			<div class="mt-8 grid gap-y-9 border-t-2 border-[var(--color-ink-strong)] pt-5 md:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-14 lg:gap-y-0 lg:pt-6">
				<div class="min-w-0">
					<p class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
						<span class="font-display text-[1.875rem] leading-none font-semibold tracking-tight text-[var(--color-ink-strong)]">{$t('hero.name')}</span>
						<span class="font-mono text-xs tracking-[0.14em] uppercase text-[var(--color-ink-muted)]">{$t('hero.subtitle')}</span>
					</p>
					<p class="mt-4 max-w-[48ch] text-pretty text-base leading-relaxed text-[var(--color-ink)] md:text-lg">
						{$t('hero.scope')}
					</p>
					<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
						<a
							href="#featured-work"
							class="inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-[var(--color-ink-strong)] px-5 text-sm font-semibold text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-signal)]"
						>
							{$t('about.ctaProjects')}
							<ArrowDown class="size-4" strokeWidth={1.75} aria-hidden="true" />
						</a>
						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--color-ink-strong)] underline decoration-[var(--color-rule)] decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--color-signal)] hover:decoration-[var(--color-signal)]"
						>
							{$t('contact.downloadCv')}
							<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
							<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
						</a>
					</div>
				</div>

				<aside
					aria-labelledby="proof-title"
					class="min-w-0 border-t border-[var(--color-ink-strong)] pt-5 lg:border-t-0 lg:border-l lg:border-[var(--color-rule)] lg:pt-1 lg:pl-8"
				>
					<h2 id="proof-title" class="font-mono text-xs tracking-[0.16em] uppercase text-[var(--color-ink-muted)]">
						{$t('home.featured.kicker')}
					</h2>
					<ol class="mt-4">
						{#each proof as result, i (result.id)}
							<li class="border-[var(--color-rule)] py-4 first:pt-0 last:pb-0" class:border-t={i > 0}>
								<p class="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4">
									<span class="font-display text-xl font-semibold tracking-tight text-[var(--color-ink-strong)]">{result.title}</span>
									<span class="font-display text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-[var(--color-signal)] tabular-nums">{result.metric}</span>
								</p>
								<p class="mt-1.5 max-w-[42ch] text-sm leading-snug text-[var(--color-ink)]">{result.context}</p>
								<p class="mt-2 flex flex-wrap items-baseline gap-x-3 font-mono text-xs tracking-[0.08em] uppercase text-[var(--color-ink-faint)]">
									<span>{result.role}</span>
									<span class="ms-auto whitespace-nowrap">{result.year}</span>
								</p>
							</li>
						{/each}
					</ol>
				</aside>
			</div>
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
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration-line: underline;
		text-decoration-color: var(--color-rule);
		text-decoration-thickness: 1px;
		text-underline-offset: 0.4em;
		transition:
			color 0.2s ease,
			text-decoration-color 0.2s ease;
	}

	nav a:hover {
		color: var(--color-signal);
		text-decoration-color: var(--color-signal);
	}
</style>
