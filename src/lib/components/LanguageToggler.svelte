<script lang="ts">
	import { language } from '$lib/stores/language';
	import { t } from '$lib/stores/i18n';
</script>

<button
	type="button"
	onclick={() => language.toggle()}
	class="h-11 min-h-[44px] px-2 rounded-sm bg-transparent text-[var(--color-ink-strong)] hover:text-[var(--color-signal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-signal)] transition-colors flex items-center justify-center font-mono text-xs tracking-[0.08em] cursor-pointer"
	aria-label={$t('toggler.toggleLanguage')}
>
	<span class="flex items-center gap-1 font-mono text-xs">
		<span class="{$language === 'en' ? 'font-semibold text-[var(--color-ink-strong)]' : 'text-[var(--color-ink-faint)]'}">EN</span>
		<span class="text-[var(--color-ink-faint)] opacity-50">/</span>
		<span class="{$language === 'es' ? 'font-semibold text-[var(--color-ink-strong)]' : 'text-[var(--color-ink-faint)]'}">ES</span>
	</span>
</button>
