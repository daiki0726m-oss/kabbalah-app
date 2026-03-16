import { NextResponse } from 'next/server';
import payjp from '@/lib/payjp';

const PLAN_ID = 'pln_monthly_480';
const PLAN_AMOUNT = 480;

async function ensurePlanExists() {
  try {
    await payjp.plans.retrieve(PLAN_ID);
  } catch {
    await payjp.plans.create({
      id: PLAN_ID,
      amount: PLAN_AMOUNT,
      currency: 'jpy',
      interval: 'month',
      name: 'カバラ数秘術 月額プラン',
    });
  }
}

export async function POST(req: Request) {
  try {
    const { token, dob } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'カード情報が必要です。' }, { status: 400 });
    }
    if (!dob) {
      return NextResponse.json({ error: '生年月日が必要です。' }, { status: 400 });
    }

    // Ensure the monthly plan exists
    await ensurePlanExists();

    // Create customer with card token
    const customer = await payjp.customers.create({
      card: token,
      description: `月額会員 DOB:${dob}`,
    });

    // Create subscription
    const subscription = await payjp.subscriptions.create({
      customer: customer.id,
      plan: PLAN_ID,
    });

    // Set cookie with customer ID (no personal data stored on server)
    const response = NextResponse.json({
      success: true,
      customerId: customer.id,
      subscriptionId: subscription.id,
    });

    response.cookies.set('sub_customer_id', customer.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 400, // ~13 months
      path: '/',
    });

    response.cookies.set('sub_dob', dob, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 400,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: error.message || 'サブスクリプションの作成に失敗しました。' },
      { status: 500 }
    );
  }
}
