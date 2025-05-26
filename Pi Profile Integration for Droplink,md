# 🔗 Pi Profile Integration for Droplink

This module allows Droplink users to **connect their Pi Network profile** (`profiles.pinet.com/profiles/@username`) and automatically **import links, bio, and avatar** into their Droplink account.

---

## 🚀 Features

- One-click import from `profiles.pinet.com`
- Sync Pi profile links into Droplink
- Display Pi avatar and bio on Droplink profile
- Optional: Scheduled re-import / sync
- Future-ready for Pi Network API (once available)

---

## 🧱 Architecture Overview

| Component          | Description                                   |
|--------------------|-----------------------------------------------|
| `GET /import`      | Backend API to fetch and parse Pi profile     |
| Cheerio / Puppeteer | Used to scrape public profile HTML            |
| Supabase DB        | Stores links, bio, and avatar from Pi profile |
| Frontend button    | Allows users to initiate import                |

---

## 🔐 User Flow

1. User logs in via Pi Auth (`window.Pi.authenticate`)
2. User clicks “Import from Pi Profile”
3. Droplink fetches `https://profiles.pinet.com/profiles/@username`
4. HTML is parsed to extract:
   - Avatar URL
   - Bio text
   - External links
5. User confirms imported data
6. Data is saved in Droplink's database

---

## 🧑‍💻 Backend Code Example (Node.js + Cheerio)

```js
import axios from 'axios';
import cheerio from 'cheerio';

export async function importPiProfile(username) {
  const url = `https://profiles.pinet.com/profiles/@${username}`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const avatar = $('img.profile-avatar').attr('src') || '';
  const bio = $('p.bio').text().trim();

  const links = [];
  $('a[href^="http"]').each((i, el) => {
    links.push({
      title: $(el).text().trim(),
      url: $(el).attr('href')
    });
  });

  return { avatar, bio, links };
}


⸻

🗃️ Supabase Table Updates

Update your users table:

ALTER TABLE users ADD COLUMN avatar_url TEXT;
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN imported_links JSONB;


⸻

🖼️ Frontend Integration Example

<button onclick="handleImport()">Import from Pi Profile</button>

async function handleImport() {
  const username = getCurrentUserPiUsername(); // From Pi Auth
  const res = await fetch(`/api/import-pi-profile?username=${username}`);
  const data = await res.json();

  displayLinkPreview(data.links); // Show user before saving
  saveToUserProfile(data);        // On confirmation
}


⸻

📦 API Endpoint Example

GET /api/import-pi-profile?username=@username

Returns:

{
  "avatar": "https://cdn.pinet.com/avatars/xyz.png",
  "bio": "Building in the Pi Network.",
  "links": [
    { "title": "My Blog", "url": "https://myblog.com" },
    { "title": "GitHub", "url": "https://github.com/user" }
  ]
}


⸻

✅ Tips & Notes
	•	Scraping may break if Pi updates the site layout
	•	Consider caching imports to reduce load
	•	Support manual refresh or scheduled sync
	•	Watch for a future Pi API to replace scraping

⸻

🔮 Roadmap

Feature	Status
Manual import via scrape	✅
Real-time sync	🔄 Planned
Pi Profile API support	🔜 Awaiting
Import validation UI	✅


⸻

🧠 Future Enhancements
	•	Auto-import on sign-up (with user consent)
	•	Analytics for imported vs custom links
	•	Integration with Pi DITO for profile data

⸻

🧑‍💻 Contributing

Want to improve Pi Profile syncing or scraping logic?
Feel free to fork and submit a PR. Bug reports welcome.

⸻

🛟 Support

Visit https://droplink.space
Or email: support@droplink.space

⸻

🧾 License

MIT License
