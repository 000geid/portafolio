<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { selectedProjects } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="featured-work" aria-labelledby="featured-work-title" class="scroll-mt-8">
	<header class="mb-6 md:mb-8">
		<p class="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-signal)] mb-3">
			{$t('home.featured.kicker')}
		</p>
		<h2
			id="featured-work-title"
			class="font-display font-bold text-3xl md:text-4xl tracking-tighter text-[var(--color-ink-strong)] leading-[1.03]"
		>
			{$t('home.featured.title')}
		</h2>
	</header>

	<ol class="space-y-6 md:space-y-8">
		{#each selectedProjects as project (project.id)}
			{@const copy = project[$language]}
			<li class="reveal" use:reveal>
				<ProjectCard
					title={copy.title}
					tagline={copy.tagline}
					year={project.year}
					mediaUrl={project.mediaUrl}
					liveUrl={project.liveUrl}
					githubUrl={project.githubUrl}
					role={copy.role}
					techStack={project.techStack}
					architecture={copy.architecture}
					impact={copy.impact}
				/>
			</li>
		{/each}
	</ol>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(14px);
		transition:
			opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.reveal:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
