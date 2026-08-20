export function getForkNotificationEmailHtml(
  ownerName: string,
  forkerName: string,
  penTitle: string,
  penUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Space Grotesk', monospace, sans-serif; background: #0A0A0A; color: #FFFFFF; padding: 32px; }
    .card { background: #1A1A1A; border: 1px solid #2A2A2E; padding: 24px; max-width: 500px; margin: 0 auto; }
    .badge { background: #141414; border: 1px solid #3ECF8E; color: #3ECF8E; padding: 4px 8px; font-family: monospace; font-size: 11px; }
    .btn { display: inline-block; background: #FFFFFF; color: #0A0A0A; padding: 10px 20px; font-family: monospace; font-weight: bold; text-decoration: none; border-radius: 0; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">NEW FORK ALERT</span>
    <h3 style="margin-top:16px;">Someone forked your pen!</h3>
    <p style="color:#8A8A8F; font-size:14px;">
      <strong>${forkerName}</strong> created a fork of your pen <strong>"${penTitle}"</strong>.
    </p>
    <a href="${penUrl}" class="btn">VIEW FORKED PEN</a>
  </div>
</body>
</html>
`;
}
