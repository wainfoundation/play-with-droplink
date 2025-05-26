# 💸 Droplink Pi Tipping System

Enable seamless peer-to-peer tipping using the Pi Network inside the Droplink platform. This feature allows users to tip content creators directly from their profiles using the **Pi Wallet**, all within the **Pi Browser**.

---

## 🚀 Features

- One-click tipping from user profile
- Pi Wallet integration via `Pi.createPayment()`
- Tip tracking and analytics per user
- Optional QR code and manual wallet tipping
- Real-time tip confirmation and dashboard update

---

## 🧱 Architecture Overview

### Technologies Used:
- **Pi SDK**: Pi Auth & Payments
- **Supabase**: User and tip data storage
- **Node.js + Express** (or your preferred backend)
- **JavaScript Frontend** inside Pi Browser

---

## 🔐 User Authentication

Use Pi SDK `Pi.authenticate()` to authorize the tipping user (User B).

```js
const auth = await window.Pi.authenticate(['username'], onIncompletePaymentFound);


⸻

💰 Tipping Workflow

1. User A sets up their wallet in profile

Store their Pi Wallet address in your database.

2. User B visits User A’s profile

Droplink page shows a “Tip with Pi” button.

3. On click, Droplink runs:

const payment = await window.Pi.createPayment({
  amount: "1",
  memo: "Tip to @username via Droplink",
  metadata: { to: "username", from: auth.user.username },
});

4. Pi Wallet opens inside Pi Browser

User completes the transaction.

5. Backend receives confirmation (optional) and stores:

{
  "from_user": "userB",
  "to_user": "userA",
  "amount": "1",
  "txId": "tx_hash"
}


⸻

🧾 Supabase Schema

users table

Field	Type
id	UUID
username	Text
pi_wallet_address	Text

tips table

Field	Type
id	UUID
from_user_id	UUID
to_user_id	UUID
amount	Numeric
timestamp	Timestamp
tx_id	Text


⸻

🧪 Tip Button Sample Code

async function handleTip(username, amount) {
  const auth = await window.Pi.authenticate(['username'], onIncompletePaymentFound);

  const paymentData = await window.Pi.createPayment({
    amount: amount.toString(),
    memo: `Tip to ${username} via Droplink`,
    metadata: {
      to: username,
      from: auth.user.username,
    },
  });

  await fetch('/api/record-tip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: auth.user.username,
      to: username,
      amount,
      txId: paymentData.identifier,
    }),
  });
}


⸻

📦 API Endpoints

POST /api/record-tip

Stores tip in database after transaction.

Body:

{
  "from": "userB",
  "to": "userA",
  "amount": "1",
  "txId": "pi_tx_hash"
}


⸻

📸 Optional: Manual Tip (QR Code)

If you want manual tipping:
	1.	Generate QR code using wallet address
	2.	Display it on the profile
	3.	User B scans with Pi Wallet manually

⸻

📊 Future Enhancements
	•	Tip leaderboard
	•	Community tipping rewards
	•	Tip badges
	•	Incomplete payment detection
	•	Pi tipping history export

⸻

🧠 Requirements
	•	Pi Network SDK (JavaScript)
	•	Pi Browser (runs Droplink)
	•	Pi Wallet (active users)
	•	Supabase or PostgreSQL
	•	Node.js backend (or serverless) prompt to implement  
