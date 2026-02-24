import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const imgBuffer = readFileSync(path.join(process.cwd(), "public/hero.png"));
  const imgBase64 = `data:image/png;base64,${imgBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #F5C518",
        }}
      >
        <img src={imgBase64} width={32} height={32} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size }
  );
}
