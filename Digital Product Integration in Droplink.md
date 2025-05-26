# 🛍️ Digital Product Integration in Droplink

## Overview

This guide explains how to allow creators on **Droplink** to upload, sell, and deliver **digital products** (e.g., eBooks, art, services) using **Pi Payments**, similar to Ko-fi’s storefront.

---

## 🎯 Objective

Enable creators to:
- Sell digital products (file or service)
- Accept payments in **Pi**
- Automatically deliver files or instructions after payment
- Track earnings and customers
- Keep everything within their **Droplink profile**

---

## 🔐 Requirements

- Pi SDK integration (Pi.createPayment)
- Supabase setup for:
  - Users
  - Products
  - Orders
  - Downloads
- File storage (e.g., Supabase Storage or S3)
- Frontend UI for managing products

---

## 🧱 Supabase Tables

### products

| id | user_id | title | price_pi | description | file_url | created_at |
|----|---------|-------|----------|-------------|----------|------------|

### orders

| id | product_id | buyer_wallet | status | payment_id | created_at |
|----|------------|--------------|--------|-------------|------------|

### users

Must already include wallet_address.

---

## 🛠 Workflow

### 1. Product Upload (Seller)
- Creator logs into Droplink
- Navigates to “Digital Products” tab
- Clicks “Add Product”
  - Title, Description
  - Price in Pi
  - Upload file (PDF, ZIP, PNG, etc.)
- File saved in Supabase Storage
- Metadata saved in products table

---

### 2. Product Listing (Public)
- Profile page includes a "Shop" section
- Each product shows:
  - Title, Description, Price
  - "Buy with Pi" button

---

### 3. Buy with Pi Flow (Customer)
- Buyer clicks "Buy"
- Initiates payment:

javascript
Pi.createPayment({
  amount: product.price_pi,
  memo: `Droplink_Product_${product.id}`,
  metadata: { product_id: product.id },
  onReadyForServerApproval: handlePaymentApproval,
  onReadyForServerCompletion: handlePaymentCompletion,
});

	•	On successful payment:
	•	Record created in orders
	•	Status = completed
	•	Download link shown to buyer

⸻

4. File Delivery

Option A: Instant Download
	•	After successful payment
	•	Show secure download link
	•	(Signed URL, expires in 10 mins)

Option B: Email Delivery (via n8n)
	•	Buyer inputs email before payment
	•	On payment confirmation:
	•	n8n sends email with download link

⸻

5. Creator Dashboard
	•	View total earnings
	•	See list of buyers and orders
	•	Edit/remove digital products
	•	Track download activity

⸻

6. Security & Anti-Abuse
	•	Signed file URLs to prevent link sharing
	•	One-time download links (optional)
	•	Rate limits and bot protection

⸻

🧪 Sample API (Backend Logic)

Create Order on Payment Confirmation

POST /api/purchase/confirm

{
  "product_id": "abc123",
  "buyer_wallet": "wallet123",
  "payment_id": "pi_tx_id"
}

Returns

{
  "status": "success",
  "download_url": "https://storage.supabase.io/secure/file123"
}


⸻

📦 Supported Product Types
	•	PDF (eBooks, guides)
	•	ZIP (design packs)
	•	PNG/JPG (art)
	•	Text (consultation links)
	•	Optional: Service booking (link or email contact)

⸻

🧩 Optional Features
	•	Bundle products
	•	Discount codes
	•	Buyer messaging
	•	Purchase history
	•	Refund system (manual)

⸻

🔗 Related Features
	•	Pi Payments → Used for checkout
	•	Pi Auth → Wallet verification
	•	n8n Automation → Email delivery, payment confirmation
	•	Supabase Storage → File hosting

⸻

✅ Final Outcome

Creators can host and sell digital products securely on their Droplink profile with:
	•	Pi-native payments
	•	Easy file delivery
	•	Dashboard insights
	•	inspired by Ko-fi-style monetization without leaving the Pi ecosystem
