<script lang="ts">
  import Icon from "@iconify/svelte";
  import { marked } from "marked";

  export let type: "info" | "warn" | "error" | "success" = "info";
  export let title = "";

  let slotContent = "";
  
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-200",
      icon: "lucide:info",
      iconColor: "text-blue-400",
    },
    warn: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-200",
      icon: "lucide:alert-triangle",
      iconColor: "text-yellow-400",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-200",
      icon: "lucide:x-circle",
      iconColor: "text-red-400",
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-200",
      icon: "lucide:check-circle",
      iconColor: "text-green-400",
    },
  };

  $: style = styles[type] || styles.info;

  function processSlot(node: HTMLElement) {
    if (node) {
      const text = node.textContent || "";
      const html = marked.parse(text, { breaks: true, gfm: true });
      node.innerHTML = html as string;
    }
  }
</script>

<div class="my-6 rounded-lg border p-4 {style.bg} {style.border}">
  <div class="flex items-start gap-3">
    <div class="mt-1">
      <Icon icon={style.icon} class={style.iconColor} width="20" />
    </div>
    <div class="flex-1">
      {#if title}
        <strong class="block mb-1 font-semibold text-white">{title}</strong>
      {/if}
      <div class="callout-content text-sm leading-relaxed {style.text}" use:processSlot>
        <slot />
      </div>
    </div>
  </div>
</div>

<style>
  .callout-content :global(p) {
    margin: 0.5rem 0;
  }

  .callout-content :global(p:first-child) {
    margin-top: 0;
  }

  .callout-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .callout-content :global(strong),
  .callout-content :global(b) {
    font-weight: 700;
    color: white;
  }

  .callout-content :global(em),
  .callout-content :global(i) {
    font-style: italic;
  }

  .callout-content :global(code) {
    background: rgba(0, 0, 0, 0.4);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #93c5fd;
  }

  .callout-content :global(a) {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .callout-content :global(ul),
  .callout-content :global(ol) {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  .callout-content :global(li) {
    margin: 0.25rem 0;
  }
</style>
