import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.EMAIL_FROM || 'カバラ数秘術 <onboarding@resend.dev>';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'info@life-navigation.co.jp';

/**
 * Send payment confirmation email to the customer
 * Falls back gracefully if Resend is not configured
 */
export async function sendPaymentConfirmation(params: {
  customerEmail?: string;
  customerName: string;
  plan: string;
  amount: number;
  reportUrl: string;
}) {
  if (!resend) {
    console.log('[Email] Resend not configured, skipping customer email');
    return;
  }

  const planLabel = params.plan === 'premium' ? 'プレミアム鑑定' : 'スタンダード鑑定';

  // Send to customer (if email available from KOMOJU)
  if (params.customerEmail) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: params.customerEmail,
        subject: `【カバラ数秘術】${planLabel}のご購入ありがとうございます`,
        html: `
          <div style="max-width: 500px; margin: 0 auto; font-family: 'Helvetica Neue', sans-serif; color: #333;">
            <div style="background: linear-gradient(135deg, #0C0A14, #1a1525); padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
              <p style="color: #D4AF37; font-size: 12px; letter-spacing: 3px; margin: 0;">✦ KABBALAH ✦</p>
              <h1 style="color: #F5F0E8; font-size: 20px; font-weight: 300; margin: 16px 0 0;">ご購入ありがとうございます</h1>
            </div>
            <div style="background: #f9f8f5; padding: 32px; border: 1px solid #eee; border-top: none;">
              <p style="font-size: 14px; line-height: 1.8; color: #555;">
                ${params.customerName} 様<br><br>
                ${planLabel}（¥${params.amount.toLocaleString()}）をご購入いただき、<br>
                誠にありがとうございます。
              </p>
              <div style="background: white; border: 1px solid #D4AF37; border-radius: 6px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="font-size: 12px; color: #888; margin: 0 0 8px;">あなたの鑑定書はこちら</p>
                <a href="${params.reportUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #F5D76E); color: #0C0A14; padding: 12px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px;">
                  鑑定書を見る
                </a>
                <p style="font-size: 11px; color: #aaa; margin: 12px 0 0;">
                  ※ このURLをブックマークしておくと、いつでも鑑定書を確認できます
                </p>
              </div>
              <p style="font-size: 12px; color: #999; line-height: 1.6;">
                ご不明な点がございましたら、お気軽にお問い合わせください。<br>
                info@life-navigation.co.jp
              </p>
            </div>
            <div style="text-align: center; padding: 16px;">
              <p style="font-size: 10px; color: #bbb;">© 2026 カバラ数秘術 運命鑑定</p>
            </div>
          </div>
        `,
      });
      console.log(`[Email] Sent confirmation to ${params.customerEmail}`);
    } catch (err) {
      console.error('[Email] Failed to send customer email:', err);
    }
  }

  // Always notify owner
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `【売上通知】${planLabel} ¥${params.amount.toLocaleString()} - ${params.customerName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>💰 新規購入通知</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">お客様</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${params.customerName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">プラン</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${planLabel}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">金額</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">¥${params.amount.toLocaleString()}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">日時</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</td></tr>
          </table>
        </div>
      `,
    });
    console.log('[Email] Sent owner notification');
  } catch (err) {
    console.error('[Email] Failed to send owner notification:', err);
  }
}

/**
 * Send membership activation email
 */
export async function sendMembershipConfirmation(params: {
  customerEmail?: string;
  dob: string;
  expiresAt: string;
}) {
  if (!resend) {
    console.log('[Email] Resend not configured, skipping membership email');
    return;
  }

  // Notify owner
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `【メンバー登録】30日間メンバーシップ ¥480`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>👑 新規メンバー登録</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">プラン</td><td style="padding: 8px; border-bottom: 1px solid #eee;">30日間メンバーシップ</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">金額</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">¥480</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">有効期限</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(params.expiresAt).toLocaleDateString('ja-JP')}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">日時</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</td></tr>
          </table>
        </div>
      `,
    });
    console.log('[Email] Sent membership owner notification');
  } catch (err) {
    console.error('[Email] Failed to send membership notification:', err);
  }
}
