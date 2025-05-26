# 💬 Droplink Chat System

Enable secure, Pi-native peer-to-peer messaging inside Droplink — where creators and fans can chat, tip, and exchange content.

---

## 🚀 Overview

**Droplink Chat** allows creators to open direct messaging with their audience, monetized through **Pi tipping**, while maintaining full control, privacy, and community interaction.

---

## 🎯 Core Features

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| 🔐 Opt-in Messaging           | Users can toggle chat availability via dashboard                            |
| 💸 Tip-to-Unlock Chat        | Fans must send a Pi tip (e.g. 1π) to start a conversation                    |
| 🧠 Smart Inbox               | Dashboard chat threads with message tagging (Support, Business, Fan, etc.)  |
| 💬 Realtime Messaging        | Live chat using Supabase Realtime or alternative                            |
| 🎁 In-Chat Tipping           | Tip inside the chat thread with micro-transactions (0.5π, 1π, etc.)         |
| 🧩 Saved Replies             | Create and send preset replies, thank you messages, or QR codes             |
| 📁 File & Image Sharing      | Optional media sharing (for Pro/Premium tiers)                              |
| 🛑 Anti-Spam Control         | Rate limits, report/block feature, cooldowns                                |

---

## 🧱 Database Schema (Supabase)

### `chats` Table

| Field         | Type       | Description                        |
|---------------|------------|------------------------------------|
| id            | UUID       | Primary chat thread ID             |
| sender_id     | UUID       | Auth ID of message sender          |
| receiver_id   | UUID       | Auth ID of message receiver        |
| tip_amount    | DECIMAL    | Tip paid to unlock chat            |
| status        | ENUM       | open, closed, blocked              |
| created_at    | TIMESTAMP  | Date of chat creation              |

---

### `messages` Table

| Field         | Type       | Description                        |
|---------------|------------|------------------------------------|
| id            | UUID       | Message ID                         |
| chat_id       | UUID       | Reference to parent chat           |
| sender_id     | UUID       | Message sender                     |
| content       | TEXT       | Message body                       |
| media_url     | TEXT       | Link to image/media (optional)     |
| timestamp     | TIMESTAMP  | Message timestamp                  |

---

## 🔐 Privacy & Safety

- End-to-end encrypted messaging (optional)
- Report/block users functionality
- Tip refund request window (within 30 min)
- Optional “Auto-close chat after 7 days”

---

## 📈 Monetization Tiers

| Plan      | Chat Limitations                                    |
|-----------|------------------------------------------------------|
| Free      | 5 chats/day, no media, only tip-to-unlock available |
| Starter   | 20 chats/day, 1 media message, saved replies         |
| Pro       | Unlimited chats, media, advanced features            |
| Premium   | Priority Inbox, featured status, encrypted threads   |

---

## 🔄 Workflow

1. **User B visits** `@creator`
2. Clicks **“Chat with me”** button
3. Prompts **Pi Wallet Auth + Tip**
4. User A gets notification of new chat
5. Conversation continues in dashboard inbox
6. In-chat tipping, file exchange available

---

## 🧰 Tech Stack

| Component        | Tech Suggestion              |
|------------------|------------------------------|
| Auth             | Pi SDK Auth                  |
| Realtime Chat    | Supabase Realtime or Pusher  |
| DB & Storage     | Supabase (chats, messages, media) |
| Payment Gateway  | Pi SDK Payments              |
| Automation       | n8n for alerts, email, auto-replies|

---

## ✅ Benefits

### For Creators:
- Earn Pi for engaging with followers
- Build direct relationships
- Filter and manage fans & supporters

### For Fans:
- One-on-one access to creators
- Show support via tipping
- Get custom content or responses

---

## 📎 Suggested UI Components

- Dashboard tab: **💬 Chat Inbox**
- Profile button: **“Chat with me”**
- Message composer: Text, emoji, attach file, send tip

---

## 📌 Future Additions (v2)

- Audio messages
- Scheduled auto-replies
- Chat leaderboard (top tippers)
- NFT unlockables per chat

---

## 🔗 API Endpoints (Planned)

- `POST /chat/start`
- `GET /chat/inbox`
- `POST /message/send`
- `POST /tip/send`
- `POST /media/upload`
- `POST /chat/report`

---

## 🏁 Ready to Implement

> This feature is designed for high Pi engagement and community interaction. Works perfectly inside Pi Browser and enables real Pi-to-Pi transactions.
