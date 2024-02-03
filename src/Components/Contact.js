import React from "react";
import Backflip from "../Transitions/Backflip";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { AccumulativeShadows, CameraControls, Environment, Lightformer, RandomizedLight } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import Aquarium from "./Uplevel/Aquerium";
import useLocalStorage from "use-local-storage";
const Contact = () => {

    const { t } = useTranslation();
    const [isDark] = useLocalStorage('isDark', false);

    return (
        <div>
            <div className="content-page contact">
                <motion.div
                    className="dragme"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {t("contact.dragme")}
                </motion.div>
                <div className="level3D">
                    <Canvas camera={{ position: [0, 70, 720], fov: 1.5 }} shadows>
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
                        <color attach="background" args={[isDark ? '#0a0a0a' : '#C7CFC7']} />
                        <Aquarium position={[-0.65, 0, 1]} rotation={[0, 0, 0]} scale={1} />
                        {/** Soft shadows */}
                        <AccumulativeShadows temporal frames={100} color="#e7c3fc" colorBlend={2} opacity={0.7} scale={60} position={[1, -5, 5]}>
                            <RandomizedLight amount={10} radius={20} ambient={0.1} intensity={3.5} position={[-2, 10, -5]} size={10} />
                        </AccumulativeShadows>
                        {/** Custom environment map */}
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
                        <CameraControls truckSpeed={0.1} dollySpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                    </Canvas>
                </div>
                <div className="content-title">
                    <motion.h1
                        className="title-page"
                        initial={{y: "100vh", x: "0vw"}}
                        animate={{y: "-20vh", x: "0vw"}}
                        exit={{y: "-100vh", x: "0vw"}}
                        transition={{ delay: 1, duration: 1, ease: 'easeOut'}}
                    >
                        {t('contact.contact')}
                    </motion.h1>
                </div>
                <div className="content-contact-info">
                    <motion.h2
                        className="email-info"
                        initial={{x: "-100vh"}}
                        animate={{x: "0vh"}}
                        exit={{x: "-100vh"}}
                        transition={{ duration: 2.5, ease: 'easeOut'}}
                    >
                        gsuskr2o@gmail.com
                    </motion.h2>
                    <motion.h2
                        className="phone-info"
                        initial={{x: "100vh"}}
                        animate={{x: "0vh"}}
                        exit={{x: "100vh"}}
                        transition={{ duration: 2.5, ease: 'easeOut'}}
                    >
                        55 4013 7688
                    </motion.h2>
                </div>
            </div>
            <div className="options-section">
                <motion.div
                    className="option-section"
                    initial={{y: "0vh"}}
                    animate={{y: "0vh"}}
                    exit={{y: "0vh"}}
                    transition={{ duration: .5, ease: 'easeOut'}}
                >
                    <Link className="nav-link" to="/work">
                        {t('main.work')}
                    </Link>
                </motion.div>
                <motion.div
                    className="option-section"
                    initial={{y: "0vh"}}
                    animate={{y: "0vh"}}
                    exit={{y: "0vh"}}
                    transition={{ duration: .5, ease: 'easeOut'}}
                >
                    <Link className="nav-link" to="/">
                        {t('main.home')}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Backflip(Contact);