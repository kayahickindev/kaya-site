import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { siteConfig } from "@/data/content";
export const runtime = "nodejs";
export const revalidate = 86400;
async function tryRead(path: string) {
  try {
    return await readFile(path);
  } catch {
    return null;
  }
}
export async function GET() {
  const root = process.cwd();
  const fonts = join(root, "src", "app", "opengraph-image", "fonts");
  const [regular, semibold, portrait] = await Promise.all([
    readFile(join(fonts, "Geist-Regular.ttf")),
    readFile(join(fonts, "Geist-SemiBold.ttf")),
    tryRead(join(root, "public", "hero", "tekapo-og.jpg")).then(
      (buffer) =>
        buffer ?? readFile(join(root, "public", "portraits", "kaya.jpg")),
    ),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#f6f5f1",
          color: "#121412",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 620,
            padding: "56px 52px 52px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: -0.5,
              color: "#0b7580",
            }}
          >
            kayahickin.com
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 108,
                fontWeight: 600,
                letterSpacing: -6,
                lineHeight: 0.92,
              }}
            >
              Kaya Hickin
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: -0.8,
                marginTop: 30,
              }}
            >
              Full-stack developer. AI builder. Founder.
            </div>
            <div
              style={{
                fontSize: 23,
                color: "#4d514c",
                marginTop: 16,
                lineHeight: 1.35,
              }}
            >
              Co-founder &amp; CTO of MyFutureSelf, a consumer AI company
              backed by Cintrifuse Capital.
            </div>
          </div>
          <div style={{ fontSize: 20, color: "#4d514c" }}>
            {siteConfig.availability}
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${portrait.toString("base64")}`}
          alt=""
          width={580}
          height={630}
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
