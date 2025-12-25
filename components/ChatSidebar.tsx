'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { PlusCircle, MessageSquare, LogOut, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Chat = {
    _id: string;
    title: string;
};

interface ChatSidebarProps {
    chats: Chat[];
    user?: any; // Accepting user prop
    onSelect?: () => void;
}

export default function ChatSidebar({ chats, user, onSelect }: ChatSidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="flex flex-col h-full bg-zinc-950 text-zinc-300">
            {/* --- Header: New Chat Button --- */}
            <div className="p-3 pb-0">
                <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start gap-2 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-all shadow-none"
                    onClick={onSelect}
                >
                    <Link href="/chat">
                        <PlusCircle className="h-4 w-4" />
                        {t('chat.newChat')}
                    </Link>
                </Button>
            </div>

            {/* --- Body: Chat History --- */}
            <ScrollArea className="flex-1 px-3 py-3">
                <div className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        {t('sidebar.recent')}
                    </div>
                    {chats.map((chat) => (
                        <Button
                            key={chat._id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start font-normal h-9 px-3 text-sm transition-colors",
                                "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
                                pathname === `/chat/${chat._id}` && "bg-zinc-800 text-white"
                            )}
                            asChild
                            onClick={onSelect}
                        >
                            <Link href={`/chat/${chat._id}`}>
                                <MessageSquare className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                                <span className="truncate">{chat.title || "Untitled Chat"}</span>
                            </Link>
                        </Button>
                    ))}
                    {chats.length === 0 && (
                        <div className="text-sm text-zinc-500 px-3 py-2 italic opacity-50">
                            {t('sidebar.noHistory')}
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* --- Footer: User Profile & Settings --- */}
            <div className="p-3 border-t border-zinc-900 mt-auto">
                <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start h-auto py-2 px-2 hover:bg-zinc-900 group">
                                <div className="flex items-center gap-3 w-full">
                                    <Avatar className="h-8 w-8 rounded-sm border border-zinc-700">
                                        <AvatarImage src={user?.image} />
                                        <AvatarFallback className="bg-zinc-800 text-zinc-400 rounded-sm">
                                            {user?.name?.[0] || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start min-w-0 text-left">
                                        <span className="text-sm font-medium text-white truncate w-full group-hover:text-white/90">
                                            {user?.name || "User"}
                                        </span>
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-zinc-300" align="start" side="top">
                            <DropdownMenuLabel>{t('sidebar.myAccount')}</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>{t('sidebar.settings')}</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem
                                className="focus:bg-red-900/20 focus:text-red-400 text-red-400 cursor-pointer"
                                onClick={() => signOut()}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t('sidebar.logout')}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* --- Settings Dialog (Read Only) --- */}
                    <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-[425px]">
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
            </div>
        </div>
    );
}
