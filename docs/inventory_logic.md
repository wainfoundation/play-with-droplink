# 📦 `inventory_logic.md`

## Overview

The **Inventory System** enables users to manage items they acquire through the shop, rewards, or mini-games. Items are stored per user and can be equipped, consumed, or used in rooms to affect pet stats or visuals.

---

## 🧾 Inventory Table Schema (Supabase)

**Table: `inventory`**

| Column       | Type      | Description                              |
| ------------ | --------- | ---------------------------------------- |
| id           | UUID      | Unique item instance ID                  |
| user\_id     | UUID      | Foreign key to user                      |
| item\_id     | UUID      | Foreign key to `shop_items`              |
| quantity     | INT       | Number of items owned                    |
| equipped     | BOOLEAN   | If currently equipped (for themes, etc.) |
| acquired\_at | TIMESTAMP | When item was earned or bought           |

---

## 🎁 Shop Items Table Schema

**Table: `shop_items`**

| Column       | Type  | Description                              |
| ------------ | ----- | ---------------------------------------- |
| id           | UUID  | Item ID                                  |
| name         | TEXT  | Display name                             |
| type         | TEXT  | `food`, `theme`, `toy`, `medicine`, etc. |
| price\_coins | INT   | Cost in coins                            |
| effect       | JSONB | `{ hunger: +10, mood: +5 }` etc.         |
| room\_target | TEXT  | Room where this item can be used         |
| rarity       | TEXT  | `common`, `rare`, `legendary`, etc.      |

---

## 🛠 Using Items Logic

### 1. **Drag Item to Pet or Tap "Use" Button**

* UI checks if:

  * Item is usable in current room.
  * User has quantity > 0.

### 2. **Apply Effect & Decrease Inventory**

```ts
function useItem(userId, itemId) {
  const item = getShopItem(itemId);
  const userInventory = getUserInventory(userId, itemId);

  if (userInventory.quantity < 1) throw new Error("Not enough items");

  // Update pet stats
  updatePetStats(userId, item.effect);

  // Decrease quantity
  decreaseInventory(userId, itemId, 1);
}
```

---

## 📦 Adding Items (on purchase or reward)

```ts
function addItemToInventory(userId, itemId, amount = 1) {
  const existing = getUserInventory(userId, itemId);
  if (existing) {
    updateInventory(userId, itemId, existing.quantity + amount);
  } else {
    insertNewInventory(userId, itemId, amount);
  }
}
```

---

## 🎨 Equippable Items (Themes, Skins)

* **type = `theme`, `character_skin`**
* Equipping one item **unequips others** in same category.
* Stored in `inventory.equipped = true`

```ts
function equipItem(userId, itemId) {
  const item = getShopItem(itemId);
  if (item.type !== 'theme') throw new Error("Not equippable");

  unequipAll(userId, item.type);
  markAsEquipped(userId, itemId);
}
```

---

## 🎯 Item Categories & Examples

| Type             | Example Items          | Room Target | Stat Effect         |
| ---------------- | ---------------------- | ----------- | ------------------- |
| `food`           | Apple, Cake, Pizza     | Kitchen     | +10 hunger, +5 mood |
| `medicine`       | Pill, Vitamin Syrup    | Health      | +15 health          |
| `toy`            | Ball, Plushie          | Play Room   | +15 mood            |
| `theme`          | Cloud Room, Beach Room | Any room    | Visual only         |
| `decor`          | Plant, Lamp, Rug       | Room        | Visual / Mood Boost |
| `character_skin` | Dino Skin, Angel Skin  | N/A         | Visual              |

---

## ⏱ Real-Time Sync

* Inventory updates sent to Supabase immediately after item usage or purchase.
* UI re-renders automatically based on live queries or useSWR hook (React).

---

## ✅ Example Use Case: Feed Apple

1. User drags Apple to pet.
2. System checks item type = `food`, current room = `kitchen`.
3. Applies effect: `+10 hunger`, `+5 mood`.
4. Updates pet stats and inventory.

---

## 🚫 Handling Edge Cases

| Case                     | Result                                        |
| ------------------------ | --------------------------------------------- |
| Not enough item quantity | Error toast: "You don’t have this item!"      |
| Using item in wrong room | Shake animation + info: "Use this in Kitchen" |
| No equipped theme        | Show default theme                            |
| Invalid item ID          | Prevent usage + log                           |

---

## 📘 Future Enhancements

* Crafting system: Combine items to create rare ones.
* Limited-time seasonal items.
* Items with XP boosts or evolution effects.
* Timed items (expire after N hours).

---
