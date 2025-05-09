import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      // Payment is successful and the subscription is created
      if (session.mode === 'subscription') {
        if (!session.customer || !session.subscription) {
          return new NextResponse('Customer or subscription is missing', { status: 400 });
        }

        // Update subscription in database
        await prisma.subscription.update({
          where: {
            id: session.metadata?.subscriptionId,
          },
          data: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            active: true,
          },
        });
      } else if (session.mode === 'payment') {
        // Handle one-time payments for orders
        if (session.metadata?.orderId) {
          await prisma.order.update({
            where: {
              id: session.metadata.orderId,
            },
            data: {
              status: 'COMPLETED',
              stripePaymentIntentId: session.payment_intent as string,
            },
          });
        }
      }
      break;

    case 'invoice.payment_succeeded':
      // Subscription renewed successfully - update the subscription end date
      const invoice = event.data.object as any; // Using any to bypass type checking
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        
        await prisma.subscription.updateMany({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            active: true,
          },
        });
      }
      break;

    case 'customer.subscription.deleted':
      // Subscription cancelled or expired
      const deletedSubscription = event.data.object as Stripe.Subscription;
      
      await prisma.subscription.updateMany({
        where: {
          stripeSubscriptionId: deletedSubscription.id,
        },
        data: {
          active: false,
        },
      });
      break;

    default:
      // Unexpected event type
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
} 