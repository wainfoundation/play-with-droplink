# Stat Engine Documentation

## Overview

The Stat Engine manages the real-time tracking, updating, and consequences of your pet’s vital statistics. It simulates a living, breathing virtual pet whose needs must be met regularly by the user to keep it happy and healthy.

---

## Core Stats

| Stat        | Description                 | Range   | Initial Value |
| ----------- | --------------------------- | ------- | ------------- |
| Energy      | How rested the pet feels    | 0 – 100 | 80            |
| Hunger      | How hungry the pet is       | 0 – 100 | 20            |
| Health      | Overall physical condition  | 0 – 100 | 100           |
| Happiness   | Mood & emotional well-being | 0 – 100 | 80            |
| Cleanliness | How clean the pet is        | 0 – 100 | 100           |

---

## Stat Behavior

### Stat Decay

* Stats naturally decrease over time to simulate pet needs.
* Decay rates can vary by stat and by pet level.
* Default decay example (per hour):

  * Energy: -5
  * Hunger: +7 (increasing hunger)
  * Health: -2 if Hunger > 80 or Cleanliness < 30
  * Happiness: -3 if Hunger > 50 or Health < 50
  * Cleanliness: -4

### Stat Increase (User Actions)

* **Sleep** (via Bedroom lamp toggle)

  * Energy +15 per sleep cycle
  * Hunger +5 (pet gets hungry even while sleeping)
* **Eat Food** (drag food item to pet)

  * Hunger -20 per food item
  * Health +5 if food is nutritious
  * Happiness +10 if favorite food
* **Play** (drag ball or toy)

  * Happiness +20
  * Energy -10 (playing tires the pet)
* **Clean/Bath** (drag soap/shower)

  * Cleanliness +30
  * Health +10
* **Medicine** (drag medicine)

  * Health +30 (if sick)
  * Happiness -10 (pets dislike medicine)

---

## Consequences & Events

| Condition                | Effect on Stats / Behavior                     |
| ------------------------ | ---------------------------------------------- |
| Hunger ≥ 90              | Health decreases by -5/hour, pet looks hungry  |
| Energy ≤ 10              | Pet becomes sleepy, limited play interaction   |
| Cleanliness ≤ 20         | Health decreases by -5/hour, pet appears dirty |
| Health ≤ 30              | Pet shows sickness animation, restricted play  |
| Happiness ≤ 20           | Pet “cries” or shows sad mood                  |
| Stats at critical levels | User receives notifications/reminders to care  |

---

## Stat Update Cycle

* The stat engine runs every 5 minutes (configurable).
* Updates stats based on decay and user interaction logs.
* Updates persisted in the backend database (Supabase).
* Emits real-time updates to the UI to reflect pet mood and status.

---

## Stat Engine API (Example)

| Endpoint            | Method | Description                                 |
| ------------------- | ------ | ------------------------------------------- |
| `/api/stats/update` | POST   | Updates pet stats with decay + user actions |
| `/api/stats/get`    | GET    | Fetch current stats for a user’s pet        |
| `/api/stats/reset`  | POST   | Resets stats on pet evolution or rebirth    |

---

## Integration Notes

* Stats must sync with **Room Interaction Logic**:

  * Bedroom lamp → triggers Sleep logic
  * Food drag → updates Hunger stat
  * Bath drag → updates Cleanliness
  * Medicine drag → updates Health
  * Play drag → updates Happiness and Energy
* Stat updates reflect on **Pet Facial Impression and Mood**
* Stat thresholds trigger visual UI changes & notifications

---

## Extensibility

* New stats can be added (e.g., Thirst, Social)
* Decay rates can adapt based on pet level or environment
* More complex health & mood algorithms can be integrated

---
