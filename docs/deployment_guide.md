# 🚀 `deployment_guide.md`

## 📦 Overview

This guide explains how to deploy the Droplet Pet App to production, integrating:

* Fullscreen mobile-friendly UI
* Supabase backend
* Pi Network SDK (for payments & ads)
* Real-time interactions
* Auth (when re-enabled)

---

## 🗂️ Directory Structure (Simplified)

```
/droplet-app
├── /components
├── /pages
│   ├── /api         → API Routes (coin, XP, rewards)
│   ├── index.tsx    → Home / Welcome Page
│   ├── play.tsx     → Main Game Screen
│   ├── shop.tsx     → Shop Interface
│   ├── wallet.tsx   → Wallet / Coin Store
├── /styles
├── /utils
├── .env
├── vercel.json
├── tsconfig.json
├── package.json
```

---

## ✅ Prerequisites

* [ ] Vercel account
* [ ] Supabase project + API keys
* [ ] Pi SDK App ID + API Key
* [ ] Custom domain (optional)

---

## ⚙️ `.env` Configuration

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_PI_APP_ID=your_pi_app_id
NEXT_PUBLIC_PI_API_KEY=your_pi_api_key

NEXT_PUBLIC_APP_ENV=production
```

---

## 🔧 Supabase Setup

### ✅ Tables to Set Up

Refer to [`database_schema.md`](#) for full schema.

* `users`
* `pets`
* `inventory`
* `levels`
* `coins`
* `themes`
* `rooms`
* `ads_rewards`
* `pi_transactions`

### 🔁 Realtime Sync

Enable `Row Level Security` and configure `realtime` on tables:

* `pet_stats`
* `inventory`
* `rooms`

---

## 🚀 Vercel Deployment Steps

1. **Push your code to GitHub**
2. **Login to Vercel** and import your repository
3. During setup, add the `.env` variables under **Project Settings > Environment Variables**
4. Click **Deploy**

Your app will be live on a Vercel `.vercel.app` domain or your custom domain.

---

## 📱 Mobile Optimization

Ensure:

* `<meta name="viewport" content="width=device-width, initial-scale=1">` in `_document.tsx`
* Tailwind classes: `w-full h-screen overflow-hidden` on layout containers
* Touch-friendly buttons: `min-h-[48px] px-4`

---

## 🔒 Auth (Optional)

To test without auth:

```ts
// In AuthGuard.tsx
if (process.env.NEXT_PUBLIC_APP_ENV === "development") return children;
```

To re-enable Pi Auth, refer to [`pi_auth_integration.md`](#)

---

## 🔗 Pi SDK Integration

* Load the SDK in `_app.tsx`
* Use Pi Auth, Pi Ads, Pi Payments via global context or hooks
* For coin purchase with Pi, see [`pi_payment_integration.md`](#)

---

## 📦 Build Commands

For local testing:

```bash
npm run dev
```

To build manually:

```bash
npm run build
npm start
```

For production, Vercel auto-builds on `main` or `production` branch pushes.

---

## 🛡️ Deployment Checklist

* [x] Connected Supabase DB
* [x] All `.env` variables added
* [x] Pi SDK functional (auth, ads, payment)
* [x] UI optimized for mobile
* [x] All room interactions tested
* [x] Coin store and shop working
* [x] Real-time stats and moods functional
* [x] Evolution & XP system in place
* [x] Assets optimized (images, sprites, sounds)

---

## 🌐 Domain

You can connect your own `.com` domain in Vercel under:
**Settings > Domains > Add**

---

## 📤 Post-Deployment Tasks

* Enable Vercel Analytics for performance tracking
* Set up Pi Network transaction webhook to confirm payments
* Use Supabase Edge Functions or CRON for daily XP/coin generation

---

