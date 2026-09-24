import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getContributionCalendar } from "@/lib/github-contributions";
import { getMarketingMetrics } from "@/lib/marketing-metrics";
import { siteConfig } from "@/data/content";

export const runtime = "nodejs";

// The link preview mirrors the home page: the headline, three figures and the
// three-phone fan on the site's dark grid with the amber glow.
//
// Satori cannot decode webp, so public/og/ holds small JPEG copies of the App
// Store composites (2 center, 3 left, 4 right, 280px wide) and a grayscale
// 144px headshot, plus the Geist TTFs the card is set in.
const OG_DIR = join(process.cwd(), "public", "og");

async function dataUrl(file: string, type: string) {
  const buffer = await readFile(join(OG_DIR, file));
  return `data:${type};base64,${buffer.toString("base64")}`;
}

// 16846 -> "16.8K+": rounded down so the card never overstates the figure.
function thousands(value: number) {
  return `${Math.floor(value / 100) / 10}K+`;
}

const AMBER = "#fde68a";
const MUTED = "#a3a3a3";

export async function GET() {
  const [metrics, calendar, regular, semibold, mono, headshot, left, center, right] =
    await Promise.all([
      getMarketingMetrics(),
      getContributionCalendar(siteConfig.github.username),
      readFile(join(OG_DIR, "geist-regular.ttf")),
      readFile(join(OG_DIR, "geist-semibold.ttf")),
      readFile(join(OG_DIR, "geist-mono-regular.ttf")),
      dataUrl("headshot.jpg", "image/jpeg"),
      dataUrl("mfs-3.jpg", "image/jpeg"),
      dataUrl("mfs-2.jpg", "image/jpeg"),
      dataUrl("mfs-4.jpg", "image/jpeg"),
    ]);

  // Contributions are read live; "16.8K+" is the floor published on the site
  // (16,846 on 2026-09-23) for when GitHub's calendar cannot be read.
  const contributions = calendar ? thousands(calendar.total) : "16.8K+";

  const stats = [
    { value: metrics.metrics.arr.display, label: "ARR" },
    {
      value: metrics.metrics.paidSubscribersEver.display,
      label: "Active paid subscribers",
    },
    { value: contributions, label: "GitHub contributions in the last year" },
  ];

  // Fan geometry, in px: the center composite is FAN_H tall; the sides are 84%
  // of it, turned 6 degrees outward and tucked behind.
  const FAN_H = 400;
  const centerW = Math.round((FAN_H * 900) / 1948);
  const sideH = Math.round(FAN_H * 0.84);
  const sideW = Math.round((sideH * 900) / 1948);
  const fanCenterX = 935;
  const fanBottom = 545;

  const phone = {
    position: "absolute" as const,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 24px 48px rgba(0,0,0,0.55)",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          backgroundColor: "#050505",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          fontFamily: "Geist",
          color: "#ffffff",
        }}
      >
        {/* Glows: cyan top right, amber bottom left, amber behind the fan. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 90% 4%, rgba(34,211,238,0.16), transparent 42%), radial-gradient(circle at 4% 100%, rgba(251,191,36,0.20), transparent 48%), radial-gradient(circle at 78% 58%, rgba(251,191,36,0.20), transparent 36%)",
          }}
        />

        {/* Left column */}
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 0,
            bottom: 0,
            width: 620,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              alt=""
              src={headshot}
              width={60}
              height={60}
              style={{
                borderRadius: 16,
                border: "1px solid rgba(251,191,36,0.35)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 16,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 600 }}>Kaya Hickin</div>
              <div style={{ fontSize: 18, color: MUTED, marginTop: 2 }}>
                Co-founder &amp; CTO, MyFutureSelf
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 54,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            <div>I build consumer AI that</div>
            <div style={{ marginTop: 4 }}>changes behavior.</div>
          </div>

          <div style={{ display: "flex", marginTop: 40 }}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 198,
                  marginLeft: index === 0 ? 0 : 12,
                  padding: "16px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.045)",
                }}
              >
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 600,
                    color: AMBER,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "Geist Mono",
                    fontSize: 12,
                    color: MUTED,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    lineHeight: 1.35,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three-phone fan */}
        <img
          alt=""
          src={left}
          width={sideW}
          height={sideH}
          style={{
            ...phone,
            left: fanCenterX - sideW * 1.31,
            top: fanBottom - FAN_H * 0.05 - sideH,
            transform: "rotate(-6deg)",
            transformOrigin: "50% 100%",
            opacity: 0.86,
          }}
        />
        <img
          alt=""
          src={right}
          width={sideW}
          height={sideH}
          style={{
            ...phone,
            left: fanCenterX + sideW * 0.31,
            top: fanBottom - FAN_H * 0.05 - sideH,
            transform: "rotate(6deg)",
            transformOrigin: "50% 100%",
            opacity: 0.86,
          }}
        />
        <img
          alt=""
          src={center}
          width={centerW}
          height={FAN_H}
          style={{
            ...phone,
            left: fanCenterX - centerW / 2,
            top: fanBottom - FAN_H,
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
