<script lang="ts">
	import '../app.css';
	import NavBar from '@/components/navbar/NavBar.svelte';
	import { onMount } from 'svelte';
	import { auth0Client, isAuthenticated, loading, user } from '@/store';
	import { createClient, getUser } from '@/auth/auth.service';

	let { children } = $props();

	onMount(async () => {
		const client = await createClient();
		client.isAuthenticated().then((isAuthenticatedLogin) => {
			isAuthenticated.set(isAuthenticatedLogin);
			loading.set(false);
		});
		auth0Client.set(client);

		const _user = await getUser(client);
		user.set(_user as any);
	})
</script>

<div class="flex flex-col w-screen h-screen">
	<NavBar />
	{@render children()}
</div>
