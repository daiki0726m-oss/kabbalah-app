import { createHmac } from 'crypto';

const SECRET = process.env.COOKIE_SECRET || process.env.KOMOJU_SECRET_KEY || 'kabbalah-default-secret-change-me';

/**
 * Create HMAC-SHA256 signature for a value
 */
export function signValue(value: string): string {
  return createHmac('sha256', SECRET).update(value).digest('hex');
}

/**
 * Create a signed cookie value: value.signature
 */
export function createSignedCookie(value: string): string {
  const sig = signValue(value);
  return `${value}.${sig}`;
}

/**
 * Verify and extract a signed cookie value
 * Returns null if signature is invalid
 */
export function verifySignedCookie(signedValue: string): string | null {
  const lastDot = signedValue.lastIndexOf('.');
  if (lastDot === -1) return null;

  const value = signedValue.substring(0, lastDot);
  const sig = signedValue.substring(lastDot + 1);

  const expected = signValue(value);
  if (sig !== expected) return null;

  return value;
}

/**
 * Parse cookies from header string
 */
export function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, ...val] = c.trim().split('=');
      return [key, val.join('=')];
    })
  );
}
