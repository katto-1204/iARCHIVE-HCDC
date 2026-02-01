import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        initial: { y: 0 },
        exit: {
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2
            }
        }
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5 + (i * 0.1),
                duration: 0.8,
                ease: [0.6, 0.01, -0.05, 0.95]
            }
        }),
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.4 }
        }
    };

    const lineVariants = {
        initial: { scaleX: 0 },
        animate: {
            scaleX: 1,
            transition: {
                delay: 1.2,
                duration: 1.5,
                ease: [0.6, 0.01, -0.05, 0.95]
            }
        }
    };

    const charVariants = {
        initial: { opacity: 0, y: 10 },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 2 + (i * 0.05),
                duration: 0.5
            }
        })
    };

    const brandName = "iARCHIVE";
    const brandArray = brandName.split("");
    const collegeName = "Holy Cross of Davao College";
    const collegeArray = collegeName.split("");

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    key="loading-screen"
                    variants={containerVariants}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#002B5B] overflow-hidden"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B31312]/20 blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#002B5B]/40 blur-[120px]"
                    />

                    <div className="relative flex flex-col items-center">
                        <div className="overflow-hidden flex items-baseline gap-1">
                            {brandArray.map((char, i) => (
                                <motion.span
                                    key={`char-${i}`}
                                    custom={i}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    className={`text-6xl md:text-8xl font-bold tracking-tighter ${char === 'i' ? 'text-[#B31312]' : 'text-white'}`}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            variants={lineVariants}
                            initial="initial"
                            animate="animate"
                            className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#B31312] to-transparent mt-4 mb-6"
                        />

                        <div className="flex gap-[2px]">
                            {collegeArray.map((char, i) => (
                                <motion.span
                                    key={`college-${i}`}
                                    custom={i}
                                    variants={charVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-medium whitespace-pre"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            className="text-[8px] uppercase tracking-[0.5em] text-white/20"
                        >
                            Initializing Digital Heritage
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
