<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import SectionPageHeader from '$lib/components/SectionPageHeader.svelte';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Mail from 'lucide-svelte/icons/mail';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';

	let { embedded = false }: { embedded?: boolean } = $props();

	const email = 'dmalvaradog26@gmail.com';
	const cvHref = $derived($language === 'es' ? '/cv/cv-es.pdf' : '/cv/cv-en.pdf');
	const emailSubject = $derived(encodeURIComponent($t('contact.emailSubject')));
	const emailHref = $derived(`mailto:${email}?subject=${emailSubject}`);

	function scrollToTop(e: MouseEvent) {
		e.preventDefault();
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			history.pushState(null, '', '#home');
		}
	}
</script>

{#if embedded}
	<section
		id="contact"
		tabindex="-1"
		class="scroll-mt-24 pt-16 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]"
	>
		<header class="mb-8 md:mb-10">
			<h2 class="font-display font-bold text-3xl md:text-4xl tracking-tight text-[var(--color-ink-strong)] leading-snug mb-3">
				{$t('contact.title')}
			</h2>
			<p class="font-body text-base text-[var(--color-ink-muted)] leading-relaxed max-w-xl">
				{$t('contact.description')}
			</p>
		</header>

		<div
			class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] brutalist-shadow overflow-hidden"
		>
			<div class="p-6 md:p-8 border-b border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
				<div class="flex flex-col sm:flex-row gap-3">
					<a
						href={emailHref}
						class="px-5 py-3.5 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-signal)] dark:text-[#121519] dark:hover:bg-[#86bfa2] font-display font-semibold text-base tracking-tight text-center border border-transparent hover:bg-[var(--color-ink)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover min-h-[44px] inline-flex items-center justify-center gap-2"
					>
						<Mail class="w-4 h-4" strokeWidth={1.75} aria-hidden={true} />
						{$t('contact.ctaEmail')}
					</a>
					<a
						href={cvHref}
						target="_blank"
						rel="noopener noreferrer"
						class="px-5 py-3.5 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-base tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200 inline-flex items-center justify-center gap-2 min-h-[44px]"
					>
						<svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						{$t('contact.downloadCv')}
					</a>
				</div>
			</div>

			<div class="divide-y divide-[rgba(31,35,42,0.08)] dark:divide-[rgba(210,217,226,0.08)]">
				<a
					href="https://github.com/000geid"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
				>
					<span class="flex items-center gap-3">
						<svg class="w-4 h-4 text-[var(--color-ink-muted)] group-hover:text-[var(--color-signal)] transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
						</svg>
						<span class="font-display font-medium text-base text-[var(--color-ink-strong)]">{$t('contact.github')}</span>
					</span>
					<span class="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
						@000geid
						<ArrowUpRight class="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
					</span>
				</a>

				<a
					href="https://www.linkedin.com/in/ogeid/"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
				>
					<span class="flex items-center gap-3">
						<svg class="w-4 h-4 text-[var(--color-ink-muted)] group-hover:text-[var(--color-signal)] transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
						</svg>
						<span class="font-display font-medium text-base text-[var(--color-ink-strong)]">{$t('contact.linkedin')}</span>
					</span>
					<span class="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
						linkedin.com/in/ogeid
						<ArrowUpRight class="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
					</span>
				</a>
			</div>
		</div>

		<div class="pt-8 mt-8 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 pb-12">
			<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-ink-muted)] font-mono">
				<span>© {new Date().getFullYear()} Diego Alvarado</span>
				<span class="opacity-40">·</span>
				<span class="inline-flex items-center gap-1">
					<MapPin class="shrink-0 opacity-80" size={13} strokeWidth={2} aria-hidden="true" />
					Buenos Aires (GMT-3)
				</span>
			</div>
			<button
				type="button"
				onclick={scrollToTop}
				class="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] hover:text-[var(--color-signal)] transition-colors min-h-[44px] px-2 py-1 -my-1 rounded-md"
			>
				<span>{$t('contact.backToTop')}</span>
				<ArrowUp class="w-3.5 h-3.5" strokeWidth={2} />
			</button>
		</div>
	</section>
{:else}
	<footer id="contact" class="scroll-mt-32 border-t border-[rgba(31,35,42,0.1)] dark:border-[rgba(210,217,226,0.1)] bg-[rgba(243,244,247,0.5)] dark:bg-[rgba(18,21,25,0.35)]">
		<div class="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
			<SectionPageHeader kicker={$t('contact.kicker')} title={$t('contact.title')}>
				<svelte:fragment slot="aside">
					<p class="font-body text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed max-w-xl">
						{$t('contact.description')}
					</p>
				</svelte:fragment>
			</SectionPageHeader>

			<div
				class="rounded-2xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.12)] bg-[var(--color-elevated)] dark:bg-[var(--color-parchment-alt)] brutalist-shadow overflow-hidden"
			>
				<div class="p-6 md:p-8 border-b border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)]">
					<div class="flex flex-col sm:flex-row gap-3">
						<a
							href={emailHref}
							class="px-5 py-3.5 rounded-xl bg-[var(--color-ink-strong)] text-[var(--color-parchment)] dark:bg-[var(--color-signal)] dark:text-[#121519] dark:hover:bg-[#86bfa2] font-display font-semibold text-base tracking-tight text-center border border-transparent hover:bg-[var(--color-ink)] transition-all duration-200 brutalist-shadow brutalist-shadow-hover min-h-[44px] inline-flex items-center justify-center gap-2"
						>
							<Mail class="w-4 h-4" strokeWidth={1.75} aria-hidden={true} />
							{$t('contact.ctaEmail')}
						</a>
						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="px-5 py-3.5 rounded-xl border border-[rgba(31,35,42,0.14)] dark:border-[rgba(210,217,226,0.14)] bg-transparent font-display font-semibold text-base tracking-tight text-center text-[var(--color-ink-strong)] hover:bg-[var(--color-signal-soft)] hover:border-[color-mix(in_srgb,var(--color-signal)_40%,transparent)] transition-all duration-200 inline-flex items-center justify-center gap-2 min-h-[44px]"
						>
							<svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							{$t('contact.downloadCv')}
						</a>
					</div>
				</div>

				<div class="divide-y divide-[rgba(31,35,42,0.08)] dark:divide-[rgba(210,217,226,0.08)]">
					<a
						href="https://github.com/000geid"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
					>
						<span class="flex items-center gap-3">
							<svg class="w-4 h-4 text-[var(--color-ink-muted)] group-hover:text-[var(--color-signal)] transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
							</svg>
							<span class="font-display font-medium text-base text-[var(--color-ink-strong)]">{$t('contact.github')}</span>
						</span>
						<span class="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
							@000geid
							<ArrowUpRight class="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
						</span>
					</a>

					<a
						href="https://www.linkedin.com/in/ogeid/"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--color-signal-soft)] transition-colors duration-200"
					>
						<span class="flex items-center gap-3">
							<svg class="w-4 h-4 text-[var(--color-ink-muted)] group-hover:text-[var(--color-signal)] transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
							</svg>
							<span class="font-display font-medium text-base text-[var(--color-ink-strong)]">{$t('contact.linkedin')}</span>
						</span>
						<span class="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
							linkedin.com/in/ogeid
							<ArrowUpRight class="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
						</span>
					</a>
				</div>
			</div>

			<div class="pt-10 md:pt-12 mt-10 md:mt-12 border-t border-[rgba(31,35,42,0.08)] dark:border-[rgba(210,217,226,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-ink-muted)] font-mono">
					<span>© {new Date().getFullYear()} Diego Alvarado</span>
					<span class="opacity-40">·</span>
					<span class="inline-flex items-center gap-1">
						<MapPin class="shrink-0 opacity-80" size={13} strokeWidth={2} aria-hidden="true" />
						Buenos Aires (GMT-3)
					</span>
				</div>
				<button
					type="button"
					onclick={scrollToTop}
					class="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] hover:text-[var(--color-signal)] transition-colors min-h-[44px] px-2 py-1 -my-1 rounded-md"
				>
					<span>{$t('contact.backToTop')}</span>
					<ArrowUp class="w-3.5 h-3.5" strokeWidth={2} />
				</button>
			</div>
		</div>
	</footer>
{/if}
