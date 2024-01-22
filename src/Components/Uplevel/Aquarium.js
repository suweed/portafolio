import { Float, MeshTransmissionMaterial, useGLTF, useMask } from '@react-three/drei'
import React, { useLayoutEffect, useRef } from 'react'
import { Koi } from './Koi'

const Aquarium = () => {
    return (
        <Aquariumglass position={[0, 0.25, 0]}>
            <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <Float
                    speed={2}
                    rotationIntensity={1.8}
                    floatIntensity={2}
                >
                    <Koi />
                </Float>
                <mesh
                    rotation={[-1.5, 0, 0]}
                    position={[0, 0, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[50, 50, 1, 1]} />
                    <shadowMaterial transparent opacity={0.1} />
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

    //1879 970
    console.log(window.innerWidth, window.innerHeight);

    let scaleAquerium = window.innerWidth > 1500 ? 4.6 : 3.5;
    
    return (
      <group {...props} dispose={null}>
        <mesh castShadow scale={[scaleAquerium * 6, 6.5 * 6, 1 * 6]} geometry={nodes.Cube.geometry}>
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
      </group>
    )
}

export default Aquarium;