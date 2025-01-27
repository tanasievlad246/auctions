<script lang="ts">
	import { isAuthenticated, auth0Client, loading, user } from '@/store';
	import { loginWithRedirect, logout } from '@/auth/auth.service';

    user.subscribe((user) => {
        console.log(user);
    })
</script>

<div
	class="flex flex-row w-full justify-between items-center px-4 py-2 border-b-2 border-b-zinc-200"
>
	<div class="flex flex-row">
		<a href="/" class="text-2xl font-bold">Auctions</a>
	</div>
    {#if $loading}
        <div>Loading...</div>
    {:else}
        {#if $isAuthenticated}
            <div class="flex flex-row items-center">
                <a href="/auctions" class="px-2">Auctions</a>
                <a href="/auctions/new" class="px-2">New Auction</a>
                <button on:click={() => logout($auth0Client)} class="px-2">Logout</button>
            </div>
        {/if}
        {#if !$isAuthenticated}
            <div class="flex flex-row items-center">
                <button on:click={() => loginWithRedirect($auth0Client, {})} class="px-2">Login</button>
            </div>
        {/if}
    {/if}
</div>
