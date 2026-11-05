<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { selectedProjects, type SelectedProject } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	const featured = selectedProjects.filter((project) => project.featured);
	const additional = selectedProjects.filter((project) => !project.featured);
</script>

{#snippet projectList(projects: SelectedProject[])}
	<ul class="divide-y divide-[color-mix(in_srgb,var(--color-ink)_16%,transparent)] border-t border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
		{#each projects as project (project.id)}
			<li class="pt-5 pb-3 md:pt-6 md:pb-4">
				<ProjectCard
					{...project[$language]}
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
		class="font-display font-bold text-3xl md:text-4xl tracking-tight text-[var(--color-ink-strong)] leading-snug mb-4 md:mb-5"
	>
		{$t('home.featured.title')}
	</h2>

	{@render projectList(featured)}

	<details class="group/more border-y border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)]">
		<summary class="flex items-center gap-2 min-h-11 py-3 cursor-pointer list-none font-body text-sm font-semibold text-[var(--color-ink-strong)] hover:text-[var(--color-signal)] [&::-webkit-details-marker]:hidden">
			<ChevronDown class="w-4 h-4 group-open/more:rotate-180" strokeWidth={1.75} aria-hidden="true" />
			{$t('home.featured.viewAll')}
		</summary>
		{@render projectList(additional)}
	</details>
</section>
