'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";

import ChatMessage, { Message } from "@/components/ChatMessage";
import { useRouter } from "next/navigation";

// Form schema for the chat input
const formSchema = z.object({
    prompt: z.string().min(1, "Message cannot be empty."),
});

// Define the component's props
interface ChatInterfaceProps {
    chatId?: string;
    initialMessages?: Message[];
}

export default function ChatInterface({ chatId: initialChatId, initialMessages = [] }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState<string | undefined>(initialChatId);
    const router = useRouter();

    // This effect runs when the user clicks a different chat in the history,
    // or clicks "New Chat".
    const initialMessagesString = JSON.stringify(initialMessages);
    useEffect(() => {
        setMessages(initialMessages);
        setChatId(initialChatId);
    }, [initialMessagesString, initialChatId]);

    // This effect handles scrolling to the bottom
    useEffect(() => {
        const timer = setTimeout(() => {
            const scrollViewport = document.querySelector('#chat-scroll-area > [data-radix-scroll-area-viewport]');
            if (scrollViewport) {
                scrollViewport.scrollTop = scrollViewport.scrollHeight;
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [messages]); // Runs when messages are added

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "" },
    });

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const userMessage: Message = { role: "user", content: values.prompt };
        setMessages((currentMessages) => [...currentMessages, userMessage]);
        form.reset();

        const history = messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: history,
                    prompt: values.prompt,
                    chatId: chatId, // Pass the existing chatId (or undefined if new)
                }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const aiMessage: Message = { role: "model", content: data.aiResponse };
            setMessages((currentMessages) => [...currentMessages, aiMessage]);
            
            // This is the key fix:
            if (!chatId) {
                // This was a NEW chat.
                // 1. Save the new chat ID to our state
                setChatId(data.chatId);
                // 2. Silently update the URL without reloading
                window.history.replaceState(null, '', `/chat/${data.chatId}`);
                // 3. Refresh the router to update the sidebar
                router.refresh();
            }

        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* --- Message List --- */}
            <ScrollArea className="flex-1 p-4" id="chat-scroll-area">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && <ChatMessage message={{ role: 'model', content: '...' }} />}
                </div>
            </ScrollArea>

            {/* --- Input Form --- */}
            <div className="p-4 border-t">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ask me anything..."
                                            className="resize-none"
                                            {...field}
                                            disabled={isLoading}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    form.handleSubmit(onSubmit)();
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="icon" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
