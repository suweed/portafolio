
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { Catbiscuit } from './Catbiscuit';

export const SphereIcons = () => {

    let homePage = false;
    if (window.location.pathname === "/") {
        homePage = true;
    }
    
    var aboutPage = false;
    if (window.location.pathname === "/about") {
        aboutPage = true;
    }

    let contactPage = false;
    if (window.location.pathname === "/contact") {
        contactPage = true;
    }

    var characteristics = [
        {
            position: contactPage ? [-1.00008, 0, 2.8] : [-1.00008, -0.00008, 0.46303],
            rotation: aboutPage ? [-Math.PI / 1.3, -5, -1.2] : contactPage ? [-Math.PI / 1.3, -5, -1.2] : [-Math.PI / 1, -1, -1.2],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/react.png')
        },
        {
            position: [-1.301, -3.00008, -1.26303],
            rotation: aboutPage ? [-Math.PI / 1, -1, -2.8] : contactPage ? [-Math.PI / 2, 2, -4.8] : [-Math.PI / 1, -1, -1.8],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/css3.png')
        },
        {
            position: contactPage ? [-5.501, -0.5, -2.26303] : aboutPage ? [-2.501, 1.8, -2.26303] : [-3.001, -0.00008, -1.26303],
            rotation: aboutPage ? [-Math.PI / 1.5, 4, -2.5] : contactPage ? [-Math.PI / -1.5, -4, -1.8] : [-Math.PI / 1, -3, -1.5],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/js.png')
        },
        {
            position: contactPage ? [-3.001, -2.5000, 1.56303] : [-3.001, -0.5000, 0.56303],
            rotation: aboutPage ? [-Math.PI / 2.7, -3, -1.5] : contactPage ? [-3, 6, 3.2] : [-Math.PI / 1, -3, -1.5],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/html5.png')
        },
        {
            position: contactPage ? [2.001, -0.5000, 2.56303] : [1.001, -0.5000, 0.56303],
            rotation: aboutPage ? [-Math.PI / 2, 3, -1.5] : contactPage ? [-Math.PI / 2, -3, 3.4] : [-Math.PI / 1, -3, -1.5],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/magento.png')
        },
        {
            position: [-0.301, -2.5000, 1.86303],
            rotation: aboutPage ? [-Math.PI / 3, -2, -1.7] : [-Math.PI / 1, -2, -1.7],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/php.png')
        },
        {
            position: [1.20, -3.5000, -1.00],
            rotation: aboutPage ? [-Math.PI / -1.7, 5, 2] : [-Math.PI / -6, 5.3, 2],
            scale: 0.8,
            texture: useLoader(THREE.TextureLoader, './images/icons/mysql.png')
        }
    ]

    const widthScreenTablet = window.innerWidth < 768 && window.innerWidth > 480;
    const widthScreenMobile = window.innerWidth < 480;

    let ballsScaleFrom = 0;
    let ballsScaleTo = 1;
    let positionBalls = [6, 0, -4];

    if (homePage) {
        positionBalls = widthScreenMobile ? [1, -5, 0] : [6, 0, -4];
    }
    
    if (contactPage) {
        ballsScaleTo = 0.8;
        positionBalls = [1.5, 0, -1]
    }

    if (aboutPage) {
        ballsScaleTo = 0.8;
        positionBalls = widthScreenTablet ? [3, 0, -4] : widthScreenMobile ? [2, 0, -4] : [8, -3, 0];
    }

    const { ballsScale } = useSpring({
        from: {
            ballsScale: ballsScaleFrom,
        }, to: [
          {
            ballsScale: ballsScaleFrom,
          },
          {
            ballsScale: ballsScaleTo,
          }
        ],
        config: {
          mass: 5,
          tension: 10,
          friction: 15,
          duration: 700
        },
        loop: false
    });

    return (
        <animated.group position={positionBalls} scale={ballsScale}>
            {
                characteristics.map((characteristic, index) => {
                    return <mesh key={index} position={characteristic.position} rotation={characteristic.rotation} scale={characteristic.scale}>
                                <sphereGeometry attach="geometry" args={[1.26068]} />
                                <meshStandardMaterial map={characteristics[index].texture} attach="material" />
                            </mesh>
                })
            }
            <Catbiscuit
                position={aboutPage ? [2, 2, 0] : contactPage ? [0, 0, -2] : [2, -10, 0]}
                scale={[0.03, 0.03, 0.03]}
                rotation={aboutPage ? [2, -2, 1.2] : [-0.55, -0.45, 0.2]} />
        </animated.group>
    )
}

export default SphereIcons;