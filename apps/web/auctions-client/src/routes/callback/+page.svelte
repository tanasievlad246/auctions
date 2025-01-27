<script lang="ts">
	import { onMount } from 'svelte';
	import { isAuthenticated, user, loading } from '@/store';
	import { createClient, getUser } from '@/auth/auth.service';
	import { goto } from '$app/navigation';

	onMount(async () => {
		try {
            const client = await createClient();
			const redirectCallbackResponse = await client.handleRedirectCallback();
			console.log(redirectCallbackResponse);
			isAuthenticated.set(true);
			const _user = await getUser(client);
			console.log(_user);
			user.set(_user as any);
			loading.set(false);
			goto('/');
		} catch (error) {
			console.error(error);
			goto('/error');
		}
	});
</script>
