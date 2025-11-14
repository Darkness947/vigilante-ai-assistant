import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { auth } from "@/auth"; // <-- NEW: Import from src/auth.ts
import dbConnect from '@/lib/dbConnect';
import Chat from '@/models/chat.model';

// --- 1. Initialize Gemini AI ---
const API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export async function POST(request: NextRequest) {
    // --- 2. Check Authentication ---
    const session = await auth(); // <-- NEW: Use the auth() function
    if (!session || !session.user || !session.user._id) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user._id;

    // --- 3. Parse Request Body ---
    const { history, prompt, chatId } = await request.json();
    if (!prompt) {
        return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
    }

    try {
        // --- 4. Call Gemini AI ---
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            safetySettings,
        });

        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        const aiResponseText = response.text();

        // --- 5. Save to Database ---
        await dbConnect();
        
        const userMessage = { role: 'user', content: prompt };
        const aiMessage = { role: 'model', content: aiResponseText };

        let updatedChat;
        if (chatId) {
            // Add to existing chat
            updatedChat = await Chat.findByIdAndUpdate(
                chatId,
                { $push: { messages: { $each: [userMessage, aiMessage] } } },
                { new: true }
            );
        } else {
            // Create a new chat
            const newTitle = prompt.substring(0, 30) + (prompt.length > 30 ? '...' : '');
            updatedChat = await Chat.create({
                userId: userId,
                title: newTitle,
                messages: [userMessage, aiMessage],
            });
        }

        // --- 6. Send Response to Frontend ---
        return NextResponse.json(
            { 
                success: true, 
                aiResponse: aiResponseText,
                chatId: updatedChat._id // Send the chat ID back
            }, 
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error in /api/chat:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Error processing chat' },
            { status: 500 }
        );
    }
}
