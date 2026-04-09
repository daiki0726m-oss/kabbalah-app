import { NextResponse } from 'next/server';
import { createSession } from '@/lib/komoju';

export async function POST(req: Request) {
  try {
    const { name, dob, plan = 'standard' } = await req.json();

    if (!name || !dob) {
      return NextResponse.json(
        { error: 'Name and Date of Birth are required.' },
        { status: 400 }
      );
    }

    const amount = plan === 'premium' ? 2980 : 980;
    const planLabel = plan === 'premium' ? 'プレミアム鑑定' : 'スタンダード鑑定';

    const origin = req.headers.get('origin') || req.headers.get('referer') || '';
    const baseUrl = origin ? new URL(origin).origin : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

    const session = await createSession({
      amount,
      return_url: `${baseUrl}/result/premium?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}&plan=${plan}`,
      metadata: {
        name,
        dob,
        plan,
        product: `カバラ数秘術 ${planLabel}`,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.session_url,
    });
  } catch (error: any) {
    console.error('Error creating KOMOJU session:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
