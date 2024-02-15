import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Backflip from "../Transitions/Backflip";
import Gallery from "./Uplevel/Gallery";

const Work = () => {

    const { t } = useTranslation();
    const widthScreenMobile = window.innerWidth < 480;

    return (
        <div className="container-work">
            <div className="content-page work">
                <motion.h1
                    className="title-page"
                    initial={{y: widthScreenMobile ? "-43vh" : "-40vh", x: "100vw"}}
                    animate={{y: widthScreenMobile ? "-43vh" : "-40vh", x: "0vw"}}
                    exit={{y: widthScreenMobile ? "-43vh" : "-40vh", x: "-100vw"}}
                    transition={{ delay: 1.5, duration: 1.3, ease: 'easeOut'}}
                >
                    {t('work.experience')}
                </motion.h1>
                <div className="content-gallery">
                    <Gallery />
                </div>
                <div className="desc-selection" >
                    <div className="name-experience"></div>
                    <div className="desc-experience"></div>
                </div>
                <input type="hidden" className="desc-selection-input" name="desc-selection" readOnly />
            </div>
            <div className="options-section">
                <motion.div
                    className="option-section"
                    initial={{y: "10vh"}}
                    animate={{y: "-10vh"}}
                    exit={{y: "10vh"}}
                    transition={{ delay: 1.5, duration: .5, ease: 'easeOut'}}
                >
                    <Link className="nav-link" to="/about">
                        {t('main.about')}
                    </Link>
                </motion.div>
                <motion.div
                    className="option-section"
                    initial={{y: "10vh"}}
                    animate={{y: "-10vh"}}
                    exit={{y: "10vh"}}
                    transition={{ delay: 1.5, duration: .5, ease: 'easeOut'}}
                >
                    <Link className="nav-link" to="/contact">
                        {t('main.contact')}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Backflip(Work);