# 🎨 `themes_and_rooms.md`

## Overview

Rooms and themes are core components of the Droplet Pet App. Each room represents a specific environment (e.g., Kitchen, Bedroom, Playroom), and users can customize them using unlockable or purchasable **themes**. Each room is associated with specific pet actions and interactions, and changing themes affects the visual atmosphere and emotional tone of the room.

---

## 🏠 Core Rooms

| Room          | Purpose                 | Available Interactions                    |
| ------------- | ----------------------- | ----------------------------------------- |
| Bedroom       | Sleep / Energy recovery | Click lamp to dim, pet sleeps (ZZZ...)    |
| Kitchen       | Eating / Feeding        | Drag food item to pet                     |
| Bathroom      | Hygiene / Bathing       | Drag soap, water button → clean pet       |
| Playroom      | Fun / Mood boost        | Drag toys like ball, plushie              |
| Health Room   | Heal / Give medicine    | Drag medicine to pet                      |
| Garden/Nature | Fresh air / Chill mood  | Boost happiness via flowers, nature items |

---

## 🛏️ Theme System

Themes change the **background** and **UI accents** of a room.

### Theme Table Schema (`shop_items` with `type: "theme"`)

| Column       | Type    | Description                      |
| ------------ | ------- | -------------------------------- |
| id           | UUID    | Theme ID                         |
| name         | TEXT    | Display name                     |
| room\_target | TEXT    | Which room this theme applies to |
| price\_coins | INT     | Cost in coins                    |
| image\_url   | TEXT    | Background image                 |
| rarity       | TEXT    | `common`, `rare`, `epic`         |
| is\_default  | BOOLEAN | If this is a default theme       |

---

### 🔁 Theme Equipping Logic

* One theme can be equipped **per room**.
* Default theme is loaded if no custom theme equipped.
* Equipped themes are stored in the `inventory` table with `equipped: true`.

```ts
function equipTheme(userId, themeId, room) {
  // Unequip other themes in that room
  unequipThemes(userId, room);
  markAsEquipped(userId, themeId);
}
```

---

## 🧑‍🎨 UI Logic

Each room has:

* A `RoomContainer` that handles layout and room-based logic.
* A `RoomBackground` component that renders the theme image.
* A `RoomActionPanel` (per room) for available interactions (drag, buttons).

```tsx
<RoomContainer room="bedroom">
  <RoomBackground room="bedroom" />
  <PetMascot />
  <RoomActionPanel room="bedroom" />
</RoomContainer>
```

---

## 🌙 Bedroom Example

### Interaction: Sleep (Lamp click)

* Clicking the lamp toggles room dimming and triggers:

  * Pet animation: Sleep (closed eyes, ZZZ bubble)
  * Energy stat regeneration every second
  * Time-based auto wake-up or user wake-up via tap

```ts
function onLampToggle() {
  setRoomDimmed(true);
  triggerSleepAnimation();
  startEnergyRecoveryLoop();
}
```

---

## 🎮 Per-Room Effects & Triggers

| Room        | Interaction        | Affects Stat(s)     | Required Item  |
| ----------- | ------------------ | ------------------- | -------------- |
| Bedroom     | Lamp → Sleep       | +Energy             | None           |
| Kitchen     | Drag Apple         | +Hunger, +Mood      | Food item      |
| Bathroom    | Soap Button        | +Cleanliness, +Mood | Soap, Water    |
| Playroom    | Drag Ball          | +Mood               | Toy item       |
| Health Room | Drag Medicine      | +Health             | Medicine item  |
| Garden      | Visit → Chill mood | +Mood (passive)     | Optional decor |

---

## 💡 Room Unlocking Logic

* All base rooms are accessible from the start.
* Future expansions:

  * VIP-only rooms (e.g., Aquarium, Rooftop)
  * Level-gated rooms
  * Event-based rooms

---

## 🏬 Room Themes in Shop

```json
{
  "id": "theme_bedroom_clouds",
  "name": "Cloudy Dreams",
  "type": "theme",
  "room_target": "bedroom",
  "price_coins": 120,
  "image_url": "/themes/bedroom/clouds.png",
  "rarity": "rare"
}
```

---

## 🧠 Pet Mood Based on Room

* Each room automatically updates the pet’s **facial mood** and **idle animation**:

  * Sleepy face in Bedroom
  * Happy face in Playroom
  * Curious in Garden
  * Sick/Neutral in Health Room

Pet mood can change dynamically based on:

* Last interaction time
* Stat level
* Room visited
* Equipped theme (luxury themes slightly boost mood)

---

## ✅ Future Additions

* Theme rarity-based effects (e.g., Legendary themes auto-boost mood)
* Ambient music per theme
* Interactive furniture based on equipped decor
* Animated backgrounds

---

