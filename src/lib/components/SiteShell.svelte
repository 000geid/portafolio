<script lang="ts">
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import { t } from '$lib/stores/i18n';
	import SiteControls from '$lib/components/SiteControls.svelte';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';

	// Home carries its own controls in the sticky profile column; every other route gets a minimal bar.
	$: isHome = $page.url.pathname === '/';
</script>

<div
	class="min-h-screen bg-[var(--color-parchment)] text-[var(--color-ink)] transition-colors noise-overlay relative grid-pattern"
>
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white"
	>
		Skip to content
	</a>

	<div
		class="fixed inset-x-0 top-0 z-40 h-0.5 bg-[var(--color-signal)] transition-transform duration-300 origin-left {$navigating ? 'scale-x-100' : 'scale-x-0'}"
		aria-hidden="true"
	></div>

	{#if !isHome}
		<header
			class="sticky top-0 z-30 border-b border-[rgba(31,35,42,0.12)] dark:border-[rgba(210,217,226,0.12)] bg-[rgba(243,244,247,0.82)] backdrop-blur-md dark:bg-[rgba(18,21,25,0.82)] supports-[backdrop-filter]:bg-[rgba(243,244,247,0.72)] dark:supports-[backdrop-filter]:bg-[rgba(18,21,25,0.72)]"
		>
			<div class="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 md:px-6 py-2.5">
				<a
					href="/"
					class="group inline-flex items-center gap-2 min-h-[44px] font-display font-semibold text-base tracking-tight text-[var(--color-ink-strong)]"
					aria-label="{$t('nav.home')} — {$t('hero.name')}"
				>
					<ArrowLeft
						class="w-4 h-4 text-[var(--color-signal)] transition-transform duration-200 group-hover:-translate-x-0.5"
						strokeWidth={2}
						aria-hidden={true}
					/>
					{$t('hero.name')}
				</a>
				<SiteControls />
			</div>
		</header>
	{/if}

	<div class="route-enter">
		<slot />
	</div>
</div>
