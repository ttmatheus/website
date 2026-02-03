<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Icon from "@iconify/svelte";

  import video1 from "$lib/assets/videos/create-api.mp4";

  function getYoutubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function getYoutubeThumbnail(url: string) {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
  }

  function getYoutubeEmbed(url: string) {
    const id = getYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
  }

  const tutorials = [
    {
      id: 1,
      type: "local",
      title: "Criei uma API REST em MINUTOS com esse novo framework 😳⚡",
      description:
        "🔥 Crie APIs REST em minutos com AzuraJS!\n\nNeste vídeo, você vai aprender a construir uma API REST completa de forma rápida, organizada e escalável usando o novo framework AzuraJS — focado em produtividade, simplicidade e performance.\n\nDo zero ao deploy-ready: estrutura de projeto, rotas, controllers, middlewares, tipagem, validações e boas práticas pra criar APIs modernas sem boilerplate inútil.\n\nAqui é produtividade real, não gambiarra 😈⚡",
      duration: "14:43",
      level: "Iniciante",
      src: video1,
    },
  ];

  let activeTutorial = tutorials[0];
  let videoElement: HTMLVideoElement | null = null;

  function playTutorial(tutorial: (typeof tutorials)[0]) {
    activeTutorial = tutorial;
    if (tutorial.type === "local" && videoElement) {
      videoElement.load();
      videoElement.play();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<SEO
  title="Tutorials & Video Guides"
  description="Learn AzuraJS through step-by-step tutorials and video guides. Build REST APIs, implement authentication, deploy applications, and master the framework."
/>

<div class="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
  <Header />

  <div class="fixed inset-0 z-0 pointer-events-none">
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"
    ></div>
  </div>

  <main class="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Video Tutorials</h1>
      <p class="text-neutral-400 text-lg max-w-2xl mx-auto">
        Watch and learn how to build scalable APIs with AzuraJS directly from the core team.
      </p>
    </div>

    <section class="mb-16">
      <div
        class="relative w-full rounded-2xl overflow-hidden bg-[#050505] border border-white/10 shadow-2xl ring-1 ring-white/5 aspect-video group"
      >
        {#if activeTutorial.type === "local"}
          <video bind:this={videoElement} controls autoplay class="w-full h-full object-cover">
            <source src={activeTutorial.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        {:else}
          <iframe
            src={getYoutubeEmbed(activeTutorial.src)}
            title={activeTutorial.title}
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        {/if}

        <div
          class="absolute top-0 left-0 right-0 p-6 bg-linear-to-b from-black/80 to-transparent pointer-events-none"
        >
          <div class="flex items-center gap-3">
            <span
              class="px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold uppercase tracking-wide"
            >
              Now Playing
            </span>
            <h2 class="text-lg font-bold text-white text-shadow-sm">
              {activeTutorial.title}
            </h2>
          </div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each tutorials as tutorial}
        <button
          on:click={() => playTutorial(tutorial)}
          class="group flex flex-col text-left rounded-xl bg-[#0A0A0A] border border-white/5 overflow-hidden hover:border-blue-500/50 hover:bg-[#0f0f0f] transition-all duration-300 relative
          {activeTutorial.id === tutorial.id
            ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black'
            : ''}"
        >
          <div class="relative w-full aspect-video bg-neutral-900 overflow-hidden">
            {#if tutorial.type === "local"}
              <video
                src={tutorial.src}
                class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                preload="metadata"
                muted
                playsinline
                on:mouseenter={(e) => (e.target as HTMLVideoElement).play()}
                on:mouseleave={(e) => {
                  (e.target as HTMLVideoElement).pause();
                  (e.target as HTMLVideoElement).currentTime = 0;
                }}
              ></video>
            {:else}
              <img
                src={getYoutubeThumbnail(tutorial.src)}
                alt={tutorial.title}
                class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              />
              <div
                class="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#FF0000] text-white text-[10px] font-bold uppercase flex items-center gap-1"
              >
                <Icon icon="simple-icons:youtube" width="12" />
                YouTube
              </div>
            {/if}

            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-lg"
              >
                <Icon icon="lucide:play" class="text-white fill-white ml-1" width="20" />
              </div>
            </div>

            <span
              class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-xs font-mono text-white border border-white/10"
            >
              {tutorial.duration}
            </span>

            {#if activeTutorial.id === tutorial.id}
              <div class="absolute inset-0 bg-blue-500/20 flex items-center justify-center z-10">
                <span class="text-xs font-bold uppercase tracking-widest text-white drop-shadow-md"
                  >Playing</span
                >
              </div>
            {/if}
          </div>

          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-blue-400">{tutorial.level}</span>
            </div>
            <h3
              class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1"
            >
              {tutorial.title}
            </h3>
            <p class="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-4 flex-1">
              {tutorial.description}
            </p>
            <div
              class="flex items-center gap-2 text-xs text-neutral-400 group-hover:text-white transition-colors"
            >
              <Icon icon="lucide:monitor-play" width="14" />
              <span>Watch Tutorial</span>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </main>

  <Footer />
</div>
