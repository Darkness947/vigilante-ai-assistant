'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    direction: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Default to English initially to prevent hydration mismatch, 
    // we'll sync with localStorage in useEffect.
    const [language, setLanguageState] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('vigilante-lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguageState(savedLang);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('vigilante-lang', language);
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = language;
        }
    }, [language, mounted]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string) => {
        const keys = key.split('.');
        // Simple look up, can be improved for nested objects if needed, 
        // but our structure is flat for now.
        return translations[language][key] || key;
    };

    const direction = language === 'ar' ? 'rtl' : 'ltr';

    // Avoid hydration mismatch by rendering children only after mount 
    // OR accepting the flicker behavior. 
    // For a seamless experience, we can render, but the direction change happens on mount.
    // To keep it simple and robust:

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, direction }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
