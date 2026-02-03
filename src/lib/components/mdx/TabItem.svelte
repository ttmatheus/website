<script>
  import { getContext, tick } from "svelte";
  import { createHighlighter } from "shiki";

  export let value;

  const selected = getContext("tabs");
  let contentElement;
  let highlighterPromise = null;

  function getHighlighter() {
    if (!highlighterPromise) {
      highlighterPromise = createHighlighter({
        themes: ["github-dark"],
        langs: ["bash", "sh", "javascript", "typescript", "json", "yaml", "css", "html"]
      });
    }
    return highlighterPromise;
  }

  async function copyToClipboard(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      const originalIcon = btn.innerHTML;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>`;
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerHTML = originalIcon;
        btn.classList.remove("copied");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  function handleContainerClick(event) {
    const btn = event.target.closest(".copy-btn");
    if (btn) {
      const codeData = decodeURIComponent(btn.dataset.code);
      copyToClipboard(codeData, btn);
    }
  }

  async function processCodeBlocks(node) {
    if (!node) return;

    if (node.querySelector(".fd-figure")) return;

    const textContent = node.textContent || "";
    const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/g;
    
    if (!codeBlockRegex.test(textContent)) return;

    const highlighter = await getHighlighter();
    
    // Check again if processed while waiting for highlighter
    if (node.querySelector(".fd-figure")) return;

    let html = node.innerHTML;
    let match;
    
    // Reset regex
    codeBlockRegex.lastIndex = 0;

    const matches = [];
    while ((match = codeBlockRegex.exec(textContent)) !== null) {
      matches.push({
        full: match[0],
        lang: match[1],
        code: match[2].trim()
      });
    }

    for (const match of matches) {
      const highlighted = highlighter.codeToHtml(match.code, {
        lang: match.lang,
        theme: "github-dark",
        defaultColor: false
      });

      const encodedCode = encodeURIComponent(match.code);
      
      const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>`;

      const codeBlockHTML = `
        <figure class="fd-figure">
          <div class="fd-copy-wrapper">
            <button class="copy-btn" type="button" data-code="${encodedCode}" aria-label="Copy Text">
              ${copyIcon}
            </button>
          </div>
          <div class="fd-scroll-container">
            ${highlighted}
          </div>
        </figure>`;

      html = html.replace(match.full, codeBlockHTML);
    }

    node.innerHTML = html;
  }

  $: if ($selected === value && contentElement) {
    processCodeBlocks(contentElement);
  }
</script>

{#if $selected === value}
  <div class="tab-panel" role="tabpanel" tabindex="0" bind:this={contentElement} on:click={handleContainerClick}>
    <slot />
  </div>
{/if}

<style>
  .tab-panel {
    padding: 1rem;
    font-size: 0.9375rem;
    background-color: #0c0c0e;
    border: 1px solid #27272a;
    border-top: none;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    outline: none;
    animation: fadeIn 0.15s ease-out;
    color: #a1a1aa;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(2px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .tab-panel :global(.fd-figure) {
    margin: 1rem -1rem;
    background-color: #121214; 
    border-top: 1px solid #27272a;
    border-bottom: 1px solid #27272a;
    position: relative;
    overflow: hidden;
    font-size: 0.875rem;
  }

  .tab-panel :global(.fd-figure:first-child) {
    margin-top: -1rem;
    border-top: none;
  }
  
  .tab-panel :global(.fd-figure:last-child) {
    margin-bottom: -1rem;
    border-bottom: none;
  }

  .tab-panel :global(.fd-copy-wrapper) {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
  }

  .tab-panel :global(.copy-btn) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    padding: 0.25rem;
    background: transparent;
    border: 1px solid transparent;
    color: #71717a;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tab-panel :global(.copy-btn:hover) {
    color: #fafafa;
    background-color: rgba(255, 255, 255, 0.08);
  }

  .tab-panel :global(.copy-btn.copied) {
    color: #10b981;
  }

  .tab-panel :global(.fd-scroll-container) {
    padding: 1rem 3.5rem 1rem 1rem;
    overflow: auto;
    font-size: 0.8125rem;
    line-height: 1.5;
  }

  .tab-panel :global(pre) {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
  }

  .tab-panel :global(code) {
    display: block;
    width: fit-content;
    min-width: 100%;
    background: transparent !important;
    font-family: inherit;
  }

  .tab-panel :global(.line) {
    display: inline-block;
    min-height: 1rem;
  }

  .tab-panel :global(span) {
    background-color: transparent !important;
  }

  .tab-panel :global(p) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .tab-panel :global(.fd-scroll-container::-webkit-scrollbar) {
    height: 6px;
    width: 6px;
  }
  
  .tab-panel :global(.fd-scroll-container::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  .tab-panel :global(.fd-scroll-container::-webkit-scrollbar-thumb) {
    background: #3f3f46;
    border-radius: 9999px;
  }
  
  .tab-panel :global(.fd-scroll-container::-webkit-scrollbar-thumb:hover) {
    background: #52525b;
  }
</style>