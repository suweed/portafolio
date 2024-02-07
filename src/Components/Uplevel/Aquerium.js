import { Float, MeshTransmissionMaterial, useGLTF, useMask } from '@react-three/drei'
import React, { useLayoutEffect, useRef } from 'react'
import { animated, useSpring } from "@react-spring/three";
import useLocalStorage from "use-local-storage";
import { Koi } from './Koi'
import { SphereIcons } from "./SphereIcons";

const Aquerium = (props) => {

  const [isDark] = useLocalStorage('isDark', false);
  
  var aboutPage = false;
  if (window.location.pathname === "/about") {
      aboutPage = true;
  }

  return (
    <Aquariumglass>
        <group {...props}>
            <Float
                speed={2}
                rotationIntensity={2}
                floatIntensity={2}
            >
              <Koi />
              <SphereIcons />
            </Float>
            <mesh
                rotation={[-1.5, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[50, 50, 1, 1]} />
                <shadowMaterial color={aboutPage ? "#a56bf1" : isDark ? "#3b3a3b" : "transparent"} opacity={0.1} />
            </mesh>
        </group>
    </Aquariumglass>
  );
};

function Aquariumglass({ children, ...props }) {
    const ref = useRef()
    const { nodes } = useGLTF('./models/shapes-transformed.glb')
    const stencil = useMask(1, false)
    useLayoutEffect(() => {
      // Apply stencil to all contents
      ref.current.traverse((child) => child.material && Object.assign(child.material, { ...stencil }))
    }, [stencil])

    let contactPage = false;
    if (window.location.pathname === "/contact") {
      contactPage = true;
    }

    const sizeXAqueriumMediaQuery = () => {
      let scaleX = 3.5;

      if (window.innerWidth > 1500 && window.innerWidth < 1800) {
        scaleX = 6.8;
      } else if (window.innerWidth > 1800 && window.innerWidth < 2000) {
        scaleX = 12.5;
      } else if (window.innerWidth > 2000){
        scaleX = 15;
      }

      return scaleX;
    }

    let scaleAqueriumScreenX = contactPage ? 4.5 : sizeXAqueriumMediaQuery();
    let scaleAqueriumScreenY = window.innerWidth > 1500 ? 6.5 : 6.5;
    let scaleAqueriumScreenZ = window.innerWidth > 1500 ? 1 : 1;

    let scaleAqueriumX = 4;
    let scaleAqueriumY = 6;
    let scaleAqueriumZ = 6;

    let positionAquerium = [0, 0, 0];
    let rotationAquerium = [0, 0, 0];

    if (contactPage) {
      scaleAqueriumX = 1.5;
      scaleAqueriumY = 0.5;
      scaleAqueriumZ = 3;

      positionAquerium = [0, 0, 0.3];
      rotationAquerium = [0, 0, 0];
    }

    const { aqueriumMovements, aqueriumScale } = useSpring({
      from: {
        aqueriumMovements: [0, 3, 0],
        aqueriumScale: 0.8
      }, to: [
        {
          aqueriumMovements: [0, -0.5, 0],
          aqueriumScale: 1
        }
      ],
      config: {
        mass: 5,
        tension: 10,
        friction: 15,
      },
      loop: false
    });

    let scaleX = scaleAqueriumScreenX * scaleAqueriumX;
    let scaleY = scaleAqueriumScreenY * scaleAqueriumY;
    let scaleZ = scaleAqueriumScreenZ * scaleAqueriumZ;

    const propsMove = {
      position: contactPage ? aqueriumMovements : positionAquerium,
      scale: contactPage ? aqueriumScale : 1,
      rotation: rotationAquerium
    };

    return (
      <animated.group {...propsMove} dispose={null}>
        <mesh castShadow scale={[scaleX, scaleY, scaleZ]} geometry={nodes.Cube.geometry}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
          />
        </mesh>
        <group ref={ref}>{children}</group>
      </animated.group>
    )
}

export default Aquerium;