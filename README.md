# AzurJS Website

> Repositório do website oficial do AzurJS, construído com [Next.js](https://nextjs.org/) e [Fumadocs](https://fumadocs.dev/).

---

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Contribuir](#como-contribuir)
- [Saiba Mais](#saiba-mais)

---

## Sobre o Projeto

Este projeto é responsável pelo site de documentação e landing page do AzurJS. Utiliza Next.js para o frontend e Fumadocs para gerenciamento de conteúdo em MDX.

## Como Rodar Localmente

Clone o repositório e instale as dependências:

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

Abra http://localhost:3000 no seu navegador para visualizar o site.

## Estrutura do Projeto

- `src/lib/source.ts`: Adaptador para fonte de conteúdo. Veja [`loader()`](https://fumadocs.dev/docs/headless/source-api) para detalhes.
- `src/lib/layout.shared.tsx`: Opções compartilhadas de layout.
- `src/app/(home)`: Landing page e páginas institucionais.
- `src/app/docs`: Layout e páginas de documentação.
- `src/app/api/search/route.ts`: Handler de busca.
- `content/`: Documentação em MDX, organizada por idioma.

## Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "feat: minha contribuição"
   ```
4. Envie para seu fork:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request detalhando suas mudanças.

**Dicas:**
- Siga o padrão de código do projeto.
- Sempre descreva claramente o que foi alterado.
- Se possível, adicione testes ou exemplos.

## Saiba Mais

- [Documentação Next.js](https://nextjs.org/docs) — Recursos e API do Next.js
- [Tutorial Interativo Next.js](https://nextjs.org/learn)
- [Fumadocs](https://fumadocs.dev) — Documentação do Fumadocs
