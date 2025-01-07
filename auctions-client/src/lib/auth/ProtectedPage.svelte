<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '@/store';

	onMount(() => {
		if (!isAuthenticated) {
			goto('/login');
		}
	});
</script>
