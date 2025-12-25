'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(1, "Password is required."),
});

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false); // NEW: Loading state
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true); // NEW: Set loading true
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.ok) {
                toast.success("Login successful!");
                router.push('/');
                router.refresh();
            } else {
                toast.error("Login failed", {
                    description: result?.error || "Invalid email or password.",
                });
            }
        } catch (error) {
            toast.error("Error", {
                description: "An unexpected error occurred.",
            });
        } finally {
            setIsLoading(false); // NEW: Set loading false
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            {/* NEW: Added motion.div wrapper for animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-[90%] md:w-full md:max-w-xl bg-card border border-border rounded-xl shadow-lg p-6 md:p-8 relative z-10">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    {/* NEW: Added CardDescription */}
                    <CardDescription>
                        Welcome back! Log in to your account.
                    </CardDescription>
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="user@example.com" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* UPDATED: Button with loading state */}
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Login
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Register
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </motion.div>
        </div>
    );
}
