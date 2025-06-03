# 🌐 API Routes – Droplet Pet App

These RESTful endpoints power the backend of Droplet using Supabase or your custom API server.

---

## 📁 Authentication

| Method | Route              | Description                        |
|--------|--------------------|------------------------------------|
| GET    | /auth/me           | Get current user session           |
| POST   | /auth/login        | (Future) Login with Pi             |
| POST   | /auth/logout       | Clear session                      |

---

## 🐾 Pet & Stats

| Method | Route                  | Description                                   |
|--------|------------------------|-----------------------------------------------|
| GET    | /pet                   | Get current user's pet & mood                 |
| POST   | /pet                   | Create pet on first welcome screen            |
| PATCH  | /pet/mood              | Update pet mood based on room or user action  |
| PATCH  | /pet/stats             | Update pet stats (energy, hunger, happiness)  |

---

## 🎒 Inventory

| Method | Route                  | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | /inventory             | Get all user-owned items             |
| POST   | /inventory/add         | Add new item (after purchase)        |
| PATCH  | /inventory/use         | Use item and apply stat changes      |
| DELETE | /inventory/remove      | Remove item manually                 |

---

## 🛍️ Shop & Items

| Method | Route              | Description                              |
|--------|--------------------|------------------------------------------|
| GET    | /shop/items        | Get all shop items (paginated, category) |
| POST   | /shop/buy          | Buy an item using coins or Pi            |

---

## 🪙 Wallet & Coins

| Method | Route              | Description                                |
|--------|--------------------|--------------------------------------------|
| GET    | /wallet            | Get user's current coin balance            |
| POST   | /wallet/earn       | Add 1 coin (from watching ad)              |
| POST   | /wallet/spend      | Spend coins on item purchase               |
| POST   | /wallet/buy        | Purchase coin packs using Pi               |

---

## 🎮 Games & Rewards

| Method | Route              | Description                        |
|--------|--------------------|------------------------------------|
| POST   | /reward/ads        | Add 1 coin from rewarded video ad  |
| POST   | /reward/daily      | Claim daily login reward           |
| POST   | /reward/petGift    | Pet gave you coins (based on level)|
| GET    | /levels            | Get XP level chart                 |
| POST   | /levels/gain       | Add XP from interactions/ads       |

---

## 🎨 Room & Theme

| Method | Route              | Description                            |
|--------|--------------------|----------------------------------------|
| GET    | /room              | Get current equipped room              |
| POST   | /room/change       | Change room (bedroom, kitchen, etc.)   |
| POST   | /theme/equip       | Equip purchased theme in a room        |
| GET    | /theme/list        | List all purchasable room themes       |

