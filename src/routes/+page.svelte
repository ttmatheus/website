<script>
  import SEO from "$lib/components/SEO.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import CodeCard from "$lib/components/ui/CodeCard.svelte";
  import FeatureCard from "$lib/components/ui/FeatureCard.svelte";
  import InstallTabs from "$lib/components/ui/InstallTabs.svelte";
  import PartnersSection from "$lib/components/ui/PartnersSection.svelte";
  import TestimonialsSection from "$lib/components/ui/TestimonialsSection.svelte";
  import Icon from "@iconify/svelte";
</script>

<SEO
  title="AzuraJS - Build Type-Safe APIs with Decorators for Node.js & Bun"
  description="The minimal, decorator-based framework for Node.js & Bun. Experience full type-safety without the boilerplate overhead. Build modern backend applications with ease."
/>

<Header />

<main class="page-wrapper">
  <div class="orchid-background"></div>

  <div class="relative z-10 flex flex-col w-full">
    <section class="w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:pb-32">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="flex flex-col gap-6 text-left">
          <h1 class="text-4xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            The Framework for <br />
            <span
              class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400"
            >
              modern backend
            </span> development.
          </h1>
          <p class="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Build high-performance, scalable APIs with TypeScript and Decorators. AzuraJS provides a
            seamless developer experience for the next generation of web services.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="/docs"
              class="bg-white text-black px-8 py-3.5 rounded-lg font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              Get Started <Icon icon="lucide:arrow-right" width="20" />
            </a>
            <a
              href="https://github.com/azurajs/azura"
              class="bg-white/5 text-white border border-white/10 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Icon icon="simple-icons:github" width="20" />
              GitHub
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-8 w-full">
          <CodeCard />
          <InstallTabs />
        </div>
      </div>
    </section>

    <section class="relative w-full pt-32 pb-24 border-t border-white/5">
      <div
        class="absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#050505]/80 to-[#000000]"
      ></div>
      <div class="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div class="grid-pattern"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <span
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-6 backdrop-blur-sm"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Features
          </span>

          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Why choose AzuraJS?
          </h2>
          <p class="text-neutral-400 text-lg">
            Built from the ground up to solve modern backend challenges. <br
              class="hidden md:block"
            />
            Everything you need for production, nothing you don't.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="High Performance"
            desc="Built on top of the fastest runtimes for maximum throughput and low latency."
          >
            <div slot="icon"><Icon icon="lucide:zap" width="24" class="text-yellow-400" /></div>
          </FeatureCard>
          <FeatureCard
            title="Decorator Based"
            desc="Clean, expressive syntax using standard TypeScript decorators for routing."
          >
            <div slot="icon"><Icon icon="lucide:code-2" width="24" class="text-blue-400" /></div>
          </FeatureCard>
          <FeatureCard
            title="Zero Dependencies"
            desc="Lightweight core. No bloat. We only use what's absolutely necessary."
          >
            <div slot="icon"><Icon icon="lucide:package" width="24" class="text-purple-400" /></div>
          </FeatureCard>
          <FeatureCard
            title="Type Safe"
            desc="First-class TypeScript support. Catch errors at build time, not runtime."
          >
            <div slot="icon">
              <Icon icon="lucide:shield-check" width="24" class="text-green-400" />
            </div>
          </FeatureCard>
          <FeatureCard
            title="Middleware Ready"
            desc="Compatible with the ecosystem middleware patterns you already know."
          >
            <div slot="icon"><Icon icon="lucide:layers" width="24" class="text-orange-400" /></div>
          </FeatureCard>
          <FeatureCard
            title="Platform Agnostic"
            desc="Write once, run anywhere. Fully compatible with Node.js, Bun, and Deno."
          >
            <div slot="icon"><Icon icon="lucide:cpu" width="24" class="text-pink-400" /></div>
          </FeatureCard>
        </div>
      </div>
    </section>

    <div class="relative w-full bg-[#000000] border-t border-white/5">
      <TestimonialsSection />
      <PartnersSection />
    </div>
  </div>
</main>

<Footer />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: "Inter", sans-serif;
    background-color: #000;
    color: white;
  }

  .page-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    overflow-x: hidden;
  }

  .orchid-background {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%);
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, transparent, black 20%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 90%, transparent);
  }
</style>
