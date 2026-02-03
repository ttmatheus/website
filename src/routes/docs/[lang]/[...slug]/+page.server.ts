import fs from "node:fs";
import path from "node:path";

export const prerender = true;

export async function entries() {
  const base = path.resolve(`src/lib/content/`);
  
  const entries: Array<{ lang: string; slug: string }> = [];

  const languages = fs.readdirSync(base);
  
  for (const lang of languages) {
    const langPath = path.join(base, lang);
    
    if (!fs.statSync(langPath).isDirectory()) continue;
    
    const scanDirectory = (dir: string, prefix: string = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, prefix ? `${prefix}/${item}` : item);
        } else if (item.endsWith('.mdx')) {
          const slug = prefix ? `${prefix}/${item.replace('.mdx', '')}` : item.replace('.mdx', '');
          entries.push({ lang, slug });
        }
      }
    };
    
    scanDirectory(langPath);
  }

  return entries;
}
