import React from "react";
import Backflip from "../Transitions/Backflip";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Work = () => {

    return (
        <div>
            <div className="content-page work">
                <motion.h1
                    className="title-page"
                    initial={{y: "0vh", x: "100vw"}}
                    animate={{y: "0vh", x: "0vw"}}
                    exit={{y: "0vh", x: "-100vw"}}
                    transition={{ duration: .3, ease: 'easeOut'}}
                >
                    Work
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
                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                </motion.div>
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
            </div>
        </div>
    );
};

export default Backflip(Work);