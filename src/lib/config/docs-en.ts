export const docsConfig = {
  framework: [
    {
      title: "Getting Started",
      items: [
        { title: "Welcome to AzuraJS", slug: "introduction" },
        { title: "Installation", slug: "framework/getting-started/installation" },
        { title: "Quick Start", slug: "framework/getting-started/quick-start" },
        { title: "Usage with JavaScript", slug: "framework/getting-started/usage-with-javascript" },
        { title: "Configuration", slug: "framework/getting-started/configuration" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { title: "Controllers", slug: "framework/concepts/controllers" },
        { title: "Routing", slug: "framework/concepts/routing" },
        { title: "Decorators", slug: "framework/concepts/decorators" },
        { title: "Middleware", slug: "framework/concepts/middleware" },
        { title: "Request & Response", slug: "framework/concepts/http" },
      ],
    },
    {
      title: "Features",
      items: [
        { title: "Validation", slug: "framework/features/validation" },
        { title: "Cookies", slug: "framework/features/cookies" },
        { title: "Logger", slug: "framework/features/logger" },
        { title: "CORS (Cross-Origin Resource Sharing)", slug: "framework/features/cors" },
        { title: "Rate Limiting", slug: "framework/features/rate-limiting" },
        { title: "Proxy", slug: "framework/features/proxy" },
        { title: "Cluster Mode", slug: "framework/features/cluster-mode" },
        { title: "Error Handling", slug: "framework/features/error-handling" },
        { title: "Swagger / OpenAPI", slug: "framework/features/swagger" },
      ],
    },
    {
      title: "Advanced",
      items: [
        { title: "Custom Servers", slug: "framework/advanced/custom-servers" },
        { title: "Type Extensions", slug: "framework/advanced/type-extensions" },
        { title: "Modular Imports", slug: "framework/advanced/modular-imports" },
        { title: "TypeScript Support", slug: "framework/advanced/typescript-support" },
      ],
    },
  ],
  cdn: [
    {
      title: "Edge Network",
      items: [
        { title: "AzuraJS CDN", slug: "cdn/edge-network/cdn-basics" },
        { title: "Caching Strategies", slug: "cdn/edge-network/caching-strategies" },
      ],
    },
  ],
};

export const frameworkOptions = [
  { id: "framework", label: "AzuraJS Framework", icon: "lucide:box" },
  { id: "cdn", label: "@azurajs/cdn", icon: "lucide:globe" },
];
