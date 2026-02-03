<script lang="ts">
  import { page } from "$app/stores";

  export let title: string;
  export let description: string;
  export let image: string | undefined = undefined;
  export let imageAlt: string | undefined = undefined;
  export let type: "website" | "article" = "website";
  export let noindex: boolean = false;
  export let canonical: string | undefined = undefined;

  const siteUrl = "https://canary-azurajs.discloud.app";
  const siteName = "AzuraJS";
  const twitterHandle = "@azurajs";
  
  $: fullTitle = title.includes("AzuraJS") ? title : `${title} | AzuraJS`;
  $: ogImage = image || `${siteUrl}/azurajs-banner.png`;
  $: ogImageAlt = imageAlt || "AzuraJS Framework";
  $: canonicalUrl = canonical || `${siteUrl}${$page.url.pathname}`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content={ogImage} />
  {#if type === "article"}
    <meta property="article:author" content={siteName} />
  {/if}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={ogImageAlt} />
  <meta name="twitter:creator" content={twitterHandle} />
</svelte:head>
