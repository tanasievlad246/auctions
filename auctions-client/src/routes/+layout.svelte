<script lang="ts">
	import '../app.css';
	import NavBar from '@/components/navbar/NavBar.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col w-screen h-screen">
	<NavBar />
	{@render children()}
</div>
