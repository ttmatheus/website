<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    let lang = localStorage.getItem("azura-lang");

    if (!lang) {
      const browserLang = navigator.language || navigator.userLanguage;
      lang = browserLang.startsWith("pt") ? "pt" : "en";
    }

    goto(`/docs/${lang}/introduction`, { replaceState: true });
  });
</script>

<div class="flex items-center justify-center min-h-screen bg-black">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
</div>