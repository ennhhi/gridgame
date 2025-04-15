"use client";

import Link from "next/link";

export default function Rules() {
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
        fontSize: "20px",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <p>1. When you click on a square, the value in that square is added to all adjacent squares.</p>
      <p>2. The clicked square becomes 0.</p>
      <p>3. The goal is to make the whole grid 0.</p>
      <p>Good luck!</p>
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