import { motion } from "framer-motion";

const Backflip = (OgComponent) => {

    const anim = (variants) => {
        return {
            initial: "initial",
            animate: "enter",
            transition: "transition",
            exit: "exit",
            variants
        }
    }

    const slide = {
        initial: {
            top: "400vh"
        },
        enter: {
            top: "400vh"
        },
        exit: {
            top: "0",
            transition: {
                duration: 2,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }

    const contentItems = {
        initial: {
            top: "100vh",
            opacity: 1,
        },
        enter: {
            opacity: 1,
        },
        exit: {
            opacity: 1,
            transition: {
                duration: 2,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }

    const perspective = {
        initial: {
            y: 0,
            scale: 1,
            opacity: 1
        },
        enter: {
            y: 0,
            scale: 1,
            opacity: 1
        },
        exit: {
            top: 100,
            scale: 0.9,
            opacity: 1.3,
            transition: {
                duration: 2.3,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }

    const itemsBackBack = [
        // TOP - flores arriba derecha
        {
            initial: {
                top: "-50%",
                left: "50%",
                rotate: "45deg",
                opacity: 1
            },
            enter: {
                top: "-50%",
                x: 100,
                opacity: 1
            },
            exit: {
                top: "-25%",
                opacity: 1,
                transition: {
                    duration: 2.5,
                    type: 'spring',
                    bounce: 0.55,
                }
            }
        },

        { // skull arriba centro
            initial: {
                top: "-33%",
                left: "10%",
                opacity: 1
            },
            enter: {
                top: "-33%",
                opacity: 1
            },
            exit: {
                top: "-41%",
                opacity: 1,
                transition: {
                    duration: 1.7,
                    ease: [0.76, 0, 0.24, 1]
                }
            }
        },

        // LEFT - mariposa azul izquierda
        {
            initial: {
                left: "20%",
                top: "20%",
                rotate: "-70deg",
                opacity: 1
            },
            enter: {
                left: "20%",
                top: "20%",
                rotate: "-50deg",
                opacity: 1
            },
            exit: {
                left: "-25%",
                scale: 5,
                opacity: 1,
                transition: {
                    duration: 2.8,
                    ease: [0.76, 0, 0.24, 1]
                }
            }
        },
    ]

    const itemsBack = [
        // TOP - flores arriba izquierda
        {
            initial: {
                top: "-72%",
                left: "-10%",
                rotate: "-50deg",
                opacity: 1
            },
            enter: {
                top: "-72%",
                opacity: 1
            },
            exit: {
                top: "-40%",
                opacity: 1,
                transition: {
                    duration: 2.5,
                    type: 'spring',
                    bounce: 0.55,
                }
            }
        },

        // LEFT - escarabajo rojo izquierda
        {
            initial: {
                left: "-20%",
                top: "30%",
                opacity: 1
            },
            enter: {
                left: "-20%",
                top: "30%",
                rotate: "70deg",
                opacity: 1
            },
            exit: {
                left: "15%",
                top: "10%",
                scale: 0.5,
                opacity: 1,
                transition: {
                    duration: 1.8,
                    ease: [0.76, 0, 0.24, 1]
                }
            }
        },

        // RIGHT - mariposa arriba derecha
        {
            initial: {
                left: "100%",
                top: "-5%",
                rotate: "240deg",
                scale: 0.5,
                opacity: 1
            },
            enter: {
                left: "100%",
                top: "-5%",
                opacity: 1,
                scale: 0.5,
            },
            exit: {
                left: "70%",
                top: "5%",
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 2.6,
                    ease: [0.76, 0, 0.24, 1]
                }
            }
        },
        { // esarabajo verde derecha
            initial: {
                left: "110%",
                top: "70%",
                rotate: "250deg",
                scale: 0.5,
                opacity: 1
            },
            enter: {
                left: "110%",
                top: "70%",
                rotate: "250deg",
                scale: 0.5,
                opacity: 1
            },
            exit: {
                left: "85%",
                opacity: 1,
                top: "20%",
                rotate: "390deg",
                scale: 1,
                transition: {
                    duration: 2,
                    ease: [0.76, 0, 0.24, 1]
                }
            }
        },

        // BOTTOM - tentaculos abajo
        {
            initial: {
                top: "120%",
                left: "0%",
                opacity: 1,
                scale: 1.4,
            },
            enter: {
                top: "120%",
                left: "0%",
                opacity: 1,
                scale: 1.4,
            },
            exit: {
                top: "-10%",
                left: "0%",
                opacity: 1,
                scale: 0.9,
                transition: {
                    duration: 2.1,
                    ease: [0.76, 0, 0.24, 1]
                }
            }
        }
    ]

    return () => (
        <div className="inner">
            <motion.div {...anim(slide)} className="slide" />

            <motion.div {...anim(contentItems)} className="content-items">
                {itemsBackBack.map((itemBackBack, index) => {
                    return (
                        <motion.div key={index} {...anim(itemBackBack)} className="itemBack" />
                    )
                })}
            </motion.div>

            <motion.div {...anim(perspective)} className="page">
                <OgComponent />
            </motion.div>
            
            <motion.div {...anim(contentItems)} className="content-items">
                {itemsBack.map((itemBack, index) => {
                    return (
                        <motion.div key={index} {...anim(itemBack)} className="item" />
                    )
                })}
            </motion.div>
        </div>
    );
}

export default Backflip;