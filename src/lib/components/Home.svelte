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
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	const cvHref = $derived($language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf');

	const METRIC_PATTERN = /([+~≈]?\d[\d.,]*%?)/;

	const proofCaption = $derived(
		selectedProjects
			.filter((project) => project.featured)
			.map((project) => {
				const copy = project[$language];
				const parts = copy.impact.split(METRIC_PATTERN);
				const metric = parts[1] ?? '';
				const shortTitle = copy.title.split('—')[0].trim();
				const unit =
					project.id === 'muveran-ai'
						? $language === 'es'
							? 'rendimiento RAG'
							: 'RAG throughput'
						: $language === 'es'
							? 'radiografías/mes'
							: 'X-rays/mo';
				return `${shortTitle} (${metric} ${unit})`;
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

<div id="home" class="min-w-0">
	<!-- Crisp gallery-white masthead -->
	<header class="bg-[var(--color-parchment)] text-[var(--color-ink-strong)] border-b border-[var(--color-rule)]">
		<div class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 px-6 md:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-14 py-2">
			<a
				href="#home"
				class="inline-flex min-h-[44px] items-center font-mono text-xs md:text-[0.8125rem] font-medium tracking-[0.22em] uppercase text-[var(--color-ink-strong)]"
			>
				{$t('hero.name')}
			</a>

			<div class="justify-self-end lg:order-3">
				<SiteControls />
			</div>

			<nav
				aria-label={$t('nav.sections')}
				class="col-span-2 flex w-full items-center justify-between border-t border-[var(--color-rule)] lg:order-2 lg:col-span-1 lg:w-auto lg:justify-center lg:gap-x-9 lg:border-t-0"
			>
				<a href="#featured-work">{$t('projects.title')}</a>
				<a href="#career">{$t('careerPath.title')}</a>
				<a href={cvHref} target="_blank" rel="noopener noreferrer">
					CV
					<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
				</a>
				<a href="#contact">{$t('contact.title')}</a>
			</nav>
		</div>
	</header>

	<main id="main-content" class="min-w-0">
		<!-- Opening Gallery Wall · Deep Forest Emerald -->
		<section
			aria-labelledby="intro-title"
			class="bg-[var(--color-emerald)] text-[var(--color-emerald-ink)]"
		>
			<div class="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-[1440px] flex-col justify-between px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-10 lg:px-20">
				<div class="my-auto py-8 md:py-12">
					<h1
						id="intro-title"
						class="max-w-[15ch] font-display text-[clamp(2.75rem,6.2vw,5.35rem)] leading-[1.02] font-bold tracking-[-0.025em] text-balance text-[var(--color-emerald-ink)]"
					>
						{$t('hero.headline')}
					</h1>

					<p class="mt-7 max-w-[48ch] text-pretty font-body text-lg leading-relaxed text-[var(--color-emerald-muted)] md:text-[1.25rem]">
						{$t('hero.scope')}
					</p>

					<div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
						<a
							href="#featured-work"
							class="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-[var(--color-signal)] px-7 font-body text-sm font-semibold text-[#f7f5ef] transition-colors hover:bg-[var(--color-signal-hover)] md:text-[0.9375rem]"
						>
							{$t('about.ctaProjects')}
						</a>
						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex min-h-11 items-center gap-2 font-body text-sm font-medium text-[var(--color-emerald-ink)] transition-colors hover:text-[var(--color-emerald-muted)] md:text-[0.9375rem]"
						>
							<span>{$t('contact.downloadCv')}</span>
							<ArrowRight class="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
							<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
						</a>
					</div>
				</div>

				<div class="border-t border-[var(--color-emerald-rule)] pt-5">
					<p class="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--color-emerald-muted)] md:text-xs">
						<span>Buenos Aires, AR</span>
						{#each proofCaption as item}
							<span aria-hidden="true" class="opacity-50">·</span>
							<span>{item}</span>
						{/each}
					</p>
				</div>
			</div>
		</section>

		<!-- Featured Work · Alternating Gallery Rooms -->
		<FeaturedProjects editorial={true} />

		<!-- Career Path · Museum Stone Room -->
		<Timeline embedded={true} />

		<!-- Skills & Education · Quiet Collapsible Index on Gallery White -->
		<section class="bg-[var(--color-parchment)] text-[var(--color-ink)]">
			<div class="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 lg:px-20">
				<div class="border-t border-[var(--color-rule)]">
					<details class="group border-b border-[var(--color-rule)]">
						<summary class="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-2xl font-semibold tracking-tight text-[var(--color-ink-strong)] transition-colors hover:text-[var(--color-signal)] md:text-3xl [&::-webkit-details-marker]:hidden">
							{$t('skills.title')}
							<ChevronDown class="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
						</summary>
						<div class="pb-10">
							<Skills embedded={true} />
						</div>
					</details>
					<details class="group border-b border-[var(--color-rule)]">
						<summary class="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-2xl font-semibold tracking-tight text-[var(--color-ink-strong)] transition-colors hover:text-[var(--color-signal)] md:text-3xl [&::-webkit-details-marker]:hidden">
							{$t('education.title')}
							<ChevronDown class="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
						</summary>
						<div class="pb-10">
							<Education embedded={true} />
						</div>
					</details>
				</div>
			</div>
		</section>

		<!-- Closing Contact Room · Deep Forest Emerald -->
		<Contact embedded={true} />
	</main>
</div>

<style>
	nav a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-family: var(--font-body);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-ink);
		transition: color 0.2s ease;
	}

	nav a:hover {
		color: var(--color-signal);
	}
</style>
