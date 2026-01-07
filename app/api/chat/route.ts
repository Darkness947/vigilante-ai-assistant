import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { auth } from "@/auth";
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
    const session = await auth();
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
        // --- 4. Call Gemini AI with Streaming ---
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            safetySettings,
        });

        const chatSession = model.startChat({
            history: history || [],
        });

        const result = await chatSession.sendMessageStream(prompt);

        // --- 4.5 Prepare DB Operations (Optimistic ID generation) ---
        // We need the Chat ID to send back in headers.
        // If it's a new chat, we'll CREATE it AFTER the stream (or during) but we need an ID now?
        // Actually, we can just send a header if we create it now? No, creating it with empty messages is messy.
        // Alternative: Send ID as the FIRST line of the stream? e.g. "ID:123\nContent..."
        // Or simply: Client re-fetches list or waits.
        // Let's go with Header approach: We MUST create the chat doc now if it doesn't exist.

        await dbConnect();
        let currentChatId = chatId;

        if (!currentChatId) {
            const newTitle = prompt.substring(0, 30) + (prompt.length > 30 ? '...' : '');
            const newChat = await Chat.create({
                userId: userId,
                title: newTitle,
                messages: [], // Will populate later
            });
            currentChatId = newChat._id.toString();
        }

        // --- 5. Create ReadableStream for Client ---
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let fullResponseText = "";

                try {
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        if (chunkText) {
                            fullResponseText += chunkText;
                            controller.enqueue(encoder.encode(chunkText));
                        }
                    }
                    controller.close();

                    // --- 6. Save to Database ---
                    const userMessage = { role: 'user', content: prompt };
                    const aiMessage = { role: 'model', content: fullResponseText };

                    await Chat.findByIdAndUpdate(
                        currentChatId,
                        { $push: { messages: { $each: [userMessage, aiMessage] } } },
                        { new: true }
                    );

                } catch (error) {
                    console.error("Stream error:", error);
                    controller.error(error);
                }
            },
        });

        // Return the stream with the Chat ID in headers
        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'X-Chat-Id': currentChatId,
            },
        });

    } catch (error: any) {
        console.error('Error in /api/chat:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Error processing chat' },
            { status: 500 }
        );
    }
}
