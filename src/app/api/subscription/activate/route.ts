import { NextResponse } from 'next/server';
import { getSession } from '@/lib/komoju';
import { createSignedCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { sessionId, dob } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'セッションIDが必要です。' }, { status: 400 });
    }

    // Verify payment with KOMOJU
    const session = await getSession(sessionId);
    if (session.status !== 'completed') {
      return NextResponse.json({ error: '決済が完了していません。' }, { status: 403 });
    }

    // Create signed cookies (server-side, httpOnly)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    const expiryStr = expiry.toISOString();

    const memberId = `member_${sessionId}`;
    const signedMemberId = createSignedCookie(memberId);
    const signedExpiry = createSignedCookie(expiryStr);

    const maxAge = 60 * 60 * 24 * 30; // 30 days

    const response = NextResponse.json({ success: true, expiresAt: expiryStr });

    // Set httpOnly cookies (can't be read/modified by client JS)
    response.cookies.set('sub_member_id', signedMemberId, {
      path: '/',
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookies.set('sub_member_expiry', signedExpiry, {
      path: '/',
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    if (dob) {
      response.cookies.set('sub_dob', dob, {
        path: '/',
        maxAge: 60 * 60 * 24 * 400,
        httpOnly: false, // DOB needs to be readable by client for daily fortune
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return response;
  } catch (error: any) {
    console.error('Subscription activation error:', error);
    return NextResponse.json(
      { error: error.message || 'メンバーシップの有効化に失敗しました。' },
      { status: 500 }
    );
  }
}
