# 📣 `notification_plan.md`

## Overview

This notification system is designed to encourage consistent user interaction with their virtual pet and to ensure timely care, reward collection, and participation in events or missions.

The system includes:

* Local (device-based) notifications
* In-app alerts and reminders
* Reward, health, and stat-based alerts
* Scheduled and event-driven messages

---

## 🧠 Notification Types

| Type               | Trigger                                | Channel      | Priority | Action Encouraged                |
| ------------------ | -------------------------------------- | ------------ | -------- | -------------------------------- |
| 💤 Sleep Reminder  | User inactive & pet energy low         | Local        | Medium   | Visit Bedroom to sleep           |
| 🍎 Hunger Alert    | Hunger stat < 30%                      | Local/In-app | High     | Feed pet in Kitchen              |
| 💩 Bath Needed     | Cleanliness stat < 20%                 | Local/In-app | Medium   | Go to Bathroom                   |
| 💊 Health Warning  | Health stat < 30%                      | Local/In-app | High     | Visit Health Room                |
| 😢 Pet Neglected   | No interaction in 24h                  | Local/In-app | High     | Return to play with your pet     |
| 🎁 Daily Coins     | Daily reward ready                     | Local/In-app | High     | Open app → Collect               |
| 🪙 Ads Reward      | Ad bonus available (cooldown over)     | In-app only  | Medium   | Watch ad to earn 1 coin          |
| 🎨 Theme Offer     | New theme or sale available            | In-app only  | Low      | View themed room in Shop         |
| 🚀 Level Up        | XP milestone or new abilities unlocked | In-app       | High     | Visit profile or room to upgrade |
| 🧩 Mini-Game Event | Event or new mini-game launched        | Local/In-app | Medium   | Join and earn exclusive rewards  |

---

## 🔔 Notification Rules

### 1. **Local Notifications**

Handled via:

* Expo Notifications (for React Native)
* Capacitor Push (for web-based PWA/mobile hybrid)

```ts
// Example: Trigger when hunger drops below 20%
if (petStats.hunger < 20 && !hasNotifiedRecently('hunger')) {
  scheduleNotification("Your Droplet is hungry! 🍎", {
    time: new Date(Date.now() + 1000 * 60), // 1 min later
    repeat: false
  });
}
```

### 2. **In-App Notifications**

* Shown via toast, modal, or popup alerts
* Triggered by real-time stat engine or scheduled events

```ts
if (petStats.cleanliness < 15) {
  showToast("Your pet is dirty! 🛁 Give it a bath.");
}
```

---

## 📆 Scheduling Examples

### Daily Reminders

* ⏰ "Good morning! 🌞 Your pet is waiting!"
* ⏰ "It's bedtime. Let your pet rest."

### Weekly Missions

* 💼 "Weekly Challenge: Play with your pet 5 times to earn 50 coins!"

---

## 🧪 Integration Logic

**Backend Events (Optional):**

* Use Supabase cron jobs or serverless functions to check:

  * Last active time
  * Pet stat thresholds
  * XP/level progress

**Frontend Triggers:**

* Based on user interaction and timer hooks
* Can trigger local or in-app alerts if the app is open

---

## 🛑 DND (Do Not Disturb) Mode

Users can control notification preferences in `Settings`:

* Enable/disable notifications
* Choose preferred times (e.g., "Notify only between 9AM–9PM")
* Mute for 24 hours

---

## 🧩 Future Enhancements

* Smart reminders based on user timezone and wake/sleep pattern
* Seasonal or event-specific alerts (e.g., Halloween pet skins available!)
* Sound/Vibration alerts on mobile
* AI-generated personalized pet messages

---

## ✅ Sample Messages

| Message                                    | Purpose                   |
| ------------------------------------------ | ------------------------- |
| "Your pet is feeling sick. Visit Health!"  | Trigger health room visit |
| "Time to feed! 🍎 Your pet is hungry."     | Trigger food interaction  |
| "Collect your daily reward! 🎁"            | Drive coin engagement     |
| "Theme Sale! New room style available!"    | Monetization & cosmetics  |
| "Hurry! Limited-time mission: Earn 20 XP!" | Boost user challenge      |

---

