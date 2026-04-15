import { NextResponse } from 'next/server';
import { verifySignedCookie, parseCookies } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parseCookies(cookieHeader);

    const signedMemberId = cookies['sub_member_id'];
    const signedExpiry = cookies['sub_member_expiry'];

    if (!signedMemberId || !signedExpiry) {
      return NextResponse.json({ active: false });
    }

    // Verify HMAC signatures
    const memberId = verifySignedCookie(decodeURIComponent(signedMemberId));
    const memberExpiry = verifySignedCookie(decodeURIComponent(signedExpiry));

    if (!memberId || !memberExpiry) {
      // Invalid signature = tampered cookies
      return NextResponse.json({ active: false, reason: 'invalid_signature' });
    }

    // Check if membership is still valid
    const expiryDate = new Date(memberExpiry);
    const now = new Date();
    const isActive = expiryDate > now;

    return NextResponse.json({
      active: isActive,
      status: isActive ? 'active' : 'expired',
      currentPeriodEnd: memberExpiry,
    });
  } catch (error: any) {
    console.error('Subscription status check error:', error);
    return NextResponse.json({ active: false, error: error.message });
  }
}
