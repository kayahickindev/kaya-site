import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export async function GET() {
  const headshotPath = join(process.cwd(), "public", "headshot.jpg");
  const headshotBuffer = await readFile(headshotPath);
  const headshotBase64 = `data:image/jpeg;base64,${headshotBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "80px",
        }}
      >
        {/* Text side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingRight: "60px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#737373",
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
              marginBottom: "20px",
            }}
          >
            FOUNDER, BUILDER, OPERATOR
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Kaya Hickin
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#a3a3a3",
              lineHeight: 1.5,
            }}
          >
            Building MyFutureSelf. 19,000+ downloads. 1,200+ paying subscribers.
          </div>
        </div>

        {/* Headshot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={headshotBase64}
            width={280}
            height={280}
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              border: "2px solid #262626",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
