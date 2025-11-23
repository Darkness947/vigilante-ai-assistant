'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { PlusCircle, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

type Chat = {
    _id: string;
    title: string;
};

interface ChatSidebarProps {
    chats: Chat[];
    onSelect?: () => void; // <-- 1. Add this optional prop
}

export default function ChatSidebar({ chats, onSelect }: ChatSidebarProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full p-4">
            {/* --- Header: New Chat Button --- */}
            <div className="mb-4">
                <Button 
                    asChild 
                    className="w-full justify-start"
                    onClick={onSelect} // <-- 2. Call onSelect when clicking New Chat
                >
                    <Link href="/chat">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Chat
                    </Link>
                </Button>
            </div>

            {/* --- Body: Chat History --- */}
            <ScrollArea className="flex-1 -mx-4 px-4">
                <div className="space-y-1">
                    {chats.map((chat) => (
                        <Button
                            key={chat._id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start font-normal",
                                pathname === `/chat/${chat._id}` && "bg-accent text-accent-foreground"
                            )}
                            asChild
                            onClick={onSelect} // <-- 3. Call onSelect when clicking a chat
                        >
                            <Link href={`/chat/${chat._id}`}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span className="truncate">{chat.title}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </ScrollArea>

            {/* --- Footer: Theme Toggle --- */}
            <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
            </div>
        </div>
    );
}
