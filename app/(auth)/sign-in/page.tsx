import { SignIn } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/navbar";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-8 py-12">
          <SignIn />
        </div>
      </main>
    </div>
  );
} 