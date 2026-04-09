import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...val] = c.trim().split('=');
        return [key, val.join('=')];
      })
    );

    const memberId = cookies['sub_member_id'];
    const memberExpiry = cookies['sub_member_expiry'];

    if (!memberId || !memberExpiry) {
      return NextResponse.json({ active: false });
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
