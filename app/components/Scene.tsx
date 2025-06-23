/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/components/Scene.tsx
"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Bounds } from "@react-three/drei";
import * as THREE from "three";

// Component untuk handle WebGL context recovery
function WebGLContextManager() {
  const { gl } = useThree();
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (event: Event) => {
      console.warn("WebGL context lost, preventing default...");
      event.preventDefault();
      setContextLost(true);
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored!");
      setContextLost(false);
      // Force re-render
      window.location.reload();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl]);

  if (contextLost) {
    return (
      <mesh>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    );
  }

  return null;
}

// Mouse tracker component - tetap sama
function MouseLookTarget({
  modelRef,
}: {
  modelRef: React.RefObject<THREE.Group>;
}) {
  const { viewport, camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse coordinates to normalized device coordinates (-1 to 1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      // Fix direction logic - sekarang searah dengan mouse
      const targetRotationY = mouseRef.current.x * 0.3; // Horizontal look (hapus minus)
      const targetRotationX = -mouseRef.current.y * 0.2; // Vertical look (tambahin minus)

      // Lerp untuk smooth movement
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        0.05
      );

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return null;
}

// Simplified Model component dengan memory management ketat
function Model() {
  const modelRef = useRef<THREE.Group>(null as unknown as THREE.Group);
  const { scene, materials, nodes } = useGLTF("/foxy-optimized.glb");

  useEffect(() => {
    // Optimasi materials untuk mengurangi GPU memory
    Object.values(materials || {}).forEach((material: any) => {
      if (material.map) {
        // Kurangi texture resolution jika terlalu besar
        const texture = material.map;
        if (
          texture.image &&
          (texture.image.width > 1024 || texture.image.height > 1024)
        ) {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
        }
      }
    });

    return () => {
      // Aggressive cleanup
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }

      Object.values(materials || {}).forEach((material: any) => {
        if (material.dispose) material.dispose();
      });
    };
  }, [materials]);

  return (
    <>
      <primitive ref={modelRef} object={scene.clone()} />
      <MouseLookTarget modelRef={modelRef} />
    </>
  );
}

// Error fallback component
function ErrorFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="orange" wireframe />
    </mesh>
  );
}

// Safe Model wrapper
function SafeModel() {
  const [error, setError] = useState(false);

  try {
    if (error) return <ErrorFallback />;
    return <Model />;
  } catch (err) {
    console.error("Model loading error:", err);
    setError(true);
    return <ErrorFallback />;
  }
}

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block", // Prevent any spacing issues
      }}
      camera={{ position: [0, 0, 5], fov: 30 }}
      gl={{
        antialias: false, // Disable untuk save memory
        alpha: true, // Enable alpha untuk transparent background
        powerPreference: "default", // Ubah dari high-performance ke default
        preserveDrawingBuffer: false,
        stencil: false,
        depth: true,
        // PENTING: Batasi memory usage
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={
        typeof window !== "undefined"
          ? Math.min(window.devicePixelRatio, 1.5)
          : 1
      } // Batasi pixel ratio
      performance={{ min: 0.5 }} // Allow lower performance
      onCreated={({ gl, scene, camera }) => {
        // Set conservative renderer settings
        gl.setPixelRatio(
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 1.5)
            : 1
        );
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.8;

        // PENTING: Set clear color to transparent
        gl.setClearColor(0x000000, 0); // Transparent background

        // PENTING: Set memory management
        gl.info.autoReset = false;

        // Force garbage collection setiap 5 detik
        setInterval(() => {
          if (gl.info.memory) {
            console.log("WebGL Memory:", gl.info.memory);
          }
          gl.info.reset();
        }, 5000);

        // Monitor WebGL state
        const checkWebGLState = () => {
          const glContext = gl.getContext();
          if (glContext.isContextLost()) {
            console.error("WebGL context is lost!");
          }
        };

        setInterval(checkWebGLState, 1000);
      }}
    >
      <WebGLContextManager />

      {/* Simplified lighting untuk save GPU */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <Suspense
        fallback={
          <mesh>
            <sphereGeometry args={[0.5]} />
            <meshBasicMaterial color="gray" wireframe />
          </mesh>
        }
      >
        <Bounds fit clip observe margin={1.2}>
          <SafeModel />
        </Bounds>
      </Suspense>

      {/* OrbitControls dihapus! Sekarang model gak bisa diputar manual */}
    </Canvas>
  );
}
