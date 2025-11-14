'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { PlusCircle, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // We'll use this for active-link styling

// Define the shape of the chat object
type Chat = {
    _id: string;
    title: string;
};

interface ChatSidebarProps {
    chats: Chat[];
}

export default function ChatSidebar({ chats }: ChatSidebarProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full p-4 space-y-4">
            {/* New Chat Button */}
            <Button asChild>
                <Link href="/chat" className="flex items-center justify-start gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Chat
                </Link>
            </Button>

            {/* Chat History List */}
            <ScrollArea className="flex-1">
                <nav className="space-y-1">
                    {chats.map((chat) => (
                        <Button
                            key={chat._id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-2",
                                // Highlight the link if it's the active chat
                                pathname === `/chat/${chat._id}` && "bg-muted text-primary"
                            )}
                            asChild
                        >
                            <Link href={`/chat/${chat._id}`}>
                                <MessageSquare className="h-4 w-4" />
                                <span className="truncate">{chat.title}</span>
                            </Link>
                        </Button>
                    ))}
                </nav>
            </ScrollArea>

            {/* We can add the User/Logout button here later if we want */}
        </div>
    );
}
