<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { timelineData } from '$lib/data/timeline';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';

	let { embedded = false }: { embedded?: boolean } = $props();
	let expandedId = $state<string | null>(null);

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function formatDate(dateString: string | null) {
		if (!dateString) return $t('careerPath.present');

		const date = new Date(dateString);
		return new Intl.DateTimeFormat($language === 'es' ? 'es-ES' : 'en-US', {
			month: 'short',
			year: 'numeric'
		}).format(date);
	}

	function getDuration(startDate: string, endDate: string | null) {
		const start = new Date(startDate);
		const end = endDate ? new Date(endDate) : new Date();
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

		const years = Math.floor(diffMonths / 12);
		const months = diffMonths % 12;

		const parts = [];
		if (years > 0)
			parts.push(
				`${years} ${$language === 'es' ? (years === 1 ? 'año' : 'años') : years === 1 ? 'year' : 'years'}`
			);
		if (months > 0)
			parts.push(
				`${months} ${$language === 'es' ? (months === 1 ? 'mes' : 'meses') : months === 1 ? 'month' : 'months'}`
			);

		return parts.join(' ');
	}
</script>

<section
	id="career"
	tabindex="-1"
	class="scroll-mt-24 {embedded ? 'pt-16 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]' : 'py-14 md:py-20 px-4 md:px-6 max-w-7xl mx-auto'}"
>
	{#if embedded}
		<header class="mb-8 md:mb-10">
			<h2 class="font-display font-bold text-3xl md:text-4xl tracking-tight text-[var(--color-ink-strong)] leading-snug mb-3">
				{$t('careerPath.title')}
			</h2>
			<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed max-w-xl">
				{$t('careerPath.intro')}
			</p>
		</header>
	{:else}
		<SectionPageHeader kicker={$t('careerPath.kicker')} title={$t('careerPath.title')}>
			<svelte:fragment slot="aside">
				<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed">
					{$t('careerPath.intro')}
				</p>
			</svelte:fragment>
		</SectionPageHeader>
	{/if}

	{#if embedded}
		<ol class="border-t border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
			{#each [...timelineData].reverse() as item (item.id)}
				<li class="py-7 md:py-9 border-b border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
					<p class="font-body text-sm text-[var(--color-ink-muted)] mb-2">
						{formatDate(item.startDate)} — {formatDate(item.endDate)}
					</p>
					<h3 class="font-display font-semibold text-2xl md:text-3xl text-[var(--color-ink-strong)]">
						{$language === 'es' ? item.title_es : item.title_en}
					</h3>
					<p class="font-body text-sm text-[var(--color-signal)] mt-1">
						{$language === 'es' ? item.company : (item.company_en ?? item.company)}
					</p>
					<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed max-w-2xl mt-3">
						{$language === 'es' ? item.description_es : item.description_en}
					</p>
					<details class="mt-2">
						<summary class="min-h-11 w-fit flex items-center cursor-pointer font-body text-sm font-semibold text-[var(--color-signal)] hover:underline underline-offset-4">
							{$t('careerPath.expandButton')}
						</summary>
						<ul class="list-disc pl-5 space-y-2 pb-2 max-w-2xl font-body text-sm text-[var(--color-ink-muted)]">
							{#each $language === 'es' ? item.responsibilities_es : item.responsibilities_en as responsibility}
								<li>{responsibility}</li>
							{/each}
						</ul>
					</details>
				</li>
			{/each}
		</ol>
	{:else}
	<div class="space-y-6 mt-2 md:mt-4">
		{#each timelineData as item, index}
			<div
				class="reveal group relative border-l-2 border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)] pl-6 md:pl-8
					{index === timelineData.length - 1 ? '' : 'pb-8'}"
				use:reveal
			>
				<!-- Timeline marker -->
				<div class="absolute left-0 top-2 w-4 h-4 -translate-x-1/2 rounded-sm border border-[var(--color-signal)] bg-[var(--color-elevated)] group-hover:bg-[var(--color-signal-soft)] transition-colors duration-300 dark:bg-[var(--color-parchment-alt)]"></div>

				<!-- Main content -->
				<div
					class="rounded-2xl border border-[rgba(31,35,42,0.1)] bg-[var(--color-elevated)] p-6 md:p-8 brutalist-shadow
						hover:border-[color-mix(in_srgb,var(--color-signal)_28%,transparent)] transition-all duration-300 dark:border-[rgba(210,217,226,0.08)] dark:bg-[var(--color-parchment-alt)]"
				>
					<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<span class="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-signal)]">
									{formatDate(item.startDate)} — {formatDate(item.endDate)}
								</span>
								<span class="w-px h-3 bg-[rgba(31,35,42,0.15)] dark:bg-[rgba(210,217,226,0.12)]"></span>
								<span class="font-body text-xs tracking-normal text-[var(--color-ink-muted)]">
									{getDuration(item.startDate, item.endDate)}
								</span>
							</div>

							<h3 class="font-display font-semibold text-2xl md:text-3xl text-[var(--color-ink-strong)] mb-1">
								{$language === 'es' ? item.title_es : item.title_en}
							</h3>
							<p class="font-body text-base text-[var(--color-ink-muted)]">
								{$language === 'es' ? item.company : (item.company_en ?? item.company)}
							</p>
						</div>

						<button
							onclick={() => toggleExpand(item.id)}
							class="group/btn shrink-0 px-4 py-2 min-h-[44px] flex items-center rounded-lg font-body text-xs uppercase tracking-[0.08em] font-semibold
								border border-[rgba(31,35,42,0.14)] text-[var(--color-ink-muted)]
								hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)]
								dark:border-[rgba(210,217,226,0.14)]
								transition-all duration-200"
							aria-expanded={expandedId === item.id}
						>
							<span class="flex items-center gap-2">
								{expandedId === item.id ? $t('careerPath.collapseButton') : $t('careerPath.expandButton')}
								<svg
									class="w-3 h-3 transition-transform duration-200 {expandedId === item.id
										? 'rotate-180'
										: ''}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</span>
						</button>
					</div>

					<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed mb-4">
						{$language === 'es' ? item.description_es : item.description_en}
					</p>

					{#if expandedId === item.id}
						<div class="pt-4 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
							<p class="font-body text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-faint)] mb-3">
								{$t('careerPath.responsibilitiesHeading')}
							</p>
							<ul class="space-y-2">
								{#each $language === 'es' ? item.responsibilities_es : item.responsibilities_en as resp}
									<li class="flex items-start gap-3 font-body text-sm text-[var(--color-ink-muted)]">
										<span class="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-signal)] shrink-0"></span>
										<span>{resp}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	{/if}
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateX(-30px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateX(0);
	}
</style>
