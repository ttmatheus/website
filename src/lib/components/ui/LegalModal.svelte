<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";

  export let open = false;
  export let type: "privacy" | "terms" | "cookies" = "privacy";

  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
  };

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      on:click={close}
      on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") close();
      }}
      role="button"
      tabindex="0"
      aria-label="Close modal"
      transition:fade={{ duration: 200 }}
    ></div>

    <div
      class="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl flex flex-col"
      transition:scale={{ duration: 300, opacity: 0, start: 0.95, easing: quintOut }}
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md z-10"
      >
        <h2 class="text-xl font-bold text-white">{titles[type]}</h2>
        <button
          on:click={close}
          class="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Icon icon="lucide:x" width="20" />
        </button>
      </div>

      <div class="p-6 md:p-8 overflow-y-auto text-neutral-300 space-y-6 custom-scrollbar">
        {#if type === "privacy"}
          <div class="space-y-4">
            <p>
              At AzuraJS ("we", "our", or "us"), we respect your privacy and are committed to
              protecting the personal information you share with us.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">1. Information We Collect</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Usage Data:</strong> We may collect anonymous telemetry data regarding CLI usage
                to improve framework stability.
              </li>
            </ul>

            <h3 class="text-lg font-semibold text-white mt-6">2. How We Use Your Information</h3>
            <p class="text-sm">
              The information we collect is used solely for providing the AzuraJS framework,
              notifying you about updates, and monitoring usage patterns.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">3. Data Storage</h3>
            <p class="text-sm">
              We implement industry-standard security measures. Your data is stored on secure
              servers and we do not sell your personal information.
            </p>
          </div>
        {:else if type === "terms"}
          <div class="space-y-4">
            <p>
              By accessing or using the AzuraJS website, CLI, or framework, you agree to be bound by
              these Terms of Service.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">1. Open Source License</h3>
            <p class="text-sm">
              The AzuraJS core framework is open-source software licensed under the MIT License.
              Your use of the source code is governed by that license.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">2. Acceptable Use</h3>
            <p class="text-sm">
              You agree not to use the Service to violate laws, distribute malware, or disrupt the
              integrity of the Service.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">3. Disclaimer</h3>
            <p class="text-sm">
              The Service is provided on an "AS IS" basis. AzuraJS makes no warranties regarding
              reliability or availability.
            </p>
          </div>
        {:else if type === "cookies"}
          <div class="space-y-4">
            <p>
              This Cookie Policy explains how AzuraJS uses cookies and similar technologies to
              recognize you when you visit our website.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">1. Essential Cookies</h3>
            <p class="text-sm">
              These cookies are strictly necessary to provide you with services available through
              our website and to use some of its features.
            </p>

            <h3 class="text-lg font-semibold text-white mt-6">2. Analytics Cookies</h3>
            <p class="text-sm">
              We use these cookies to collect information about how users interact with our
              documentation to improve user experience.
            </p>
          </div>
        {/if}
      </div>

      <div class="p-4 border-t border-white/5 bg-[#0A0A0A] z-10 flex justify-end">
        <button
          on:click={close}
          class="px-6 py-2 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition-colors text-sm cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
