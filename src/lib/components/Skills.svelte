<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { skillsData } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';

	let { embedded = false }: { embedded?: boolean } = $props();
</script>

<section
	id="skills"
	class="scroll-mt-24 {embedded ? 'pt-16 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]' : 'py-14 md:py-20 px-4 md:px-6'}"
>
	<div class="{embedded ? 'w-full' : 'max-w-4xl mx-auto'}">
		<header class="mb-8 md:mb-10">
			<h2
				class="font-display font-bold {embedded ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'} tracking-tight text-[var(--color-ink-strong)] leading-snug mb-3"
			>
				{$t('skills.title')}
			</h2>
			<p
				class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed max-w-xl"
			>
				{$t('skills.intro')}
			</p>
		</header>

		<div class="flow-root border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
			{#each skillsData as category, index (category.name)}
				<article
					id={`skill-${category.name}`}
					class="reveal border-b border-[rgba(31,35,42,0.08)] py-10 md:py-12 last:border-b-0 dark:border-[rgba(210,217,226,0.08)]
						transition-colors duration-300 hover:bg-[rgba(31,35,42,0.02)] dark:hover:bg-[rgba(210,217,226,0.03)]"
					style="animation-delay: {index * 70}ms"
					use:reveal
					aria-labelledby={`skill-heading-${category.name}`}
				>
					<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-14">
						<div class="lg:w-[12rem] lg:shrink-0">
							<h3
								id={`skill-heading-${category.name}`}
								class="font-display font-semibold text-2xl md:text-[1.65rem] tracking-tight text-[var(--color-ink-strong)] leading-snug"
							>
								{$t(`skills.${category.name}`)}
							</h3>
							<p class="font-body text-sm text-[var(--color-ink-muted)] leading-relaxed mt-3 lg:max-w-[11rem]">
								{$t(`skills.blurbs.${category.name}`)}
							</p>
						</div>

						<div class="min-w-0 flex-1 space-y-7">
							<div>
								<p
									class="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-ink-faint)] mb-3"
									id="skills-practice-{category.name}"
								>
									{$t('skills.practiceLabel')}
								</p>
								<ul
									class="space-y-3.5 pl-5 md:pl-6 border-l border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.12)]"
									aria-labelledby="skills-practice-{category.name}"
								>
									{#each category.bullets[$language] as line}
										<li
											class="font-body text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed pl-1 md:pl-2"
										>
											{line}
										</li>
									{/each}
								</ul>
							</div>

							<div>
								<p class="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-ink-faint)] mb-3">
									{$t('skills.toolsLabel')}
								</p>
								<ul class="flex flex-wrap gap-x-2 gap-y-2" aria-label={$t(`skills.${category.name}`)}>
									{#each category.skills as skill}
										<li>
											<span
												class="inline-block rounded-md px-2.5 py-1 font-mono text-xs font-medium text-[var(--color-ink-strong)] ring-1 ring-[rgba(31,35,42,0.1)] bg-[rgba(31,35,42,0.04)] transition-[ring-color] duration-200 dark:bg-[rgba(210,217,226,0.06)] dark:ring-[rgba(210,217,226,0.12)]"
											>
												{skill}
											</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
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
