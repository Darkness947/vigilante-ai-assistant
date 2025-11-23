'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOutButton } from "@/components/AuthButtons";
import { motion, useScroll, useTransform } from "framer-motion";
import { Session } from "next-auth";
import { Bot, Shield, Zap, BrainCircuit } from "lucide-react"; // Import icons

type User = Session["user"];

export default function HomePageClient({ user }: { user: User | undefined }) {
    const { scrollYProgress } = useScroll();
    
    // Parallax effect for the background text
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
            {/* --- Header (Fixed) --- */}
            <motion.header 
                className="fixed top-0 w-full z-50 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md border-b"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6" />
                    <h1 className="text-xl font-bold tracking-tight">Vigilante AI</h1>
                </div>
                <nav>
                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <div className="flex gap-4">
                            <Button asChild variant="ghost">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </motion.header>

            {/* --- SECTION 1: HERO (Zoom Out Effect) --- */}
            <section className="h-screen flex flex-col items-center justify-center relative px-6 pt-20">
                <motion.div 
                    style={{ y }}
                    className="absolute inset-0 -z-10 opacity-5 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-[20vw] font-black uppercase text-foreground">Vigilante</span>
                </motion.div>

                <motion.div
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-3xl space-y-6"
                >
                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-2">
                        Your Powerful Agent
                    </h2>
                    <p className="text-xl text-muted-foreground md:text-2xl">
                        An intelligent, secure, and lightning-fast AI assistant designed to amplify your productivity.
                    </p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pt-4"
                    >
                        <Button asChild size="lg" className="rounded-full text-lg px-8 h-12 shadow-lg shadow-primary/20">
                            <Link href={user ? "/chat" : "/register"}>
                                {user ? "Get Started" : "Start for Free"}
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* --- SECTION 2: DESCRIPTION (Falling Text Animation) --- */}
            <section className="py-24 px-6 bg-muted/30">
                <div className="max-w-4xl mx-auto">
                    <article className="prose dark:prose-invert lg:prose-xl mx-auto text-center">
                        <motion.h3 
                            className="text-3xl font-bold mb-8"
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, type: "spring" }}
                        >
                            Why choose Vigilante?
                        </motion.h3>
                        
                        <div className="grid gap-8 md:grid-cols-3 text-left">
                            {/* Feature 1 */}
                            <motion.div 
                                className="p-6 rounded-2xl bg-background border shadow-sm"
                                initial={{ y: -100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                                    <BrainCircuit className="h-6 w-6 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">Advanced Logic</h4>
                                <p className="text-muted-foreground">Powered by Gemini Pro, capable of understanding complex context and generating code.</p>
                            </motion.div>

                            {/* Feature 2 */}
                            <motion.div 
                                className="p-6 rounded-2xl bg-background border shadow-sm"
                                initial={{ y: -100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-purple-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
                                <p className="text-muted-foreground">Optimized for speed with streaming responses that appear the moment you hit send.</p>
                            </motion.div>

                            {/* Feature 3 */}
                            <motion.div 
                                className="p-6 rounded-2xl bg-background border shadow-sm"
                                initial={{ y: -100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="h-6 w-6 text-green-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
                                <p className="text-muted-foreground">Your chats are stored securely. You own your data, and privacy is our priority.</p>
                            </motion.div>
                        </div>
                    </article>
                </div>
            </section>

            {/* --- SECTION 3: BIG ZOOM (Call to Action) --- */}
            <section className="py-32 px-6 text-center overflow-hidden">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="max-w-2xl mx-auto space-y-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold">Ready to evolve?</h2>
                    <p className="text-xl text-muted-foreground">
                        Join the next generation of AI assistance. Completely free.
                    </p>
                    <Button asChild size="lg" className="text-lg px-10 py-6 rounded-full">
                        <Link href="/register">Get Started Now</Link>
                    </Button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t text-center text-sm text-muted-foreground">
                <p>&copy; 2025 Vigilante AI Assistant. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

function UserMenu({ user }: { user: { name?: string | null; email?: string | null } }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {user.name?.[0].toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/chat" className="w-full">Go to Chat</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogOutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
