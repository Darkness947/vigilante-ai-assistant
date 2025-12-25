'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundAnimations() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* 1. Animated Gradient Blob */}
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-zinc-800/10 blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 2. Second Gradient Blob */}
            <motion.div
                className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-zinc-900/10 blur-[120px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 3. Floating Particles (Client Only to avoid Hydration Error) */}
            {mounted && (
                <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-foreground rounded-full"
                            style={{
                                width: Math.random() * 4 + 1,
                                height: Math.random() * 4 + 1,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* 4. Grid overlay for "Tech" feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
    );
}
