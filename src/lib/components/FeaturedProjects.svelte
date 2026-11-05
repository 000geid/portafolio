<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { selectedProjects, type SelectedProject } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let { editorial = false }: { editorial?: boolean } = $props();

	const featured = selectedProjects.filter((project) => project.featured);
	const additional = selectedProjects.filter((project) => !project.featured);
</script>

{#snippet muveranFigure()}
	<figure class="border-t border-[var(--color-ink-muted)] pt-4">
		<figcaption class="mb-5 font-display text-xl font-medium text-[var(--color-ink-strong)]">
			{$t('projects.card.diagram')}
		</figcaption>
		<p class="sr-only">{$t('home.featured.diagramDescription')}</p>
		<div aria-hidden="true" class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.25fr)] items-stretch font-display text-base md:text-lg">
			<span class="flex items-center border border-[var(--color-rule)] px-2.5 py-3">{$t('home.featured.socialChannels')}</span>
			<ArrowRight class="mx-1 size-4 self-center text-[var(--color-signal)]" aria-hidden="true" />
			<span class="flex items-center border border-[var(--color-rule)] px-2.5 py-3">LangGraph</span>
			<ArrowDown class="col-start-3 my-1 size-4 justify-self-center text-[var(--color-signal)]" aria-hidden="true" />
			<span class="col-start-3 border border-[var(--color-rule)] px-2.5 py-3">{$t('home.featured.customRag')}</span>
		</div>
		<p class="mt-4 border-t border-[var(--color-rule)] pt-2 text-sm text-[var(--color-ink-muted)]">
			{$t('home.featured.diagramCaption')}
		</p>
	</figure>
{/snippet}

{#snippet projectList(projects: SelectedProject[], isFeatured = false)}
	<ul class="divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
		{#each projects as project (project.id)}
			<li class={editorial && isFeatured ? 'py-7 md:py-8' : 'py-8 md:py-12'}>
				<ProjectCard
					{...project[$language]}
					editorial={editorial && isFeatured}
					leadFigure={editorial && isFeatured && project.id === 'muveran-ai' ? muveranFigure : undefined}
					year={project.year}
					mediaUrl={project.mediaUrl}
					liveUrl={project.liveUrl}
					githubUrl={project.githubUrl}
					statusLabel={$t(`projects.card.access.${project.access ?? 'private'}`)}
					techStack={project.techStack}
				/>
			</li>
		{/each}
	</ul>
{/snippet}

<section id="featured-work" tabindex="-1" aria-labelledby="featured-work-title" class="scroll-mt-8">
	<h2
		id="featured-work-title"
		class={editorial
			? 'py-2.5 text-xs font-semibold tracking-widest uppercase text-[var(--color-ink-strong)]'
			: 'mb-6 font-display text-3xl leading-snug font-bold tracking-tight text-[var(--color-ink-strong)] md:mb-8 md:text-4xl'}
	>
		{$t('home.featured.title')}
	</h2>

	{@render projectList(featured, true)}

	<details class="group/more border-y border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
		<summary class="flex items-center gap-2 min-h-11 py-3 cursor-pointer list-none font-body text-sm font-semibold text-[var(--color-ink-strong)] hover:text-[var(--color-signal)] [&::-webkit-details-marker]:hidden">
			<ChevronDown class="w-4 h-4 group-open/more:rotate-180" strokeWidth={1.75} aria-hidden="true" />
			{$t('home.featured.viewAll')}
		</summary>
		{@render projectList(additional)}
	</details>
</section>
