import { error, type RequestHandler } from "@sveltejs/kit";
import satori from "satori";
import { html as toReactNode } from "satori-html";
import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

let fontRegular: Buffer;
let fontBold: Buffer;
let logoBuffer: Buffer;

function loadAssets() {
  if (!fontRegular) {
    const fontRegularPath = join(process.cwd(), "static", "fonts", "Inter-Regular.otf");
    const fontBoldPath = join(process.cwd(), "static", "fonts", "Inter-Bold.otf");
    fontRegular = readFileSync(fontRegularPath);
    fontBold = readFileSync(fontBoldPath);

    const logoPath = join(process.cwd(), "static", "logo-small.png");
    logoBuffer = readFileSync(logoPath);
  }
}

export const GET: RequestHandler = async ({ url }: { url: URL }) => {
  const title = url.searchParams.get("title") || "AzuraJS Documentation";
  const description = url.searchParams.get("description") || "";
  const category = url.searchParams.get("category") || "Documentation";
  const lang = url.searchParams.get("lang") || "en";
  const type = url.searchParams.get("type") || "typescript";

  try {
    loadAssets();

    const langBadge = lang === "pt" ? "Português" : "English";
    const typeBadge =
      type === "javascript" ? "JavaScript" : type === "guide" ? "Guide" : "TypeScript";

    const markup = toReactNode(`
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 60px; color: white; font-family: Inter;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 40px;">
          <div style="width: 64px; height: 64px; display: flex;"></div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 28px; font-weight: bold;">AzuraJS</span>
            <span style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px;">${category}</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; justify-content: center; gap: 20px;">
          <h1 style="font-size: 64px; font-weight: bold; line-height: 1.1; margin: 0; color: white;">
            ${title}
          </h1>
          ${description ? `<p style="font-size: 24px; color: #94a3b8; margin: 0; max-width: 900px; line-height: 1.5;">${description}</p>` : ""}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <span style="font-size: 18px; color: #64748b;">azura.js.org</span>
          <div style="display: flex; gap: 12px;">
            <div style="padding: 8px 16px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; color: #3b82f6; font-size: 14px; font-weight: 600;">
              ${typeBadge}
            </div>
            <div style="padding: 8px 16px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; color: #8b5cf6; font-size: 14px; font-weight: 600;">
              ${langBadge}
            </div>
          </div>
        </div>
      </div>
    `);

    const svg = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
    });

    // Converter SVG para PNG e compor a logo por cima usando Sharp
    const basePng = await sharp(Buffer.from(svg)).png().toBuffer();

    // Redimensionar logo para 64x64 e sobrepor na posição correta
    const logoResized = await sharp(logoBuffer).resize(64, 64, { fit: "contain" }).png().toBuffer();

    const png = await sharp(basePng)
      .composite([
        {
          input: logoResized,
          top: 60, // padding do container
          left: 60, // padding do container
        },
      ])
      .png()
      .toBuffer();

    return new Response(png as any, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Error generating OG image:", err);
    throw error(500, "Failed to generate image");
  }
};
