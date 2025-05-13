"use client";

import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Skateboard } from "@/components/Skateboard";
import gsap from "gsap";

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

export function InteractiveSkateboard({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 55 }}
      >
        <Suspense>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  const containerRef = useRef<THREE.Group>(null);

  function onCLick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const board = containerRef.current;
    if (!board) return;

    const { name } = event.object;

    gsap
      .timeline()
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: "power2.out",
        delay: 0.26,
      })
      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: "power2.in",
      });

    gsap
      .timeline()
      .to(board.rotation, { x: -0.6, duration: 0.26, ease: "none" })
      .to(board.rotation, { x: 0.4, duration: 0.82, ease: "power2.in" })
      .to(board.rotation, { x: 0, duration: 0.12, ease: "none" });
  }

  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={containerRef} position={[-0.25, 0, -0.635]}>
        <group position={[0, -0.086, 0.635]}>
          <Skateboard
            wheelTextureURLs={[wheelTextureURL]}
            wheelTextureURL={wheelTextureURL}
            deckTextureURLs={[deckTextureURL]}
            deckTextureURL={deckTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
            constantWheelSpin
          />
        </group>
      </group>

      <mesh position={[0, 0.27, 0]} name="middle" onClick={onCLick}>
        <boxGeometry args={[0.6, 0.1, 2.2]} />
        <meshStandardMaterial visible={false} />
      </mesh>

      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}
