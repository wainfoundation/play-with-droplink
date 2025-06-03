# Database Schema Documentation

## Overview

This document describes the database schema for the Droplet Pet App, including tables, columns, data types, and relationships.

---

## Tables

### 1. users

| Column            | Type      | Description                        |
| ----------------- | --------- | ---------------------------------- |
| id                | UUID (PK) | Unique user identifier             |
| username          | VARCHAR   | Username                           |
| email             | VARCHAR   | User email                         |
| created\_at       | TIMESTAMP | Account creation timestamp         |
| updated\_at       | TIMESTAMP | Last profile update timestamp      |
| selected\_pet\_id | UUID (FK) | Currently selected pet             |
| coin\_balance     | INTEGER   | User's current coin balance        |
| pi\_balance       | FLOAT     | User’s Pi coin balance (if stored) |

---

### 2. pets

| Column       | Type      | Description               |
| ------------ | --------- | ------------------------- |
| id           | UUID (PK) | Unique pet identifier     |
| name         | VARCHAR   | Pet name                  |
| base\_energy | INTEGER   | Base energy stat          |
| base\_hunger | INTEGER   | Base hunger stat          |
| base\_health | INTEGER   | Base health stat          |
| price\_coins | INTEGER   | Price in coins to buy pet |
| created\_at  | TIMESTAMP | Timestamp                 |
| updated\_at  | TIMESTAMP | Timestamp                 |

---

### 3. moods

| Column         | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| id             | UUID (PK) | Unique mood identifier            |
| name           | VARCHAR   | Mood name (e.g., Happy, Hungry)   |
| icon           | VARCHAR   | Icon or emoji for mood (optional) |
| effect\_energy | INTEGER   | Energy effect (positive/negative) |
| effect\_hunger | INTEGER   | Hunger effect                     |
| effect\_health | INTEGER   | Health effect                     |

---

### 4. user\_pets

| Column            | Type      | Description                   |
| ----------------- | --------- | ----------------------------- |
| id                | UUID (PK) | Unique user-pet instance      |
| user\_id          | UUID (FK) | Reference to user             |
| pet\_id           | UUID (FK) | Reference to pet              |
| current\_mood\_id | UUID (FK) | Current mood                  |
| level             | INTEGER   | Pet level                     |
| experience        | INTEGER   | XP points                     |
| energy            | INTEGER   | Current energy stat           |
| hunger            | INTEGER   | Current hunger stat           |
| health            | INTEGER   | Current health stat           |
| last\_updated     | TIMESTAMP | Timestamp of last stat update |
| created\_at       | TIMESTAMP | Timestamp                     |
| updated\_at       | TIMESTAMP | Timestamp                     |

---

### 5. shop\_items

| Column        | Type      | Description                                            |
| ------------- | --------- | ------------------------------------------------------ |
| id            | UUID (PK) | Unique item identifier                                 |
| name          | VARCHAR   | Item name                                              |
| category      | VARCHAR   | Category (Food, Clothes, Medicine, Theme, etc.)        |
| description   | TEXT      | Description                                            |
| price\_coins  | INTEGER   | Price in coins                                         |
| price\_pi     | FLOAT     | Optional price in Pi                                   |
| stat\_effects | JSONB     | JSON object for stat effects, e.g., `{ "energy": +5 }` |
| created\_at   | TIMESTAMP | Timestamp                                              |
| updated\_at   | TIMESTAMP | Timestamp                                              |

---

### 6. user\_inventory

| Column      | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| id          | UUID (PK) | Unique inventory record                |
| user\_id    | UUID (FK) | User owning the item                   |
| item\_id    | UUID (FK) | Reference to shop item                 |
| quantity    | INTEGER   | Number of this item owned              |
| equipped    | BOOLEAN   | Whether the item is currently equipped |
| created\_at | TIMESTAMP | Timestamp                              |
| updated\_at | TIMESTAMP | Timestamp                              |

---

### 7. coins\_transactions

| Column      | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| id          | UUID (PK) | Unique transaction id                   |
| user\_id    | UUID (FK) | User involved                           |
| type        | VARCHAR   | Transaction type (earn, spend, buy)     |
| amount      | INTEGER   | Number of coins                         |
| source      | VARCHAR   | Source description (e.g., ad, purchase) |
| created\_at | TIMESTAMP | Timestamp                               |

---

### 8. pet\_levels

| Column       | Type         | Description                          |
| ------------ | ------------ | ------------------------------------ |
| level        | INTEGER (PK) | Level number                         |
| xp\_required | INTEGER      | XP points needed to reach this level |

---

### 9. user\_levels

| Column        | Type          | Description       |
| ------------- | ------------- | ----------------- |
| user\_id      | UUID (PK, FK) | User reference    |
| pet\_level    | INTEGER       | Current pet level |
| current\_xp   | INTEGER       | Current XP        |
| last\_updated | TIMESTAMP     | Timestamp         |

---

### 10. rooms

| Column      | Type      | Description                              |
| ----------- | --------- | ---------------------------------------- |
| id          | UUID (PK) | Unique room id                           |
| name        | VARCHAR   | Room name (Bedroom, Kitchen, Bath, etc.) |
| theme       | VARCHAR   | Theme identifier or URL                  |
| created\_at | TIMESTAMP | Timestamp                                |
| updated\_at | TIMESTAMP | Timestamp                                |

---

### 11. user\_room\_themes

| Column      | Type      | Description    |
| ----------- | --------- | -------------- |
| id          | UUID (PK) | Unique record  |
| user\_id    | UUID (FK) | User reference |
| room\_id    | UUID (FK) | Room reference |
| theme       | VARCHAR   | Selected theme |
| purchased   | BOOLEAN   | If purchased   |
| created\_at | TIMESTAMP | Timestamp      |
| updated\_at | TIMESTAMP | Timestamp      |

---

## Notes:

* **Timestamps** default to `NOW()` on insert.
* Use UUIDs for strong unique keys.
* Relationships are enforced with foreign key constraints.
* `stat_effects` in shop items allow flexible effects on pet stats.
* User stats and levels update frequently based on interaction.
* Coins and transactions track economy for audit and rollback.

---




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

