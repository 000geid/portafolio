<script lang="ts">
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
</script>

<!-- Same feed as the home page: `selectedProjects` is the single source of project work. -->
<div id="projects" class="scroll-mt-32 py-14 md:py-20 px-4 md:px-6">
	<div class="max-w-4xl mx-auto">
		<FeaturedProjects />
	</div>
</div>
