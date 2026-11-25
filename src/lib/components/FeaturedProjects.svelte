<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { selectedProjects, type SelectedProject } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let { editorial = false }: { editorial?: boolean } = $props();

	const featured = selectedProjects.filter((project) => project.featured);
	const additional = selectedProjects.filter((project) => !project.featured);
</script>

{#snippet additionalList(projects: SelectedProject[])}
	<ul class="divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
		{#each projects as project (project.id)}
			<li class="py-12 md:py-16">
				<ProjectCard
					{...project[$language]}
					editorial={false}
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
	{#if editorial}
		<h2 id="featured-work-title" class="sr-only">{$t('home.featured.title')}</h2>

		{#each featured as project, i (project.id)}
			{@const isDarkRoom = i % 2 === 1}
			<div
				class={isDarkRoom
					? 'bg-[var(--color-obsidian)] text-[var(--color-obsidian-ink)]'
					: 'bg-[var(--color-parchment)] text-[var(--color-ink)]'}
			>
				<div class="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
					<ProjectCard
						{...project[$language]}
						editorial={true}
						inverted={isDarkRoom}
						year={project.year}
						flow={project.flow}
						liveUrl={project.liveUrl}
						githubUrl={project.githubUrl}
						statusLabel={$t(`projects.card.access.${project.access ?? 'private'}`)}
						techStack={project.techStack}
					/>
				</div>
			</div>
		{/each}

		<div class="bg-[var(--color-parchment)] text-[var(--color-ink)] border-t border-[var(--color-rule)]">
			<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
				<details class="group/more">
					<summary class="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-semibold tracking-tight text-[var(--color-ink-strong)] transition-colors hover:text-[var(--color-signal)] md:text-2xl [&::-webkit-details-marker]:hidden">
						<span>{$t('home.featured.viewAll')} ({additional.length})</span>
						<ChevronDown class="size-5 shrink-0 transition-transform duration-200 group-open/more:rotate-180" strokeWidth={1.75} aria-hidden="true" />
					</summary>
					<div class="pb-12">
						{@render additionalList(additional)}
					</div>
				</details>
			</div>
		</div>
	{:else}
		<div class="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-20 lg:px-20">
			<h2
				id="featured-work-title"
				class="mb-10 font-display text-4xl leading-tight font-bold tracking-tight text-[var(--color-ink-strong)] md:text-5xl"
			>
				{$t('home.featured.title')}
			</h2>
			{@render additionalList(selectedProjects)}
		</div>
	{/if}
</section>
