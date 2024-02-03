import * as THREE from 'three'
import React, { useEffect, useRef, useState } from "react";
import { useRoute, useLocation } from 'wouter'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { easing } from 'maath'
import useLocalStorage from "use-local-storage";
import Experience from "./Experience";

const GOLDENRATIO = 1.61803398875
const widthScreenTablet = window.innerWidth < 768 && window.innerWidth > 480;
const widthScreenMobile = window.innerWidth < 480;

const images = [
  // Back
  {
    position: widthScreenTablet ? [-1, 0.7, 0] : widthScreenMobile ? [-0.6, 1, 0] : [-0.85, 0, -0.6],
    rotation: [0, 0, 0],
    scale: widthScreenTablet ? [1, 0.8, 1] : widthScreenMobile ? [0.7, 0.7, 1] : [1, 1, 1],
    name: "QBO",
    time: "feb - 2017 : may 2019",
    url: "./images/work/qbo.png",
    desc: ""
  },
  {
    position: widthScreenTablet ? [0.7, 0.7, 0] : widthScreenMobile ? [0.4, 1, 0] : [0.7, 0, -0.6],
    rotation: [0, 0, 0],
    scale: widthScreenTablet ? [1, 0.8, 1] : widthScreenMobile ? [0.7, 0.7, 1] : [1, 1, 1],
    name: "GAIA",
    time: "may - 2019 : dic 2023",
    url: "./images/work/gaia.png",
    desc: ""
  },
  // Left
  {
    position: widthScreenTablet ? [-1, -0.7, 0] : widthScreenMobile ? [-0.6, -.5, 0] : [-1.80, 0, 0.25],
    rotation: widthScreenTablet ? [0, 0, 0] : widthScreenMobile ? [0, 0, 0] : [0, Math.PI / 2.5, 0],
    scale: widthScreenTablet ? [1, 0.8, 1] : widthScreenMobile ? [0.7, 0.7, 1] : [1, 1, 1],
    name: "FREELANCE",
    time: "oct - 2014 : actualidad",
    url: "./images/work/freelance.png",
    desc: ""
    },
  // Right
  {
    position: widthScreenTablet ? [0.7, -0.7, 0] : widthScreenMobile ? [0.4, -0.5, 0] : [1.75, 0, 0.15],
    rotation: widthScreenTablet ? [0, 0, 0] : widthScreenMobile ? [0, 0, 0] : [0, -Math.PI / 2.5, 0],
    scale: widthScreenTablet ? [1, 0.8, 1] : widthScreenMobile ? [0.7, 0.7, 1] : [1, 1, 1],
    name: "PENGO",
    time: "jun - 2015 : oct 2016",
    url: "./images/work/pengo.png",
    desc: ""
  },
]

const Gallery = () => {
    return (
        <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 10] }}>
            <group position={[0, -1, 2.5]}>
                <Frames images={images} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} scale={widthScreenTablet || widthScreenMobile ? [0, 0, 0,] : [1, 1, 1]}>
                    <planeGeometry args={[15, 10]} />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        resolution={2048}
                        mixBlur={1}
                        mixStrength={10}
                        roughness={2}
                        depthScale={1.3}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.5}
                        color="#090909"
                        metalness={0.6}
                    />
                </mesh>
            </group>
            <Environment preset="city" />
        </Canvas>
    );
}

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()
    
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0.1, GOLDENRATIO / 1.7, 1.4))//posicion de las tarjetas activa
            clicked.current.parent.getWorldQuaternion(q)
        } else {
            p.set(0, 0, 5.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })

    function clickCard (e, clickedCurrent) {
        e.stopPropagation();
        let descExist = document.querySelector(".desc-selection-input").value;
        document.querySelector(".desc-selection-input").value = "";

        if (!descExist) {
            document.querySelector(".desc-selection").classList.remove("active");
        } else {
            document.querySelector(".desc-selection").classList.add("active");
        }

        setLocation(clickedCurrent === e.object ? '/work' : '/item/' + e.object.name)
    }

    function missClickCard () {
        document.querySelector(".desc-selection").classList.remove("active");
        setLocation('/work')
    }

    return (
        <group
            ref={ref}
            onClick={(e) => clickCard(e, clicked.current)}
            onPointerMissed={ missClickCard }>
            {images.map((props) => <Frame key={props.name} {...props} /> /* prettier-ignore */)}
        </group>
    )
}

function Frame({ url, name, c = new THREE.Color(), ...props }) {
    const image = useRef();
    const frame = useRef()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const [isDark] = useLocalStorage('isDark', false);

    const isActive = params?.id === name
    useCursor(hovered)
    useFrame((state, dt) => {
        image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        easing.damp3(image.current.scale, [
            0.85 * (!isActive && hovered ? 0.95 : 1),
            name === "GAIA" ?  0.9 * (!isActive && hovered ? 0.905 : 1) : 0.5 * (!isActive && hovered ? 0.905 : 1),
            1
        ],
        0.1, dt
        )
        easing.dampC(frame.current.material.color, hovered ? '#151533' : 'white', 0.1, dt)
    })

    return (
        <group {...props}>
            <mesh
                name={name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[1, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Image raycast={() => null} ref={image} position={[0, name === "GAIA" ? 0 : 0.2, 0.7]} scale={[0.9, 0.9, 0.9]} url={url} />
                {name !== "GAIA" ? (
                    <Experience name={name} position={name === "QBO" ? [-0.30, -0.255, 1] : name === "PENGO" ? [-0.1, -0.255, 1] : [-0.15, -0.255, 1]} scale={0.07} />
                ) : null}
            </mesh>
            <Text color={isDark ? '#C7CFC7' : '#0a0a0a'} maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.05}>
                {name}
            </Text>
            <Text color={isDark ? '#C7CFC7' : '#0a0a0a'} maxWidth={0.5} anchorX="left" anchorY="top" position={[0.55, 1.55, 0]} fontSize={0.025}>
                {props.time}
            </Text>
        </group>
    )
}

export default Gallery;