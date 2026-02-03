<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import logo from "$lib/assets/logo.png";
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="apple-touch-icon" href={logo} />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<slot />
