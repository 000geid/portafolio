<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { reveal } from '$lib/actions/reveal';
	import { sectionDefinitions } from '$lib/data/sections';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import SiteControls from '$lib/components/SiteControls.svelte';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Mail from 'lucide-svelte/icons/mail';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	const recruiterEmail = 'dmalvaradog26@gmail.com';

	// The work feed already lists every project, so the index only links the remaining sections.
	const indexSections = sectionDefinitions.filter((section) => section.slug !== 'projects');

	let scrollY = 0;
	let innerHeight = 0;
	let isHoveringRightColumn = false;

	$: cvHref = $language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf';
	$: cvLabel = $language === 'es' ? $t('cv.downloadEs') : $t('cv.downloadEn');
	$: recruiterHref = `mailto:${recruiterEmail}`;
	$: freelanceHref = `mailto:${recruiterEmail}?subject=${encodeURIComponent($t('about.freelance.emailSubject'))}`;
	$: dimmed = isHoveringRightColumn || shouldDimProfile(scrollY, innerHeight);

	/**
	 * Decides when the sticky profile column fades back so the work feed takes focus.
	 * Only has a visual effect on lg+ (see `.profile-column.dimmed` below); hover/focus
	 * on the column always restores full opacity.
	 */
	function shouldDimProfile(scrollY: number, viewportHeight: number): boolean {
		if (typeof window === 'undefined') return false;

		const scrollThreshold = viewportHeight * 0.2; // Dim after scrolling 20% of the viewport height
		const totalHeight = document.documentElement.scrollHeight;
		const currentScrollBottom = scrollY + viewportHeight;
		const isNearBottom = totalHeight - currentScrollBottom < 120; // Re-illuminate when reaching the end/contact area

		return scrollY > scrollThreshold && !isNearBottom;
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#snippet sectionIndex()}
	<nav aria-label={$t('nav.sections')}>
		<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-faint)] mb-3">
			{$t('home.explore.title')}
		</p>
		<ul class="space-y-0.5">
			{#each indexSections as section, idx (section.slug)}
				<li>
					<a
						href={section.path}
						class="group flex items-center gap-3 py-2 min-h-[44px] lg:min-h-0 lg:py-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-strong)] transition-colors duration-200"
					>
						<span class="font-mono text-[10px] tabular-nums text-[var(--color-ink-faint)]">
							{String(idx + 1).padStart(2, '0')}
						</span>
						<span
							class="h-px w-6 bg-current opacity-40 transition-all duration-300 group-hover:w-12 group-hover:opacity-100 group-hover:bg-[var(--color-signal)]"
							aria-hidden="true"
						></span>
						<span class="font-mono text-xs font-semibold uppercase tracking-[0.16em]">
							{$t(section.labelKey)}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/snippet}

<div id="home" class="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 lg:flex lg:gap-12 xl:gap-20">
	<!-- Profile column: sticky on lg+, stacked on top below that -->
	<header
		class="profile-column no-scrollbar pt-6 pb-10 md:pt-8 lg:sticky lg:top-0 lg:h-screen lg:w-[40%] lg:shrink-0 lg:overflow-y-auto lg:py-12"
		class:dimmed
	>
		<div class="reveal flex flex-col gap-7 lg:gap-6 lg:min-h-full" use:reveal>
			<div class="flex items-center justify-between gap-3">
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wide border border-[color-mix(in_srgb,var(--color-signal)_35%,transparent)] text-[var(--color-signal)] bg-[var(--color-signal-soft)]">
					<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] availability-pulse shrink-0" aria-hidden="true"></span>
					{$t('home.availability.openToRoles')}
				</span>
				<SiteControls />
			</div>

			<div>
				<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
					{$t('hero.subtitle')}
				</p>
				<h1 class="font-display font-semibold text-4xl sm:text-5xl xl:text-6xl tracking-tighter text-[var(--color-ink-strong)] leading-[0.95] mb-4">
					{$t('hero.name')}
				</h1>
				<div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
					<span class="inline-flex items-center gap-1.5 font-body text-sm text-[var(--color-ink-muted)]">
						<MapPin class="shrink-0 text-[var(--color-signal)]" size={16} strokeWidth={2} aria-hidden="true" />
						Buenos Aires, Argentina
					</span>
					<span class="font-mono text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">
						{$t('home.availability.remote')} · {$t('home.availability.takingFreelance')}
					</span>
				</div>
				<p class="font-body text-base text-[var(--color-ink)] leading-relaxed max-w-xl">
					{$t('hero.description')}
				</p>
			</div>

			<div class="flex flex-col gap-3 lg:gap-2.5">
				<div class="flex flex-col sm:flex-row gap-3">
					<a
						href={recruiterHref}
						class="flex-1 px-5 py-3.5 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-ink-strong)] font-display font-semibold text-base tracking-tight text-center border border-transparent dark:border-[rgba(210,217,226,0.12)] hover:bg-[var(--color-ink)] dark:hover:bg-[rgba(210,217,226,0.07)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover min-h-[44px] flex items-center justify-center"
					>
						{$t('about.ctaEmail')}
					</a>
					<a
						href={cvHref}
						target="_blank"
						rel="noopener noreferrer"
						class="flex-1 px-5 py-3.5 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-base tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px]"
					>
						<svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						{cvLabel}
					</a>
				</div>
				<a
					href={freelanceHref}
					class="group inline-flex items-center gap-2 self-start min-h-[44px] lg:min-h-0 font-display font-semibold text-sm tracking-tight text-[var(--color-signal)]"
				>
					{$t('about.freelance.cta')}
					<ArrowRight class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden={true} />
				</a>
			</div>

			<div>
				<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-faint)] mb-3">
					{$t('about.coreExpertise')}
				</p>
				<div class="flex flex-wrap gap-1.5">
					{#each $t('about.highlights') as highlight}
						<span class="px-2.5 py-1.5 rounded-md bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.05)] border border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] font-mono text-[11px] text-[var(--color-ink-strong)] uppercase tracking-[0.1em]">
							{highlight}
						</span>
					{/each}
				</div>
			</div>

			<div class="hidden lg:block">
				{@render sectionIndex()}
			</div>

			<ul class="flex items-center gap-2 lg:mt-auto" aria-label={$t('contact.title')}>
				<li>
					<a
						href="https://github.com/000geid"
						target="_blank"
						rel="noopener noreferrer"
						class="social-link"
						aria-label={$t('contact.github')}
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
						</svg>
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/ogeid/"
						target="_blank"
						rel="noopener noreferrer"
						class="social-link"
						aria-label={$t('contact.linkedin')}
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
						</svg>
					</a>
				</li>
				<li>
					<a href={recruiterHref} class="social-link" aria-label={$t('contact.email')}>
						<Mail class="w-5 h-5" strokeWidth={1.75} aria-hidden={true} />
					</a>
				</li>
			</ul>
		</div>
	</header>

	<!-- Work feed: scrolls with the page -->
	<main
		id="main-content"
		class="min-w-0 lg:flex-1 lg:py-12"
		onmouseenter={() => (isHoveringRightColumn = true)}
		onmouseleave={() => (isHoveringRightColumn = false)}
	>
		<FeaturedProjects />

		<div class="lg:hidden pt-10 pb-4 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
			{@render sectionIndex()}
		</div>

		<footer class="py-10 font-body text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
			© {new Date().getFullYear()} Diego Alvarado
		</footer>
	</main>
</div>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.profile-column {
		transition: opacity 300ms ease;
	}

	/* Dimming only makes sense while the column is pinned beside the feed. */
	@media (min-width: 1024px) {
		.profile-column.dimmed {
			opacity: 0.7;
		}

		.profile-column.dimmed:hover,
		.profile-column.dimmed:focus-within {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.profile-column {
			transition: none;
		}
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 0.5rem;
		color: var(--color-ink-muted);
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
	}

	.social-link:hover,
	.social-link:focus-visible {
		color: var(--color-signal);
		background-color: var(--color-signal-soft);
	}

	.availability-pulse {
		animation: availPulse 2.8s ease-in-out infinite;
	}

	@keyframes availPulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-signal) 40%, transparent); }
		50% { opacity: 0.7; box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-signal) 0%, transparent); }
	}
</style>
