# 🔗 Sync Pi Network Profiles to Droplink via Pi Auth

This guide explains how to integrate Pi Network public profiles (`https://profiles.pinet.com/profiles/@username`) into the Droplink link-in-bio platform using Pi Auth via the Pi Browser.

---

## 🚀 Goal

Automatically connect and display a user's Pi Network profile on their Droplink page when they log in using their Pi account.

---

## ✅ Benefits

- 🔒 Verified Pi identity via Pi Auth
- 🔗 Accurate profile URL without user input
- ⚡ Seamless sync inside Pi Browser
- 🪪 Trust badge or verified indicator possible

---

## 🔧 Requirements

- Droplink app must support Pi SDK (`pi-apps-sdk`)
- User must access your app via **Pi Browser**
- Pi Auth must be implemented

---

## 📦 Pi Auth Setup (Quick Recap)

Ensure you've included the Pi SDK in your frontend:

```html
<script src="https://sdk.minepi.com/pi-sdk.js"></script>

Then use the following in your JavaScript:

Pi.authenticate(["username", "payment"], onIncompletePaymentFound)
  .then(authResult => {
    const piUsername = authResult.user.username;
    const piProfileLink = `https://profiles.pinet.com/profiles/@${piUsername}`;

    // Save or display this in your Droplink system
    console.log("Pi Profile Link:", piProfileLink);

    // Example: display on UI
    document.getElementById("pi-profile").innerHTML = `
      <a href="${piProfileLink}" target="_blank">
        View my Pi Network Profile
      </a>
    `;
  })
  .catch(error => {
    console.error("Pi Auth failed:", error);
  });

onIncompletePaymentFound is only needed if you’re using Pi Payments. You can replace it with an empty function if not needed.

⸻

🖼️ Optional: Display Profile Card (Future)

If Pi Network provides an open profile API or meta tags, you can fetch:
	•	Profile image
	•	Display name or badges
	•	Follower count or reputation

Until then, stick with linking to:

https://profiles.pinet.com/profiles/@PiUsername


⸻

💡 UX Tips
	•	Add a “Synced with Pi Network” badge
	•	Auto-enable the Pi Profile block in the user’s Droplink settings
	•	Let users toggle visibility of their Pi Profile

⸻

📌 Summary

Feature	Status
Pi Auth integration	✅ Required
Username from Auth	✅ Available
Profile URL	✅ Constructed
Public API support	🚫 Not available (yet)
Verified identity	✅ Via Pi Auth


⸻

✨ Example Display in Droplink UI

<a href="https://profiles.pinet.com/profiles/@PiUser123" class="btn btn-pi-profile" target="_blank">
  🌐 View My Pi Profile
</a>


⸻

🔐 Need Help?

If you want a full backend+frontend implementation, let us know. We’ll generate boilerplate code for you.
