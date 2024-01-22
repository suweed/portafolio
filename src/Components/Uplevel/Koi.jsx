
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

export function Koi(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/koi.gltf");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions, names])

  let koiMovementOut = window.innerWidth > 1500 ? -35 : -25;

  const { koiMovements, koiRotation } = useSpring({
    from: {
      koiMovements: [25, 2, 15],
      koiRotation: [0, -1, 0]
    }, to: [
      {
        koiMovements: [-1, 2, 0],
        koiRotation: [0, 0, 0]
      },
      {
        koiMovements: [koiMovementOut, -5, -4],
        koiRotation: [0, 0, 0]
      }
    ],
    config: {
      mass: 5,
      tension: 10,
      friction: 15
    },
    loop: true
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <animated.group name="Scene" position={koiMovements} rotation={koiRotation} scale={0.6}>
        <mesh
          name="mesh_0"
          castShadow
          geometry={nodes.mesh_0.geometry}
          material={materials.SimplygonCastMaterial}
          morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
          morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
        />
      </animated.group>
    </group>
  );
}

useGLTF.preload("./models/koi.gltf");