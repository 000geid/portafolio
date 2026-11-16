<script lang="ts">
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
</script>

<!-- Same feed as the home page: `selectedProjects` is the single source of project work. -->
<div id="projects" class="scroll-mt-32 py-14 md:py-20 px-5 md:px-8 lg:px-12">
	<FeaturedProjects />
</div>
