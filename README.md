<p align="center">
  <img src="public/source/logo-master-white-2048.png" alt="QUARK Logo" width="180" />
</p>

<h1 align="center">QUARK</h1>

<p align="center">
  A browser-based, zero-install frontend playground and editor.<br/>
  Write HTML, CSS, and JavaScript. <br> Run it instantly, share it in one click.
</p>

---

## Key Capabilities

*   **Monaco-Powered Code Editor**: Loaded dynamically (SSR-disabled) to optimize performance, featuring autocomplete, IntelliSense, syntax highlighting, and a custom dark theme.
*   **Sandboxed Preview Engine**: Injected `postMessage` console bridges pipe standard output and runtime logs directly into a responsive drawer.
*   **Share & Collaboration**: One-click sharing options (Public, Unlisted, Private) and a one-click "Forking" system that duplicates pens into user workspaces.
*   **Usage Tracking**: Free-tier limits checking (e.g. max published pens limits) integrated into the developer dashboard.
*   **Transactional Notifications**: Integrated email messaging that alerts authors when their public code is forked.

---

## Technical Stack & Architecture

QUARK is built with modern, performant web standards:

*   **Frontend Framework**: [Next.js (App Router)](https://nextjs.org/) + TypeScript for layout segregation, optimization, and Server Functions.
*   **Authentication & Security**: [Clerk Auth](https://clerk.com/) managing user identities, profile settings, and session middleware routing.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) driving high-performance updates across the editor and files tree.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) paired with vanilla CSS custom properties for custom tokens.
*   **Transactional Emails**: [Resend](https://resend.com/) powering programmatic email delivery.

---

## Design System Guidelines

QUARK features a refined, premium **Neo-Brutalist** style centered on structure, high readability, and clean lines.

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
*   **Typography**: *Space Grotesk* for headings and UI controls; *JetBrains Mono* for code views, filenames, and data values.
*   **Borders**: Thinner borders (`0.75px`) for a sharper, pixel-perfect layout.
*   **Radius**: A subtle `3px` corner radius on cards, tabs, and buttons to slightly soften the layout.
*   **Interactive Snap Shadows**: Actions sit flat at rest, then translate (-3px, -3px) on hover with a hard offset drop shadow in the respective theme color (blue, red, or white).

---

## Directory Conventions

```
├── public/                 # Static assets (logos, icons)
└── src/
    ├── app/                # Route handlers and layout components
    │   ├── (app)/          # Logged-in dashboard, settings, and pen pages
    │   ├── (auth)/         # Authentication route templates (Clerk)
    │   ├── (marketing)/    # Marketing landing pages, docs, and pricing
    │   ├── api/            # Server-side transactional email routes
    │   ├── embed/          # Embedded pen previews
    │   └── p/              # Read-only public share routes
    ├── components/         # Global shared React UI elements
    ├── emails/             # Resend email templates (welcome, fork notifications)
    ├── lib/                # Shared utilities, store contexts, and schemas
    └── proxy.ts            # Next.js 16 request interceptor boundary
```
