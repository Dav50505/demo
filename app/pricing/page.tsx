import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { PaymentButton } from "@/components/ui/payment-button";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features for small projects",
    features: ["Up to 3 projects", "1 GB storage", "Basic analytics", "Community support"],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    link: "/dashboard",
    popular: false,
    isPayment: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Everything you need for a growing business",
    features: [
      "Unlimited projects",
      "10 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
    ],
    buttonText: "Subscribe Now",
    buttonVariant: "default" as const,
    link: "https://buy.stripe.com/test_aEU8yM4ROf2J3pm6oo",
    popular: true,
    isPayment: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced features for larger organizations",
    features: [
      "Unlimited projects",
      "Unlimited storage",
      "Custom analytics",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantees",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary" as const,
    link: "/contact",
    popular: false,
    isPayment: false,
  },
];

export default function PricingPage({
  searchParams,
}: {
  searchParams: { payment?: string };
}) {
  const paymentStatus = searchParams.payment;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        {paymentStatus === 'canceled' && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-amber-800">
            <Cross2Icon className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900">Payment Canceled</h3>
              <p className="text-sm mt-1">
                Your payment was not completed. If you experienced any issues, please try again or contact our support team.
              </p>
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-6 flex flex-col ${
                plan.popular ? "ring-2 ring-primary relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.isPayment ? (
                <PaymentButton text={plan.buttonText} variant={plan.buttonVariant} />
              ) : (
                <Link href={plan.link}>
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 