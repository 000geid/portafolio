<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { featuredProjectIds, getFeaturedProjects, projectsData } from '$lib/data/projects';
	import { PROJECT_LUCIDE_GLYPHS } from '$lib/project-lucide';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { reveal } from '$lib/actions/reveal';

	const featuredIds: readonly string[] = featuredProjectIds;

	// Featured work leads the feed; the rest follow in data order.
	const works = [
		...getFeaturedProjects(),
		...projectsData.filter((project) => !featuredIds.includes(project.id))
	];
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

	<ol class="space-y-4 md:space-y-5">
		{#each works as project, idx (project.id)}
			{@const ProjectGlyph = PROJECT_LUCIDE_GLYPHS[project.lucideGlyph]}
			<li>
				<a
					href={`/projects/${project.id}`}
					class="reveal group block rounded-2xl border border-[rgba(31,35,42,0.09)] dark:border-[rgba(210,217,226,0.09)]
						bg-[color-mix(in_srgb,var(--color-elevated)_70%,transparent)] backdrop-blur-[2px]
						p-5 md:p-7 min-h-[44px]
						hover:bg-[var(--color-elevated)] dark:hover:bg-[var(--color-parchment-alt)]
						hover:border-[rgba(31,35,42,0.16)] dark:hover:border-[rgba(210,217,226,0.16)]
						transition-all duration-200
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] focus-visible:ring-offset-2"
					use:reveal
				>
					<div class="flex items-start gap-4 md:gap-5">
						<span
							class="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center
								bg-[rgba(31,35,42,0.05)] dark:bg-[rgba(210,217,226,0.06)]
								border border-[rgba(31,35,42,0.07)] dark:border-[rgba(210,217,226,0.08)]
								text-[var(--color-signal)]"
							aria-hidden="true"
						>
							<ProjectGlyph size={22} strokeWidth={1.75} />
						</span>

						<div class="flex-1 min-w-0">
							<p class="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-ink-faint)] mb-1.5">
								{String(idx + 1).padStart(2, '0')} · {$t(`projects.groups.${project.portfolioGroup}`)}
							</p>
							<h3
								class="font-display font-semibold text-xl md:text-2xl tracking-tight text-[var(--color-ink-strong)] mb-2"
							>
								{project.story[$language].title}
							</h3>

							<p class="font-body text-[0.9rem] md:text-base text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] leading-relaxed mb-3">
								{project.description[$language]}
							</p>

							{#if project.metric}
								<p class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-signal)] mb-4">
									{project.metric[$language]}
								</p>
							{/if}

							{#if project.tags.length}
								<ul class="flex flex-wrap gap-1.5 mb-4" aria-label={$t('projects.story.technologies')}>
									{#each project.tags.slice(0, 5) as tag}
										<li class="px-2 py-1 rounded-md bg-[var(--color-signal-soft)] font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-signal)]">
											{tag}
										</li>
									{/each}
								</ul>
							{/if}

							<span
								class="inline-flex items-center gap-2 font-body text-sm font-semibold text-[var(--color-signal)] opacity-80 group-hover:opacity-100"
							>
								<span>{$t('projects.flowReadStory')}</span>
								<ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden={true} />
							</span>
						</div>
					</div>
				</a>
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
