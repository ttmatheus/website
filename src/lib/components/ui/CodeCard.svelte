<script lang="ts">
  import Icon from "@iconify/svelte";

  const code = `import { AzuraClient } from 'azurajs';
import { Controller, Get, applyDecorators } from 'azurajs/decorators';

@Controller('/api')
class AppController {
  @Get('/hello')
  index() {
    return { message: 'Hello World!' };
  }
}

const app = new AzuraClient();
applyDecorators(app, [AppController]);
await app.listen(3000);
`;

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function highlight(src: string) {
    const tokenPattern =
      /\/\/.*$|\/\*[\s\S]*?\*\/|@[\w$]+|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:import|from|class|const|new|return|await|extends|function|interface|applyDecorators|Controller|Get)\b|\b[A-Z][A-Za-z0-9_]*\b/gm;
    let lastIndex = 0;
    let out = "";
    for (const m of src.matchAll(tokenPattern)) {
      const idx = m.index || 0;
      if (lastIndex < idx) {
        out += escapeHtml(src.slice(lastIndex, idx));
      }
      const token = m[0];
      if (/^\/\//.test(token) || /^\/\*/.test(token)) {
        out += `<span class="text-neutral-500">${escapeHtml(token)}</span>`;
      } else if (/^@/.test(token)) {
        out += `<span class="text-yellow-300">${escapeHtml(token)}</span>`;
      } else if (/^['"\`]/.test(token)) {
        out += `<span class="text-green-400">${escapeHtml(token)}</span>`;
      } else if (
        /\b(import|from|class|const|new|return|await|extends|function|interface|applyDecorators|Controller|Get)\b/.test(
          token,
        )
      ) {
        out += `<span class="text-purple-400">${escapeHtml(token)}</span>`;
      } else if (/^[A-Z]/.test(token)) {
        out += `<span class="text-blue-300">${escapeHtml(token)}</span>`;
      } else {
        out += escapeHtml(token);
      }
      lastIndex = idx + token.length;
    }
    if (lastIndex < src.length) {
      out += escapeHtml(src.slice(lastIndex));
    }
    return out;
  }

  const highlighted = highlight(code);
</script>

<main class="flex justify-center py-6">
  <div class="relative group w-full max-w-2xl">
    <div
      class="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700 pointer-events-none"
    ></div>

    <div
      class="relative rounded-xl border border-white/10 bg-[#0A0A0A]/95 shadow-2xl overflow-hidden backdrop-blur-sm"
    >
      <div class="flex items-center px-3 py-2 border-b border-white/5 bg-white/3">
        <div class="flex gap-2">
          <div class="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div class="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div class="mx-auto text-xs text-neutral-400 font-mono flex items-center gap-2">
          <Icon icon="lucide:code-2" width="12" />
          server.ts
        </div>
      </div>

      <div class="px-4 py-4 bg-[#0A0A0A]">
        <div class="w-full max-h-[60vh] overflow-auto rounded-md">
          <pre
            class="m-0 font-mono text-sm leading-6 text-blue-100/90 p-3 whitespace-pre-wrap wrap-break-words">
            <code>{@html highlighted}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  pre {
    margin: 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
    white-space: pre-wrap;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    display: block;
    line-height: 1.45;
    word-break: break-word;
    padding: 0;
  }

  @media (min-width: 768px) {
    .max-w-2xl {
      max-width: 48rem;
    }
  }
</style>
