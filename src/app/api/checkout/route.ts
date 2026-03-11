import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { name, dob, plan = 'standard' } = await req.json();

    if (!name || !dob) {
      return NextResponse.json(
        { error: 'Name and Date of Birth are required.' },
        { status: 400 }
      );
    }

    // Select price based on plan
    const priceId = plan === 'premium'
      ? process.env.STRIPE_PREMIUM_PRICE_ID
      : process.env.STRIPE_STANDARD_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: `Price ID not configured for plan: ${plan}. Please set STRIPE_${plan.toUpperCase()}_PRICE_ID environment variable.` },
        { status: 500 }
      );
    }

    // Creating a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Metadata allows us to pass custom information (like user data) through the Stripe flow
      // so we can access it on the webhook when the payment succeeds.
      metadata: {
        name,
        dob,
        plan,
      },
      // IMPORTANT: Redirect URLs after checkout.
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/result/premium?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/result?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}&canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
