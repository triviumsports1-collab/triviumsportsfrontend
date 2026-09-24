import { ImageResponse } from "next/og";

export const alt = "Trivium Sports — tennis coaches and U.S. clubs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0F1C16",
          padding: 72,
        }}
      >
        <div
          style={{
            color: "#5CB878",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Trivium Sports
        </div>
        <div
          style={{
            marginTop: 20,
            color: "#F4F7F4",
            fontSize: 64,
            fontWeight: 650,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Tennis coaches. U.S. clubs. Nothing else.
        </div>
      </div>
    ),
    { ...size },
  );
}
