<script lang="ts">
  export let title: string;
  export let desc: string;
</script>

<div
  class="group p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-white/10 hover:bg-neutral-900 transition-all duration-300"
  id="features"
>
  <div
    class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white"
  >
    <slot name="icon" />
  </div>
  <h3 class="text-lg font-semibold text-white mb-2">{title}</h3>
  <p class="text-sm text-neutral-400 leading-relaxed">{desc}</p>
</div>
