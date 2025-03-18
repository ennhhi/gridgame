"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
        color: "white",
        fontSize: "24px",
      }}
    >
      <h1>Welcome to the Grid Game!</h1>
      <Link href="/grid">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "20px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Play
        </button>
      </Link>
    </div>
  );
}
