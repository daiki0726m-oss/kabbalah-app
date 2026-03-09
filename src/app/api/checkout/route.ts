import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { name, dob } = await req.json();

    if (!name || !dob) {
      return NextResponse.json(
        { error: 'Name and Date of Birth are required.' },
        { status: 400 }
      );
    }

    // Creating a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'カバラ数秘術 完全鑑定書（プレミアムレポート）',
              description: '人生の羅針盤となる、あなただけの数万文字におよぶパーソナル鑑定書データの生成と送付。',
            },
            unit_amount: 3000, // 3,000 JPY
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Metadata allows us to pass custom information (like user data) through the Stripe flow
      // so we can access it on the webhook when the payment succeeds.
      metadata: {
        name,
        dob,
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
