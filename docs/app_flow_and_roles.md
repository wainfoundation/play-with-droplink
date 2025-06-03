## 🌐 App Navigation Overview

### 1. Welcome Flow
- Character selection
- Mood selection
- Starter coin reward
- Redirect to `/play`

### 2. Main Game Loop
- Route: `/play`
- Pet appears in selected room (Bedroom, Kitchen, etc.)
- Stats update in real time
- Drag & drop items to interact
- Menu button → Open navigation (Inventory, Shop, Wallet)

### 3. Shop Flow
- Route: `/shop`
- Categories: Food, Themes, Accessories, Characters
- Item preview, price, and buy button
- Currency: Coins or Pi
- Purchase triggers inventory update

### 4. Inventory Flow
- Route: `/inventory`
- Shows owned items
- Drag to equip or use
- Used items update pet stats and animation

### 5. Wallet Flow
- Route: `/wallet`
- View coins balance
- Buy coins using Pi or watch ads (Pi Ads SDK)
- View past rewards/purchases

### 6. Room System
- Available Rooms:
  - Bedroom
  - Kitchen
  - Bathroom
  - Playroom
  - Health Room
  - Nature/Outside
- Each room has special items and animations
- Room themes can be purchased and equipped
- Room mood affects mascot expressions

### 7. Mini-Game Flow (Coming Soon)
- Route: `/games`
- Games to earn coins, XP
- Score-based rewards
- Play limit per day

---

## 👤 User Roles

### Guest (No login)
- Choose character & mood
- Play game freely
- Items saved to `localStorage` (demo mode)
- Cannot sync inventory or stats across devices

### Registered User (Future)
- Auth via Pi Network
- Inventory and coins saved in Supabase
- Pet stats persist across sessions/devices
- Can access exclusive premium features (e.g. daily streaks, XP leaderboard)

### Admin (Developer Mode)
- Add/remove items from shop
- Approve Pi payments
- Manage coin packages & ads reward rates
- Monitor stats/abuse prevention
- Roll out feature flags

---

## 🧭 Navigation Summary

| Page       | Path         | Purpose                              |
|------------|--------------|--------------------------------------|
| Welcome    | `/`          | Onboard new player, select pet/mood  |
| Game       | `/play`      | Main interaction space               |
| Shop       | `/shop`      | Buy food, themes, accessories        |
| Inventory  | `/inventory` | Use/equip owned items                |
| Wallet     | `/wallet`    | Buy coins, view balance              |
| Games      | `/games`     | (Coming soon) Mini-games             |

---

## 🔁 Core State Sync

- Pet mood, stats, room, inventory synced via Supabase (for registered users)
- LocalStorage fallback for guests
- Real-time feedback for all user actions (animations, sounds, snackbar)

"""

