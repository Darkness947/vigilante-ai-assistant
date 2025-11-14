'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOutButton } from "@/components/AuthButtons";
import { motion } from "framer-motion"; // 1. Import Framer Motion
import { Session } from "next-auth"; // 2. Import the Session type

// 3. Define the type for the user object
type User = Session["user"];

// 4. Define our animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Each child will animate 0.2s after the previous
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function HomePageClient({ user }: { user: User | undefined }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* --- Header --- */}
            <motion.header 
                className="flex items-center justify-between p-4 border-b"
                initial={{ opacity: 0, y: -20 }} // 5. Add animation
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold">Vigilante AI</h1>
                <nav>
                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <div className="flex gap-2">
                            <Button asChild variant="secondary">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </motion.header>

            {/* --- Hero Section --- */}
            <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
                {/* 6. Add staggered container */}
                <motion.div
                    className="flex flex-col items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 className="text-4xl font-extrabold mb-4" variants={itemVariants}>
                        Welcome to Vigilante AI Assistant
                    </motion.h2>
                    <motion.p className="text-lg text-muted-foreground mb-8" variants={itemVariants}>
                        Your intelligent partner, ready to assist.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Button asChild size="lg">
                            <Link href={user ? "/chat" : "/login"}>
                                Get Started
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}

// --- User Menu Component ---
function UserMenu({ user }: { user: { name?: string | null; email?: string | null } }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>
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
                <DropdownMenuItem asChild>
                    <Link href="/chat">Go to Chat</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogOutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
