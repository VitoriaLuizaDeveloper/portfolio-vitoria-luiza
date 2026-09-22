import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #a78bfa 100%)",
        fontSize: 88,
        fontWeight: 700,
        letterSpacing: -2,
        color: "#f4f0fb",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      VL
    </div>,
    { ...size },
  );
}
