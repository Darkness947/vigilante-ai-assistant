'use client';

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// This is a Client Component
export function LogOutButton() {
    return (
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            Log out
        </DropdownMenuItem>
    );
}
