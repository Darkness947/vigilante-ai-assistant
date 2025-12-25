'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Globe, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ContactClient({ user }: { user: any }) {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const [copiedEmail, setCopiedEmail] = useState(false);

    const contactInfo = [
        {
            label: t('contact.email'),
            value: 'husdfdf@gmail.com',
            icon: <Mail className="w-6 h-6" />,
            color: 'bg-red-500/10 text-red-500',
            action: () => {
                navigator.clipboard.writeText('husdfdf@gmail.com');
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
            },
            isLink: false
        },
        {
            label: t('contact.linkedin'),
            value: 'hussain-alhumaidi',
            link: 'https://www.linkedin.com/in/hussain-alhumaidi-6726b334a',
            icon: <Linkedin className="w-6 h-6" />,
            color: 'bg-blue-600/10 text-blue-600',
            isLink: true
        },
        {
            label: t('contact.github'),
            value: 'Darkness947',
            link: 'https://github.com/Darkness947',
            icon: <Github className="w-6 h-6" />,
            color: 'bg-zinc-500/10 text-zinc-200',
            isLink: true
        },
        {
            label: t('contact.portfolio'),
            value: 'hussain-portfolio',
            link: 'https://hussain-portfolio-dev.netlify.app/',
            icon: <Globe className="w-6 h-6" />,
            color: 'bg-emerald-500/10 text-emerald-500',
            isLink: true
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>

            <Navbar user={user} />

            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Blobs - Optimized: Hidden on mobile to prevent GPU strain */}
                <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none hidden md:block" />
                <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none hidden md:block" />

                <div className="max-w-4xl w-full relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 pb-4 leading-relaxed block">
                                {t('contact.title')}
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                            {t('contact.subtitle')}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-2xl opacity-50 blur transition-opacity group-hover:opacity-100" />
                                <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 flex items-center gap-6 hover:border-zinc-700 transition-colors h-full">
                                    <div className={`p-4 rounded-xl ${info.color}`}>
                                        {info.icon}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className="text-sm text-zinc-500 mb-1 font-medium">{info.label}</p>
                                        <p className="text-lg font-semibold truncate hover:text-clip">{info.value}</p>
                                    </div>

                                    {info.isLink ? (
                                        <a
                                            href={info.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-zinc-600 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={info.action}
                                            className="p-2 text-zinc-600 hover:text-white transition-colors"
                                        >
                                            {copiedEmail ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
