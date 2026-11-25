<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";
	import SiteShell from "$lib/components/SiteShell.svelte";
	import { language } from "$lib/stores/language";
	import { darkMode } from "$lib/stores/darkMode";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		language.init();
		darkMode.init();

		const unsub = language.subscribe((lang) => {
			document.documentElement.lang = lang;
		});

		return unsub;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Public+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SiteShell>
	{@render children()}
</SiteShell>
