'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, User } from "lucide-react";

export interface Message {
    role: "user" | "model";
    content: string;
}

export default function ChatMessage({ message: { role, content } }: { message: Message }) {
    return (
        <div className="flex items-start gap-4 p-4">
            {/* --- Avatar --- */}
            <Avatar className="h-10 w-10">
                <AvatarFallback>
                    {role === 'user' ? (
                        <User className="h-5 w-5" />
                    ) : (
                        <Bot className="h-5 w-5" />
                    )}
                </AvatarFallback>
            </Avatar>

            {/* --- Content --- */}
            <div className="flex-1 space-y-2 overflow-auto">
                <span className="font-bold">
                    {role === 'user' ? 'You' : 'Vigilante AI'}
                </span>
                {/* --- Markdown Renderer --- */}
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // This is the custom renderer for code blocks
                        code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return match ? (
                                // If a language is specified, use SyntaxHighlighter
                                <SyntaxHighlighter
                                    style={atomDark}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                // Otherwise, use a standard code block
                                <code className="bg-muted p-1 rounded-md" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
