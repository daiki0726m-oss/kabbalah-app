import { NextResponse } from 'next/server';
import payjp from '@/lib/payjp';

export async function POST(req: Request) {
  try {
    const { name, dob, plan = 'standard', token } = await req.json();

    if (!name || !dob) {
      return NextResponse.json(
        { error: 'Name and Date of Birth are required.' },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Payment token is required.' },
        { status: 400 }
      );
    }

    // Select price based on plan
    const amount = plan === 'premium' ? 2980 : 980;

    // Create a charge with PAY.JP
    const charge = await payjp.charges.create({
      amount,
      currency: 'jpy',
      card: token,
      description: `カバラ数秘術 ${plan === 'premium' ? 'プレミアム' : 'スタンダード'}鑑定 - ${name}`,
      metadata: {
        name,
        dob,
        plan,
      },
    });

    if (!charge.paid) {
      return NextResponse.json(
        { error: '決済に失敗しました。' },
        { status: 400 }
      );
    }

    // Return charge ID so frontend can redirect to premium page
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/result/premium?session_id=${charge.id}`;

    return NextResponse.json({ url: successUrl, chargeId: charge.id });
  } catch (error: any) {
    console.error('Error creating PAY.JP charge:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
