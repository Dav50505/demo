# SaaS Blueprint

A modern SaaS application boilerplate built with Next.js, Supabase, Prisma, Clerk, Stripe, and shadcn/ui.

## Features

- 🔐 Authentication with [Clerk](https://clerk.com)
- 💾 Database with [Supabase](https://supabase.io) and [Prisma ORM](https://prisma.io)
- 💳 Payments with [Stripe](https://stripe.com)
- 🎨 UI components with [shadcn/ui](https://ui.shadcn.com)
- 🔄 Automatic dark mode based on system preference
- 📱 Responsive design

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Database**: [Supabase](https://supabase.io)
- **ORM**: [Prisma](https://prisma.io)
- **Authentication**: [Clerk](https://clerk.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Payments**: [Stripe](https://stripe.com)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Clerk account
- Stripe account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/saas-blueprint.git
cd saas-blueprint
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root of your project and add the following variables:

```
# Database
DATABASE_URL="postgresql://your-username:your-password@localhost:5432/your-database-name"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

4. Initialize and generate Prisma client:

```bash
npx prisma generate
```

5. Push Prisma schema to your database:

```bash
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

```
├── app/                  # App router pages and layouts
├── components/           # React components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── ui/               # UI components from shadcn/ui
├── lib/                  # Utility functions and libraries
├── prisma/               # Prisma schema and migrations
└── public/               # Static assets
```

## Customization

### Themes

This project uses Tailwind CSS for styling. You can customize the theme in the `app/globals.css` file.

### UI Components

You can add more shadcn components using the CLI:

```bash
npx shadcn@latest add [component-name]
```

## Deployment

You can deploy this application to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/saas-blueprint)

## License

MIT
# demo
