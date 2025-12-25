'use client';

import { useLanguage } from '@/components/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div dir="ltr" className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-1 rounded-full border shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
            <motion.div className="relative flex w-24">
                {/* Sliding Background */}
                <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    layoutId="active-lang"
                    initial={false}
                    animate={{
                        x: language === 'en' ? '0%' : '100%',
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ width: '50%' }}
                />

                <button
                    onClick={() => setLanguage('en')}
                    className={`relative z-10 flex-1 py-1 text-xs font-bold transition-colors duration-200 text-center ${language === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage('ar')}
                    className={`relative z-10 flex-1 py-1 text-xs font-bold transition-colors duration-200 text-center ${language === 'ar' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    AR
                </button>
            </motion.div>
        </div>
    );
}
