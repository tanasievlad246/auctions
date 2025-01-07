<script lang="ts">
	import '../app.css';
	import NavBar from '@/components/navbar/NavBar.svelte';
	import { onMount } from 'svelte';
	import { auth0Client, isAuthenticated } from '@/store';
	import { createClient } from '@/auth/auth.service';

	let { children } = $props();

	onMount(async () => {
		const client = await createClient();
		client.isAuthenticated().then((isAuthenticatedLogin) => {
			console.log(isAuthenticatedLogin);
			isAuthenticated.set(isAuthenticatedLogin);
		});
		auth0Client.set(client);
	})
</script>

<div class="flex flex-col w-screen h-screen">
	<NavBar />
	{@render children()}
</div>
