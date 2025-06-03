# 🌊 Droplet Pet App

A full-featured virtual pet game built with **Next.js**, **Supabase**, and **Pi Network SDK**, where users raise, care for, and interact with unique digital mascots. Droplet combines gamified self-care, Pi-powered microtransactions, mood-based AI, and immersive room-based interaction.

---

## 📱 Features

* 🎭 **Character System** — Choose from unique Droplet pets with real emotional states (happy, sad, hungry, tired, etc.)
* 🛏️ **Room-Based Interactions** — Kitchen, Bedroom, Bath, Playroom, Health Room, and more
* 🎮 **Mini-Games** — (Coming Soon) Earn XP and coins while playing
* 🧠 **Real-Time Mood Engine** — Stats like hunger, energy, hygiene, etc. change based on real-time and user care
* 🛒 **Shop & Inventory** — Buy food, clothes, themes, medicine using coins or Pi
* 🪙 **Coin Economy** — Earn coins by watching Pi Ads, caring for your pet, leveling up, or buying with Pi
* 🧬 **XP & Level System** — Level up your pet by caring, playing, or watching ads
* 🌌 **Theme System** — Unlock and customize room themes for deeper immersion
* 🔔 **Notification System** — Local notifications to remind you to care for your pet
* 🔐 **Auth (Optional)** — Powered by Pi Network Auth or Supabase email login

---

## 🧱 Tech Stack

* **Frontend:** Next.js + Tailwind CSS
* **Backend:** Supabase (DB, Auth, Functions, Realtime)
* **Payments:** Pi Network SDK (Ads, Payments, Auth)
* **Storage:** Supabase Storage for assets/themes
* **Deployment:** Vercel (CI/CD), .env support

---

## 🔧 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-user/droplet-pet-app.git
cd droplet-pet-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

NEXT_PUBLIC_PI_APP_ID=your_pi_app_id
NEXT_PUBLIC_PI_API_KEY=your_pi_api_key
```

### 4. Run locally

```bash
npm run dev
```

---

## 🚀 Deploy to Production

This project is Vercel-ready. See [`deployment_guide.md`](deployment_guide.md) for full steps.

---

## 📁 Key Docs

* [`implementation_plan.md`](implementation_plan.md) — Feature roadmap and rollout plan
* [`database_schema.md`](database_schema.md) — Supabase schema with all tables
* [`api_routes.md`](api_routes.md) — REST endpoints for coin, XP, rewards, pets
* [`stat_engine.md`](stat_engine.md) — Real-time pet mood engine logic
* [`reward_system.md`](reward_system.md) — Coin rewards, ads logic, daily streaks
* [`themes_and_rooms.md`](themes_and_rooms.md) — Room types, themes, unlockable items
* [`inventory_logic.md`](inventory_logic.md) — Inventory system, equip/unequip logic
* [`mini_games.md`](mini_games.md) — Planned and active minigames
* [`pi_payment_integration.md`](pi_payment_integration.md) — Buy coins via Pi

---

## ✨ How It Works

### 🎭 Character System

User selects a character only once at the beginning. New characters can be bought in the shop.

### 🧪 Mood System

The pet has stats like:

* `hunger`
* `energy`
* `hygiene`
* `happiness`

If neglected, pet shows sadness, gets sick, or cries. Pet interactions like eating, sleeping, and bathing are done via drag-and-drop in rooms.

### 🛒 Shop System

Buy:

* Food (apple, burger, etc.)
* Clothes
* Room Themes
* Medicine
* Characters
* Energy boosters

Using:

* Droplet Coins (earned)
* Pi Network payments

### 🧬 Leveling System

Earn XP by:

* Caring for the pet
* Watching rewarded ads
* Playing games (coming soon)

Level up increases daily coin earnings.

---

## 📦 Planned Features

* ✅ Coin Store (watch ads or buy with Pi)
* ✅ XP System & Level Up
* ✅ Character Emotions
* ✅ Room-Based UI
* ✅ Inventory System
* ✅ Shop Enhancements
* ⏳ Mini-Games
* ⏳ Evolution / Rebirth System
* ⏳ Friends System

---

## 📜 License

MIT © \[mrwainorganization]

---

