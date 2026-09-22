import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #a78bfa 100%)",
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: -0.5,
        color: "#f4f0fb",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      VL
    </div>,
    { ...size },
  );
}
