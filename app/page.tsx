import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
            Modern SaaS Platform Blueprint
          </h1>
          <p className="text-muted-foreground md:text-xl">
            A complete starter kit with Supabase, Prisma, Clerk, Stripe, and shadcn/ui.
            Everything you need to build your next SaaS product.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
            <h3 className="text-xl font-semibold">Authentication</h3>
            <p className="text-sm text-muted-foreground">Secure login with Clerk</p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
            <h3 className="text-xl font-semibold">Database</h3>
            <p className="text-sm text-muted-foreground">Supabase & Prisma</p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
            <h3 className="text-xl font-semibold">Payments</h3>
            <p className="text-sm text-muted-foreground">Stripe integration</p>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            No hidden fees. No complicated tiers. Just choose the plan that works for you.
          </p>
          <div className="flex justify-center">
            <Link href="/pricing">
              <Button size="lg">View Pricing Plans</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
