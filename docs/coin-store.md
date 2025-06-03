# 📦 `/coin-store` Page

## ✅ Features

* Displays available coin packs
* Pi payment integration (via `Pi.createPayment`)
* Watch rewarded ads to earn coins
* Full mobile responsiveness
* Realtime coin balance from Supabase

---

## 🧱 Component Structure

```
/pages/coin-store
  ├── CoinStorePage.tsx
  ├── components/
  │   ├── CoinPackCard.tsx
  │   └── RewardAdButton.tsx
  └── hooks/
      └── usePiPayment.ts
```

---

## 🖼️ UI Example

```tsx
// CoinStorePage.tsx
import CoinPackCard from './components/CoinPackCard';
import RewardAdButton from './components/RewardAdButton';

const coinPacks = [
  { id: 1, coins: 10, pi: 1 },
  { id: 2, coins: 100, pi: 10 },
  { id: 3, coins: 150, pi: 12, bonus: true },
  { id: 4, coins: 300, pi: 20, promo: true },
  { id: 5, coins: 1000, pi: 50, premium: true },
];

export default function CoinStorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🪙 Buy Droplet Coins</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coinPacks.map(pack => (
          <CoinPackCard key={pack.id} {...pack} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <RewardAdButton />
      </div>
    </div>
  );
}
```

---

## 🧩 CoinPackCard Component

```tsx
// components/CoinPackCard.tsx
import { usePiPayment } from '../hooks/usePiPayment';

export default function CoinPackCard({ coins, pi, bonus, promo, premium }) {
  const { handlePurchase } = usePiPayment();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">{coins} Coins</h2>
      <p className="text-sm text-gray-600">{pi} Pi</p>

      {bonus && <span className="text-green-600 text-xs font-semibold">+ Bonus</span>}
      {promo && <span className="text-blue-600 text-xs font-semibold">🔥 Promo</span>}
      {premium && <span className="text-purple-600 text-xs font-semibold">💎 Premium</span>}

      <button
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => handlePurchase(pi, coins)}
      >
        Buy Now
      </button>
    </div>
  );
}
```

---

## 📱 Reward Ad Button

```tsx
// components/RewardAdButton.tsx
export default function RewardAdButton() {
  const watchAd = () => {
    // Replace with real Pi Ad SDK call
    alert('Simulating ad watched...');
    // Call backend to add +1 coin to user
    fetch('/api/reward-coin', { method: 'POST' });
  };

  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded text-lg"
      onClick={watchAd}
    >
      🎥 Watch Ad to Earn 1 Coin
    </button>
  );
}
```

---

## 🔧 Hook for Pi Payments

```tsx
// hooks/usePiPayment.ts
export function usePiPayment() {
  const handlePurchase = async (piAmount: number, coins: number) => {
    const payment = await window.Pi.createPayment({
      amount: piAmount,
      memo: `Buy ${coins} Droplet Coins`,
      metadata: { coins },
    }, async (paymentId: string) => {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        body: JSON.stringify({ paymentId, coins }),
      });
      return res.json();
    });

    alert(`Purchased ${coins} coins successfully!`);
  };

  return { handlePurchase };
}
```

---

## 🛠️ Backend Routes (Edge Functions)

### `/api/verify-payment`

Handles Pi payment validation and adds coins to the user.

```ts
POST /api/verify-payment
{
  paymentId: string,
  coins: number
}
```

### `/api/reward-coin`

Adds 1 coin after rewarded ad is viewed.

```ts
POST /api/reward-coin
{
  userId: string
}
```

---

## 📱 Mobile Responsive Design

* Use `min-h-screen`, `grid`, and `flex` utilities for adaptive layout.
* Test on various screen widths using browser DevTools and Tailwind’s responsive breakpoints.

---


