import { NextResponse } from 'next/server';
import payjp from '@/lib/payjp';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...val] = c.trim().split('=');
        return [key, val.join('=')];
      })
    );

    const customerId = cookies['sub_customer_id'];

    if (!customerId) {
      return NextResponse.json({ active: false });
    }

    // Check subscription status via PAY.JP
    const subscriptions = await payjp.customers.retrieve(customerId).then(
      (customer: any) => customer.subscriptions?.data || []
    );

    const activeSub = subscriptions.find(
      (s: any) => s.status === 'active' || s.status === 'trial'
    );

    return NextResponse.json({
      active: !!activeSub,
      status: activeSub?.status || 'none',
      currentPeriodEnd: activeSub?.current_period_end || null,
    });
  } catch (error: any) {
    console.error('Subscription status check error:', error);
    return NextResponse.json({ active: false, error: error.message });
  }
}
