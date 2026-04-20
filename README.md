# WetFuel Franchise Admin

Admin web app for the WetFuel Franchise network. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, MUI, NextAuth, TanStack Query, Zustand, and react-hook-form + zod.

## Features

- Branded login & forgot-password flows
- Dashboard overview with KPIs, performance table, network health & quick actions
- Franchisees management (list, detail, register, edit, freeze/unfreeze, delete)
- Reporting (network-wide + per-franchisee)
- Settings (Profile, Password & Security, Notifications, Integrations, Danger Zone)

## Getting started (local)

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start
```

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + custom Material UI v5 theme
- NextAuth.js for authentication
- TanStack Query for data fetching
- Zustand for global UI state
- react-hook-form + zod for form validation

## Project structure

```
app/                 # App Router pages & API routes
  (auth)/            # Login, Forgot Password
  (dashboard)/       # Sidebar + Topbar protected pages
  api/               # Route handlers (incl. NextAuth)
components/
  layout/            # Sidebar, Topbar, PageHeader
  ui/                # Reusable primitives (Button, Input, StatCard, ...)
  franchisees/       # Domain components (FranchiseeTable, ...)
lib/
  api/               # API stubs
  hooks/             # React Query hooks
  utils/             # Formatters, validators, constants
  theme/             # MUI theme overrides
store/               # Zustand stores
types/               # Shared TypeScript types
styles/              # Global Tailwind styles
```

## Deployment

This project deploys cleanly to Vercel — connect the GitHub repo on <https://vercel.com>, set the env vars from `.env.example`, and click Deploy.
