'use client';

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SuccessMessageProps {
  className?: string;
  paymentType?: string;
}

export default function SuccessMessage({ className, paymentType }: SuccessMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide the message after 8 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const isOneTime = paymentType === 'onetime';

  return (
    <div
      className={cn(
        "bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 text-green-800",
        className
      )}
    >
      <CheckCircledIcon className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
      <div>
        <h3 className="font-medium text-green-900">Payment Successful!</h3>
        <p className="text-sm mt-1">
          {isOneTime 
            ? "Thank you for your purchase. You now have access to the premium content."
            : "Thank you for your payment. Your subscription has been activated and you now have access to all Pro features."}
        </p>
      </div>
      <button 
        onClick={() => setVisible(false)} 
        className="ml-auto text-green-500 hover:text-green-700"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
} 