/* eslint-disable @typescript-eslint/no-unused-vars */
// app/components/landing/components/Glowbot.tsx
"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Bounds, Environment } from "@react-three/drei";
import * as THREE from "three";

// --- Komponen untuk menggerakkan model berdasarkan mouse (Fixed Lag) ---
function MouseLook({ modelRef }: { modelRef: React.RefObject<THREE.Group> }) {
  const mousePos = useRef({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Pastikan kode hanya berjalan di client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (event: MouseEvent) => {
      // Pastikan window tersedia
      if (typeof window === "undefined") return;

      // Normalisasi posisi mouse dari -1 sampai 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Langsung update ref, tidak trigger re-render
      mousePos.current = { x, y };
    };

    // Throttle mouse events untuk performa
    let ticking = false;
    const throttledMouseMove = (event: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(event);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove, {
      passive: true,
      capture: false,
    });

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
    };
  }, [isClient]);

  // Gunakan useFrame untuk update yang smooth dan responsive
  useFrame(() => {
    if (modelRef.current) {
      // Target rotasi berdasarkan posisi mouse dari ref (tidak trigger re-render)
      const targetRotationY = mousePos.current.x * 0.5;
      const targetRotationX = -mousePos.current.y * 0.3;

      // Lerp yang lebih smooth dengan delta time awareness
      const lerpFactor = 0.12; // Sedikit lebih tinggi untuk responsivitas

      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        lerpFactor
      );

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        lerpFactor
      );
    }
  });

  return null;
}

// --- Komponen untuk me-load model GLB ---
function Model() {
  const modelRef = useRef<THREE.Group>(null!);

  // Pastikan path ke modelmu sudah benar
  const { scene } = useGLTF("/3d-asset/techno-lion.glb");

  // Kita clone scene-nya agar bisa digunakan berkali-kali jika perlu
  // dan untuk menghindari mutasi objek asli
  const clonedScene = scene.clone();

  return (
    <>
      {/* 'primitive' digunakan untuk merender objek three.js yang kompleks seperti scene dari GLTF */}
      <primitive ref={modelRef} object={clonedScene} />
      {/* Komponen MouseLook kita panggil di sini, dan kita berikan ref dari modelnya */}
      <MouseLook modelRef={modelRef} />
    </>
  );
}

// --- Komponen Canvas utama ---
export default function TechnoLionCanvas() {
  const [isClient, setIsClient] = useState(false);

  // Pastikan komponen hanya render di client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Loading fallback saat masih di server-side
  if (!isClient) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        {/* Bisa diganti dengan loading spinner yang lebih menarik */}
        <div>Loading 3D Model...</div>
      </div>
    );
  }

  return (
    <Canvas
      style={{ touchAction: "none" }} // untuk interaksi di mobile
      camera={{ position: [0, 0, 5], fov: 45 }} // Atur posisi & fov kamera
      gl={{
        alpha: true, // PENTING: ini membuat background canvas transparan
        antialias: true,
        powerPreference: "high-performance", // Optimasi performa
      }}
      dpr={Math.min(
        typeof window !== "undefined" ? window.devicePixelRatio : 1,
        2
      )} // Fix window undefined
      performance={{ min: 0.5 }} // Maintain minimum performance
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      {/* Lighting, sesuaikan intensity sesuai seleramu */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Environment map untuk refleksi yang lebih realistis */}
      <Environment preset="city" />

      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="gray" wireframe />
          </mesh>
        }
      >
        {/* Bounds akan otomatis nge-zoom dan memposisikan model agar pas di layar */}
        <Bounds fit clip observe margin={1.2}>
          <Model />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
