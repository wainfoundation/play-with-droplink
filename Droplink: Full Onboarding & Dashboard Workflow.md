# 🚀 Droplink: Full Onboarding & Dashboard Workflow

 Powered by Pi Network. Backed by Supabase.

---

## 🔐 1. Pi Network Authentication

- **URL:** `/auth`
- Users sign in using Pi Network's authentication system.
- On success → redirect to `/auth/userinfo`.

---

## 👤 2. Username Setup

- **URL:** `/auth/userinfo`
- Prompt: _"Welcome to Droplink! Choose your Droplink username. You can always change it later."_
- Preview: `droplink.space/@username`
- Consent checkbox: _"By continuing, you agree to receive offers, news and updates from Droplink."_
- ✅ Continue → `/register/your-information`

---

## 🎯 3. User Intent Selection

- **URL:** `/register/your-information`
- Prompt: _"Which best describes your goal for using Droplink?"_
- Options:
  - **Creator**: Monetize audience
  - **Business**: Reach more customers
  - **Personal**: Share links with friends
- ✅ Continue → `/register/select-categories`

---

## 💰 4. Choose Plan & Pay with Pi

- **URL:** `/register/select-categories`
- Plans:
  - **Free**
  - **Basic** 
  - **Pro**
  - **Premium**
- Features shown per plan
- Use Pi Payment SDK
- ✅ Continue → `/register/create/select-template`

---

## 🎨 5. Template Selection

- **URL:** `/register/create/select-template`
- Users choose from 100+ templates
- ✅ Continue → `/register/create/select-platforms`

---

## 📱 6. Platform Selection

- **URL:** `/register/create/select-platforms`
- Question: _"Which platforms are you on?"_
- Icons shown: YouTube, TikTok, WhatsApp, Facebook, Instagram, Spotify, Website, etc.
- ✅ Continue → `/register/create/add-links`

---

## 🔗 7. Add Your Links

- **URL:** `/register/create/add-links`
- Paste URLs:
  - WhatsApp
  - YouTube
  - TikTok
  - Spotify
  - Personal Website
- Optional: Sync Pi profile  
  _Example:_ `profiles.pinet.com/profiles/@username`
- ✅ Continue → `/register/create/name-image-bio?{userPlan}EntryPoint=ON_SIGNUP`

---

## 📇 8. Profile Image, Title & Bio

- **URL:** `/register/create/name-image-bio`
- Upload or select profile avatar
- Add:
  - **Profile title**
  - **Bio** (max 80 characters)
- Button: _"Write my bio"_ (AI-generated)
- ✅ Continue → `/register/create/complete?{userPlan}EntryPoint=ON_SIGNUP`

---

## ✅ 9. Completion Page

- **URL:** `/register/create/complete`
- Message: _"Looking good! Your Droplink is off to a great start. Continue building to make it even better."_
- Preview profile: `droplink.space/@username`
- Button: _"Continue Building"_ → `/admin`

---

## 🛠️ 10. Admin Dashboard

- **URL:** `/admin`
- Live profile preview
- Sidebar:
  - **My Droplink**
  - **My Shop**
  - **Earn**
  - **Analytics**
  - **Tools**
  - **Social Planner**
  - **Instagram Auto-Reply**
  - **Link Shortener**
- Features based on selected plan:
  - Unlimited Links
  - .pi Domains
  - Pi Tips
  - Templates
  - QR Codes
  - Link Scheduler
  - Product Sales (Pro+)
  - Custom CSS (Premium)
- Real-time link editor:
  - Redirect
  - Thumbnail
  - Animate
  - Schedule
  - Lock
  - Analytics

---

## 💾 Supabase Backend Structure

- **Users Table**
  - id, email, pi_username, plan, avatar, created_at
- **Profiles Table**
  - username, title, bio, avatar_url, template_id
- **Links Table**
  - id, user_id, platform, url, clicks, metadata
- **Payments Table**
  - user_id, plan, pi_tx_hash, status, amount
- **Features Table**
  - user_id, flags: { can_schedule: true, can_sell: false, ... }

---

## 🔁 Dynamic Entry Point URLs

Redirect users based on plan selection:
- `/register/create/complete?freeEntryPoint=ON_SIGNUP`
- `/register/create/complete?basicEntryPoint=ON_SIGNUP`
- `/register/create/complete?proEntryPoint=ON_SIGNUP`
- `/register/create/complete?premiumEntryPoint=ON_SIGNUP`

---

## 📌 Notes

- All steps auto-save to Supabase.
- Support login resumption — user picks up from last step.
- Pi SDK used for auth and payments.
- Fully mobile-responsive UI.
- Inspired by Linktree, made for Pi.

---

