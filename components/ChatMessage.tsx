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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex gap-4 ${isUser ? 'max-w-[85%] md:max-w-[75%] flex-row-reverse' : 'w-full flex-row'}`}>
                {/* --- Avatar --- */}
                <Avatar className={`h-8 w-8 shrink-0 border border-zinc-700 mt-1 ${isUser ? 'ml-1' : 'mr-1'}`}>
                    <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-black/80"}>
                        {isUser ? <User className="h-4 w-4" /> : <img src="/logo.png" alt="AI" className="h-5 w-5 object-contain" />}
                    </AvatarFallback>
                </Avatar>

                {/* --- Content --- */}
                <div className={`flex flex-col space-y-1 min-w-0 ${isUser ? 'items-end' : 'items-start w-full'}`}>
                    <span className="text-xs font-semibold opacity-50 px-1">
                        {isUser ? 'You' : 'Vigilante AI'}
                    </span>

                    <div
                        className={`prose dark:prose-invert max-w-none text-sm leading-relaxed break-words
                        ${isUser
                                ? 'bg-zinc-800 text-white border border-zinc-700 rounded-2xl rounded-tr-none p-3 px-4 shadow-sm'
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
                                        <code className={`${className} bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 text-xs`} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                // Ensure standard elements render nicely in the "Full Width" AI view
                                ul: ({ children }) => <ul className="pl-4 list-disc space-y-1 my-2">{children}</ul>,
                                ol: ({ children }) => <ol className="pl-4 list-decimal space-y-1 my-2">{children}</ol>,
                                li: ({ children }) => <li>{children}</li>,
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
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
