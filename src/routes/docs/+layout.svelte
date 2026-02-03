<script>
  import Header from "$lib/components/layout/Header.svelte";
  import DocsSidebar from "$lib/components/docs/DocsSidebar.svelte";
  import Icon from "@iconify/svelte";

  let sidebarOpen = false;
</script>

<div class="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">
  <Header />

  <div class="fixed inset-0 z-0 pointer-events-none">
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"
    ></div>
  </div>

  <div class="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
    <div class="flex lg:gap-10">
      <DocsSidebar bind:open={sidebarOpen} />

      <main class="flex-1 w-full min-w-0 py-8 lg:py-10">
        <button
          class="lg:hidden mb-8 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10"
          on:click={() => (sidebarOpen = true)}
        >
          <Icon icon="lucide:menu" width="18" />
          Menu
        </button>

        <slot />
      </main>
    </div>
  </div>
</div>
