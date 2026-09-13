import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
export const runtime = "nodejs";
export async function GET() {
  const buffer = await readFile(
    join(process.cwd(), "public", "portraits", "kaya.jpg"),
  );
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        background: "#f5f4ef",
        color: "#20241f",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 610,
          padding: "60px 48px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 16, letterSpacing: 2, color: "#446347" }}>
          FOUNDER. FULL-STACK DEVELOPER.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, letterSpacing: -6, lineHeight: 1 }}>
            Kaya Hickin.
          </div>
          <div style={{ fontSize: 30, marginTop: 28 }}>
            I build AI for real life.
          </div>
          <div style={{ fontSize: 20, color: "#656a60", marginTop: 20 }}>
            Co-founder & CTO of MyFutureSelf.
          </div>
          <div style={{ fontSize: 20, color: "#656a60", marginTop: 8 }}>
            Backed by Cintrifuse Capital.
          </div>
        </div>
        <div style={{ fontSize: 16 }}>kayahickin.com ↗</div>
      </div>
      <img
        src={`data:image/jpeg;base64,${buffer.toString("base64")}`}
        alt="Kaya Hickin"
        width={590}
        height={630}
        style={{ objectFit: "cover" }}
      />
    </div>,
    { width: 1200, height: 630 },
  );
}
