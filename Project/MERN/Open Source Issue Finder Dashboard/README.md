# Open Source Issue Finder Dashboard

A React dashboard that helps SSoC contributors discover beginner-friendly open source issues using the public GitHub Search API.

## Features

- Search GitHub issues with keywords
- Filter by labels (`good first issue`, `help wanted`, and more)
- Filter by programming language and minimum repository stars
- Issue cards with title, labels, repo info, and contribute links
- Loading, empty, and error states (including API rate limits)
- Save favorite issues in `localStorage`
- Responsive dashboard UI

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- GitHub REST Search API

## Getting Started

```bash
cd "Project/MERN/Open Source Issue Finder Dashboard"
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Optional: GitHub Token

Unauthenticated requests are limited (~10 searches/minute). For higher limits, create a personal access token and add:

```bash
cp .env.example .env
```

Then set:

```env
VITE_GITHUB_TOKEN=your_github_pat_here
```

Never commit your `.env` file.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |

## Folder Structure

```text
Open Source Issue Finder Dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── FavoritesPanel.jsx
│   │   ├── Filters.jsx
│   │   ├── IssueCard.jsx
│   │   └── StatusViews.jsx
│   ├── hooks/
│   │   └── useFavorites.js
│   ├── services/
│   │   └── githubApi.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── package.json
└── README.md
```

## Issue

Resolves #179
