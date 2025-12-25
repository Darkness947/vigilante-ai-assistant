export const dynamic = 'force-dynamic';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/chat.model";
import ChatSidebar from "@/components/ChatSidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user?._id) {
        redirect("/login");
    }

    await dbConnect();
    const chats = await Chat.find({ userId: session.user._id })
        .select("_id title")
        .sort({ createdAt: -1 })
        .lean();

    const plainChats = chats.map(chat => ({
        _id: (chat as any)._id.toString(),
        title: (chat as any).title,
    }));

    return (
        <div className="flex h-screen flex-col md:flex-row overflow-hidden">
            {/* --- 1. Mobile Header (Visible only on small screens) --- */}
            <div className="block md:hidden p-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0 md:hidden text-zinc-400 hover:text-white">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-zinc-950 border-r border-zinc-800 w-[280px]">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <ChatSidebar chats={plainChats} user={session?.user} />
                    </SheetContent>
                </Sheet>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 relative flex items-center justify-center">
                        <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Vigilante AI</span>
                </div>
            </div>

            {/* --- 2. Desktop Sidebar (Hidden on mobile, visible on md+) --- */}
            <div className="hidden md:flex w-[260px] bg-zinc-950 border-r border-zinc-800 flex-col shrink-0">
                <ChatSidebar chats={plainChats} user={session?.user} />
            </div>

            {/* --- 3. Main Content --- */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
