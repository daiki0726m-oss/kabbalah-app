import { NextResponse } from 'next/server';
import { createSession } from '@/lib/komoju';

export async function POST(req: Request) {
  try {
    const { dob } = await req.json();

    if (!dob) {
      return NextResponse.json({ error: '生年月日が必要です。' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || req.headers.get('referer') || '';
    const baseUrl = origin ? new URL(origin).origin : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

    const session = await createSession({
      amount: 480,
      return_url: `${baseUrl}/subscribe/complete?dob=${encodeURIComponent(dob)}`,
      metadata: {
        dob,
        product: 'カバラ数秘術 月額メンバーシップ',
        type: 'subscription',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.session_url,
    });
  } catch (error: any) {
    console.error('Subscription session error:', error);
    return NextResponse.json(
      { error: error.message || 'セッションの作成に失敗しました。' },
      { status: 500 }
    );
  }
}
