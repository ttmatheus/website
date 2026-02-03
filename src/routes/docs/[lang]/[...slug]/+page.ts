import { error } from "@sveltejs/kit";

export async function load({ params }: { params: { lang: string; slug: string | string[] } }) {
  const { lang, slug } = params;

  const modules = import.meta.glob("/src/lib/content/**/*.mdx");

  let slugPath = Array.isArray(slug) ? slug.filter((s) => s && s.trim()).join("/") : slug;
  slugPath = slugPath.replace(/\/+$/, "");

  const path = `/src/lib/content/${lang}/${slugPath}.mdx`;

  if (!modules[path]) throw error(404, `Document not found: ${path}`);

  interface Metadata {
    title: string;
    description: string;
    date: string;
    author: string;
  }
  interface Post {
    default: string;
    metadata: Metadata;
  }

  const post: any = (await modules[path]()) as Post;

  return {
    content: post.default,
    meta: post.metadata,
    slug: slugPath,
    lang,
  };
}
