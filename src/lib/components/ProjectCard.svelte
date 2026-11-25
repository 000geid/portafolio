<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ArchitectureDiagram from '$lib/components/ArchitectureDiagram.svelte';
	import type { ProjectFlow } from '$lib/data/projects';

	interface Props {
		title: string;
		tagline: string;
		year: string;
		flow?: ProjectFlow;
		liveUrl?: string;
		githubUrl?: string;
		statusLabel?: string;
		role: string;
		techStack: string[];
		architecture: string;
		impact: string;
		impactDetail?: string;
		editorial?: boolean;
		inverted?: boolean;
	}

	let {
		title,
		tagline,
		year,
		flow,
		liveUrl,
		githubUrl,
		statusLabel,
		role,
		techStack,
		architecture,
		impact,
		impactDetail,
		editorial = false,
		inverted = false
	}: Props = $props();

	const METRIC_PATTERN = /([+~≈]?\d[\d.,]*%?)/;
	const impactSplit = $derived(impact.split(METRIC_PATTERN));
	const primaryMetric = $derived(impactSplit[1] ?? '');
	const impactBefore = $derived((impactSplit[0] ?? '').trim());
	const impactAfter = $derived((impactSplit[2] ?? '').trim());
	const hasLinks = $derived(Boolean(liveUrl || githubUrl));
</script>

{#if editorial}
	<article class="grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-start lg:gap-x-20">
		<div class="min-w-0">
			<header>
				<h3
					class="font-display text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.025em] text-balance {inverted
						? 'text-[var(--color-obsidian-ink)]'
						: 'text-[var(--color-ink-strong)]'}"
				>
					{title}
				</h3>
				<p
					class="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs tracking-[0.1em] uppercase {inverted
						? 'text-[var(--color-obsidian-muted)]'
						: 'text-[var(--color-ink-muted)]'}"
				>
					<span>{role}</span>
					<span aria-hidden="true" class="opacity-50">·</span>
					<span class="tabular-nums">{year}</span>
					{#if statusLabel && !hasLinks}
						<span aria-hidden="true" class="opacity-50">·</span>
						<span>{statusLabel}</span>
					{/if}
				</p>
			</header>

			<p
				class="mt-7 max-w-[46ch] text-pretty font-body text-lg leading-relaxed md:text-xl {inverted
					? 'text-[var(--color-obsidian-muted)]'
					: 'text-[var(--color-ink)]'}"
			>
				{tagline}
			</p>

			<div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
				{#if liveUrl}
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex min-h-11 items-center gap-1.5 font-body text-sm font-semibold transition-colors hover:underline underline-offset-4 {inverted
							? 'text-[var(--color-signal-on-dark)]'
							: 'text-[var(--color-signal)]'}"
					>
						{$t('projects.card.liveDemo')}
						<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
						<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
					</a>
				{/if}
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex min-h-11 items-center gap-1.5 font-body text-sm font-semibold transition-colors hover:underline underline-offset-4 {inverted
							? 'text-[var(--color-signal-on-dark)]'
							: 'text-[var(--color-signal)]'}"
					>
						{$t('projects.card.sourceCode')}
						<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
						<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
					</a>
				{/if}
			</div>

			<details class="group mt-4">
				<summary
					class="inline-flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] uppercase transition-colors [&::-webkit-details-marker]:hidden {inverted
						? 'text-[var(--color-obsidian-ink)] hover:text-[var(--color-signal-on-dark)]'
						: 'text-[var(--color-ink-strong)] hover:text-[var(--color-signal)]'}"
				>
					<ChevronDown class="size-4 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
					{$t('projects.card.viewArchitecture')}
				</summary>

				<div
					class="mt-6 space-y-6 border-t pt-6 {inverted
						? 'border-[var(--color-obsidian-rule)] text-[var(--color-obsidian-muted)]'
						: 'border-[var(--color-rule)] text-[var(--color-ink-muted)]'}"
				>
					<p class="max-w-prose font-body text-base leading-relaxed">{architecture}</p>
					{#if impactDetail}
						<p class="max-w-prose font-body text-base leading-relaxed">{impactDetail}</p>
					{/if}
					<p class="font-mono text-xs tracking-[0.06em]">{techStack.join(' · ')}</p>
					{#if flow}
						<div class="pt-2">
							<ArchitectureDiagram {flow} {inverted} />
						</div>
					{/if}
				</div>
			</details>
		</div>

		<aside
			class="min-w-0 border-t pt-8 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-12 {inverted
				? 'border-[var(--color-obsidian-rule)]'
				: 'border-[var(--color-rule)]'}"
		>
			{#if primaryMetric}
				<p
					class="font-display text-[clamp(4rem,8vw,7rem)] leading-[0.95] font-bold tracking-[-0.035em] tabular-nums {inverted
						? 'text-[var(--color-signal-on-dark)]'
						: 'text-[var(--color-signal)]'}"
				>
					{primaryMetric}
				</p>
			{/if}
			<p
				class="mt-4 max-w-[32ch] text-pretty font-body text-base leading-relaxed font-medium md:text-lg {inverted
					? 'text-[var(--color-obsidian-ink)]'
					: 'text-[var(--color-ink-strong)]'}"
			>
				{#if primaryMetric}
					{#if impactBefore}{impactBefore} {/if}{impactAfter}
				{:else}
					{impact}
				{/if}
			</p>
			{#if impactDetail}
				<p
					class="mt-3 max-w-[36ch] font-body text-sm leading-relaxed {inverted
						? 'text-[var(--color-obsidian-muted)]'
						: 'text-[var(--color-ink-muted)]'}"
				>
					{impactDetail}
				</p>
			{/if}
		</aside>
	</article>
{:else}
	<article class="grid grid-cols-1 gap-y-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-x-16">
		<div class="min-w-0">
			<header>
				<h3 class="font-display text-2xl font-bold tracking-tight text-[var(--color-ink-strong)] md:text-3xl">
					{title}
				</h3>
				<p class="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-xs tracking-[0.08em] uppercase text-[var(--color-ink-muted)]">
					<span>{role}</span>
					<span aria-hidden="true" class="opacity-50">·</span>
					<span class="tabular-nums">{year}</span>
					{#if statusLabel && !hasLinks}
						<span aria-hidden="true" class="opacity-50">·</span>
						<span>{statusLabel}</span>
					{/if}
				</p>
			</header>

			<p class="mt-4 max-w-prose font-body text-base leading-relaxed text-[var(--color-ink)]">
				{tagline}
			</p>

			<details class="group mt-4">
				<summary class="inline-flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-signal)] hover:underline underline-offset-4 [&::-webkit-details-marker]:hidden">
					<ChevronDown class="size-4 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
					{$t('projects.card.details')}
				</summary>
				<div class="mt-4 space-y-4 border-t border-[var(--color-rule)] pt-4 text-sm text-[var(--color-ink-muted)]">
					<p class="max-w-prose font-body leading-relaxed">{architecture}</p>
					<p class="font-mono text-xs">{techStack.join(' · ')}</p>
					{#if flow}
						<ArchitectureDiagram {flow} />
					{/if}
					{#if hasLinks}
						<div class="flex flex-wrap gap-x-6">
							{#if liveUrl}
								<a href={liveUrl} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-1.5 font-body font-medium text-[var(--color-signal)] hover:underline underline-offset-4">
									{$t('projects.card.liveDemo')}
									<ArrowUpRight class="size-3.5" strokeWidth={1.75} aria-hidden="true" />
									<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
								</a>
							{/if}
							{#if githubUrl}
								<a href={githubUrl} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-1.5 font-body font-medium text-[var(--color-signal)] hover:underline underline-offset-4">
									{$t('projects.card.sourceCode')}
									<ArrowUpRight class="size-3.5" strokeWidth={1.75} aria-hidden="true" />
									<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
								</a>
							{/if}
						</div>
					{/if}
				</div>
			</details>
		</div>

		<div class="min-w-0 lg:pt-1">
			<p class="max-w-[38ch] font-body text-base leading-relaxed font-medium text-[var(--color-ink-strong)]">
				{impact}
			</p>
			<p class="mt-3 font-mono text-xs tracking-[0.06em] text-[var(--color-ink-muted)]">
				{techStack.slice(0, 4).join(' · ')}
			</p>
		</div>
	</article>
{/if}
