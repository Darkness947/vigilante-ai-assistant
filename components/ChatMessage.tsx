'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, User, Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import React from 'react';
import { Button } from "@/components/ui/button";

export interface Message {
    role: "user" | "model";
    content: string;
}

export default React.memo(function ChatMessage({ message: { role, content } }: { message: Message }) {
    const isUser = role === 'user';
    const isLoading = !isUser && !content;

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full justify-start"
            >
                <div className="flex gap-4 w-full flex-row">
                    <Avatar className="h-9 w-9 shrink-0 border-2 border-white/10 mt-0.5 bg-black">
                        <img src="/logo.png" alt="AI" className="h-6 w-6 object-contain opacity-50" />
                    </Avatar>
                    <div className="flex flex-col space-y-2 mt-2 w-full max-w-[200px]">
                        <div className="flex gap-1 items-center">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600 px-1">Thinking...</span>
                        </div>
                        <div className="h-4 w-3/4 bg-zinc-800/50 rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-zinc-800/50 rounded animate-pulse delay-75" />
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* --- Avatar --- */}
                <Avatar className={`h-9 w-9 shrink-0 border-2 border-white/10 mt-0.5 shadow-md ${isUser ? 'ml-2' : 'mr-2'}`}>
                    <AvatarFallback className={isUser ? "bg-purple-600 text-white font-bold" : "bg-black"}>
                        {isUser ? <User className="h-5 w-5" /> : <img src="/logo.png" alt="AI" className="h-6 w-6 object-contain" />}
                    </AvatarFallback>
                </Avatar>

                {/* --- Content --- */}
                <div className={`flex flex-col space-y-1 min-w-0 ${isUser ? 'items-end' : 'items-start w-full'}`}>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 px-1 mb-1">
                        {isUser ? 'You' : 'Vigilante AI'}
                    </span>

                    <div
                        className={`prose dark:prose-invert max-w-none text-sm md:text-[15px] leading-7 shadow-sm transition-all
                        ${isUser
                                ? 'bg-zinc-800/80 backdrop-blur-md text-white border border-white/10 rounded-2xl rounded-tr-sm p-4 px-5 shadow-black/5'
                                : 'bg-transparent w-full px-0'}`} // AI: No background, full width
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    const codeString = String(children).replace(/\n$/, "");

                                    if (!inline && match) {
                                        return <CodeBlock language={match[1]} value={codeString} />;
                                    }

                                    return (
                                        <code className={`${className} bg-zinc-800/50 border border-white/5 px-1.5 py-0.5 rounded text-red-200 text-xs font-mono`} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                // Enhanced Typography for AI Responses
                                ul: ({ children }) => <ul className="pl-5 list-disc space-y-2 my-3 text-zinc-300">{children}</ul>,
                                ol: ({ children }) => <ol className="pl-5 list-decimal space-y-2 my-3 text-zinc-300">{children}</ol>,
                                li: ({ children }) => <li className="pl-1">{children}</li>,
                                p: ({ children }) => <p className="mb-4 last:mb-0 text-zinc-200 font-light">{children}</p>,
                                strong: ({ children }) => <strong className="font-bold text-purple-200">{children}</strong>,
                                blockquote: ({ children }) => <blockquote className="border-l-4 border-purple-500 pl-4 py-1 my-4 bg-purple-500/5 rounded-r italic text-zinc-400">{children}</blockquote>,
                                h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3 text-white border-b border-white/10 pb-2">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-2 text-white">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2 text-purple-200">{children}</h3>,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

function CodeBlock({ language, value }: { language: string; value: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden border border-zinc-800 bg-[#1e1e1e] max-w-full">
            <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-zinc-800">
                <span className="text-xs text-zinc-400 font-mono">{language}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-zinc-400 hover:text-white"
                    onClick={copyToClipboard}
                >
                    {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
            </div>
            <div className="grid overflow-x-auto w-full max-w-full">
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    PreTag="div"
                    wrapLongLines={false}
                    customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        background: 'transparent',
                        whiteSpace: 'pre', // Force no-wrap for scrolling
                        maxWidth: '100%',
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
