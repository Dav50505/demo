import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PaymentButton } from "@/components/ui/payment-button";
import SuccessMessage from "@/components/payment/success-message";

export default async function DashboardPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ payment?: string, type?: string }> 
}) {
  const user = await currentUser();
  const resolvedParams = await searchParams;
  const paymentStatus = resolvedParams.payment;
  const paymentType = resolvedParams.type;

  return (
    <main className="flex-1 container py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {paymentStatus === 'success' && (
        <SuccessMessage className="mb-6" paymentType={paymentType} />
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.firstName || "User"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is your personal dashboard where you can manage your account and subscriptions.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {paymentStatus === 'success' && paymentType !== 'onetime'
                ? "Thank you for subscribing to the Pro plan! Your subscription is now active."
                : paymentStatus === 'success' && paymentType === 'onetime'
                ? "Thank you for your one-time purchase! You now have access to premium content."
                : "You don't have an active subscription yet."}
            </p>
          </CardContent>
          {paymentStatus !== 'success' && (
            <CardFooter>
              <PaymentButton />
            </CardFooter>
          )}
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Access common features and settings here.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 