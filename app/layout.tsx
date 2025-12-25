import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vigilante AI Assistant",
  description: "AI assistant built with Next.js and Gemini",
  icons: [
    { rel: 'icon', url: '/logo.png' },
    { rel: 'apple-touch-icon', url: '/logo.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 3. Wrap everything in ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {/* 4. Wrap the main content in AuthProvider */}
          <AuthProvider>
            {/* 5. Wrap with LanguageProvider */}
            <LanguageProvider>
              <main>
                {children}
              </main>
              <Toaster richColors />
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
