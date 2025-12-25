'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, LogOut, Mail, User as UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserMenu({ user, showName = false }: { user: any, showName?: boolean }) {
    const { t } = useLanguage();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const router = useRouter();

    return (
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`h-auto py-2 px-2 hover:bg-zinc-800 rounded-full ${showName ? 'w-auto' : 'w-fit'}`}>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 rounded-full border border-zinc-700">
                                <AvatarImage src={user?.image} />
                                <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                    {user?.name?.[0] || "U"}
                                </AvatarFallback>
                            </Avatar>
                            {showName && (
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium text-zinc-200">{user?.name}</span>
                                </div>
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300">
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="cursor-pointer focus:bg-zinc-900 focus:text-white">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t('sidebar.myAccount')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-zinc-900 focus:text-white">
                        <Link href="/contact" className="w-full flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>{t('nav.contact')}</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('sidebar.logout')}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings Dialog - READ ONLY */}
            <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>{t('sidebar.myAccount')}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">
                            {t('sidebar.username')}
                        </label>
                        <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200">
                            {user?.name || user?.username || "User"}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">
                            {t('sidebar.email')}
                        </label>
                        <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200">
                            {user?.email || "N/A"}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
