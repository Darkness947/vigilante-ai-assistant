# Vigilante AI Assistant 🤖✨

A premium, localized, and highly animated AI Assistant web interface built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Overview

Vigilante AI is designed to be a "Dark Mode First" experience, offering a sleek, modern interface for an AI coding assistant. It features advanced animations, full English/Arabic (RTL) localization, and a responsive design optimized for both desktop and mobile performance.

## ✨ Key Features

*   **🎨 Premium UI**: Dark-themed aesthetic w/ rich gradients, glassmorphism, and noise textures.
*   **🌍 Full Localization**: Native support for **English** and **Arabic**, including automatic RTL layout switching and specialized font handling.
*   **⚡ Advanced Animations**:
    *   **3D Code Demo**: Interactive, mouse-tilt parallax effect (Desktop).
    *   **Typewriter Effect**: Dynamic, localized text cycling in the hero section.
    *   **Tech Marquee**: Infinite scrolling loop of technology icons with hardware acceleration.
    *   **Page Transitions**: Smooth staggered entrance animations for all elements.
*   **📱 Mobile Optimized**:
    *   Responsive Navbar with Hamburger Menu.
    *   Performance-tuned animations (disabled 3D perspective & heavy blurs on mobile).
    *   Touch-friendly interactables.
*   **💬 Chat Interface**: A specialized chat layout with sidebar history, model selection, and message streaming simulation.
*   **🛡️ Secure & Clean**: Read-only profile settings to prevent accidental edits, cleanly integrated authentication UI components.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Auth**: [NextAuth.js](https://next-auth.js.org/) (UI Integration)

## 📂 Project Structure

```bash
vigilante-ai-assistant/
├── app/                  # Next.js App Router pages
│   ├── chat/             # Chat interface pages
│   ├── contact/          # Contact page
│   ├── login/            # Auth pages
│   ├── globals.css       # Global styles & animation utilities
│   └── layout.tsx        # Root layout with font/theme setup
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn/UI base components (Button, Dialog, etc.)
│   ├── HomePageClient.tsx# Main landing page logic
│   ├── Navbar.tsx        # Responsive navigation
│   ├── ChatSidebar.tsx   # Chat history sidebar
│   └── ...
├── src/
│   └── lib/
│       └── translations.ts # Centralized generic localization strings
└── public/               # Static assets (images, logos)
```

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/vigilante-ai-assistant.git
    cd vigilante-ai-assistant
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🔮 Future Roadmap

*   [ ] Voice input/output capabilities.
*   [ ] File upload & analysis.

---

*Built with ❤️ by Hussain Alhumaidi*
