type NewBlogEmailProps = {
  title: string;
  excerpt?: string;
  blogUrl: string;
  token: string;
};

export function getNewBlogEmailHtml({ title, excerpt, blogUrl, token }: NewBlogEmailProps) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:32px 0;font-family:'Segoe UI',Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;text-align:center;">
          <tr>
            <td style="padding:32px 24px 0 24px;">
              <p style="margin:0;font-size:14px;color:#64748b;text-transform:uppercase;letter-spacing:2px;">New blog</p>
              <h1 style="margin:12px 0 8px;font-size:26px;color:#0f172a;">${title}</h1>
              <p style="margin:0;font-size:16px;color:#475569;">Fresh on the site right now.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 12px 0;font-size:15px;color:#334155;">
                ${excerpt || "I just published something new that I think you'll enjoy."}
              </p>
              <a href="${blogUrl}" style="display:inline-block;margin-top:12px;padding:12px 32px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;">
                Read the blog
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 32px 24px;color:#94a3b8;font-size:13px;">
              You received this because you're part of my builder list.
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
  </table>`;
}

