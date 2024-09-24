<script>
 import "../lib/style.css";
 import { page } from '$app/stores';

 const {children} = $props();
</script>

<main>
    <header>
        <h1>
            Transport.ly

        </h1>
        <p>
            An automated air flight service
        </p>

        {#if $page.route.id === '/'}
            <a href="/orders">
                view order schedule
            </a>
        {:else}
            <a href="/">
                view flight schedule
            </a>
        {/if}
    </header>
    {@render children()}
</main>

<style lang="postcss">
 main {
     @apply h-screen ;
 }
 header {
     @apply flex items-end px-8 py-2;
 }
 h1 {
     @apply text-xl font-bold mr-4;
 }
 p {
     @apply mr-auto text-sm;
 }
 :global(a) {
     @apply px-1.5 py-1 border border-black/20 rounded uppercase text-xs hover:bg-[#0000ee]/30 transition;
 }
</style>
