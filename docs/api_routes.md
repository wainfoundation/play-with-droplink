# API Routes Documentation

## Overview

This document lists all backend API routes for Droplet Pet App, specifying HTTP methods, purpose, request/response formats, and authorization requirements.

---

## User & Authentication

| Route              | Method | Description                       | Request Body / Params    | Response                             | Auth Required |
| ------------------ | ------ | --------------------------------- | ------------------------ | ------------------------------------ | ------------- |
| `/api/auth/login`  | POST   | Logs in user (currently disabled) | `{ username, password }` | `{ token, user }`                    | No            |
| `/api/auth/logout` | POST   | Logs out current user             | -                        | `{ success: true }`                  | Yes           |
| `/api/auth/status` | GET    | Checks login status               | -                        | `{ loggedIn: boolean, user?: User }` | No            |

---

## Pet & Character

| Route                | Method | Description                    | Request Body / Params   | Response                             | Auth Required |
| -------------------- | ------ | ------------------------------ | ----------------------- | ------------------------------------ | ------------- |
| `/api/pets`          | GET    | Get all pets available in shop | -                       | `[ { id, name, baseStats, price } ]` | No            |
| `/api/pets/selected` | GET    | Get user’s selected pet        | userId (query or token) | `{ petId, mood, level, stats }`      | Yes           |
| `/api/pets/select`   | POST   | Select/change pet              | `{ petId, mood }`       | `{ success: true }`                  | Yes           |
| `/api/pets/stats`    | GET    | Get current pet stats          | userId                  | `{ energy, hunger, health, ... }`    | Yes           |

---

## Stats & Gameplay

| Route               | Method | Description                        | Request Body / Params               | Response                      | Auth Required |
| ------------------- | ------ | ---------------------------------- | ----------------------------------- | ----------------------------- | ------------- |
| `/api/stats/update` | POST   | Update pet stats (decay + actions) | `{ energyDelta, hungerDelta, ... }` | `{ success: true, newStats }` | Yes           |
| `/api/stats/get`    | GET    | Get current stats                  | userId (query or token)             | `{ stats }`                   | Yes           |
| `/api/stats/reset`  | POST   | Reset stats (on pet evolution)     | `{ userId }`                        | `{ success: true }`           | Yes           |

---

## Shop & Inventory

| Route                  | Method | Description         | Request Body / Params          | Response                                      | Auth Required |
| ---------------------- | ------ | ------------------- | ------------------------------ | --------------------------------------------- | ------------- |
| `/api/shop/items`      | GET    | List all shop items | -                              | `[ { id, name, category, price, effect } ]`   | No            |
| `/api/shop/buy`        | POST   | Buy an item         | `{ userId, itemId, quantity }` | `{ success: true, newBalance, newInventory }` | Yes           |
| `/api/inventory`       | GET    | Get user inventory  | userId                         | `[ { itemId, quantity, equipped } ]`          | Yes           |
| `/api/inventory/equip` | POST   | Equip an item       | `{ userId, itemId }`           | `{ success: true }`                           | Yes           |

---

## Coins & Payments

| Route                | Method | Description                    | Request Body / Params     | Response                                    | Auth Required                   |     |
| -------------------- | ------ | ------------------------------ | ------------------------- | ------------------------------------------- | ------------------------------- | --- |
| `/api/coins/balance` | GET    | Get user coin balance          | userId                    | `{ coins }`                                 | Yes                             |     |
| `/api/coins/earn`    | POST   | Earn coins (e.g. watching ads) | \`{ userId, source: 'ads' | 'dailyReward', amount }\`                   | `{ success: true, newBalance }` | Yes |
| `/api/coins/buy`     | POST   | Buy coins using Pi payment     | `{ userId, piAmount }`    | `{ success: true, coinsAdded, newBalance }` | Yes                             |     |

---

## Level & XP

| Route               | Method | Description             | Request Body / Params | Response                             | Auth Required |
| ------------------- | ------ | ----------------------- | --------------------- | ------------------------------------ | ------------- |
| `/api/level/get`    | GET    | Get user pet level & XP | userId                | `{ level, currentXP, nextLevelXP }`  | Yes           |
| `/api/level/add-xp` | POST   | Add XP to pet           | `{ userId, amount }`  | `{ success: true, newLevel, newXP }` | Yes           |

---

## Notifications & Rewards

| Route                     | Method | Description               | Request Body / Params       | Response                         | Auth Required |
| ------------------------- | ------ | ------------------------- | --------------------------- | -------------------------------- | ------------- |
| `/api/rewards/daily`      | POST   | Claim daily coin reward   | `{ userId }`                | `{ success: true, coinsEarned }` | Yes           |
| `/api/notifications/send` | POST   | Send notification to user | `{ userId, message, type }` | `{ success: true }`              | Yes           |

---

## Notes

* All user-specific routes require authentication token validation.
* Request/Response bodies use JSON format.
* Pi payment integration uses a secure backend process to verify and credit coins.
* Ad reward earnings are tracked with cooldowns to prevent abuse.

---





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

