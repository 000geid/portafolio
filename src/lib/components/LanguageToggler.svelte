<script lang="ts">
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/i18n';
</script>

<button
	onclick={() => language.toggle()}
	class="h-11 min-h-[44px] px-2.5 rounded-lg border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] dark:hover:border-[color-mix(in_srgb,var(--color-signal)_42%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-parchment)] transition-all duration-200 flex items-center justify-center font-mono text-xs cursor-pointer"
	aria-label={$t('toggler.toggleLanguage')}
>
	<span class="flex items-center gap-1 font-mono text-xs">
		<span class="{$language === 'en' ? 'font-bold text-[var(--color-signal)]' : 'text-[var(--color-ink-faint)]'}">EN</span>
		<span class="text-[var(--color-ink-faint)] opacity-40">/</span>
		<span class="{$language === 'es' ? 'font-bold text-[var(--color-signal)]' : 'text-[var(--color-ink-faint)]'}">ES</span>
	</span>
</button>
