import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import { join } from "path";

const mdxImports = `
    import Callout from '$lib/components/mdx/Callout.svelte';
    import Tabs from '$lib/components/mdx/Tabs.svelte';
    import Tab from '$lib/components/mdx/TabItem.svelte';
    import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
    import Icon from '@iconify/svelte';
`;

const config = {
  extensions: [".svelte", ".mdx"],

  preprocess: [
    {
      markup: ({ content, filename }) => {
        if (filename && filename.endsWith(".mdx")) {
          let newCode = content;

          if (content.trim().startsWith("---")) {
            const endOfFrontmatter = content.indexOf("---", 3);
            if (endOfFrontmatter !== -1) {
              const before = content.slice(0, endOfFrontmatter + 3);
              const after = content.slice(endOfFrontmatter + 3);
              newCode = `${before}\n<script>${mdxImports}</script>${after}`;
            }
          } else {
            newCode = `<script>${mdxImports}</script>\n${content}`;
          }

          return { code: newCode };
        }
      },
    },

    vitePreprocess(),
    mdsvex({
      extensions: [".mdx"],
      layout: {
        _: join(process.cwd(), "src/lib/components/mdx/MdxLayout.svelte"),
      },
      highlight: {
        highlighter: async (code, lang = "text") => {
          const highlighter = await createHighlighter({
            themes: ["github-dark", "github-dark-dimmed"],
            langs: [
              "javascript",
              "typescript",
              "tsx",
              "jsx",
              "bash",
              "sh",
              "json",
              "svelte",
              "html",
              "css",
              "scss",
              "yaml",
              "shell",
              "markdown",
              "python",
              "rust",
              "go",
            ],
          });
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "github-dark" }));
          return `<CodeBlock lang="${lang}">${html}</CodeBlock>`;
        },
      },
    }),
  ],

  kit: {
    adapter: adapter({
      out: "dist",
      precompress: false,
      envPrefix: "",
    }),
  },
};

export default config;
