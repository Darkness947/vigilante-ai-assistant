'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

// AuthProvider component to wrap the application with SessionProvider  
export default function AuthProvider({ children }: Props) {
    return ( <SessionProvider>{children}</SessionProvider> );
}
