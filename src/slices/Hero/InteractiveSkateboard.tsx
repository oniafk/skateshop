"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Skateboard } from "@/components/Skateboard";

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

function Scene() {
  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <Skateboard />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}
