import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { useTranslation } from "react-i18next";
import Backflip from "../Transitions/Backflip";
import { InkText } from "./InkText";
import Aquarium from "./Uplevel/Aquerium";
import useLocalStorage from "use-local-storage";

const Home = () => {

    const { t } = useTranslation();
    const [isDark] = useLocalStorage('isDark', false);

    return (
        <div>
            <div className="content-page home">
                <div className="level3D">
                    <Canvas camera={{ position: [0, 150, 0], fov: 7 }} shadows>
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
                        <color attach="background" args={[isDark ? '#1e1e1e' : '#c6d5c6']} />
                        <Aquarium rotation={[Math.PI / 2.5, 0, 0]} />
                        <Environment resolution={1024}>
                            <group rotation={[-Math.PI / 3, 0, 0]}>
                            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                            {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                                <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
                            ))}
                            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
                            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
                            </group>
                        </Environment>
                    </Canvas>
                </div>
                <motion.h1
                    className="title-page textaligright"
                    initial={{y: "0vh", x: "-100vw"}}
                    animate={{y: "0vh", x: "0vw"}}
                    exit={{y: "0vh", x: "100vw"}}
                    transition={{ delay: 1, duration: 1.3, ease: 'easeOut'}}
                >
                    <InkText />
                </motion.h1>
                <motion.h1
                    className="title-page textalignleft"
                    initial={{y: "0vh", x: "100vw"}}
                    animate={{y: "0vh", x: "0vw"}}
                    exit={{y: "0vh", x: "-100vw"}}
                    transition={{ delay: 1, duration: 1.3, ease: 'easeOut'}}
                >
                    {t('home.developer')}
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
                        {t('main.contact')}
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
                        {t('main.about')}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Backflip(Home);