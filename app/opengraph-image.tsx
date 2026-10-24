import { ImageResponse } from "next/og";

export const alt = "Morooj Sham Real Estate - مروج الشام العقارية";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only text: the OG renderer has no Arabic shaping without bundling a font.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F3D2E 0%, #14513d 100%)",
          color: "#C8A96A",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64" fill="none" stroke="#C8A96A" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 56V30C10 17 20 8 32 4c12 4 22 13 22 26v26" strokeWidth="3" />
          <path d="M19 38l13-10 13 10" strokeWidth="2.6" />
          <path d="M23 35v11h18V35" strokeWidth="2.2" />
          <path d="M6 56c8-5 16-6 26-3s18 2 26-2" strokeWidth="2.6" />
          <path d="M32 24c-4-3-5-8-3-12 4 2 6 7 3 12z" fill="#C8A96A" stroke="none" />
        </svg>
        <div style={{ fontSize: 76, fontWeight: 700, color: "white", marginTop: 24, letterSpacing: 2 }}>MOROOJ SHAM</div>
        <div style={{ fontSize: 30, letterSpacing: 10, marginTop: 8 }}>REAL ESTATE</div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.75)", marginTop: 36 }}>
          Farms · Villas · Apartments · Land — Rif Dimashq, Syria
        </div>
      </div>
    ),
    size,
  );
}
