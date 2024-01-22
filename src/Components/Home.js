import * as THREE from "three"
import React from "react";
import Backflip from "../Transitions/Backflip";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InkText } from "./InkText";
import { Canvas } from "@react-three/fiber";
import {  OrbitControls, useTexture } from '@react-three/drei'
import { Physics, useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import Aquarium from "./Uplevel/Aquarium";

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 1 })

const Home = () => {

    return (
        <div>
            <div className="content-page home">
                <div className="level3D">
                    <Canvas camera={{ position: [0, 150, 0], fov: 6 }} shadows>
                        <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} minAzimuthAngle={0} maxAzimuthAngle={0}  />
                        <ambientLight />
                        <directionalLight
                            position={[-1.5, 5, 1]}
                            castShadow
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                            shadow-camera-right={20}
                            shadow-camera-top={20}
                            shadow-camera-left={-20}
                            shadow-camera-bottom={-20}
                        />
                        <color attach="background" args={['#c6d5c6']} />
                        <group position={[0, 0, 0]}>
                            <Physics gravity={[0, 2, 0]} iterations={10}>
                                <Pointer />
                                <Clump image="images/react.png" />
                                <Clump image="images/magento.png" />
                            </Physics>
                        </group>
                        <Aquarium />
                    </Canvas>
                </div>
                <motion.h1
                    className="title-page textaligright"
                    initial={{y: "0vh", x: "-100vw"}}
                    animate={{y: "0vh", x: "0vw"}}
                    exit={{y: "0vh", x: "100vw"}}
                    transition={{ duration: .3, ease: 'easeOut'}}
                >
                    <InkText />
                </motion.h1>
                <motion.h1
                    className="title-page textalignleft"
                    initial={{y: "0vh", x: "100vw"}}
                    animate={{y: "0vh", x: "0vw"}}
                    exit={{y: "0vh", x: "-100vw"}}
                    transition={{ duration: .3, ease: 'easeOut'}}
                >
                    Developer
                </motion.h1>
            </div>
            <div className="options-section">
                <motion.div
                    className="option-section"
                    initial={{y: "0vh"}}
                    animate={{y: "0vh"}}
                    exit={{y: "0vh"}}
                    transition={{ duration: .5, ease: 'easeOut'}}
                >
                    <Link className="nav-link" to="/contact">
                        Contact
                    </Link>
                </motion.div>
                <motion.div
                    className="option-section"
                    initial={{y: "0vh"}}
                    animate={{y: "0vh"}}
                    exit={{y: "0vh"}}
                    transition={{ duration: .5, ease: 'easeOut'}}
                >
                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
    // const { outlines } = useControls({ outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 } })
    const texture = useTexture(props.image)
    const [ref, api] = useSphere(() => ({ args: [1], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }))
    useFrame((state) => {
    //   for (let i = 0; i < 1; i++) {
        // Get current whereabouts of the instanced sphere
        ref.current.getMatrixAt(0, mat)
        // Normalize the position and multiply by a negative force.
        // This is enough to drive it towards the center-point.
        api.at(0).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0, 0, 0])
    //   }
    })
    return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[sphereGeometry, baubleMaterial, 1]} material-map={texture}>
        {/* <Outlines thickness={outlines} /> */}
      </instancedMesh>
    )
}

function Pointer() {
    const viewport = useThree((state) => state.viewport)
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }))
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}

export default Backflip(Home);