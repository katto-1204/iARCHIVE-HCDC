
import { motion, useInView, Variant } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

const ScrollReveal = ({
    children,
    width = "100%",
    className,
    delay = 0.2,
    direction = "up",
    duration = 0.5,
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const variants: Record<string, Variant> = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
