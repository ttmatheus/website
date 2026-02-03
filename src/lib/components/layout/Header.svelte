<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import azuraLogo from "$lib/assets/logo.png";
  import LanguageSelector from "$lib/components/ui/LanguageSelector.svelte";
  import { page } from "$app/stores";

  $: isDocsPage = $page.url.pathname.startsWith("/docs");

  let scrolled = false;
  let mobileMenuOpen = false;

  function handleScroll() {
    scrolled = window.scrollY > 20;
  }

  const toggleMenu = () => (mobileMenuOpen = !mobileMenuOpen);

  const links = [
    { icon: "lucide:home", name: "Home", href: "/" },
    { icon: "lucide:book", name: "Documentation", href: "/docs" },
    { icon: "lucide:video", name: "Tutorials", href: "/tutorials" },
  ];
</script>

<svelte:window on:scroll={handleScroll} />

<header
  class="fixed top-0 w-full z-50 transition-all duration-300 px-6 backdrop-blur-md border-b border-neutral-800 py-3
  {scrolled ? 'bg-black/80' : 'bg-transparent'}"
>
  <nav class="max-w-7xl mx-auto flex justify-between items-center text-white">
    <section class="flex items-center gap-5">
      <div class="text-2xl font-bold tracking-tight flex items-center gap-2">
        <img src={azuraLogo} alt="AzuraJS Logo" width="32" />
        <a href="/">Azura<span class="font-light text-yellow-500">JS</span></a>
      </div>

      <ul class="hidden md:flex gap-8 font-medium text-neutral-200">
        {#each links as link}
          <li>
            <a href={link.href} class="hover:text-yellow-200 transition-colors">
              <Icon icon={link.icon} width="18" class="inline-block mr-1 -mt-0.5" />
              {link.name}
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section class="flex items-center gap-2">
      <a
        href="https://github.com/azurajs/azura"
        class="hidden md:block p-2 transition-all transform hover:scale-110"
      >
        <Icon icon="simple-icons:github" width="22" />
      </a>

      <a href="/discord" class="hidden md:block p-2 transition-all transform hover:scale-110">
        <Icon icon="simple-icons:discord" width="22" />
      </a>

      <a
        href="https://www.npmjs.com/package/azurajs"
        class="hidden md:block p-2 transition-all transform hover:scale-110"
      >
        <Icon icon="simple-icons:npm" width="22" />
      </a>

      {#if isDocsPage}
        <div class="pl-4 border-l border-white/10 ml-2 animate-in fade-in duration-300">
          <LanguageSelector />
        </div>
      {/if}
    </section>

    <button
      class="md:hidden p-2 text-white"
      on:click={toggleMenu}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
    >
      <div class="space-y-1.5">
        <span
          class="block w-6 h-0.5 bg-current transition-transform {mobileMenuOpen
            ? 'rotate-45 translate-y-2'
            : ''}"
        ></span>
        <span class="block w-6 h-0.5 bg-current {mobileMenuOpen ? 'opacity-0' : ''}"></span>
        <span
          class="block w-6 h-0.5 bg-current transition-transform {mobileMenuOpen
            ? '-rotate-45 -translate-y-2'
            : ''}"
        ></span>
      </div>
    </button>
  </nav>

  {#if mobileMenuOpen}
    <div
      transition:slide={{ duration: 300, easing: quintOut }}
      class="md:hidden absolute top-full left-0 w-full bg-black/95 text-white border-b border-neutral-800 shadow-xl"
    >
      <ul class="flex flex-col p-6 gap-4">
        {#each links as link}
          <li>
            <a href={link.href} class="text-lg font-medium block" on:click={toggleMenu}>
              {link.name}
            </a>
          </li>
        {/each}
        <section class="flex items-center gap-6 mt-4 pt-4 border-t border-neutral-800">
          <a href="https://github.com/azurajs/azura"
            ><Icon icon="simple-icons:github" width="24" /></a
          >
          <a href="/discord"><Icon icon="simple-icons:discord" width="24" /></a>
          <a href="https://www.npmjs.com/package/azurajs"
            ><Icon icon="simple-icons:npm" width="24" /></a
          >
        </section>
      </ul>
    </div>
  {/if}
</header>
