export const dynamic = 'force-dynamic';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/chat.model";
import ChatSidebar from "@/components/ChatSidebar";
import MobileChatNav from "@/components/MobileChatNav"; 

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
            <div className="block md:hidden">
                <MobileChatNav chats={plainChats} />
            </div>

            {/* --- 2. Desktop Sidebar (Hidden on mobile, visible on md+) --- */}
            <div className="hidden md:flex w-64 bg-background border-r flex-col">
                <ChatSidebar chats={plainChats} />
            </div>

            {/* --- 3. Main Content --- */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
