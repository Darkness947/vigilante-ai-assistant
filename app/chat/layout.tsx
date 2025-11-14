export const dynamic = 'force-dynamic'; // FIX 1: Forces this layout to re-fetch

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/chat.model";
import ChatSidebar from "@/components/ChatSidebar";

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // --- 1. Protect the Route ---
    const session = await auth();
    if (!session?.user?._id) {
        redirect("/login");
    }

    // --- 2. Fetch Chat History ---
    await dbConnect();
    const chats = await Chat.find({ userId: session.user._id })
        .select("_id title") // FIX 2: Only select data needed for the sidebar
        .sort({ createdAt: -1 })
        .lean();

    // Convert chats to a serializable format
    const plainChats = chats.map(chat => ({
        _id: (chat as any)._id.toString(),
        title: (chat as any).title,
    }));

    return (
        <div className="flex h-screen overflow-hidden">
            {/* --- 3. Render Sidebar --- */}
            <div className="w-1/5 bg-background border-r">
                <ChatSidebar chats={plainChats} />
            </div>

            {/* --- 4. Render the specific chat page --- */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
