# 🎨 Design Guidelines – Droplet Pet App

---

## 🎯 Design Vision

Create an immersive, emotional, and interactive virtual pet game that responds to the user’s actions and time of day. The aesthetic is cute, responsive, and mobile-first, combining character expressions, animated rooms, and reward-based engagement.

---

## 📱 Layout & UI Structure

### Main Views
- **Welcome/Onboarding**
  - Character and mood selection
  - Simple, clean UI with animations
- **Play Area**
  - Fullscreen room layout (one room at a time)
  - Floating menu access (Home, Shop, Inventory, Pet Stats)
- **Shop**
  - Tabs: Food, Clothes, Themes, Accessories
  - Coin/PI display at top
- **Inventory**
  - Grid of owned items with drag-to-equip system
- **Wallet**
  - Coin balance
  - Buy Coins (Pi or Watch Ads)
  - Purchase History (optional)
- **Mini-Game Area**
  - Dedicated routes (future scope)

---

## 🌈 Theming & Styling

### Theme System
- Each room can have multiple purchasable themes (day/night/seasonal/holiday)
- Theme assets are applied using dynamic Tailwind classes or CSS modules
- Mascot will react differently per room (mood + expression)

### Color Scheme
- Soft pastels for pet-friendly vibes
- Responsive color accents per room:
  - Bedroom: Lavender/Blue
  - Kitchen: Orange/Yellow
  - Bathroom: Sky Blue
  - Playroom: Pink/Green
  - Nature: Green/Brown
  - Health: White/Teal

---

## 🧸 Mascot Design

- Rounded, soft, bouncy design
- SVG/Canvas-based with changeable facial expressions:
  - 😊 Happy (default)
  - 😴 Sleepy (closed eyes + Zzz)
  - 😢 Sad (tears, droopy face)
  - 🤒 Sick (green tint, fever animation)
  - 😋 Eating (chewing face)
  - 🛁 Bathing (bubble overlays)

---

## 🧩 Interactions

### Drag & Drop
- All rooms support drag-to-mascot interaction
- Example:
  - Drag apple → mascot eats
  - Drag soap → mascot starts bath
  - Drag ball → mascot jumps/plays

### Touch & Reactions
- Tap mascot → pet animation
- Long press → mood popup
- Room buttons trigger mascot emotion/room logic

---

## 📏 Responsive Layout

### Mobile First
- Fullscreen PWA layout (100vh)
- Sticky bottom nav for key actions
- Smooth transitions between rooms

### Desktop (Optional)
- Centered 900px view
- Responsive grid layout in Shop/Inventory

---

## 🔉 Audio & Feedback (Optional)

- UI Clicks, drag sounds
- Room ambiance (nature, bath water, night sounds)
- Mascot reaction sounds (giggle, snore, cry)

---

## 🔒 Accessibility

- Large tap targets
- Font size scaling
- Color contrast compliance
- ARIA roles for important controls

---

## 🔁 Animation Library Suggestions
- Framer Motion for React
- Anime.js
- GSAP (for advanced interactions)

---

## 🧪 Test Guidelines
- All interactions must update state in real time
- Coin transactions = transactional feedback (snackbar, sound)
- Room transitions = smooth + reactive
"""


