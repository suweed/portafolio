
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

export function Koi(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/koi.gltf");
  const { actions, names } = useAnimations(animations, group);

  let contactPage = false;
  if (window.location.pathname === "/contact") {
    contactPage = true;
  }
  let aboutPage = false;
  if (window.location.pathname === "/about") {
    aboutPage = true;
  }

  useEffect(() => {
    actions[names[0]].reset().fadeIn(2).play();
  }, [actions, names])

  let movementDesktop = aboutPage ? 35 : -35;
  let movementMobile = aboutPage ? 25 : -25;
  let koiMovementOut = window.innerWidth > 1500 ? movementDesktop : movementMobile;

  const { koiMovements, koiRotation } = useSpring({
    from: {
      koiMovements: aboutPage ? [-25, 5, 15] : [25, 5, 15],
      koiRotation: aboutPage ? [0, -9, 0] : [0, -1, 0]
    }, to: [
      {
        koiMovements: aboutPage ? [-1, 5, 0] : [-1, 5, 0],
        koiRotation: aboutPage ? [0, -9, 0] : [0, 0, 0]
      },
      {
        koiMovements: aboutPage ? [koiMovementOut, -5, -4] : [koiMovementOut, -5, -4],
        koiRotation: aboutPage ? [0, -11, 0] : [0, 0, 0]
      }
    ],
    config: {
      mass: 5,
      tension: 10,
      friction: 15
    },
    loop: true
  });

  let koiMovementsStatic = [0.6, 0, -1];
  let koiRotationStatic = [0, 0, 0];

  return (
    <group ref={group} {...props} dispose={null}>
      <animated.group name="Scene" position={contactPage ? koiMovementsStatic : koiMovements} rotation={contactPage ? koiRotationStatic : koiRotation} scale={contactPage ? 1.4 : 0.8}>
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