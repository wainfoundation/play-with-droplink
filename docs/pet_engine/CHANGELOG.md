# 🐾 pet_engine/CHANGELOG.md

Tracks all changes and improvements to the **Pet Engine** module — which powers your Droplet mascot's mood, stats, behaviors, and responses.

---

## [1.0.0] – 2025-06-03
### 🎉 Stable Production Release

#### ✅ Core Features
- Real-time stat engine using `setInterval` (energy, hunger, hygiene, health, happiness)
- Stat decay linked to real-world time + user inactivity
- Sleep logic: clicking lamp dims room, triggers Zzz animation, restores energy
- Dynamic mascot mood system (happy, sad, sick, hungry, sleepy, playful)
- Real-time facial animation syncing with mood state
- Drag-and-drop item interaction logic (ball, soap, food, medicine)
- Crying state when multiple stats are critically low
- Energy boost while sleeping, hunger/hygiene drops on neglect
- Stat change triggers emotional responses & visuals

#### 🧠 Intelligence Behavior
- Pet becomes sick when health stat < 30 for extended time
- Refuses to play/eat when sick unless medicine is given
- Dynamic dialog bubbles ("I'm tired", "I'm hungry", "Yay!", etc.)
- Idle animations differ per mood (e.g. sleep, angry frown, wag tail)

#### 🧪 System Integration
- Pet stats now persist with Supabase per user
- Stats and mood update across all rooms
- PlayWithMascot page connected to central pet engine
- Supports multiple pet types (modular engine logic)

---

## [0.8.0] – 2025-05-28
### 🧪 Advanced Engine Logic

- Added `statDecayLoop()` running every minute
- Implemented `calculateMood()` based on stat thresholds
- Connected item use to direct stat change (apple = +5 hunger)
- Sleep mechanic added: toggling `isSleeping` state updates energy

---

## [0.5.0] – 2025-05-21
### 🛠️ Stat Engine MVP

- Defined core pet stats: energy, hunger, hygiene, health, happiness
- Created initial `updateStat()` and `getMood()` helpers
- Added visual feedback for stat changes (e.g. sparkle, frown)

---

## [0.3.0] – 2025-05-17
### 👶 Prototype Phase

- Static mood switching via dropdown
- Hardcoded stat values for testing
- No time-based decay or persistence yet

---

## [0.1.0] – 2025-05-10
### 🧱 Initial Setup

- Mood selector component (happy, sad, angry)
- Pet image with expressions
- Placeholder logic for food/play/bath

---

