'use client';

import { Github, Linkedin, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
            {/* Wave Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(111%+1.3px)] h-[60px] md:h-[100px] fill-zinc-950">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-background"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-zinc-800 pb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                                Vigilante AI
                            </span>
                        </div>
                        <p className="text-zinc-400 max-w-sm">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t('nav.home')}</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/" className="hover:text-purple-400 transition-colors">{t('nav.home')}</Link></li>
                            <li><Link href="/contact" className="hover:text-purple-400 transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t('contact.title')}</h3>
                        <div className="flex gap-4">
                            <a href="https://github.com/Darkness947" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/hussain-alhumaidi-6726b334a" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://hussain-portfolio-dev.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                                <Globe className="h-5 w-5" />
                            </a>
                            <a href="mailto:husdfdf@gmail.com" className="text-zinc-400 hover:text-red-400 transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
                    <p>{t('footer.copyright')}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/" className="hover:text-zinc-300">{t('footer.privacy')}</Link>
                        <Link href="/" className="hover:text-zinc-300">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
