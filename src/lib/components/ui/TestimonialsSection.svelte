<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  interface Testimonial {
    user: string;
    name?: string;
    role?: string;
    avatar?: string;
    description: string;
  }

  let testimonials: Testimonial[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/azurajs/depoiments/refs/heads/main/depoiments.json",
      );
      const data = await res.json();
      testimonials = data.depoiments || [];
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    } finally {
      loading = false;
    }
  });
</script>

<section class="max-w-7xl mx-auto px-6 py-24">
  <div class="mb-12 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">What Developers Say</h2>
    <p class="text-neutral-400 max-w-xl mx-auto text-lg">
      See what developers are saying about their experience with AzuraJS.
    </p>
  </div>

  {#if loading}
    <div class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
      ></div>
      <p class="text-neutral-500 mt-4">Loading testimonials...</p>
    </div>
  {:else if testimonials.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each testimonials as testimonial}
        <div
          class="group p-6 rounded-xl bg-neutral-900/30 border border-white/5 hover:border-white/10 hover:bg-neutral-900 transition-all duration-300 flex flex-col h-full"
        >
          <div class="flex items-start gap-4 mb-4">
            {#if testimonial.avatar}
              <img
                src={testimonial.avatar}
                alt={testimonial.name || testimonial.user}
                class="w-12 h-12 rounded-full border-2 border-white/5 object-cover"
                on:error={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            {:else}
              <div
                class="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-white/5"
              >
                <Icon icon="lucide:user" class="text-neutral-400" width="20" />
              </div>
            {/if}

            <div class="flex-1">
              <h3 class="text-white font-semibold">{testimonial.name || testimonial.user}</h3>
              {#if testimonial.role}
                <p class="text-xs text-neutral-500">{testimonial.role}</p>
              {/if}
            </div>
            <Icon icon="lucide:quote" width="20" class="text-blue-500/30" />
          </div>

          <p class="text-sm text-neutral-300 leading-relaxed italic">
            "{testimonial.description}"
          </p>
        </div>
      {/each}
    </div>
  {/if}
</section>
