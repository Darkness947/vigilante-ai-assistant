'use client';

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Code, PenTool, Plane, Lightbulb, Bot } from "lucide-react";

import ChatMessage, { Message } from "@/components/ChatMessage";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { BackgroundAnimations } from "@/components/BackgroundAnimations";
import { motion } from "framer-motion";
import { ChatInput } from "./ChatInput";

// Define the component's props
interface ChatInterfaceProps {
    chatId?: string;
    initialMessages?: Message[];
}

export default function ChatInterface({ chatId: initialChatId, initialMessages = [] }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState<string | undefined>(initialChatId);
    const [suggestedPrompt, setSuggestedPrompt] = useState("");
    const router = useRouter();
    const { t, direction } = useLanguage();

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
        }, 100); // Increased timeout slightly for reliable scroll after render
        return () => clearTimeout(timer);
    }, [messages]);

    // Handle form submission
    const onSubmit = useCallback(async (values: { prompt: string }, reset: () => void) => {
        if (!values.prompt.trim()) return;

        setIsLoading(true);

        const userMessage: Message = { role: "user", content: values.prompt };
        setMessages((currentMessages) => [...currentMessages, userMessage]);
        reset();
        setSuggestedPrompt(""); // Clear suggestion

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
                    chatId: chatId,
                }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const aiMessage: Message = { role: "model", content: data.aiResponse };
            setMessages((currentMessages) => [...currentMessages, aiMessage]);

            if (!chatId) {
                setChatId(data.chatId);
                window.history.replaceState(null, '', `/chat/${data.chatId}`);
                router.refresh();
            }

        } catch (error) {
            toast.error(t('chat.error'));
        } finally {
            setIsLoading(false);
        }
    }, [messages, chatId, t, router]);

    return (
        <div className="flex flex-col h-full relative">
            {/* Header for Chat (Language Toggle) */}
            <div className={`absolute top-4 z-10 ${direction === 'rtl' ? 'left-4' : 'right-4'}`}>
                <LanguageToggle />
            </div>

            {/* --- Message List --- */}
            <ScrollArea className="flex-1 p-4" id="chat-scroll-area">
                <div className="space-y-6 max-w-3xl mx-auto pt-10">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 relative">
                            {/* Background for "Alive" feel */}
                            <BackgroundAnimations />

                            {/* Animated Greeting */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="z-10 flex flex-col items-center"
                            >
                                <div className="mb-4 flex justify-center">
                                    <div className="h-24 w-24 flex items-center justify-center">
                                        <img src="/logo.png" alt="AI Logo" className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                    {t('chat.welcome') || "How can I help you today?"}
                                </h2>
                                <p className="text-zinc-400 text-lg">
                                    {t('chat.subtitle')}
                                </p>
                            </motion.div>

                            {/* Suggested Prompts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4 z-10">
                                {[
                                    { icon: Code, label: t('chat.suggestion.writeCode.label'), prompt: t('chat.suggestion.writeCode.prompt') },
                                    { icon: PenTool, label: t('chat.suggestion.creative.label'), prompt: t('chat.suggestion.creative.prompt') },
                                    { icon: Plane, label: t('chat.suggestion.trip.label'), prompt: t('chat.suggestion.trip.prompt') },
                                    { icon: Lightbulb, label: t('chat.suggestion.brainstorm.label'), prompt: t('chat.suggestion.brainstorm.prompt') }
                                ].map((item, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        onClick={() => {
                                            setSuggestedPrompt(item.prompt);
                                        }}
                                        className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left group backdrop-blur-sm"
                                    >
                                        <div className="h-10 w-10 rounded-lg bg-zinc-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <item.icon className="h-5 w-5 text-zinc-500 group-hover:text-zinc-300" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{item.label}</div>
                                            <div className="text-xs text-zinc-500 group-hover:text-zinc-400 truncate max-w-[200px] transition-colors">{item.prompt}</div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground ml-16 animate-pulse">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {t('chat.loading')}
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* --- Input Form --- */}
            <ChatInput onSubmit={onSubmit} isLoading={isLoading} suggestedPrompt={suggestedPrompt} />
        </div>
    );
}
