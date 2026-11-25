<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { timelineData } from '$lib/data/timeline';
	import { reveal } from '$lib/actions/reveal';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

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

{#if embedded}
	<section id="career" tabindex="-1" class="scroll-mt-12 bg-[var(--color-parchment-alt)] text-[var(--color-ink)]">
		<div class="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
			<header class="mb-12 md:mb-16">
				<h2 class="font-display text-3xl leading-tight font-bold tracking-[-0.02em] text-[var(--color-ink-strong)] md:text-5xl">
					{$t('careerPath.title')}
				</h2>
				<p class="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg">
					{$t('careerPath.intro')}
				</p>
			</header>

			<ol class="border-t border-[var(--color-rule)]">
				{#each [...timelineData].reverse() as item (item.id)}
					<li class="grid grid-cols-1 gap-y-3 border-b border-[var(--color-rule)] py-9 md:py-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] lg:gap-x-16">
						<div class="min-w-0">
							<p class="font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-ink-muted)] tabular-nums">
								{formatDate(item.startDate)} — {formatDate(item.endDate)}
							</p>
							<p class="mt-2 font-body text-sm font-semibold text-[var(--color-signal)]">
								{$language === 'es' ? item.company : (item.company_en ?? item.company)}
							</p>
						</div>

						<div class="min-w-0">
							<h3 class="font-display text-2xl font-semibold tracking-tight text-[var(--color-ink-strong)] md:text-3xl">
								{$language === 'es' ? item.title_es : item.title_en}
							</h3>
							<p class="mt-3 max-w-[58ch] font-body text-base leading-relaxed text-[var(--color-ink)]">
								{$language === 'es' ? item.description_es : item.description_en}
							</p>
							<details class="group mt-3">
								<summary class="inline-flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 font-mono text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-signal)] hover:underline underline-offset-4 [&::-webkit-details-marker]:hidden">
									<ChevronDown class="size-4 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
									{$t('careerPath.expandButton')}
								</summary>
								<ul class="mt-3 list-disc space-y-2 pb-2 pl-5 max-w-[58ch] font-body text-sm leading-relaxed text-[var(--color-ink-muted)]">
									{#each $language === 'es' ? item.responsibilities_es : item.responsibilities_en as responsibility}
										<li>{responsibility}</li>
									{/each}
								</ul>
							</details>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>
{:else}
	<section id="career" tabindex="-1" class="scroll-mt-24 py-14 md:py-20 px-6 md:px-10 lg:px-14 mx-auto max-w-[1440px]">
		<SectionPageHeader kicker={$t('careerPath.kicker')} title={$t('careerPath.title')}>
			<svelte:fragment slot="aside">
				<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed">
					{$t('careerPath.intro')}
				</p>
			</svelte:fragment>
		</SectionPageHeader>

		<div class="space-y-6 mt-2 md:mt-4">
			{#each timelineData as item, index}
				<div
					class="reveal group relative border-l border-[var(--color-rule)] pl-6 md:pl-8
						{index === timelineData.length - 1 ? '' : 'pb-8'}"
					use:reveal
				>
					<div class="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-[var(--color-signal)]"></div>

					<div class="rounded-lg border border-[var(--color-rule)] bg-[var(--color-elevated)] p-6 md:p-8">
						<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
							<div class="flex-1">
								<div class="flex items-center gap-3 mb-2">
									<span class="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-signal)]">
										{formatDate(item.startDate)} — {formatDate(item.endDate)}
									</span>
									<span class="w-px h-3 bg-[var(--color-rule)]"></span>
									<span class="font-body text-xs text-[var(--color-ink-muted)]">
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
								type="button"
								onclick={() => toggleExpand(item.id)}
								class="shrink-0 px-4 py-2 min-h-[44px] flex items-center rounded-sm font-mono text-xs uppercase tracking-[0.08em] font-medium border border-[var(--color-rule)] text-[var(--color-ink-strong)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors cursor-pointer"
								aria-expanded={expandedId === item.id}
							>
								<span class="flex items-center gap-2">
									{expandedId === item.id ? $t('careerPath.collapseButton') : $t('careerPath.expandButton')}
									<ChevronDown class="size-4 transition-transform duration-200 {expandedId === item.id ? 'rotate-180' : ''}" strokeWidth={1.75} aria-hidden="true" />
								</span>
							</button>
						</div>

						<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed mb-4">
							{$language === 'es' ? item.description_es : item.description_en}
						</p>

						{#if expandedId === item.id}
							<div class="pt-4 border-t border-[var(--color-rule)]">
								<p class="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-ink-faint)] mb-3">
									{$t('careerPath.responsibilitiesHeading')}
								</p>
								<ul class="space-y-2">
									{#each $language === 'es' ? item.responsibilities_es : item.responsibilities_en as resp}
										<li class="flex items-start gap-3 font-body text-sm text-[var(--color-ink-muted)]">
											<span class="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] shrink-0"></span>
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
	</section>
{/if}

<style>
	.reveal {
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
