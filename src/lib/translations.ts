export type Language = 'en' | 'ar';

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

export const translations: Translations = {
    en: {
        // Nav
        'nav.home': 'Home',
        'nav.login': 'Login',
        'nav.register': 'Register',
        'nav.chat': 'Go to Chat',
        'nav.contact': 'Contact',

        // Home Hero
        'hero.title': 'Your Powerful Agent',
        'hero.subtitle': 'An intelligent, secure, and lightning-fast AI assistant designed to amplify your productivity.',
        'hero.typewriter.1': 'Your AI Companion for Coding',
        'hero.typewriter.2': 'Your AI Companion for Writing',
        'hero.typewriter.3': 'Your AI Companion for Planning',
        'hero.typewriter.4': 'Your AI Companion for Creating',
        'hero.start': 'Start for Free',
        'hero.getStarted': 'Get Started',
        'hero.bg_text': 'Vigilante',

        'home.trusted': 'Trusted by developers building with',

        // Features
        'features.title': 'Why choose Vigilante?',
        'features.logic.title': 'Advanced Logic',
        'features.logic.desc': 'Powered by Gemini Pro, capable of understanding complex context and generating code.',
        'features.speed.title': 'Lightning Fast',
        'features.speed.desc': 'Optimized for speed with streaming responses that appear the moment you hit send.',
        'features.secure.title': 'Secure & Private',
        'features.secure.desc': 'Your chats are stored securely. You own your data, and privacy is our priority.',

        // CTA
        'cta.title': 'Ready to evolve?',
        'cta.subtitle': 'Join the next generation of AI assistance. Completely free.',
        'cta.button': 'Get Started Now',

        // Contact
        'contact.title': 'Connect with Me',
        'contact.subtitle': "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
        'contact.email': 'Email',
        'contact.linkedin': 'LinkedIn',
        'contact.github': 'GitHub',
        'contact.portfolio': 'Portfolio',
        'contact.copy': 'Copy',
        'contact.copied': 'Copied!',

        // Footer
        'footer.about': 'About',
        'footer.privacy': 'Privacy',
        'footer.terms': 'Terms',
        'footer.copyright': 'Vigilante AI Assistant. All Rights Reserved.',

        // Chat
        'chat.placeholder': 'Type your message...',
        'chat.copyCode': 'Copy Code',
        'chat.copied': 'Copied!',
        'chat.welcome': 'How can I help you today?',
        'chat.subtitle': "I'm ready to assist you with anything.",
        'chat.newChat': 'New Chat',
        'chat.loading': 'Thinking...',
        'chat.error': 'Something went wrong. Please try again.',

        // Chat Suggestions
        'chat.suggestion.writeCode.label': 'Write Code',
        'chat.suggestion.writeCode.prompt': 'Write a Python script to scrape a website',
        'chat.suggestion.creative.label': 'Creative Writing',
        'chat.suggestion.creative.prompt': 'Write a science fiction story about time travel',
        'chat.suggestion.trip.label': 'Plan a Trip',
        'chat.suggestion.trip.prompt': 'Plan a 3-day itinerary for Tokyo, Japan',
        'chat.suggestion.brainstorm.label': 'Brainstorm',
        'chat.suggestion.brainstorm.prompt': 'Brainstorm 5 marketing ideas for a coffee shop',

        // Sidebar
        'sidebar.recent': 'Recent',
        'sidebar.noHistory': 'No history.',
        'sidebar.myAccount': 'My Account',
        'sidebar.settings': 'Settings',
        'sidebar.logout': 'Log out',
        'sidebar.username': 'Username',
        'sidebar.email': 'Email',
    },
    ar: {
        // Nav
        'nav.home': 'الرئيسية',
        'nav.login': 'تسجيل الدخول',
        'nav.register': 'إنشاء حساب',
        'nav.chat': 'الذهاب للمحادثة',
        'nav.contact': 'تواصل معنا',

        // Home Hero
        'hero.title': 'مساعدك الذكي القوي',
        'hero.subtitle': 'مساعد ذكي، آمن، وسريع للغاية مصمم لمضاعفة إنتاجيتك.',
        'hero.typewriter.1': 'رفيقك الذكي للبرمجة',
        'hero.typewriter.2': 'رفيقك الذكي للكتابة',
        'hero.typewriter.3': 'رفيقك الذكي للتخطيط',
        'hero.typewriter.4': 'رفيقك الذكي للإبداع',
        'hero.start': 'ابدأ مجاناً',
        'hero.getStarted': 'ابدأ الآن',
        'hero.bg_text': 'فيجيلانتي',
        'home.trusted': 'موثوق من قبل المطورين الذين يبنون بـ',

        // Features
        'features.title': 'لماذا تختار فيجيلانتي؟',
        'features.logic.title': 'منطق متقدم',
        'features.logic.desc': 'مدعوم بـ Gemini Pro، قادر على فهم السياق المعقد وتوليد الأكواد.',
        'features.speed.title': 'سرعة فائقة',
        'features.speed.desc': 'محسن للسرعة مع ردود متدفقة تظهر في اللحظة التي ترسل فيها رسالتك.',
        'features.secure.title': 'آمن ومحمي',
        'features.secure.desc': 'محادثاتك مخزنة بأمان. أنت تملك بياناتك، والخصوصية هي أولويتنا.',

        // CTA
        'cta.title': 'جاهز للتطور؟',
        'cta.subtitle': 'انضم إلى الجيل القادم من المساعدة الذكية. مجاناً بالكامل.',
        'cta.button': 'ابدأ الآن',

        // Contact
        'contact.title': 'تواصل معي',
        'contact.subtitle': 'أنا دائماً منفتح لمناقشة المشاريع الجديدة، الأفكار الإبداعية، أو الفرص لأكون جزءاً من رؤاكم.',
        'contact.email': 'البريد الإلكتروني',
        'contact.linkedin': 'لينكد إن',
        'contact.github': 'جيت هب',
        'contact.portfolio': 'معرض الأعمال',
        'contact.copy': 'نسخ',
        'contact.copied': 'تم النسخ!',

        // Footer
        'footer.about': 'عن الموقع',
        'footer.privacy': 'الخصوصية',
        'footer.terms': 'الشروط',
        'footer.copyright': 'مساعد فيجيلانتي الذكي. جميع الحقوق محفوظة.',

        // Chat
        'chat.placeholder': 'اكتب رسالتك...',
        'chat.copyCode': 'نسخ الكود',
        'chat.copied': 'تم النسخ!',
        'chat.welcome': 'كيف يمكنني مساعدتك اليوم؟',
        'chat.subtitle': 'أنا مستعد لمساعدتك في أي شيء.',
        'chat.newChat': 'محادثة جديدة',
        'chat.loading': 'جاري التفكير...',
        'chat.error': 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',

        // Chat Suggestions
        'chat.suggestion.writeCode.label': 'كتابة كود',
        'chat.suggestion.writeCode.prompt': 'اكتب سكربت بايثون لجمع البيانات من موقع ويب',
        'chat.suggestion.creative.label': 'كتابة إبداعية',
        'chat.suggestion.creative.prompt': 'اكتب قصة خيال علمي عن السفر عبر الزمن',
        'chat.suggestion.trip.label': 'تخطيط رحلة',
        'chat.suggestion.trip.prompt': 'خطط لرحلة لمدة 3 أيام إلى طوكيو، اليابان',
        'chat.suggestion.brainstorm.label': 'عصف ذهني',
        'chat.suggestion.brainstorm.prompt': 'اقترح 5 أفكار تسويقية لمقهى',

        // Sidebar
        'sidebar.recent': 'المحادثات الأخيرة',
        'sidebar.noHistory': 'لا يوجد سجل.',
        'sidebar.myAccount': 'حسابي',
        'sidebar.settings': 'الإعدادات',
        'sidebar.logout': 'تسجيل خروج',
        'sidebar.username': 'اسم المستخدم',
        'sidebar.email': 'البريد الإلكتروني',
    },
};
