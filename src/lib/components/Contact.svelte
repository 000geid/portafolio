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
	<footer
		id="contact"
		tabindex="-1"
		class="scroll-mt-12 bg-[var(--color-emerald)] text-[var(--color-emerald-ink)]"
	>
		<div class="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-20">
			<div class="grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-x-20">
				<div>
					<h2 class="font-display text-4xl leading-[1.04] font-bold tracking-[-0.025em] text-[var(--color-emerald-ink)] md:text-5xl lg:text-6xl">
						{$t('contact.title')}
					</h2>
					<p class="mt-5 max-w-[44ch] font-body text-lg leading-relaxed text-[var(--color-emerald-muted)]">
						{$t('contact.description')}
					</p>

					<div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
						<a
							href={emailHref}
							class="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] bg-[var(--color-signal)] px-7 font-body text-sm font-semibold text-[#f7f5ef] transition-colors hover:bg-[var(--color-signal-hover)] md:text-base"
						>
							<Mail class="size-4" strokeWidth={1.75} aria-hidden={true} />
							{$t('contact.ctaEmail')}
						</a>
						<a
							href={cvHref}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-[var(--color-emerald-rule)] px-6 font-body text-sm font-medium text-[var(--color-emerald-ink)] transition-colors hover:border-[var(--color-emerald-ink)] md:text-base"
						>
							{$t('contact.downloadCv')}
							<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
							<span class="sr-only">{$t('projects.card.opensNewTab')}</span>
						</a>
					</div>
				</div>

				<div class="divide-y divide-[var(--color-emerald-rule)] border-y border-[var(--color-emerald-rule)]">
					<a
						href="https://github.com/000geid"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--color-signal-on-dark)]"
					>
						<span class="font-display text-xl font-semibold text-[var(--color-emerald-ink)] group-hover:text-[var(--color-signal-on-dark)] transition-colors">
							{$t('contact.github')}
						</span>
						<span class="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-[var(--color-emerald-muted)] group-hover:text-[var(--color-emerald-ink)] transition-colors">
							@000geid
							<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
						</span>
					</a>

					<a
						href="https://www.linkedin.com/in/ogeid/"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--color-signal-on-dark)]"
					>
						<span class="font-display text-xl font-semibold text-[var(--color-emerald-ink)] group-hover:text-[var(--color-signal-on-dark)] transition-colors">
							{$t('contact.linkedin')}
						</span>
						<span class="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-[var(--color-emerald-muted)] group-hover:text-[var(--color-emerald-ink)] transition-colors">
							linkedin.com/in/ogeid
							<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
						</span>
					</a>
				</div>
			</div>

			<div class="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-emerald-rule)] pt-7 sm:flex-row sm:items-center">
				<div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.1em] uppercase text-[var(--color-emerald-muted)]">
					<span>© {new Date().getFullYear()} Diego Alvarado</span>
					<span class="opacity-40">·</span>
					<span class="inline-flex items-center gap-1.5">
						<MapPin class="shrink-0 opacity-80" size={13} strokeWidth={2} aria-hidden="true" />
						Buenos Aires (GMT-3)
					</span>
				</div>
				<button
					type="button"
					onclick={scrollToTop}
					class="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-emerald-muted)] transition-colors hover:text-[var(--color-emerald-ink)] cursor-pointer"
				>
					<span>{$t('contact.backToTop')}</span>
					<ArrowUp class="size-3.5" strokeWidth={2} aria-hidden="true" />
				</button>
			</div>
		</div>
	</footer>
{:else}
	<footer id="contact" class="scroll-mt-32 bg-[var(--color-emerald)] text-[var(--color-emerald-ink)]">
		<div class="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
			<SectionPageHeader kicker={$t('contact.kicker')} title={$t('contact.title')}>
				<svelte:fragment slot="aside">
					<p class="font-body text-base text-[var(--color-emerald-muted)] leading-relaxed max-w-xl">
						{$t('contact.description')}
					</p>
				</svelte:fragment>
			</SectionPageHeader>

			<div class="mt-8 flex flex-wrap items-center gap-4">
				<a
					href={emailHref}
					class="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] bg-[var(--color-signal)] px-7 font-body text-sm font-semibold text-[#f7f5ef] transition-colors hover:bg-[var(--color-signal-hover)] md:text-base"
				>
					<Mail class="size-4" strokeWidth={1.75} aria-hidden={true} />
					{$t('contact.ctaEmail')}
				</a>
				<a
					href={cvHref}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-[var(--color-emerald-rule)] px-6 font-body text-sm font-medium text-[var(--color-emerald-ink)] transition-colors hover:border-[var(--color-emerald-ink)] md:text-base"
				>
					{$t('contact.downloadCv')}
					<ArrowUpRight class="size-4" strokeWidth={1.75} aria-hidden="true" />
				</a>
			</div>

			<div class="mt-12 divide-y divide-[var(--color-emerald-rule)] border-y border-[var(--color-emerald-rule)] max-w-xl">
				<a
					href="https://github.com/000geid"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex min-h-16 items-center justify-between gap-4 py-4"
				>
					<span class="font-display text-lg font-semibold text-[var(--color-emerald-ink)] group-hover:text-[var(--color-signal-on-dark)] transition-colors">{$t('contact.github')}</span>
					<span class="flex items-center gap-1.5 font-mono text-xs text-[var(--color-emerald-muted)]">@000geid <ArrowUpRight class="size-3.5" aria-hidden="true" /></span>
				</a>
				<a
					href="https://www.linkedin.com/in/ogeid/"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex min-h-16 items-center justify-between gap-4 py-4"
				>
					<span class="font-display text-lg font-semibold text-[var(--color-emerald-ink)] group-hover:text-[var(--color-signal-on-dark)] transition-colors">{$t('contact.linkedin')}</span>
					<span class="flex items-center gap-1.5 font-mono text-xs text-[var(--color-emerald-muted)]">linkedin.com/in/ogeid <ArrowUpRight class="size-3.5" aria-hidden="true" /></span>
				</a>
			</div>
		</div>
	</footer>
{/if}
