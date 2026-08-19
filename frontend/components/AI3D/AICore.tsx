"use client";

import { Float, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function EnergyRing({
  rotation,
  speed,
  radius,
}: {
  rotation: [number, number, number];
  speed: number;
  radius: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;

    ringRef.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.018, 8, 48]} />

      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#6366f1"
        emissiveIntensity={2}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function CoreParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const particlePositions = new Float32Array(60 * 3);

    for (let i = 0; i < 60; i++) {
      const radius = 1.55 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      particlePositions[i * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);

      particlePositions[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return particlePositions;
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y += delta * 0.04;
  });

  return (
    <Points
      ref={particlesRef}
      positions={positions}
      stride={3}
    >
      <PointMaterial
        color="#a78bfa"
        size={0.025}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </Points>
  );
}

export default function AICore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (coreRef.current) {
      const targetX = state.pointer.y * 0.08;
      const targetY = state.pointer.x * 0.08;

      coreRef.current.rotation.x +=
        (targetX - coreRef.current.rotation.x) * 0.03;

      coreRef.current.rotation.y +=
        (targetY - coreRef.current.rotation.y) * 0.03;

      const pulse = 1 + Math.sin(time * 2) * 0.025;

      coreRef.current.scale.setScalar(pulse);
    }

    if (innerRef.current) {
      const pulse = 0.82 + Math.sin(time * 2.5) * 0.025;

      innerRef.current.scale.setScalar(pulse);
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        5 + Math.sin(time * 2) * 1.2;
    }
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.3}
    >
      <group>
        {/* Lightweight particles */}
        <CoreParticles />

        {/* Smaller energy rings */}
        <EnergyRing
          rotation={[Math.PI / 2, 0, 0]}
          speed={0.5}
          radius={1.35}
        />

        <EnergyRing
          rotation={[0, Math.PI / 3, 0]}
          speed={-0.35}
          radius={1.45}
        />

        <EnergyRing
          rotation={[Math.PI / 4, 0, Math.PI / 5]}
          speed={0.25}
          radius={1.55}
        />

        {/* Main AI Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.95, 32, 32]} />

          <meshStandardMaterial
            color="#4f46e5"
            emissive="#4338ca"
            emissiveIntensity={1.5}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Inner energy */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.95, 24, 24]} />

          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={2}
            transparent
            opacity={0.3}
            metalness={0.25}
            roughness={0.15}
          />
        </mesh>

        {/* Bright center */}
        <mesh scale={0.25}>
          <sphereGeometry args={[0.95, 16, 16]} />

          <meshBasicMaterial
            color="#e0e7ff"
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Lightweight glow */}
        <pointLight
          ref={lightRef}
          color="#8b5cf6"
          intensity={5}
          distance={4}
        />
      </group>
    </Float>
  );
}