<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let items: string[] = [];

  const selected = writable(items[0] || "");
  setContext("tabs", selected);

  function select(item: string) {
    $selected = item;
  }
</script>

<div class="tabs-wrapper not-prose">
  <div class="tabs-header">
    {#each items as item}
      <button
        class="tab-button"
        class:active={$selected === item}
        on:click={() => select(item)}
        type="button"
      >
        {item}
      </button>
    {/each}
  </div>
  <div class="tabs-content">
    <slot />
  </div>
</div>

<style>
  .tabs-wrapper {
    margin: 1.5rem 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    background: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(8px);
  }

  .tabs-header {
    display: flex;
    gap: 2px;
    padding: 6px;
    background: rgba(15, 15, 15, 0.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tabs-header::-webkit-scrollbar {
    display: none;
  }

  .tab-button {
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #9ca3af;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tab-button:hover {
    color: #d1d5db;
    background: rgba(255, 255, 255, 0.05);
  }

  .tab-button.active {
    color: #ffffff;
    background: rgba(59, 130, 246, 0.15);
    font-weight: 600;
  }

  .tabs-content {
    background: rgba(10, 10, 10, 0.6);
    padding: 0;
  }

  .tabs-content :global(.code-block-wrapper) {
    margin: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
  }

  .tabs-content :global(.code-block-container) {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
  }

  .tabs-content :global(.code-header) {
    border-radius: 0 !important;
    background: rgba(15, 15, 15, 0.9) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  }

  .tabs-content :global(.code-content) {
    background: rgba(13, 17, 23, 0.8) !important;
  }

  .tabs-content :global(pre) {
    margin: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
  }

  .tabs-content :global(code) {
    font-size: 13px !important;
    line-height: 1.7 !important;
  }
</style>
