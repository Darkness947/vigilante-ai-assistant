import { auth } from "@/auth";
import ChatInterface from "@/components/ChatInterface";
import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/chat.model";
import { Types } from "mongoose";
import { redirect } from "next/navigation";

// Helper to check if a string is a valid MongoDB ID
function isValidObjectId(id: string) {
    return Types.ObjectId.isValid(id) && String(new Types.ObjectId(id)) === id;
}

export default async function ChatPage(props: { params: Promise<{ chatId: string }> }) {
    
    // 1. Use 'await' to unwrap the params promise
    const { chatId } = await props.params;

    // 2. Check for user
    const session = await auth();
    if (!session?.user?._id) {
        redirect("/login");
    }

    // 3. Validate the Chat ID
    if (!isValidObjectId(chatId)) {
        redirect("/chat"); 
    }

    // 4. Fetch the specific chat
    await dbConnect();
    const chat = await Chat.findOne({
        _id: chatId,
        userId: session.user._id,
    }); 

    // 5. If chat doesn't exist, redirect
    if (!chat) {
        redirect("/chat");
    }

    // 6. Prepare the initial messages (Safely)
    // We convert the full Mongoose doc to a plain object
    const plainChat = JSON.parse(JSON.stringify(chat));

    const initialMessages = plainChat.messages?.map((msg: any) => ({
        role: msg.role as 'user' | 'model',
        content: msg.content,
    })) || []; // Fallback if messages is still null

    return (
        <div className="h-full">
            {/* 7. Pass the chat data to the client component */}
            <ChatInterface 
                key={plainChat._id.toString()} // This key is still important
                chatId={plainChat._id.toString()} 
                initialMessages={initialMessages} 
            />
        </div>
    );
}
