
# 🛠️ Full Implementation Plan – Droplet Pet App

---

## Phase 1: Core Feature Setup (MVP)

### ✅ Character & Mood System
- [x] Character selection during onboarding
- [x] User can only select one pet at a time
- [x] Mood selection (Happy, Hungry, Sad, Sick, Sleepy, Playful)
- [x] Character face reacts to mood and room environment
- [x] Mood & character saved in localStorage (temporary), later moved to Supabase

### ✅ Stat Engine System
- [x] Real-time decay of pet stats (hunger, sleep, cleanliness, happiness, health)
- [x] Stats updated by user interactions (feeding, bathing, sleeping)
- [x] Drag-to-interact room item system (e.g., apple to mouth, soap to mascot)

### ✅ Room-Based Interaction System
- [x] Bedroom: Sleep (lamp interaction dims lights + Zzz)
- [x] Kitchen: Food items drag interaction
- [x] Bathroom: Soap/shower interaction
- [x] Playroom: Toy interactions
- [x] Nature: Mood/energy boost zone
- [x] Health: Medicine drag interaction

---

## Phase 2: Coin, Shop & Rewards System

### 🪙 Coin System
- [x] Earn 1 coin per ad view (Pi Ads integration)
- [ ] Pi Payment Integration: Buy coins (e.g., 1 Pi = 10 Coins, 10 Pi = 100 Coins, 12 Pi = 150 Coins)
- [x] Pet Level Rewards: Droplet gives coins daily based on XP level
- [x] Coin Wallet UI with balance and buy/earn options

### 🛍️ Shop & Inventory
- [x] Shop categories: Food, Clothes, Themes, Decor, Skins
- [x] 100+ purchasable items (from 2 to 5000 coins)
- [x] Room themes purchasable in shop (e.g., Bedroom Theme, Kitchen Theme)
- [x] Real-time inventory management (drag-to-equip, stat bonuses)
- [x] Coin deduction logic + Pi fallback if not enough

---

## Phase 3: XP, Level, Missions

### ⬆️ XP & Pet Level System
- [x] Earn XP through daily care, playing, watching ads
- [x] Pet Level = More coins generated per day
- [ ] XP bar increases by 1% per ad view
- [ ] Level table: Level 0 = 1 coin/day, Level 5 = 10 coins/day, etc.

### 🎯 Missions & Events
- [ ] Daily Missions (e.g., Feed 2x, Sleep 1x)
- [ ] Weekly Streak Rewards
- [ ] Unlock Evolution Stages (cosmetic upgrades)

---

## Phase 4: UI, Mobile & Full Experience Polish

### 📱 Responsive Design
- [x] Mobile fullscreen layout
- [x] PWA-ready structure for offline use
- [x] Room-specific themes based on equipped items

### 🖼️ Character & Room Enhancements
- [x] Pet facial expression changes per stat
- [x] Pet reacts to touch, drag, actions
- [ ] Pet animations (eat, sleep, sad, happy)
- [ ] Room dimming, sound effects, weather (nature room)

---

## Phase 5: Production Setup & Backend

### 🔐 Supabase Integration
- [x] Supabase tables: users, stats, inventory, coins, xp, logs
- [ ] Real-time updates for all rooms/stat changes
- [ ] AuthGuard optional for testing, enforced for production

### 🚀 Deployment & Maintenance
- [ ] .env configuration for Supabase, Pi SDK
- [ ] Production setup on Vercel
- [ ] Scheduled functions (coin drop, stat decay)
- [ ] QA testing, bug fixing, launch

---

## Bonus Phase: Mini-Games & Social

### 🕹️ Mini-Games (Future Scope)
- Memory match
- Fruit catch
- Puzzle boost

### 🧑‍🤝‍🧑 Social Layer
- Droplink Mates: User friends, rooms
- Public rooms to show off decorated themes
"""


