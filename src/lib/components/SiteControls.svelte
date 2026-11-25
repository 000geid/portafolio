<script lang="ts">
	import { darkMode } from '$lib/stores/darkMode';
	import { t } from '$lib/stores/i18n';
	import LanguageToggler from '$lib/components/LanguageToggler.svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
</script>

<div class="flex items-center gap-3 shrink-0">
	<LanguageToggler />
	<button
		type="button"
		onclick={() => darkMode.toggle()}
		class="inline-flex h-11 min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--color-emerald)] px-2.5 text-[var(--color-emerald-ink)] transition-colors hover:bg-[var(--color-signal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-signal)] cursor-pointer"
		aria-label={$t('hero.toggleDarkMode')}
	>
		<span class="flex size-5 items-center justify-center rounded-full bg-[var(--color-emerald-ink)] text-[var(--color-emerald)] dark:bg-transparent dark:text-[var(--color-emerald-muted)] transition-colors">
			<Sun class="size-3.5" strokeWidth={2.2} aria-hidden="true" />
		</span>
		<span class="flex size-5 items-center justify-center rounded-full bg-transparent text-[var(--color-emerald-muted)] dark:bg-[var(--color-emerald-ink)] dark:text-[var(--color-emerald)] transition-colors">
			<Moon class="size-3.5" strokeWidth={2.2} aria-hidden="true" />
		</span>
	</button>
</div>
