<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  let showMenu = false;
  let currentLang = "en";

  const languages = [
    { code: "en", label: "English", icon: "emojione:flag-for-united-states" },
    { code: "pt", label: "Português", icon: "emojione:flag-for-brazil" }
  ];

  $: if ($page.params.lang) {
    currentLang = $page.params.lang;
  }

  function switchLanguage(langCode) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("azura-lang", langCode);
    }
    
    currentLang = langCode;
    showMenu = false;

    const path = $page.url.pathname;
    
    if (path.startsWith("/docs")) {
      const newPath = path.replace(/^\/docs\/[a-z]{2}/, `/docs/${langCode}`);
      goto(newPath);
    } else {
    }
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function handleClickOutside(event) {
    if (showMenu && !event.target.closest(".lang-selector")) {
      showMenu = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative lang-selector">
  <button
    on:click|stopPropagation={toggleMenu}
    class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-neutral-300 hover:text-white cursor-pointer"
  >
    <Icon icon="lucide:languages" width="16" />
    <span class="uppercase">{currentLang}</span>
    <Icon icon="lucide:chevron-down" width="12" class="opacity-50" />
  </button>

  {#if showMenu}
    <div
      class="absolute top-full right-0 mt-2 w-40 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 py-1"
    >
      {#each languages as lang}
        <button
          on:click={() => switchLanguage(lang.code)}
          class="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-left cursor-pointer
          {currentLang === lang.code ? 'text-blue-400 bg-blue-500/5' : 'text-neutral-400'}"
        >
          <Icon icon={lang.icon} width="16" />
          {lang.label}
          {#if currentLang === lang.code}
            <Icon icon="lucide:check" width="14" class="ml-auto" />
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>