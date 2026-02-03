<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { marked } from "marked";

  export let open = false;

  interface Release {
    name: string;
    tag_name: string;
    prerelease: boolean;
    published_at: string;
    html_url: string;
    body: string;
  }

  let releases: Release[] = [];
  let loading = true;
  let error: string | null = null;

  async function fetchReleases() {
    loading = true;
    error = null;
    try {
      const response = await fetch("https://api.github.com/repos/azurajs/azura/releases");
      if (!response.ok) throw new Error("Failed to load releases");
      const data = await response.json();
      releases = data;
    } catch (err) {
      error = "Could not load changelog from GitHub.";
    } finally {
      loading = false;
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  $: if (open && releases.length === 0) {
    fetchReleases();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
    role="dialog"
    aria-modal="true"
  >
    <button
      type="button"
      class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      aria-label="Close modal"
      on:click={close}
      on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") close();
      }}
      transition:fade={{ duration: 200 }}
      tabindex="0"
      style="all: unset; cursor: pointer;"
    ></button>

    <div
      class="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl flex flex-col"
      transition:scale={{ duration: 300, opacity: 0, start: 0.95, easing: quintOut }}
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md z-10"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Icon icon="lucide:git-pull-request" width="20" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Changelog</h2>
            <p class="text-xs text-neutral-400">Latest updates from GitHub</p>
          </div>
        </div>
        <button
          on:click={close}
          class="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Icon icon="lucide:x" width="20" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-[#0A0A0A]">
        {#if loading}
          <div class="flex flex-col items-center justify-center py-12 gap-4">
            <div
              class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
            ></div>
            <p class="text-neutral-500 text-sm">Fetching releases...</p>
          </div>
        {:else if error}
          <div class="text-center py-12 text-neutral-400">
            <Icon icon="lucide:alert-circle" width="32" class="mx-auto mb-4 opacity-50" />
            <p>{error}</p>
            <button on:click={fetchReleases} class="mt-4 text-blue-400 hover:underline text-sm">
              Try Again
            </button>
          </div>
        {:else if releases.length === 0}
          <div class="text-center py-12 text-neutral-500">No releases found.</div>
        {:else}
          <div class="space-y-10">
            {#each releases as release}
              <div class="relative pl-8 border-l border-white/10 pb-2 last:border-0">
                <div
                  class="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#0A0A0A]"
                ></div>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div class="flex items-center gap-3">
                    <h3 class="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                      <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                        {release.name || release.tag_name}
                      </a>
                    </h3>
                    {#if release.prerelease}
                      <span
                        class="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold border border-yellow-500/20"
                        >Beta</span
                      >
                    {:else}
                      <span
                        class="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] uppercase font-bold border border-green-500/20"
                        >Latest</span
                      >
                    {/if}
                  </div>
                  <span class="text-xs font-mono text-neutral-500 bg-white/5 px-2 py-1 rounded">
                    {formatDate(release.published_at)}
                  </span>
                </div>

                <div class="prose prose-invert prose-sm max-w-none text-neutral-300">
                  {@html marked(release.body)}
                </div>

                <div class="mt-4 flex gap-4">
                  <a
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-white transition-colors"
                  >
                    View on GitHub <Icon icon="lucide:external-link" width="12" />
                  </a>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
