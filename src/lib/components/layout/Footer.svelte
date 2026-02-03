<script lang="ts">
  import Icon from "@iconify/svelte";
  import azuraLogo from "$lib/assets/logo.png";
  import LegalModal from "$lib/components/ui/LegalModal.svelte";
  import ChangelogsModal from "$lib/components/ui/ChangelogsModal.svelte";

  const currentYear = new Date().getFullYear();

  let showLegalModal = false;
  let showChangelogsModal = false;
  let legalType: "privacy" | "terms" | "cookies" = "privacy";

  function openLegal(type: "privacy" | "terms" | "cookies") {
    legalType = type;
    showLegalModal = true;
  }

  function openChangelogs() {
    showChangelogsModal = true;
  }

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Documentation", href: "/docs" },
        { label: "Changelog", action: () => openChangelogs() },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Community", href: "/discord" },
        { label: "Help Center", href: "/help" },
        { label: "Partners", href: "/#partners" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", action: () => openLegal("privacy") },
        { label: "Terms of Service", action: () => openLegal("terms") },
        { label: "Cookie Policy", action: () => openLegal("cookies") },
      ],
    },
  ];
</script>

<footer class="relative border-t border-white/5 bg-[#020202] pt-16 pb-8 overflow-hidden">
  <div
    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-50 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full"
  ></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
      <div class="lg:col-span-2 flex flex-col gap-4">
        <div class="flex items-center gap-2 text-xl font-bold text-white">
          <img src={azuraLogo} alt="AzuraJS" class="w-8 h-8" />
          Azura<span class="font-light text-yellow-400">JS</span>
        </div>
        <p class="text-neutral-400 text-sm leading-relaxed max-w-xs">
          The modern backend framework for building scalable, high-performance APIs with TypeScript.
        </p>
        <div class="flex gap-4 mt-2">
          <a
            href="https://github.com/azurajs"
            class="text-neutral-400 hover:text-white transition-colors"
          >
            <Icon icon="simple-icons:github" width="20" />
          </a>
          <a href="/discord" class="text-neutral-400 hover:text-[#5865F2] transition-colors">
            <Icon icon="simple-icons:discord" width="20" />
          </a>
          <a
            href="https://twitter.com/azurajs"
            class="text-neutral-400 hover:text-[#1DA1F2] transition-colors"
          >
            <Icon icon="simple-icons:twitter" width="20" />
          </a>
        </div>
      </div>

      {#each footerLinks as column}
        <div class="flex flex-col gap-4">
          <h4 class="text-white font-semibold text-sm">{column.title}</h4>
          <ul class="flex flex-col gap-2">
            {#each column.links as link}
              <li>
                {#if "action" in link}
                  <button
                    on:click={link.action}
                    class="text-neutral-400 hover:text-yellow-200 text-sm transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                {:else}
                  <a
                    href={link.href}
                    class="text-neutral-400 hover:text-yellow-200 text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <div
      class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500"
    >
      <p>&copy; {currentYear} AzuraJS. Open Source under MIT License.</p>

      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Systems Normal</span>
        </div>
        <span>Built with Svelte & TypeScript</span>
      </div>
    </div>
  </div>

  <LegalModal bind:open={showLegalModal} type={legalType} />
  <ChangelogsModal bind:open={showChangelogsModal} />
</footer>
