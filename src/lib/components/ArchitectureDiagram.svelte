<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import type { ProjectFlow } from '$lib/data/projects';

	let { flow, inverted = false }: { flow: ProjectFlow; inverted?: boolean } = $props();

	const steps = $derived(flow.steps[$language]);
</script>

<!-- Consistent project story: what enters → what the system does → what the user gets. -->
<div role="group" aria-label={$t('projects.card.diagram')}>
	<ol
		class="grid grid-cols-1 items-stretch gap-y-2
			md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-y-0"
	>
		{#each steps as step, i (step.title)}
			{#if i > 0}
				<li class="grid place-items-center py-0.5 md:px-2" aria-hidden="true">
					<ArrowDown
						class="size-4 md:hidden {inverted ? 'text-[var(--color-signal-on-dark)]' : 'text-[var(--color-signal)]'}"
						strokeWidth={2}
					/>
					<ArrowRight
						class="hidden size-4 md:block {inverted ? 'text-[var(--color-signal-on-dark)]' : 'text-[var(--color-signal)]'}"
						strokeWidth={2}
					/>
				</li>
			{/if}
			<li
				class="border p-4 {inverted
					? i === 1
						? 'border-[var(--color-signal-on-dark)] bg-[var(--color-obsidian-alt)]'
						: 'border-[var(--color-obsidian-rule)]'
					: i === 1
						? 'border-[color-mix(in_srgb,var(--color-signal)_45%,transparent)] bg-[var(--color-signal-soft)]'
						: 'border-[var(--color-rule)]'}"
			>
				<span
					class="font-mono text-xs font-medium tracking-[0.08em] {inverted
						? 'text-[var(--color-signal-on-dark)]'
						: 'text-[var(--color-signal)]'}"
				>
					{String(i + 1).padStart(2, '0')}
				</span>
				<p
					class="mt-1.5 font-display text-base font-semibold leading-snug md:text-lg {inverted
						? 'text-[var(--color-obsidian-ink)]'
						: 'text-[var(--color-ink-strong)]'}"
				>
					{step.title}
				</p>
				<p
					class="mt-1 font-body text-sm leading-relaxed {inverted
						? 'text-[var(--color-obsidian-muted)]'
						: 'text-[var(--color-ink-muted)]'}"
				>
					{step.detail}
				</p>
			</li>
		{/each}
	</ol>
	<p
		class="mt-4 border-t pt-2.5 font-mono text-xs tracking-[0.12em] uppercase {inverted
			? 'border-[var(--color-obsidian-rule)] text-[var(--color-obsidian-muted)]'
			: 'border-[var(--color-rule)] text-[var(--color-ink-muted)]'}"
	>
		{flow.metric[$language]}
	</p>
</div>
