<script lang="ts">
	import { isAuthenticated, auth0Client } from '@/store';
	import { loginWithRedirect, getUser, logout } from '@/auth/auth.service';
	import { onMount } from 'svelte';

    onMount(async () => {
        const user = await getUser($auth0Client);
        console.log(user);
    })
</script>

<div
	class="flex flex-row w-full justify-between items-center px-4 py-2 border-b-2 border-b-zinc-200"
>
	<div class="flex flex-row">
		<a href="/" class="text-2xl font-bold">Auctions</a>
	</div>
	{#if $isAuthenticated}
		<div class="flex flex-row items-center">
			<a href="/auctions" class="px-2">Auctions</a>
			<a href="/auctions/new" class="px-2">New Auction</a>
		</div>
	{/if}
	{#if !$isAuthenticated}
		<div class="flex flex-row items-center">
			<button on:click={() => loginWithRedirect($auth0Client, {})} class="px-2">Login</button>
			<button on:click={() => logout($auth0Client)} class="px-2">Register</button>
		</div>
	{/if}
</div>
