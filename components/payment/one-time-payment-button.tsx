'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface OneTimePaymentButtonProps {
  text?: string;
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'link' | 'secondary';
}

export function OneTimePaymentButton({ 
  text = "Buy Now", 
  variant = "default" 
}: OneTimePaymentButtonProps) {
  const [host, setHost] = useState("");

  useEffect(() => {
    // Get the current host to use for the success URL
    setHost(window.location.origin);
  }, []);

  const handlePayment = () => {
    // Base Stripe checkout URL for one-time payment
    const baseUrl = 'https://buy.stripe.com/test_aEU8yM4ROf2J3pm6oo';
    
    // Add success and cancel redirect URLs
    const successUrl = `${host}/dashboard?payment=success&type=onetime`;
    const cancelUrl = `${host}/pricing?payment=canceled`;
    
    // Build the full URL with redirect parameters
    const checkoutUrl = `${baseUrl}?success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;
    
    window.open(checkoutUrl, '_blank');
  };

  return (
    <Button onClick={handlePayment} variant={variant} className="w-full">
      {text}
    </Button>
  );
} 