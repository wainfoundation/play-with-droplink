# 📈 `levels_xp_system.md`

## 🎯 Overview

The **Level & XP System** defines how pets gain experience (XP), level up, and unlock new rewards. It is tightly integrated with the coin reward engine, user interaction stats, and pet evolution milestones.

---

## 🔢 Level Progression

| Level | Required XP | Daily Coin Bonus | Unlocks                                     |
| ----- | ----------- | ---------------- | ------------------------------------------- |
| 0     | 0           | 1                | Base stats, free starter items              |
| 1     | 50          | 2                | +1 Item Slot, minor mood stability          |
| 2     | 100         | 3                | Unlock: Food Booster (heals +2x hunger)     |
| 3     | 200         | 4                | New Room Theme (Bedroom Skin 1)             |
| 4     | 350         | 5                | Unlock: Bath Turbo Soap (cleanliness boost) |
| 5     | 500         | 6                | Pet skin upgrade 1, +2 Energy Recovery      |
| 6     | 700         | 7                | XP boost +5% from now on                    |
| 7     | 1000        | 8                | Room Expansion: Nature/Outside Room         |
| 8     | 1500        | 9                | Unlock: Mini-game (Jump & Catch)            |
| 9     | 2100        | 10               | Rare Item Drop: Lucky Box                   |
| 10    | 3000        | 12               | Pet Evolution Stage 1                       |
| ...   | ...         | ...              | ...                                         |
| 50    | 50000       | 30               | Pet Evolution Final Form, Special Badge     |

You can define up to Level 100+ for future-proofing.

---

## 🧪 Earning XP

| Action                          | XP Gained |
| ------------------------------- | --------- |
| Feeding pet                     | +5        |
| Giving bath                     | +5        |
| Putting pet to sleep            | +4        |
| Playing with toy or mini-game   | +6        |
| Healing with medicine           | +5        |
| Petting / interacting           | +2        |
| Watching ad for pet reward      | +3        |
| Completing daily task           | +10       |
| Completing weekly mission       | +50       |
| Buying premium item             | +20       |
| Participating in seasonal event | +100      |

---

## 🪄 Level-Up Mechanics

### XP Bar Logic (React State)

```ts
const [xp, setXP] = useState(0);
const [level, setLevel] = useState(1);

useEffect(() => {
  const xpToNext = calculateXPThreshold(level);
  if (xp >= xpToNext) {
    setLevel(level + 1);
    setXP(xp - xpToNext); // Carry over overflow XP
  }
}, [xp]);

function calculateXPThreshold(lvl: number): number {
  return Math.floor(50 * Math.pow(1.5, lvl - 1)); // Adjustable curve
}
```

---

## 🧬 Evolution System (Optional)

| Evolution Stage | Trigger Level | Unlock                        |
| --------------- | ------------- | ----------------------------- |
| Baby Droplet    | Level 1       | Default form                  |
| Teen Droplet    | Level 10      | Cosmetic change, speed boost  |
| Adult Droplet   | Level 25      | Better stats, mood stabilizer |
| Elder Droplet   | Level 50      | Special badge, final skin     |

Evolution affects:

* Pet animation / sprite
* Stat growth rate
* Access to new mini-games

---

## 💡 Coin Bonus by Level

Every level gives the user a passive **daily coin** bonus:

```ts
dailyCoinBonus = 1 + Math.floor(level / 1.5)
```

Coins are claimable once per 24h via the `/daily-reward` system.

---

## ⚙️ Backend Schema (Supabase Example)

**Table: `user_levels`**

```sql
id            UUID (PK)
user_id       UUID (FK to auth.users)
level         INT DEFAULT 1
xp            INT DEFAULT 0
last_claimed  TIMESTAMP
```

**Table: `level_rewards`**

```sql
level         INT (PK)
coin_bonus    INT
unlocks       TEXT[]
```

---

## 📆 Daily Missions (Optional Expansion)

* Task pool resets daily
* XP and Coin reward per task
* Examples: "Feed pet 3x", "Win a mini-game", "Clean the pet"

---

## 🧠 Recommendations

* Notify user on level-up (toast + animation)
* Visual XP progress bar
* Lock certain shop items or skins until required level
* Show evolution preview when near trigger level

---
