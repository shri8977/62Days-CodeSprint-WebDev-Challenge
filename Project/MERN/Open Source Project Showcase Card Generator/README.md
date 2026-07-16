# RepoCard — Open Source Project Showcase Card Generator

React + Vite app that turns a GitHub repository URL into a polished, shareable project card with auto-fetched stats and PNG/SVG export.

Built for **Issue #199** under `Project/MERN`.

---

## Features

- GitHub repo URL input and validation (`owner/repo` or full URL)
- Auto-fetch stars, forks, languages, description, topics, license
- Beautiful live showcase card preview
- Theme options: Meadow, Midnight, Paper, Ocean
- Layout options: Classic, Compact, Banner
- Toggle language breakdown and topics
- Export as **PNG**
- Export as **SVG**
- Loading and error states (invalid URL, private/missing repo, rate limit)
- Responsive UI

---

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- GitHub REST API (public)
- `html-to-image` for PNG / SVG export

---

## Folder Structure

```text
Open Source Project Showcase Card Generator/
├── public/
├── src/
│   ├── components/ShowcaseCard.jsx
│   ├── utils/github.js
│   ├── utils/themes.js
│   ├── utils/exportCard.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
└── README.md
```

---

## Setup

```bash
cd "Project/MERN/Open Source Project Showcase Card Generator"
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5176`.

---

## Optional GitHub token

Unauthenticated GitHub API requests are rate-limited (~60/hour).

To raise the limit, add a personal access token:

```env
VITE_GITHUB_TOKEN=your_github_token_here
```

Never commit real tokens. Use `.env` locally only.

---

## How to use

1. Paste a public GitHub repo URL (or `owner/repo`)
2. Click **Generate**
3. Pick a theme and layout
4. Export **PNG** or **SVG** for README / social sharing

Sample: `https://github.com/facebook/react`

---

## Notes

- Private repositories cannot be fetched with the public API unless you use a token that has access.
- Avatar images are loaded with `crossOrigin="anonymous"` so exports can include them when GitHub CORS allows.

---

## License

MIT — contributed to the 62Days-CodeSprint-WebDev-Challenge (SSoC'26).
