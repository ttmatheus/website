<script>
  import Icon from "@iconify/svelte";
  import DocsHeader from "$lib/components/docs/DocsHeader.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  export let data;
  $: ({ content: Content, meta, lang, slug } = data);

  $: ogImageUrl = `/api/og?title=${encodeURIComponent(meta.title)}&description=${encodeURIComponent(meta.description || "")}&category=${encodeURIComponent(meta.category || "Documentation")}&lang=${lang}&type=typescript`;

  let headings = [];
  let activeHeading = "";
  let mounted = false;

  $: breadcrumbs = slug ? slug.split('/').filter(Boolean) : [];

  function extractHeadings() {
    if (typeof document === 'undefined' || !mounted) return;
    
    const article = document.querySelector('article.docs-content');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3, h4');
    headings = Array.from(headingElements).map(heading => ({
      id: heading.id || heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      text: heading.textContent,
      level: parseInt(heading.tagName.charAt(1))
    }));

    headingElements.forEach(heading => {
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
    });
  }

  function handleScroll() {
    if (typeof document === 'undefined') return;
    
    const headingElements = document.querySelectorAll('article.docs-content h2, article.docs-content h3, article.docs-content h4');
    if (headingElements.length === 0) return;
    
    let current = '';
    const scrollPosition = window.scrollY + 150;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight >= documentHeight - 50) {
      const lastHeading = headingElements[headingElements.length - 1];
      current = lastHeading.id;
    } else {
      headingElements.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          current = heading.id;
        }
      });
    }

    if (current) {
      activeHeading = current;
    }
  }

  onMount(() => {
    mounted = true;
    setTimeout(extractHeadings, 100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      mounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: if (Content && mounted) {
    setTimeout(extractHeadings, 100);
  }
</script>

<SEO title={meta.title} description={meta.description} image={ogImageUrl} type="article" />

<article class="docs-content relative max-w-4xl mx-auto w-full min-w-0 pr-4 lg:pr-12">
  <div class="mb-8">
    <div class="flex items-center gap-2 text-sm text-neutral-500 font-medium mb-6">
      <a href="/docs/{lang}/introduction" class="hover:text-white transition-colors">Docs</a>
      {#each breadcrumbs as crumb, i}
        <Icon icon="lucide:chevron-right" width="12" />
        <span class={i === breadcrumbs.length - 1 ? "text-neutral-300" : "text-neutral-500"}>
          {crumb.charAt(0).toUpperCase() + crumb.slice(1).replace(/-/g, ' ')}
        </span>
      {/each}
    </div>
  </div>

  <DocsHeader {meta} />

  <div class="prose prose-invert prose-lg max-w-none">
    <svelte:component this={Content} />
  </div>

  <div class="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
    <a
      href="https://github.com/azurajs/website/edit/main/src/lib/content/{lang}/{slug}.mdx"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm text-neutral-500 hover:text-white transition-colors flex items-center gap-2 group"
    >
      <Icon icon="lucide:edit-2" width="14" class="group-hover:text-blue-400 transition-colors" />
      {lang === 'pt' ? 'Editar esta página no GitHub' : 'Edit this page on GitHub'}
    </a>
  </div>
</article>

<div class="toc-container hidden xl:block fixed top-24 right-[max(2rem,calc(50%-48rem))] w-64 max-h-[calc(100vh-7rem)] overflow-y-auto pl-6 py-4 toc-scrollbar">
  <h5 class="text-xs font-bold text-white uppercase tracking-wider mb-4 sticky top-0 bg-black/80 backdrop-blur-sm pb-2 z-10">{lang === 'pt' ? 'Índice' : 'On this page'}</h5>
  {#if headings.length > 0}
    <nav class="space-y-2 text-sm border-l border-white/10">
      {#each headings as heading}
        <a
          href="#{heading.id}"
          on:click|preventDefault={() => {
            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            activeHeading = heading.id;
          }}
          class="block py-1 border-l-2 -ml-px transition-all duration-200 cursor-pointer"
          class:pl-4={heading.level === 2}
          class:pl-6={heading.level === 3}
          class:pl-8={heading.level === 4}
          class:border-blue-500={activeHeading === heading.id}
          class:text-blue-400={activeHeading === heading.id}
          class:font-medium={activeHeading === heading.id}
          class:border-transparent={activeHeading !== heading.id}
          class:text-neutral-400={activeHeading !== heading.id}
          class:hover:text-white={activeHeading !== heading.id}
          class:hover:border-neutral-600={activeHeading !== heading.id}
        >
          {heading.text}
        </a>
      {/each}
    </nav>
  {:else}
    <a
      href="#top"
      class="block pl-4 py-1 border-l-2 border-transparent hover:border-blue-500 text-neutral-400 hover:text-blue-400 transition-all -ml-px"
    >
      Overview
    </a>
  {/if}
</div>

<style>
  .docs-content {
    --tw-prose-body: #d1d5db;
    --tw-prose-headings: #ffffff;
    --tw-prose-links: #60a5fa;
    --tw-prose-bold: #ffffff;
    --tw-prose-code: #93c5fd;
    --tw-prose-pre-bg: transparent;
  }

  .docs-content :global(h1),
  .docs-content :global(h2),
  .docs-content :global(h3),
  .docs-content :global(h4),
  .docs-content :global(h5),
  .docs-content :global(h6) {
    scroll-margin-top: 7rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #ffffff;
  }

  .docs-content :global(a) {
    color: #60a5fa;
    text-decoration: none;
    transition: all 0.2s;
  }

  .docs-content :global(a:hover) {
    color: #93c5fd;
  }

  .docs-content :global(code:not(.code-inner code)) {
    color: #93c5fd;
    background: #0d1117;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.875em;
  }

  .docs-content :global(code:not(.code-inner code)::before),
  .docs-content :global(code:not(.code-inner code)::after) {
    content: none;
  }

  .docs-content :global(hr) {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .docs-content :global(img) {
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .docs-content :global(blockquote) {
    border-left: 3px solid #3b82f6;
    background: rgba(59, 130, 246, 0.05);
    padding: 0.5rem 1.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: normal;
  }

  .docs-content :global(.callout-content strong),
  .docs-content :global(.callout-content b) {
    font-weight: 700;
    color: white !important;
  }

  .docs-content :global(.callout-content code) {
    padding: 0.2rem 0.4rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.875em !important;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    color: #93c5fd !important;
  }

  .docs-content :global(.tab-item-content strong),
  .docs-content :global(.tab-item-content b) {
    font-weight: 700;
    color: white !important;
  }

  .docs-content :global(.tab-item-content code:not(.code-inner code)) {
    padding: 0.2rem 0.4rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.875em !important;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    color: #93c5fd !important;
  }

  .docs-content :global(.tabs-wrapper strong),
  .docs-content :global(.tabs-wrapper b) {
    font-weight: 700;
    color: white !important;
  }

  .docs-content :global(.tabs-wrapper code:not(.code-inner code)) {
    padding: 0.2rem 0.4rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.875em !important;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    color: #93c5fd !important;
  }

  .docs-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  .docs-content :global(th),
  .docs-content :global(td) {
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .docs-content :global(th) {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
  }

  .docs-content :global(.code-block-wrapper) {
    margin: 1.5rem 0;
  }

  .toc-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  .toc-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  .toc-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .toc-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  .toc-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
