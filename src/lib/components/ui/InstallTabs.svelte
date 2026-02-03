<script lang="ts">
  import Icon from "@iconify/svelte";

  type CommandKey = keyof typeof commands;
  let activeTab: CommandKey = "npm";
  let copied = false;

  const commands = {
    npm: "npx @azurajs/cli create <app-name>",
    pnpm: "pnpm dlx @azurajs/cli create <app-name>",
    bun: "bunx @azurajs/cli create <app-name>",
    yarn: "yarn dlx @azurajs/cli create <app-name>",
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(commands[activeTab]);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  }
</script>

<div
  class="bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden w-full max-w-md shadow-2xl shadow-black/50"
>
  <div class="flex border-b border-white/5 bg-white/5">
    {#each Object.keys(commands) as pkg}
      <button
        on:click={() => (activeTab = pkg as CommandKey)}
        class="flex-1 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer
        {activeTab === pkg
          ? 'text-white bg-white/5 border-b-2 border-blue-500'
          : 'text-neutral-500 hover:text-white hover:bg-white/5 border-b-2 border-transparent'}"
      >
        {pkg}
      </button>
    {/each}
  </div>

  <div class="flex items-center justify-between px-4 py-4 bg-[#0A0A0A]">
    <code class="font-mono text-sm text-neutral-300 truncate">
      <span class="text-neutral-600 mr-2 select-none">$</span>
      {commands[activeTab]}
    </code>

    <button
      on:click={handleCopy}
      class="ml-4 p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
      aria-label="Copy command"
    >
      {#if copied}
        <div class="text-green-400">
          <Icon icon="lucide:check" width="16" />
        </div>
      {:else}
        <Icon icon="lucide:copy" width="16" />
      {/if}
    </button>
  </div>
</div>

<style>
  button {
    outline: none;
  }
</style>
