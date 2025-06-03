# 📢 ads/CHANGELOG.md

This changelog tracks all updates to the Ads & Reward Coin System — including rewarded Pi Ads, cooldown handling, and coin granting logic.

---

## [1.0.0] – 2025-06-03
### 🎉 Stable Production Release

#### ✅ Core Features
- Integrated Pi Ad SDK (Rewarded Ads)
- Reward logic grants `+1 Coin` per ad view
- `POST /api/reward-coin` API route with server-side cooldown validation
- Coin reward cooldown: 1 ad per 5 minutes per user
- Ad modal dialog with countdown and success/failure fallback
- Auto-add rewarded coin to user wallet and show toast alert
- Coin cap system (Max 20 coins/day via ads per user)
- Rewards logged in `ads_rewards` table (user_id, timestamp, IP/device)

#### 🔁 UX Improvements
- "Watch Ad to Earn Coin" button with disabled state on cooldown
- Real-time cooldown timer on button
- Feedback: “✅ +1 Coin earned!” / “⏱ Try again in X minutes”
- Error fallback: “🚫 Failed to load ad. Please try again.”

---

## [0.7.0] – 2025-05-29
### 🧪 Testing Phase

- Initial `showRewardAd()` function with mock ad reward
- LocalStorage-based cooldown tracking (for frontend-only testing)
- Toast notification for test reward
- API stubbed `/api/reward-coin` with mock success

---

## [0.5.0] – 2025-05-27
### 🛠️ Backend Logic

- Supabase function: validate and grant coin reward
- Cooldown logic with Supabase timestamp diff per user
- `ads_rewards` table schema finalized
- Initial deployment of `/api/reward-coin`

---

## [0.3.0] – 2025-05-25
### 🧪 Initial Integration

- Pi SDK injected and initialized
- Test rewarded ad shown in modal
- Button UI prototype created

---

## [0.1.0] – 2025-05-24
### 🧱 Initial Planning

- Planned Reward Coin system
- Defined `1 Ad = 1 Coin`, cooldowns, abuse protection
- Designed Ads UI layout and backend schema

---
