<script lang="ts">
  import { onMount } from 'svelte';
  
  export let lang = 'typescript';
  export let filename = '';
  
  let copied = false;
  let codeElement: HTMLElement;
  let rawCode = '';
  
  const languageLabels: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    bash: 'Bash',
    shell: 'Shell',
    json: 'JSON',
    yaml: 'YAML',
    html: 'HTML',
    css: 'CSS',
    svelte: 'Svelte',
    python: 'Python',
    rust: 'Rust',
    go: 'Go',
    text: 'Text'
  };
  
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(rawCode);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  
  onMount(() => {
    if (codeElement) {
      rawCode = codeElement.textContent || '';
    }
  });
</script>

<div class="code-block-wrapper group relative not-prose my-6">
  <div class="code-block-container bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
    <div class="code-header flex items-center justify-between px-4 py-2.5 bg-linear-to-r from-white/5 to-white/2 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="flex gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
        </div>
        {#if filename}
          <span class="text-xs text-neutral-400 font-mono">{filename}</span>
        {:else}
          <span class="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
            {languageLabels[lang] || lang}
          </span>
        {/if}
      </div>
      <button
        on:click={copyToClipboard}
        class="copy-button cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20"
        aria-label="Copy code"
      >
        {#if copied}
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-emerald-400">Copied!</span>
        {:else}
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        {/if}
      </button>
    </div>
    
    <div class="code-content relative overflow-x-auto bg-linear-to-br from-[#0d1117] to-[#0a0a0a]">
      <div class="code-inner" bind:this={codeElement}>
        <slot />
      </div>
    </div>
  </div>
</div>

<style>
  .code-block-wrapper {
    position: relative;
    margin: 1.5rem 0;
  }

  .code-block-container {
    transition: all 0.2s ease;
  }

  .code-block-wrapper:hover .code-block-container {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  }

  .copy-button {
    opacity: 0.7;
  }

  .copy-button:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  .code-content {
    max-height: 650px;
    overflow: auto;
  }

  .code-inner {
    padding: 0;
    margin: 0;
  }

  .code-inner :global(pre) {
    margin: 0 !important;
    padding: 1.25rem 1.5rem !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    font-size: 0.875rem !important;
    line-height: 1.75 !important;
    overflow-x: visible !important;
  }

  .code-inner :global(code) {
    display: block;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace !important;
    font-size: 0.875rem !important;
    line-height: 1.75 !important;
    color: #e6edf3 !important;
    background: transparent !important;
    padding: 0 !important;
    border: none !important;
    tab-size: 2;
    -moz-tab-size: 2;
  }

  .code-inner :global(.line) {
    display: inline-block;
    min-height: 1.5rem;
  }

  .code-content::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .code-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0 0 0.75rem 0;
  }

  .code-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 5px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  .code-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
    background-clip: padding-box;
  }

  .code-content::-webkit-scrollbar-corner {
    background: transparent;
  }

  @media (max-width: 640px) {
    .code-inner :global(pre) {
      padding: 1rem !important;
    }

    .code-inner :global(code) {
      font-size: 0.8125rem !important;
    }
  }
</style>
