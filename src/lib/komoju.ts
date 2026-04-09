const KOMOJU_SECRET_KEY = process.env.KOMOJU_SECRET_KEY || '';
const KOMOJU_BASE_URL = 'https://komoju.com/api/v1';

function getAuthHeader() {
  return 'Basic ' + Buffer.from(KOMOJU_SECRET_KEY + ':').toString('base64');
}

export async function createSession(params: {
  amount: number;
  currency?: string;
  return_url: string;
  default_locale?: string;
  metadata?: Record<string, string>;
  payment_types?: string[];
}) {
  const res = await fetch(`${KOMOJU_BASE_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency || 'JPY',
      return_url: params.return_url,
      default_locale: params.default_locale || 'ja',
      metadata: params.metadata || {},
      payment_types: params.payment_types || ['credit_card'],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `KOMOJU session creation failed: ${res.status}`);
  }

  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await fetch(`${KOMOJU_BASE_URL}/sessions/${sessionId}`, {
    headers: {
      'Authorization': getAuthHeader(),
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `KOMOJU session retrieval failed: ${res.status}`);
  }

  return res.json();
}

export async function getPayment(paymentId: string) {
  const res = await fetch(`${KOMOJU_BASE_URL}/payments/${paymentId}`, {
    headers: {
      'Authorization': getAuthHeader(),
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `KOMOJU payment retrieval failed: ${res.status}`);
  }

  return res.json();
}
