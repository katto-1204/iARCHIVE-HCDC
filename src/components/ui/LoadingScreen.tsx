import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Smooth spring for the progress percentage
    const springProgress = useSpring(0, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                const diff = Math.random() * 15;
                return Math.min(prev + diff, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        springProgress.set(progress);
    }, [progress, springProgress]);

    // Explicitly typing variants to avoid lint errors
    const containerVariants = {
        initial: { clipPath: "inset(0% 0% 0% 0%)" },
        exit: {
            clipPath: "inset(0% 0% 100% 0%)",
            transition: {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1] as any,
                delay: 0.2
            }
        }
    };

    const textVariants = {
        initial: { opacity: 0, y: 40, rotateX: -90 },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: 0.2 + (i * 0.08),
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1] as any
            }
        })
    };

    const charVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: 1.5 + (i * 0.02),
                duration: 0.8,
                ease: "easeOut" as any
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
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(var(--loading-bg))] overflow-hidden"
                >
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Dynamic Glassmorphism Background */}
                    <motion.div
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[hsl(var(--loading-accent)/0.3)] blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 60, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[hsl(var(--primary)/0.4)] blur-[150px]"
                    />

                    <div className="relative flex flex-col items-center z-10">
                        {/* Shimmering Logo */}
                        <div className="flex items-baseline gap-1 mb-2">
                            {brandArray.map((char, i) => (
                                <motion.span
                                    key={`char-${i}`}
                                    custom={i}
                                    variants={textVariants}
                                    initial="initial"
                                    animate="animate"
                                    className={`text-6xl md:text-9xl font-black tracking-tighter ${char === 'i' ? 'text-[hsl(var(--loading-accent))]' : 'text-white'
                                        } drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]`}
                                    style={{ perspective: "1000px" }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        {/* Progress Percentage Display */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col items-center gap-4 mb-8"
                        >
                            <div className="text-white/20 font-mono text-xl md:text-2xl tracking-[0.5em] flex items-baseline">
                                <span>
                                    {Math.round(progress)}
                                </span>
                                <span className="text-xs ml-1">%</span>
                            </div>

                            {/* Ultra-refined Progress Line */}
                            <div className="h-[1px] w-64 md:w-96 bg-white/5 relative overflow-hidden">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: progress / 100 }}
                                    transition={{ ease: "easeOut", duration: 0.5 }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--loading-accent))] to-[hsl(var(--loading-accent))] origin-left"
                                />
                                <motion.div
                                    animate={{ left: `${progress}%` }}
                                    transition={{ ease: "easeOut", duration: 0.5 }}
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[hsl(var(--loading-accent))] blur-[8px] opacity-80"
                                />
                            </div>
                        </motion.div>

                        {/* Subtitle */}
                        <div className="flex gap-[1px] md:gap-[4px]">
                            {collegeArray.map((char, i) => (
                                <motion.span
                                    key={`college-${i}`}
                                    custom={i}
                                    variants={charVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 font-light whitespace-pre italic"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.3, y: 0 }}
                        transition={{ delay: 2.2 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2"
                    >
                        <div className="flex items-center gap-4 text-[7px] uppercase tracking-[0.8em] font-medium text-white/60">
                            <span>Authentication</span>
                            <div className="w-1 h-1 rounded-full bg-[hsl(var(--loading-accent))]" />
                            <span>Asset Mapping</span>
                            <div className="w-1 h-1 rounded-full bg-[hsl(var(--loading-accent))]" />
                            <span>Digital Vault</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
