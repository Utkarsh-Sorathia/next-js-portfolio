export function getWelcomeEmailHtml(subscriberEmail: string, token: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:32px 0;font-family: 'Segoe UI', Arial, sans-serif;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:32px 24px 0 24px;">
              <h1 style="margin:24px 0 8px;font-size:26px;color:#0f172a;">Welcome, ${subscriberEmail}!</h1>
              <p style="margin:0;font-size:16px;color:#475569;">Thanks for subscribing to my personal updates.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px;">
              <p style="margin:0 0 12px 0;font-size:15px;color:#334155;">
                I’ll drop short notes when I release new builds, write breakdowns, or share something useful.
              </p>
              <a href="https://utkarshsorathia.in/blogs" style="display:inline-block;margin-top:12px;padding:12px 32px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;">
                Read the latest
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 24px 12px 24px;color:#94a3b8;font-size:13px;">
              You can reply anytime if you have a question or want to say hi.
            </td>
          </tr>

          <!-- Unsubscribe link -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="https://utkarshsorathia.in/unsubscribe/${token}" 
                 style="color:#64748b;font-size:13px;text-decoration:underline;">
                Unsubscribe
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
}
