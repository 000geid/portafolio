<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { selectedProjects, type SelectedProject } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ArchitectureDiagram from '$lib/components/ArchitectureDiagram.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let { editorial = false }: { editorial?: boolean } = $props();

	const featured = selectedProjects.filter((project) => project.featured);
	const additional = selectedProjects.filter((project) => !project.featured);
</script>

{#snippet projectList(projects: SelectedProject[], isFeatured = false)}
	<ul class="divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
		{#each projects as project (project.id)}
			{#snippet flowFigure()}
				<figure class="border-t-2 border-[var(--color-ink-strong)] pt-4">
					<figcaption class="mb-5 font-display text-xl font-medium text-[var(--color-ink-strong)]">
						{$t('projects.card.diagram')}
					</figcaption>
					<ArchitectureDiagram flow={project.flow} />
				</figure>
			{/snippet}
			<li class={editorial && isFeatured ? 'py-7 md:py-8' : 'py-8 md:py-12'}>
				<ProjectCard
					{...project[$language]}
					editorial={editorial && isFeatured}
					leadFigure={editorial && isFeatured ? flowFigure : undefined}
					year={project.year}
					flow={project.flow}
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
			? 'border-t-2 border-[var(--color-ink-strong)] py-3 font-display text-xl font-semibold tracking-tight text-[var(--color-ink-strong)] md:text-2xl'
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
