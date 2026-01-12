export function getContactNotificationEmailHtml(name: string, email: string, subject: string, message: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:32px 0;font-family: 'Segoe UI', Arial, sans-serif;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background:#4361ee;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:700;">New Contact Inquiry</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:32px 24px;">
              <p style="margin:0 0 20px 0;font-size:16px;color:#475569;">You've received a new message from your portfolio website.</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:12px;color:#94a3b8;font-size:13px;text-transform:uppercase;font-weight:700;letter-spacing:0.05em;">From</td>
                  <td style="padding-bottom:12px;color:#1e293b;font-size:15px;font-weight:600;text-align:right;">${name}</td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;color:#94a3b8;font-size:13px;text-transform:uppercase;font-weight:700;letter-spacing:0.05em;">Email</td>
                  <td style="padding-bottom:12px;color:#4361ee;font-size:15px;font-weight:600;text-align:right;">${email}</td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;color:#94a3b8;font-size:13px;text-transform:uppercase;font-weight:700;letter-spacing:0.05em;">Subject</td>
                  <td style="padding-bottom:12px;color:#1e293b;font-size:15px;font-weight:600;text-align:right;">${subject}</td>
                </tr>
              </table>
              
              <!-- Message Box -->
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-top:24px;">
                <p style="margin:0 0 8px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;font-weight:700;">Message</p>
                <p style="margin:0;color:#334155;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:0 24px 32px 24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;padding:14px 32px;background:#4361ee;color:#ffffff;text-decoration:none;border-radius:12px;font-weight:600;font-size:15px;">
                      Reply Directly
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0 0;font-size:13px;color:#94a3b8;text-align:center;">
                This email was sent from your portfolio website's contact form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}
