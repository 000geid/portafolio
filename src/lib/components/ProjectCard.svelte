<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { t } from '$lib/stores/i18n';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	interface Props {
		title: string;
		tagline: string;
		year: string;
		mediaUrl: string;
		liveUrl?: string;
		githubUrl?: string;
		/** Shown with the year when the project has no public URL. */
		statusLabel?: string;
		role: string;
		techStack: string[];
		architecture: string;
		impact: string;
		impactDetail?: string;
		editorial?: boolean;
		leadFigure?: Snippet;
	}

	let {
		title,
		tagline,
		year,
		mediaUrl,
		liveUrl,
		githubUrl,
		statusLabel,
		role,
		techStack,
		architecture,
		impact,
		impactDetail,
		editorial = false,
		leadFigure
	}: Props = $props();

	// Keep the numeric result and any approximation sign together when splitting the sentence.
	const METRIC_PATTERN = /([+~≈]?\d[\d.,]*%?)/g;

	const isImage = $derived(/\.(svg|webp|png|jpg|jpeg|gif)($|\?)/i.test(mediaUrl));
	const isDiagram = $derived(/\.svg($|\?)/i.test(mediaUrl));
	const isVideo = $derived(/\.(mp4|webm)($|\?)/i.test(mediaUrl));
	const impactParts = $derived(impact.split(METRIC_PATTERN));
	const hasLinks = $derived(Boolean(liveUrl || githubUrl));

	let mediaFailed = $state(false);
	let videoEl: HTMLVideoElement | undefined = $state();
	let imgEl: HTMLImageElement | undefined = $state();

	onMount(() => {
		// SSR markup may have already failed to load before hydration attached the error handler.
		if (imgEl?.complete && imgEl.naturalWidth === 0) mediaFailed = true;
		if (videoEl && (videoEl.error || videoEl.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) {
			mediaFailed = true;
		}

		const video = videoEl;
		if (!video || typeof IntersectionObserver === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// Only play loops that are on screen.
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) void video.play().catch(() => {});
				else video.pause();
			},
			{ threshold: 0.35 }
		);
		observer.observe(video);
		return () => observer.disconnect();
	});
</script>

<article class="project" class:lead={Boolean(leadFigure)} class:editorial>
	<div class="project-copy min-w-0">
		<header class="mb-3">
			<h3 class="project-title font-display font-semibold text-3xl md:text-4xl tracking-tight text-[var(--color-ink-strong)] leading-tight mb-1">
				{title}
			</h3>
			<p class="flex flex-wrap gap-x-2 font-body text-sm text-[var(--color-ink-muted)]">
				<span>{role}</span>
				<span aria-hidden="true">·</span>
				<span class="tabular-nums">{year}</span>
				{#if statusLabel && !hasLinks}
					<span aria-hidden="true">·</span>
					<span>{statusLabel}</span>
				{/if}
			</p>
		</header>

		{#if !leadFigure}
			<p class="project-tagline font-body text-base text-[var(--color-ink-muted)] leading-relaxed max-w-prose">{tagline}</p>
		{/if}
		<p class="impact mt-4 max-w-prose font-body text-base leading-relaxed font-medium text-[var(--color-ink-strong)] md:text-lg">
			{#each impactParts as part, i}
				{#if i % 2 === 1}
					<strong class="font-mono font-semibold text-[var(--color-signal)]">{part}</strong>
				{:else if part.trim()}
					<span>{part}</span>
				{/if}
			{/each}
		</p>
		{#if leadFigure}
			<p class="mt-4 max-w-prose font-body text-base leading-relaxed text-[var(--color-ink-muted)]">{tagline}</p>
		{/if}

		<details class="group mt-3">
			<summary class="flex items-center gap-2 min-h-11 w-fit cursor-pointer list-none font-body text-sm font-semibold text-[var(--color-signal)] hover:underline underline-offset-4 [&::-webkit-details-marker]:hidden">
				<ChevronDown class="w-4 h-4 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
				{$t(leadFigure ? 'projects.card.viewArchitecture' : 'projects.card.details')}
			</summary>

			<div class="space-y-4 pb-2 pt-2 font-body text-sm text-[var(--color-ink-muted)] leading-relaxed">
				<p class="max-w-prose">{architecture}</p>
				{#if impactDetail}
					<p class="max-w-prose">{impactDetail}</p>
				{/if}
				<p class="max-w-prose">{techStack.join(' · ')}</p>
				<div class="relative aspect-video overflow-hidden rounded-lg bg-[var(--color-parchment-alt)]">
					{#if mediaFailed || (!isImage && !isVideo)}
						<div class="media-fallback absolute inset-0 flex items-center justify-center bg-[var(--color-elevated)]" aria-hidden="true">
							<span class="font-display font-semibold text-6xl tracking-tighter text-[var(--color-signal)] opacity-40">
								{title.charAt(0)}
							</span>
						</div>
					{:else if isImage}
						<img
							bind:this={imgEl}
							src={mediaUrl}
							alt={isDiagram ? `${$t('projects.card.diagram')} · ${title}` : title}
							loading="lazy"
							decoding="async"
							class="absolute inset-0 w-full h-full object-cover"
							onerror={() => (mediaFailed = true)}
						/>
					{:else if isVideo}
						<video
							bind:this={videoEl}
							src={mediaUrl}
							class="absolute inset-0 w-full h-full object-cover"
							muted
							loop
							playsinline
							preload="metadata"
							aria-hidden="true"
							onerror={() => (mediaFailed = true)}
						></video>
					{/if}
				</div>
				{#if hasLinks}
					<div class="flex flex-wrap gap-x-5">
						{#each [{ href: liveUrl, label: 'projects.card.liveDemo' }, { href: githubUrl, label: 'projects.card.sourceCode' }] as { href, label } (label)}
							{#if href}
								<a href={href} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 min-h-11 text-[var(--color-signal)] font-medium hover:underline underline-offset-4">
									{$t(label)}
									<ExternalLink class="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
									<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
								</a>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</details>
	</div>
	{#if leadFigure}
		<div class="lead-figure min-w-0">
			{@render leadFigure()}
		</div>
	{/if}
</article>

<style>
	.project:not(.editorial) {
		max-width: 48rem;
	}

	.editorial .impact strong {
		font-family: var(--font-display);
		font-size: 1.65em;
		line-height: 1;
		font-variant-numeric: lining-nums;
	}

	.editorial:not(.lead) .impact strong:first-child {
		display: block;
		width: fit-content;
		margin-bottom: 0.25rem;
		font-size: clamp(2.5rem, 4.2vw, 3.75rem);
		font-weight: 500;
		letter-spacing: -0.04em;
	}

	.lead .project-title {
		font-size: clamp(2.75rem, 6.8vw, 5.875rem);
		line-height: 0.98;
	}

	.lead .impact {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 1.25rem;
		max-width: none;
		line-height: 1.35;
	}

	.lead .impact strong {
		font-size: clamp(5.5rem, 10.5vw, 9.5rem);
		font-weight: 500;
		letter-spacing: -0.055em;
		white-space: nowrap;
	}

	.lead .impact span {
		max-width: 23ch;
		font-size: 1rem;
	}

	.lead-figure {
		margin-top: 1.5rem;
	}

	@media (min-width: 768px) {
		.lead,
		.editorial:not(.lead) .project-copy {
			display: grid;
			grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
			column-gap: clamp(2.5rem, 8vw, 7.625rem);
		}

		.lead-figure {
			align-self: start;
			margin-top: clamp(2rem, 6.5vw, 5.5rem);
		}

		.editorial:not(.lead) .project-tagline {
			grid-column: 1;
		}

		.editorial:not(.lead) .impact {
			grid-area: 1 / 2 / span 2;
			align-self: center;
			margin-top: 0;
		}
	}
</style>
