<p align="center">
  <img src="public/source/logo-master-white-2048.png" alt="QUARK Logo" width="180" />
</p>

<h1 align="center">QUARK</h1>

<p align="center">
  A high-performance, browser-based frontend playground and code editor.<br/>
  Build HTML, CSS, and JavaScript apps with real-time execution, sandboxed preview, and instant sharing.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#visual-tour--screenshots">Screenshots</a> •
  <a href="#key-capabilities">Features</a> •
  <a href="#technical-stack--architecture">Tech Stack</a> •
  <a href="#devsecops--security">DevSecOps</a> •
  <a href="#design-system-guidelines">Design System</a>
</p>

---

## Visual Tour & Screenshots

### 1. Interactive Live Code Editor
Monaco-powered editor pane featuring syntax highlighting, live iframe preview, responsive device toggles (Desktop/Tablet/Mobile), and postMessage console drawer.

![Quark Code Editor](WebShots/editor.png)

---

### 2. Modern Landing Page & Demo Suite
Hero layout featuring the integrated design system, dynamic wordmark watermarks, live demo preview, and capabilities overview.

![Quark Landing Page](WebShots/landing.png)

---

### 3. Explore & Community Showcase
Discover, search, and fork public user pens with tag filtering and popularity sorting.

![Quark Explore Suite](WebShots/explore.png)

---

### 4. Interactive Documentation
Comprehensive developer documentation, design system tokens, and API integration guides.

![Quark Documentation](WebShots/docs.png)

---

### 5. Developer Dashboard & Pen Management
Personal workspace for tracking created pens, managing visibility settings (Public, Unlisted, Private), and monitoring usage limits.

![Quark Dashboard](WebShots/dashboard.png)

---

### 6. Admin Control Console
Administrative dashboard for platform management, user moderation, report tracking, and platform analytics.

![Quark Admin Console](WebShots/admin.png)

---

## Key Capabilities

*   **Monaco-Powered Code Editor**: Dynamically loaded to optimize initial bundle size, featuring IntelliSense, autocomplete, syntax highlighting, and a custom dark theme.
*   **Sandboxed Execution Engine**: Preview environment rendered inside an isolated `iframe` with `sandbox="allow-scripts"` (omitting `allow-same-origin`), protecting host session cookies and token storage.
*   **Real-time Console Bridge**: Intercepts `console.log`, `console.warn`, `console.error`, and uncaught runtime errors inside the sandbox, streaming them back to the UI Console Drawer.
*   **Forking & Instant Collaboration**: One-click pen duplication system that clones public code pens directly into user workspaces.
*   **Transactional Email Suite**: Integrated Resend messaging suite (9 production HTML email templates) alerting authors when pens are forked, subscriptions renew, or logins occur.
*   **Usage Tracking & Rate Enforcement**: Tier limit checks (Free vs. Pro published pen allowances) integrated into user state.

---

## Quick Start

### Prerequisites
- **Node.js**: v20+ or v24+
- **NPM**: v10+

### Installation & Local Setup

1. **Clone repository**:
   ```bash
   git clone https://github.com/thepalearchitects/quark.git
   cd quark
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a local `.env.local` file (untracked in git):
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   RESEND_API_KEY=re_...
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Technical Stack & Architecture

QUARK is built with modern, performant web standards:

*   **Frontend Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + TypeScript for route segregation and Server Functions.
*   **Authentication & Security**: [Clerk Auth](https://clerk.com/) managing user identities and protected route middleware ([`src/middleware.ts`](file:///c:/Users/dell/Documents/antigravity/delightful-euclid/src/middleware.ts)).
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) for high-performance reactive updates across the editor and file tree.
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) paired with custom CSS design tokens.
*   **Transactional Emails**: [Resend](https://resend.com/) powering programmatic email delivery.

---

## DevSecOps & Security

QUARK includes automated security and code quality pipelines:

*   **Authentication Middleware**: Active session protection via [`src/middleware.ts`](file:///c:/Users/dell/Documents/antigravity/delightful-euclid/src/middleware.ts) protecting `/dashboard`, `/pen/*`, `/settings`, `/billing`, and `/admin/*`.
*   **API Security**: Endpoint guards and strict input validation regex on transactional routes ([`/api/email/welcome`](file:///c:/Users/dell/Documents/antigravity/delightful-euclid/src/app/api/email/welcome/route.ts), [`/api/email/fork`](file:///c:/Users/dell/Documents/antigravity/delightful-euclid/src/app/api/email/fork/route.ts)).
*   **DevSecOps CI Pipeline**: Automated GitHub Actions workflow ([`.github/workflows/devsecops.yml`](file:///c:/Users/dell/Documents/antigravity/delightful-euclid/.github/workflows/devsecops.yml)) executing:
    - ESLint (`npm run lint`) & TypeScript strict typechecking (`npx tsc --noEmit`).
    - Automated Secret Scanning via **Gitleaks** (`gitleaks-action`).
    - Dependency Vulnerability Audits (`npm audit`).
*   **Automated Dependency Management**: Dependabot ([`.github/dependabot.yml`](file:///c:/Users/dell/Documents/antigravity/delightful-euclid/.github/dependabot.yml)) grouped weekly dependency updates ignoring unreviewed semver-major bumps.

---

## Design System Guidelines

QUARK features a refined **Neo-Brutalist** dark style centered on structure, high readability, and clean lines.

### Color Tokens
*   `--void` (`#0A0A0A`): Canvas page background
*   `--surface` (`#1A1A1A`): Panels, cards, and modal backdrops
*   `--surface-2` (`#141414`): Recessed editor backgrounds and inputs
*   `--ink` (`#FFFFFF`): Primary text and buttons
*   `--ink-dim` (`#8A8A8F`): Labels and descriptions
*   `--ink-faint` (`#55555A`): Comments and borders
*   `--line` (`#2A2A2E`): Grid dividers
*   `--quark-blue` (`#4D8DFF`): Interactive status, focus triggers, and info indicators
*   `--quark-green` (`#3ECF8E`): Success states and live indicators
*   `--quark-red` (`#FF4545`): Destructive actions and errors

### Typography & Structure
*   **Typography**: *Space Grotesk* for headings and UI controls; *JetBrains Mono* for code views, filenames, and console output.
*   **Borders**: Sharp `0.75px` line dividers for pixel-perfect separation.
*   **Radius**: Subtle `3px` corner radius on cards, tabs, and buttons.

---

## Directory Conventions

```
├── .github/
│   └── workflows/          # CI/CD & DevSecOps automated workflows
├── public/                 # Static assets (logos, icons, branding)
├── WebShots/               # High-resolution application screenshots
└── src/
    ├── app/                # Next.js App Router handlers and layouts
    │   ├── (app)/          # Workspace routes (dashboard, pen editor, settings)
    │   ├── (auth)/         # Authentication routes (sign-in, sign-up, reset)
    │   ├── (marketing)/    # Marketing landing pages, docs, pricing, explore
    │   ├── api/            # Hardened API endpoints (email transactional routes)
    │   ├── embed/          # Embedded iframe pen previews
    │   └── p/              # Read-only public share routes
    ├── components/         # Reusable UI components (Editor, Dashboard, UI kit)
    ├── emails/             # Resend email templates (HTML renderers)
    ├── lib/                # Shared stores (Zustand), types, and preview builders
    └── middleware.ts       # Next.js authentication request interceptor
```
