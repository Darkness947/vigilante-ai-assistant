'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useEffect } from "react";

const formSchema = z.object({
    prompt: z.string().min(1),
});

interface ChatInputProps {
    onSubmit: (values: z.infer<typeof formSchema>, reset: () => void) => void;
    isLoading: boolean;
    suggestedPrompt?: string;
}

export function ChatInput({ onSubmit, isLoading, suggestedPrompt }: ChatInputProps) {
    const { t } = useLanguage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "" },
    });

    // Handle suggested prompt updates
    useEffect(() => {
        if (suggestedPrompt) {
            form.setValue('prompt', suggestedPrompt);
        }
    }, [suggestedPrompt, form]);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values, form.reset);
    };

    return (
        <div className="p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent z-10 w-full flex justify-center sticky bottom-0">
            <div className="max-w-3xl w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="relative flex items-end gap-2 p-2 bg-secondary/50 dark:bg-zinc-900 border shadow-sm rounded-3xl focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Textarea
                                            placeholder={t('chat.placeholder')}
                                            className="resize-none min-h-[44px] max-h-[200px] border-0 focus-visible:ring-0 bg-transparent text-base p-3 shadow-none scrollbar-hide w-full placeholder:text-muted-foreground"
                                            {...field}
                                            disabled={isLoading}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    form.handleSubmit(handleSubmit)();
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !form.watch('prompt')}
                            className="h-10 w-10 rounded-full shadow-sm mb-1 mr-1 transition-all hover:scale-105"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-[10px] text-muted-foreground mt-2 opacity-70">
                    Vigilante can make mistakes. Consider checking important information.
                </div>
            </div>
        </div>
    );
}
