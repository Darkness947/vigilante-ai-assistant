'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { UserMenu } from "./UserMenu";
import { useLanguage } from "./LanguageContext";
import { useEffect, useState } from "react";
import { Bot, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ user }: { user: any }) {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] shrink-0" />
                <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 whitespace-nowrap pb-1">
                    {t('hero.bg_text') || "Vigilante AI"}
                </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    {t('nav.home')}
                </Link>
                {user && (
                    <Link href="/chat" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        {t('nav.chat')}
                    </Link>
                )}
                <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    {t('nav.contact')}
                </Link>
            </div>

            {/* Desktop Auth / User Menu */}
            <div className="hidden md:flex items-center gap-4">
                <LanguageToggle />
                {user ? (
                    <UserMenu user={user} showName />
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5">
                                {t('nav.login')}
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6">
                                {t('nav.register')}
                            </Button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-4">
                <LanguageToggle />
                {user ? (
                    <UserMenu user={user} />
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-400">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300">
                            <DropdownMenuItem asChild>
                                <Link href="/" className="w-full cursor-pointer">{t('nav.home')}</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/contact" className="w-full cursor-pointer">{t('nav.contact')}</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem asChild>
                                <Link href="/login" className="w-full cursor-pointer">{t('nav.login')}</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/register" className="w-full cursor-pointer text-purple-400 font-bold">{t('nav.register')}</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* Explicit Mobile Menu for User (if they need links other than profile) is handled by UserMenu or we can add a general Menu if user is logged in too, but UserMenu has links? 
                 Wait, UserMenu usually has "Settings/Logout". Desktop "Chat" link is in the navbar.
                 If User is logged in, I need to provide access to "Chat" and "Contact" on mobile too.
                 I should wrap the user menu + nav links in a single mobile dropdown OR keep UserMenu separate and add a Menu for navigation.
                 
                 Let's add a separate Menu button even if logged in, for navigation links (Home, Chat, Contact). 
                 */}

                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-400 -ml-2">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300">
                            <DropdownMenuItem asChild>
                                <Link href="/" className="w-full cursor-pointer">{t('nav.home')}</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/chat" className="w-full cursor-pointer">{t('nav.chat')}</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/contact" className="w-full cursor-pointer">{t('nav.contact')}</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
}
