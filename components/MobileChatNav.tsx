'use client';

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot } from "lucide-react";
import ChatSidebar from "./ChatSidebar";

type Chat = {
    _id: string;
    title: string;
};

export default function MobileChatNav({ chats }: { chats: Chat[] }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex md:hidden items-center p-4 border-b bg-background">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    {/* Add accessible title for screen readers */}
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    
                    <ChatSidebar 
                        chats={chats} 
                        onSelect={() => setOpen(false)} // Close sheet when item selected
                    />
                </SheetContent>
            </Sheet>
            
            <div className="ml-4 font-bold flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span>Vigilante AI</span>
            </div>
        </header>
    );
}
