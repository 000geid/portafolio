<script lang="ts">
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import { t } from '$lib/stores/i18n';
	import SiteControls from '$lib/components/SiteControls.svelte';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';

	// Home carries its own controls in the masthead.
	$: isHome = $page.url.pathname === '/';
</script>

<div class="min-h-screen bg-[var(--color-parchment)] text-[var(--color-ink)] transition-colors relative">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-emerald)] focus:text-[var(--color-emerald-ink)] focus:font-mono focus:text-xs"
	>
		Skip to content
	</a>

	<div
		class="fixed inset-x-0 top-0 z-40 h-0.5 bg-[var(--color-signal)] transition-transform duration-300 origin-left {$navigating ? 'scale-x-100' : 'scale-x-0'}"
		aria-hidden="true"
	></div>

	{#if !isHome}
		<header class="sticky top-0 z-30 border-b border-[var(--color-rule)] bg-[var(--color-parchment)]">
			<div class="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-6 md:px-10 lg:px-14 py-2.5">
				<a
					href="/"
					class="group inline-flex items-center gap-2.5 min-h-[44px] font-mono text-xs md:text-[0.8125rem] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-strong)]"
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
