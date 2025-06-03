# 🎮 `mini_games.md`

## 📌 Purpose

Mini Games in the Droplet Pet App serve to:

* **Entertain the user**
* **Boost pet mood or stats**
* **Reward coins or items**
* **Encourage daily return usage**

---

## 🧩 Planned Mini Games

| Game Name           | Type        | Description                                               | Rewards              |
| ------------------- | ----------- | --------------------------------------------------------- | -------------------- |
| **Catch the Fruit** | Reflex Game | User taps falling fruits before they hit the ground       | +Mood, +Food, +Coins |
| **Clean Up Time**   | Drag & Drop | Drag soap/shampoo/items to clean pet before time runs out | +Hygiene, +Energy    |
| **Memory Match**    | Puzzle      | Flip cards to find matching pairs                         | +XP, +Coins          |
| **Pet Quiz**        | Trivia      | Pet-themed multiple-choice questions                      | +XP, +Coins          |
| **Dream World**     | Idle        | Click-to-collect dream bubbles while pet sleeps           | +Energy, +Mood       |
| **Daily Spin**      | Luck Wheel  | Spin the wheel once per day for a random prize            | Random               |

---

## 🔁 Game Flow Logic

### 🧠 Global Flow

```plaintext
User Enters Game Room →
Selects a Mini Game →
Game Starts →
Score is Calculated →
Reward is Given →
Pet Stats Updated →
Return to Main Room
```

### 📥 Example Game Flow: Catch the Fruit

```tsx
1. Game Timer: 30 seconds
2. Random fruits fall on screen
3. User taps to catch fruit
4. Each fruit = +1 point
5. Final score → Rewards:
   - 5+ fruits = +1 coin
   - 10+ fruits = +2 coins
   - 15+ fruits = +3 coins + +10 mood
```

---

## 🛠️ Component Structure

```bash
/components/mini-games/
  ├── GameMenu.tsx           # Menu list of all mini-games
  ├── CatchTheFruit.tsx      # Game 1
  ├── CleanUpTime.tsx        # Game 2
  ├── MemoryMatch.tsx        # Game 3
  ├── PetQuiz.tsx            # Game 4
  └── DailySpin.tsx          # Daily reward
```

---

## 🎯 Reward System

* Reward logic is stored **per game**, returned to `/api/game-result`
* Reward updates:

  * Supabase `users` table (coins, XP)
  * Supabase `pet_stats` (energy, mood, hygiene)
  * Optional item rewards sent to inventory

Example result:

```json
{
  "game": "CatchTheFruit",
  "score": 14,
  "rewards": {
    "coins": 2,
    "mood": 5
  }
}
```

---

## 📦 Supabase Table (Optional)

### `game_results`

| Field      | Type      | Description                |
| ---------- | --------- | -------------------------- |
| id         | UUID      | Primary key                |
| user\_id   | UUID      | Linked to user             |
| game\_name | TEXT      | e.g. "CatchTheFruit"       |
| score      | INT       | Final score of the session |
| reward     | JSONB     | Coins, XP, items awarded   |
| timestamp  | TIMESTAMP | When game was completed    |

---

## 🔐 Access Rules

* Only **logged-in users** can play mini-games
* Daily limits apply (e.g. 3 plays/day for rewards)
* Optional cooldowns per game (configurable)

---

## 📱 Mobile Optimized

* All games use **tailwind** `w-full h-[100vh]` for full-screen interaction
* Tapping & dragging gestures optimized using `react-use-gesture` or `framer-motion`

---

## 🔄 Future Additions

* Multiplayer mini-games (e.g. pet racing)
* Leaderboards for each game
* Seasonal/limited games (e.g. Halloween maze)
* XP-based game unlock system

---

## ✅ API Involved

* `POST /api/game-result`: Handle score + reward logic
* `GET /api/games/available`: Return playable games based on cooldowns/limits

---

