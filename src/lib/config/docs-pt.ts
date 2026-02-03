export const docsConfig = {
  framework: [
    {
      title: "Começando",
      items: [
        { title: "Bem-vindo ao AzuraJS", slug: "introduction" },
        { title: "Instalação", slug: "framework/comecando/instalacao" },
        { title: "Início Rápido", slug: "framework/comecando/inicio-rapido" },
        { title: "Uso com JavaScript", slug: "framework/comecando/uso-com-javascript" },
        { title: "Configuração", slug: "framework/comecando/configuracao" },
      ],
    },
    {
      title: "Conceitos Principais",
      items: [
        { title: "Controllers", slug: "framework/conceitos/controllers" },
        { title: "Roteamento", slug: "framework/conceitos/routing" },
        { title: "Decorators", slug: "framework/conceitos/decorators" },
        { title: "Middleware", slug: "framework/conceitos/middleware" },
        { title: "Request & Response", slug: "framework/conceitos/http" },
      ],
    },
    {
      title: "Recursos",
      items: [
        { title: "Validação", slug: "framework/recursos/validacao" },
        { title: "Cookies", slug: "framework/recursos/cookies" },
        { title: "Logger", slug: "framework/recursos/logger" },
        { title: "CORS (Cross-Origin Resource Sharing)", slug: "framework/recursos/cors" },
        { title: "Rate Limiting", slug: "framework/recursos/rate-limiting" },
        { title: "Proxy", slug: "framework/recursos/proxy" },
        { title: "Modo Cluster", slug: "framework/recursos/cluster-mode" },
        { title: "Tratamento de Erros", slug: "framework/recursos/error-handling" },
        { title: "Swagger / OpenAPI", slug: "framework/recursos/swagger" },
      ],
    },
    {
      title: "Avançado",
      items: [
        { title: "Servidores Customizados", slug: "framework/avancado/servidores-customizados" },
        { title: "Extensões de Tipo", slug: "framework/avancado/extensoes-de-tipo" },
        { title: "Importações Modulares", slug: "framework/avancado/importacoes-modulares" },
        { title: "Suporte TypeScript", slug: "framework/avancado/suporte-typescript" },
      ],
    },
  ],
  cdn: [
    {
      title: "Rede Edge",
      items: [
        { title: "AzuraJS CDN", slug: "cdn/rede-edge/cdn-basico" },
        { title: "Estratégias de Cache", slug: "cdn/rede-edge/estrategias-cache" },
      ],
    },
  ],
};

export const frameworkOptions = [
  { id: "framework", label: "AzuraJS Framework", icon: "lucide:box" },
  { id: "cdn", label: "@azurajs/cdn", icon: "lucide:globe" },
];
