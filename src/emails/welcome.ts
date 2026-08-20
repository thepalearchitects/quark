export function getWelcomeEmailHtml(userName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Space Grotesk', monospace, sans-serif; background: #0A0A0A; color: #FFFFFF; padding: 32px; }
    .card { background: #1A1A1A; border: 1px solid #2A2A2E; padding: 24px; max-width: 500px; margin: 0 auto; }
    .logo { font-size: 20px; font-weight: bold; color: #4D8DFF; font-family: monospace; letter-spacing: 2px; }
    .btn { display: inline-block; background: #FFFFFF; color: #0A0A0A; padding: 12px 24px; font-family: monospace; font-weight: bold; text-decoration: none; border-radius: 0; margin-top: 16px; }
    .dim { color: #8A8A8F; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">&lt;QUARK /&gt;</div>
    <h2 style="margin-top:16px;">Welcome to Quark, ${userName}!</h2>
    <p class="dim">You're all set to write, preview, and share browser frontend code pens instantly.</p>
    <p class="dim">Write HTML, CSS, and JS with npm module imports via esm.sh directly inside Monaco Editor.</p>
    <a href="https://quark.code/dashboard" class="btn">LAUNCH DASHBOARD</a>
  </div>
</body>
</html>
`;
}
