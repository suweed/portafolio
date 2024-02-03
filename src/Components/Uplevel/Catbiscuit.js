import React from "react";
import { useGLTF } from "@react-three/drei";

export function Catbiscuit(props) {
  const { nodes, materials } = useGLTF("./models/catbiscuit.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.catbiiscuit.geometry}
        material={materials.wire_115115115}
        position={[0, 34.818, 0]}
        rotation={[-1.572, -0.006, -0.522]}
      />
    </group>
  );
}

useGLTF.preload("./models/catbiscuit.glb");