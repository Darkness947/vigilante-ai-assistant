'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Shield, Sparkles, Code2, Terminal, Cpu, Globe, Database, Server } from "lucide-react";
import Navbar from "./Navbar";
import { useLanguage } from "./LanguageContext";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function HomePageClient({ user }: { user: any }) {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Typewriter Text Array
    const typeWriterTexts = [
        t('hero.typewriter.1') || "Your AI Companion for Coding",
        t('hero.typewriter.2') || "Your AI Companion for Writing",
        t('hero.typewriter.3') || "Your AI Companion for Planning",
    ];
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % typeWriterTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [typeWriterTexts.length]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Background Atmosphere - Optimized */}
            <div className="fixed inset-0 z-0">
                {/* Mobile: Simple Gradient to avoid heavy blur/mix-blend performance cost */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black md:hidden" />

                {/* Desktop: Advanced Blobs & Noise */}
                <div className="hidden md:block">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                </div>
            </div>

            {/* Global Navbar */}
            <Navbar user={user} />

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
                <motion.h1
                    className="text-5xl md:text-8xl font-black tracking-tight mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    {/* Added pb-4 and leading-relaxed to fix Arabic clipping */}
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 block pb-4 leading-relaxed">
                        {t('hero.title')}
                    </span>
                    <motion.span
                        key={textIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        // Increased height to min-h-[4rem] and added py-2 for Arabic support
                        className="text-2xl md:text-4xl font-light text-zinc-400 mt-4 block min-h-[4rem] py-2 leading-relaxed"
                    >
                        {typeWriterTexts[textIndex]}
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href="/register">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-zinc-100 hover:scale-105 transition-all shadow-xl shadow-white/10">
                            {t('hero.start')} <ArrowRight className={`ml-2 w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </Button>
                    </Link>
                </motion.div>

                {/* 3D Code Demo */}
                <HeroDemo />

                {/* Tech Stack Marquee */}
                <div className="mt-24 w-full overflow-hidden">
                    <p className="text-sm text-zinc-500 mb-8 font-medium uppercase tracking-widest">{t('home.trusted')}</p>
                    <TechMarquee />
                </div>

                {/* Floating Elements (Parallax) - Desktop Only */}
                <motion.div style={{ y: y1 }} className="absolute h-64 w-64 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-[80px] opacity-20 -left-20 top-20 -z-10 pointer-events-none mix-blend-screen hidden md:block" />
                <motion.div style={{ y: y2 }} className="absolute h-96 w-96 bg-gradient-to-bl from-blue-500 to-cyan-500 rounded-full blur-[100px] opacity-20 -right-20 bottom-40 -z-10 pointer-events-none mix-blend-screen hidden md:block" />
            </main>

            {/* Features Section */}
            <section className="relative z-10 py-32 border-t border-zinc-900 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-center mb-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {t('features.title')}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Bot className="w-10 h-10 text-purple-400" />}
                            title={t('features.logic.title')}
                            desc={t('features.logic.desc')}
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Zap className="w-10 h-10 text-yellow-400" />}
                            title={t('features.speed.title')}
                            desc={t('features.speed.desc')}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Shield className="w-10 h-10 text-emerald-400" />}
                            title={t('features.secure.title')}
                            desc={t('features.secure.desc')}
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            className="group p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-colors relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -10 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                <div className="mb-6 p-4 rounded-2xl bg-zinc-950/50 w-fit border border-zinc-800 group-hover:border-purple-500/30 transition-colors shadow-lg">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}

function HeroDemo() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouse(event: React.MouseEvent) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            className="mt-20 relative w-full max-w-4xl md:perspective-1000 group"
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden will-change-transform"
            >
                {/* Window Header - optimized blur */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 md:bg-zinc-900/50 md:backdrop-blur-md">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 text-center text-xs text-zinc-500 font-mono">main.py - Vigilante AI</div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm overflow-hidden relative min-h-[300px] text-left">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/80 pointer-events-none z-10" />

                    <div className="space-y-2">
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">1</span>
                            <span className="text-purple-400">import</span> <span className="text-white">vigilante</span> <span className="text-purple-400">as</span> <span className="text-white">ai</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">2</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">3</span>
                            <span className="text-zinc-500"># Initialize the AI assistant</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">4</span>
                            <span className="text-blue-400">agent</span> <span className="text-white">=</span> <span className="text-white">ai.Agent(</span><span className="text-green-400">"SuperHelper"</span><span className="text-white">)</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">5</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">6</span>
                            <span className="text-zinc-500"># Analyze complex data</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">7</span>
                            <span className="text-white">result</span> <span className="text-white">=</span> <span className="text-blue-400">agent</span><span className="text-white">.analyze(</span><span className="text-white">data</span><span className="text-white">,</span> <span className="text-orange-400">mode</span><span className="text-white">=</span><span className="text-green-400">"deep_learning"</span><span className="text-white">)</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">8</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-zinc-600 select-none">9</span>
                            <span className="text-purple-400">print</span><span className="text-white">(</span><span className="text-white">result.summary</span><span className="text-white">)</span>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <span className="text-zinc-600 select-none">10</span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-2 h-5 bg-purple-500 block"
                            />
                        </div>
                    </div>

                    {/* Simualted Output Overlay */}
                    <motion.div
                        className="absolute bottom-6 right-6 bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-xl max-w-xs z-20"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="bg-green-500/20 text-green-400 p-1.5 rounded-md">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 mb-1">Analysis Complete</p>
                                <p className="text-sm font-medium text-white">Optimization Strategy Found: 98% Efficiency</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Glow Behind */}
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
        </motion.div>
    );
}

function TechMarquee() {
    const icons = [
        Code2, Terminal, Cpu, Globe, Database, Server, Zap, Shield, Bot
    ];

    return (
        <div className="relative flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-16 py-4 will-change-transform">
                {[...icons, ...icons].map((Icon, i) => (
                    <div key={i} className="flex items-center gap-2 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        <Icon className="w-8 h-8" />
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
        </div>
    );
}
