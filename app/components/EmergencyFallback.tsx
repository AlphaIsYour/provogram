// app//components/ModelLoader.tsx
"use client";

import { useEffect, useState } from "react";

// Fallback component tanpa Three.js sama sekali
export default function EmergencyFallback() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "2px solid white",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            borderRadius: "50%",
            animation: "pulse 2s infinite",
          }}
        />
      </div>

      <h2>WebGL Not Available</h2>
      <p>Your browser or device doesn&#39;t support WebGL properly.</p>
      <p>This could be due to:</p>
      <ul style={{ textAlign: "left", marginTop: "10px" }}>
        <li>Hardware acceleration is disabled</li>
        <li>Graphics drivers need updating</li>
        <li>Browser WebGL is disabled</li>
        <li>Insufficient GPU memory</li>
      </ul>

      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#4ecdc4",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Try Again
      </button>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
