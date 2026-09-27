<script lang="ts">
	import { darkMode } from '$lib/stores/darkMode';
	import { t } from '$lib/stores/i18n';
	import LanguageToggler from '$lib/components/LanguageToggler.svelte';
</script>

<div class="flex items-center gap-2 shrink-0">
	<LanguageToggler />
	<button
		onclick={() => darkMode.toggle()}
		class="w-10 h-10 rounded-lg border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] dark:hover:border-[color-mix(in_srgb,var(--color-signal)_42%,transparent)] transition-all duration-200 flex items-center justify-center"
		aria-label={$t('hero.toggleDarkMode')}
	>
		<svg class="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
		<svg class="w-5 h-5 hidden dark:block opacity-95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	</button>
</div>
