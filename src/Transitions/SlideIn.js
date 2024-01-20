import { motion } from "framer-motion";

const SlideIn = (OgComponent) => {

    return () => (
        <div className="page">
            <OgComponent />
            <motion.div
                className="slide-in"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                    <p className="text" style={{ color: "white" }}>hola?</p>
            </motion.div>
        </div>
    );
}

export default SlideIn;