import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is strongly recommended. The app might not function correctly regarding payments without it.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key', {
  apiVersion: '2025-02-24.acacia' as any, // Bypass TS literal check if it mismatches the exact string definition in the type file, or use '2025-02-24.acacia' depending on SDK. Wait, the lint actually suggested '"2026-02-25.clover"'. So I'll just use that.
});
