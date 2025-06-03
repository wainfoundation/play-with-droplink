# 🧩 Supabase Database Schema – Droplet Pet App

---

## 🧑 users

| Column        | Type      | Description                    |
|---------------|-----------|--------------------------------|
| id            | uuid      | Primary Key (User ID)          |
| username      | text      | User handle                    |
| created_at    | timestamp | Account creation date          |

---

## 🐾 pets

| Column        | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| id            | uuid      | Primary Key                          |
| user_id       | uuid      | Foreign key → users.id               |
| character     | text      | Chosen character name (e.g. Droplet) |
| mood          | text      | Current mood                         |
| level         | int       | Current XP level                     |
| xp            | int       | Total XP accumulated                 |

---

## 📊 pet_stats

| Column        | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary Key                |
| pet_id        | uuid      | FK → pets.id               |
| energy        | int       | 0–100                      |
| hunger        | int       | 0–100                      |
| happiness     | int       | 0–100                      |
| hygiene       | int       | 0–100                      |
| health        | int       | 0–100                      |
| last_updated  | timestamp | For real-time updates      |

---

## 🪙 coins

| Column        | Type      | Description                    |
|---------------|-----------|--------------------------------|
| user_id       | uuid      | FK → users.id                  |
| balance       | int       | User coin balance              |

---

## 🎒 inventory

| Column        | Type      | Description                      |
|---------------|-----------|----------------------------------|
| id            | uuid      | Primary Key                      |
| user_id       | uuid      | FK → users.id                    |
| item_id       | uuid      | FK → shop_items.id               |
| quantity      | int       | How many owned                  |

---

## 🛍️ shop_items

| Column        | Type      | Description                            |
|---------------|-----------|----------------------------------------|
| id            | uuid      | Primary Key                            |
| name          | text      | Item name                              |
| type          | text      | food / theme / decor / medicine        |
| price_coins   | int       | Cost in coins                          |
| price_pi      | int       | Cost in Pi                             |
| effect        | jsonb     | Stat changes on use (e.g. +5 hunger)   |

---

## 🧪 themes

| Column        | Type      | Description                            |
|---------------|-----------|----------------------------------------|
| id            | uuid      | Primary Key                            |
| name          | text      | Theme name                             |
| room          | text      | Room it applies to (e.g. bedroom)      |
| image_url     | text      | Theme background                       |
| price_coins   | int       | Cost in coins                          |

---

## 🧾 transactions

| Column        | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| id            | uuid      | Primary Key                          |
| user_id       | uuid      | FK → users.id                        |
| type          | text      | purchase / reward / xp / pet gift    |
| amount        | int       | Coin amount or XP                    |
| created_at    | timestamp | When it happened                     |

