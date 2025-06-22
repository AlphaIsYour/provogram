/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import EmergencyFallback from "./EmergencyFallback";

// Check WebGL support
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

// Dynamic import dengan error handling
const Scene = dynamic(() => import("@/app/components/Scene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(255,255,255,0.3)",
          borderTop: "3px solid white",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "20px",
        }}
      />
      <p>Loading 3D Model...</p>
      <p style={{ fontSize: "12px", opacity: 0.7 }}>
        This may take a moment on slower devices
      </p>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  ),
});

export default function ModelLoader() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check WebGL support
    const supported = checkWebGLSupport();
    setWebglSupported(supported);

    // Monitor for context loss globally
    const handleContextLost = () => {
      console.warn("Global WebGL context lost detected");
      setContextLost(true);
    };

    // Listen for context lost events
    window.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      window.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  // Loading state
  if (webglSupported === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
        }}
      >
        Checking WebGL support...
      </div>
    );
  }

  // WebGL not supported
  if (!webglSupported) {
    return <EmergencyFallback />;
  }

  // Context lost - show retry option
  if (contextLost && retryCount < 3) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
          textAlign: "center",
        }}
      >
        <h3>WebGL Context Lost</h3>
        <p>The 3D renderer encountered an issue.</p>
        <button
          onClick={() => {
            setContextLost(false);
            setRetryCount((prev) => prev + 1);
          }}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Retry ({3 - retryCount} attempts left)
        </button>
      </div>
    );
  }

  // Too many retries - show fallback
  if (retryCount >= 3) {
    return <EmergencyFallback />;
  }

  // Normal Scene rendering
  try {
    return (
      <React.Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "white",
            }}
          >
            Loading 3D Scene...
          </div>
        }
      >
        <Scene />
      </React.Suspense>
    );
  } catch (error) {
    console.error("Scene rendering error:", error);
    return <EmergencyFallback />;
  }
}
