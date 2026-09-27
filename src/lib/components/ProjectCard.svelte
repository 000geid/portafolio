<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/i18n';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	interface Props {
		title: string;
		tagline: string;
		year: string;
		mediaUrl: string;
		liveUrl?: string;
		githubUrl?: string;
		role: string;
		techStack: string[];
		architecture: string;
		impact: string;
	}

	let { title, tagline, year, mediaUrl, liveUrl, githubUrl, role, techStack, architecture, impact }: Props =
		$props();

	// Matches "+30%", "70%", "~6,000", "~200" — the capture group keeps matches in split() output.
	const METRIC_PATTERN = /([+~]?\d[\d.,]*%?)/g;

	const isGif = $derived(/\.gif($|\?)/i.test(mediaUrl));
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

		// Only play loops that are on screen — five autoplaying videos would compete for bandwidth and CPU.
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

<article
	class="@container group rounded-2xl border border-[rgba(31,35,42,0.09)] dark:border-[rgba(210,217,226,0.09)]
		bg-[color-mix(in_srgb,var(--color-elevated)_70%,transparent)] backdrop-blur-[2px] overflow-hidden
		hover:border-[rgba(31,35,42,0.16)] dark:hover:border-[rgba(210,217,226,0.16)] transition-colors duration-200"
>
	<!-- Media preview -->
	<div class="relative aspect-video overflow-hidden border-b border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] bg-[var(--color-parchment-alt)]">
		{#if mediaFailed}
			<div class="media-fallback absolute inset-0 flex items-center justify-center" aria-hidden="true">
				<span class="font-display font-semibold text-7xl tracking-tighter text-[var(--color-signal)] opacity-60">
					{title.charAt(0)}
				</span>
			</div>
		{:else if isGif}
			<img
				bind:this={imgEl}
				src={mediaUrl}
				alt=""
				loading="lazy"
				decoding="async"
				class="absolute inset-0 w-full h-full object-cover"
				onerror={() => (mediaFailed = true)}
			/>
		{:else}
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

		{#if hasLinks}
			<div
				class="media-overlay absolute inset-0 flex items-end justify-start gap-2 p-4
					bg-gradient-to-t from-[rgba(15,17,20,0.72)] via-[rgba(15,17,20,0.2)] to-transparent
					opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300"
			>
				{#if liveUrl}
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg bg-[var(--color-elevated)] text-[var(--color-ink-strong)] font-display font-semibold text-sm tracking-tight hover:bg-[var(--color-parchment)] transition-colors duration-200"
					>
						{$t('projects.card.liveDemo')}
						<ExternalLink class="w-3.5 h-3.5" strokeWidth={2} aria-hidden={true} />
						<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
					</a>
				{/if}
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--color-elevated)] text-[var(--color-ink-strong)] hover:bg-[var(--color-parchment)] transition-colors duration-200"
						aria-label="{$t('projects.card.sourceCode')} {$t('projects.card.opensNewTab')}"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
						</svg>
					</a>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Title + tagline -->
	<div class="p-5 md:p-6">
		<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
			<h3 class="font-display font-semibold text-xl md:text-2xl tracking-tight text-[var(--color-ink-strong)]">
				{title}
			</h3>
			<span class="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-ink-faint)] tabular-nums">
				{year}
			</span>
		</div>
		<p class="font-body text-[0.9rem] md:text-base text-[var(--color-ink-muted)] leading-relaxed">
			{tagline}
		</p>
	</div>

	<!-- 4 micro-columns: 2×2 by default, 1×4 once the card itself is wide enough -->
	<dl
		class="grid grid-cols-2 @2xl:grid-cols-4 gap-px border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]
			bg-[rgba(31,35,42,0.08)] dark:bg-[rgba(210,217,226,0.08)]"
	>
		<div class="micro-col">
			<dt class="micro-label">{$t('projects.card.role')}</dt>
			<dd class="font-body text-sm text-[var(--color-ink-strong)] leading-snug">{role}</dd>
		</div>
		<div class="micro-col">
			<dt class="micro-label">{$t('projects.card.stack')}</dt>
			<dd>
				<ul class="flex flex-wrap gap-1">
					{#each techStack as tech}
						<li class="px-1.5 py-0.5 rounded bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)] font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--color-ink-strong)]">
							{tech}
						</li>
					{/each}
				</ul>
			</dd>
		</div>
		<div class="micro-col">
			<dt class="micro-label">{$t('projects.card.architecture')}</dt>
			<dd class="font-body text-[13px] text-[var(--color-ink-muted)] leading-snug">{architecture}</dd>
		</div>
		<div class="micro-col micro-col-impact">
			<dt class="micro-label !text-[var(--color-signal)]">{$t('projects.card.impact')}</dt>
			<dd class="font-body text-[13px] text-[var(--color-ink)] leading-snug">
				{#each impactParts as part, i}
					{#if i % 2 === 1}
						<strong class="font-mono font-semibold text-[var(--color-signal)]">{part}</strong>
					{:else}
						{part}
					{/if}
				{/each}
			</dd>
		</div>
	</dl>
</article>

<style>
	.micro-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem 1.25rem;
		background-color: var(--color-elevated);
	}

	:global(.dark) .micro-col {
		background-color: var(--color-parchment-alt);
	}

	.micro-col-impact {
		background-color: color-mix(in srgb, var(--color-signal-soft) 60%, var(--color-elevated));
	}

	:global(.dark) .micro-col-impact {
		background-color: color-mix(in srgb, var(--color-signal-soft) 60%, var(--color-parchment-alt));
	}

	.micro-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}

	.media-fallback {
		background-image:
			radial-gradient(circle at 30% 20%, var(--color-signal-soft), transparent 60%),
			linear-gradient(color-mix(in srgb, var(--color-signal) 10%, transparent) 1px, transparent 1px),
			linear-gradient(90deg, color-mix(in srgb, var(--color-signal) 10%, transparent) 1px, transparent 1px);
		background-size: auto, 24px 24px, 24px 24px;
	}

	/* No hover on touch screens: keep the links reachable. */
	@media (hover: none) {
		.media-overlay {
			opacity: 1;
		}
	}
</style>
