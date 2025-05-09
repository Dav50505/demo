'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton, SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          SaaS Blueprint
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
} 