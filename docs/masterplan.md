## 🧠 Droplet Pet App: `masterplan.md`

### 📌 Project Overview

> A Pi-integrated virtual pet app where users care for a pet mascot (Droplet) with emotional moods, real-time needs, and a reward ecosystem based on attention and interaction.

---

## 🚀 Feature Checklist

### ✅ Core Features

* [x] Character selection (one per user)
* [x] Real-time pet mood & emotion engine
* [x] Room-based system (Bedroom, Bath, Play, Food, Health, Nature)
* [x] Pet stat decay (hunger, energy, mood, sickness, etc.)
* [x] Drag-and-drop room interactions (e.g. apple to mouth, ball to mascot)
* [x] Sleep mode (lamp interaction)
* [x] Inventory system (item count, use logic)
* [x] Shop system with food, accessories, and themes
* [x] Coin system
* [x] Coin store (buy coins via Pi or earn via ads)
* [x] Reward engine (watch ads = +1 coin, streaks)
* [x] Level system (XP, pet levels, XP bar)
* [x] Pet facial expressions based on mood/stats
* [x] Equip themes per room
* [x] Full mobile layout & PWA ready

---

## 🧱 Architecture

### ⚙️ Tech Stack

| Layer      | Tech                         |
| ---------- | ---------------------------- |
| Frontend   | React + Tailwind CSS         |
| State Mgmt | Zustand                      |
| Backend    | Supabase (DB, Auth, Storage) |
| Payments   | Pi SDK                       |
| Deployment | Vercel / Netlify             |

---

## 📁 Pages

| Route        | Description                            |
| ------------ | -------------------------------------- |
| `/welcome`   | Character selection/onboarding         |
| `/play`      | Main interaction room (dynamic layout) |
| `/shop`      | Coin & item store                      |
| `/inventory` | Manage and equip items/themes          |
| `/wallet`    | Buy coins with Pi or watch ads         |
| `/stats`     | Pet mood, level, XP, coin income       |
| `/settings`  | Sound, theme, logout                   |

---

## 🐾 Pet System

### 🎭 Emotion Engine

* Happy 😄 → Smiling
* Hungry 😫 → Stomach growl face
* Sleepy 😴 → Drooping eyes + Zzz
* Sick 🤒 → Pale face + shiver
* Dirty 😖 → Frowning, dirty visuals

### 📊 Stats (realtime decay)

| Stat        | Affects...    | Auto Decay  |
| ----------- | ------------- | ----------- |
| Hunger      | Mood, Health  | Every 3 hrs |
| Energy      | Mood, XP gain | Every 4 hrs |
| Cleanliness | Mood          | Every 5 hrs |
| Sickness    | Health, Mood  | Conditional |
| Mood        | Emoji & sound | Composite   |

---

## 🛒 Shop

### Categories

* 🍎 Food (e.g. Apple, Bread)
* 🧼 Hygiene (Soap, Shampoo)
* 🧸 Toys (Ball, Blocks)
* 💊 Medicine (Health kits)
* 🖼️ Themes (Room backgrounds)
* 👕 Skins (Change pet outfit)
* 🌟 Boosters (XP or mood)

### Coin Pricing

* Small item = 2–10 coins
* Medium item = 20–100 coins
* Premium = 200–5000 coins (e.g. car, luxury house)

---

## 💰 Coin System

### Coin Income Sources

| Action      | Reward        |
| ----------- | ------------- |
| Watch ad    | +1 coin       |
| Feed pet    | +0.5 coin     |
| Daily login | +2 to +10     |
| Level up    | +5–100        |
| Pi Payment  | Based on tier |

### Pi Purchase Tiers

| Pi    | Coins      |
| ----- | ---------- |
| 1 π   | 10 Coins   |
| 10 π  | 100 Coins  |
| 12 π  | 150 Coins  |
| 50 π  | 1000 Coins |
| 100 π | 5000 Coins |

---

## 🧪 Level System

| Level | XP Required | Daily Coin Gen |
| ----- | ----------- | -------------- |
| 0     | 0           | 1              |
| 1     | 100 XP      | 2              |
| 2     | 200 XP      | 3              |
| 3     | 500 XP      | 5              |
| 4     | 1000 XP     | 10             |
| ...   | ...         | ...            |

> XP is earned from playing, feeding, petting, bathing, and watching ads (+1% XP)

---

## 📦 Inventory System

* Items stored by type + quantity
* Drag item → Pet to use
* If equipped (e.g. theme), preview is updated in room
* Use removes one count

---

## 🌙 Room System

| Room     | Trigger                   | Mood Effect            |
| -------- | ------------------------- | ---------------------- |
| Bedroom  | Click lamp → sleep + ZZZ  | +Energy, Zzz animation |
| Bathroom | Drag soap/shower → clean  | +Cleanliness           |
| Playroom | Drag toy → play animation | +Mood                  |
| Kitchen  | Drag food → eating        | +Hunger                |
| Health   | Drag medicine → heal      | -Sickness              |
| Nature   | Open room → gain +XP      | +Mood                  |

---

## 🏁 To-Do for Final Production

* [ ] Full `/play` animation logic
* [ ] `/shop` buying logic with Pi integration
* [ ] Coin store (watch ads or buy Pi)
* [ ] Drag-and-drop use in every room
* [ ] Theme preview system
* [ ] Save all stats in Supabase
* [ ] Add mobile install (PWA support)
* [ ] Sound FX & transitions
* [ ] Add minigame route (placeholder)


