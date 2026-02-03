<script lang="ts">
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";

  interface Meta {
    title: string;
    description?: string;
    date?: string;
    status?: "new" | "beta" | "deprecated" | "updated";
    category?: string;
    icon?: string;
  }

  export let meta: Meta;

  const statusColors = {
    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    beta: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    deprecated: "bg-red-500/10 text-red-400 border-red-500/20",
    updated: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  $: currentLang = $page.params.lang || "en";
</script>

<div class="relative mb-12">
  <div
    class="absolute -inset-1 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-2xl opacity-50 pointer-events-none"
  ></div>

  <div class="relative space-y-6">
    <div class="flex items-start gap-4">
      {#if meta.icon}
        <div
          class="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 shadow-lg shrink-0"
        >
          <Icon icon={meta.icon} width="24" class="text-white" />
        </div>
      {/if}

      <div class="flex-1 space-y-4">
        <h1
          class="text-4xl md:text-5xl font-bold tracking-tight text-white flex items-center gap-3"
        >
          {meta.title}
          {#if meta.status}
            <span
              class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border {statusColors[
                meta.status
              ] || statusColors.new}"
            >
              {meta.status}
            </span>
          {/if}
        </h1>

        {#if meta.description}
          <p class="text-lg text-neutral-400 leading-relaxed max-w-3xl">
            {meta.description}
          </p>
        {/if}
      </div>
    </div>

    <div class="flex items-center gap-6 pt-4 border-t border-white/5">
      {#if meta.date}
        <div class="flex items-center gap-2 text-xs text-neutral-500">
          <Icon icon="lucide:calendar" width="14" />
          <span>Last updated: {new Date(meta.date).toLocaleDateString()}</span>
        </div>
      {/if}

      <div class="flex items-center gap-2 text-xs text-neutral-500">
        <Icon icon="lucide:clock" width="14" />
        <span>~ 5 min read</span>
      </div>
    </div>
  </div>
</div>
