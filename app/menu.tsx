"use client";

export default function Menu() {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        backgroundColor: "#000",
        color: "#000",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <select
        defaultValue=""
        style={{
          padding: "5px",
          fontSize: "16px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
        onChange={(e) => {
          if (e.target.value) {
            window.location.href = e.target.value;
          }
        }}
      >
        <option value="" disabled>
          Select Page
        </option>
        <option value="/">Home</option>
        <option value="/grid">Play</option>
        <option value="/rules">Rules</option>
      </select>
    </div>
  );
}