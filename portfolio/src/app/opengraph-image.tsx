import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const imgBuffer = readFileSync(path.join(process.cwd(), "public/hero.png"));
  const imgBase64 = `data:image/png;base64,${imgBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          gap: "60px",
        }}
      >
        {/* Profile photo */}
        <img
          src={imgBase64}
          width={380}
          height={380}
          style={{
            borderRadius: "50%",
            border: "6px solid #F5C518",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        {/* Text content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Gold accent bar */}
          <div
            style={{
              width: "70px",
              height: "5px",
              background: "#F5C518",
              borderRadius: "3px",
              marginBottom: "32px",
            }}
          />

          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Muhammad Taha
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#F5C518",
              marginBottom: "24px",
            }}
          >
            Applied Data Scientist &amp; Backend Systems Engineer
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "#888888",
              lineHeight: 1.5,
            }}
          >
            Building ML-powered backend systems — from data to deployment.
          </div>

          {/* Domain */}
          <div
            style={{
              marginTop: "40px",
              fontSize: 18,
              color: "#F5C518",
              opacity: 0.6,
            }}
          >
            muhammadtahatech.me
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
