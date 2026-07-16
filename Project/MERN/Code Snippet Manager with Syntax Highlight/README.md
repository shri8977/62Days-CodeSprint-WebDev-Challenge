# SnippetVault — Code Snippet Manager with Syntax Highlight

Full-stack MERN app for saving, searching, highlighting, and sharing code snippets.  
Built for **Issue #196** under `Project/MERN`.

---

## Features

- User authentication (register / login / JWT)
- Snippet CRUD (create, read, update, delete)
- Organize by programming language and tags
- Full-text search across title, code, description, and tags
- Syntax highlighting via **highlight.js**
- Shareable public short links (`/s/:shareId`)
- Copy-to-clipboard for code and share URLs
- Responsive UI (desktop + mobile)

---

## Tech Stack

| Layer | Tools |
|-------|--------|
| Frontend | React, Vite, Tailwind CSS v4, React Router, highlight.js, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, nanoid |
| Auth | JSON Web Tokens |

---

## Folder Structure

```text
Code Snippet Manager with Syntax Highlight/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── .env.example
└── README.md
```

---

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

---

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Environment Variables

**Backend (`.env`)**

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/code-snippet-manager
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

**Frontend (`.env`)**

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Log in |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/snippets` | Yes | List / search own snippets (`q`, `language`, `tag`) |
| POST | `/api/snippets` | Yes | Create snippet |
| GET | `/api/snippets/:id` | Yes | Get snippet |
| PUT | `/api/snippets/:id` | Yes | Update snippet |
| DELETE | `/api/snippets/:id` | Yes | Delete snippet |
| GET | `/api/snippets/share/:shareId` | No | Public shared snippet |
| GET | `/api/snippets/tags/mine` | Yes | Tag counts |
| GET | `/api/snippets/meta/languages` | No | Supported languages |

---

## How sharing works

1. Mark a snippet as **public** when creating or editing.
2. The API generates a short `shareId` (nanoid).
3. Anyone can open `/s/<shareId>` without logging in.
4. Private snippets are never exposed on the share route.

---

## Screens

- Landing page with live highlight preview
- Register / Login
- Library with search + language/tag filters
- Editor with live syntax preview
- Snippet detail (copy code / copy share link)
- Public share page

---

## License

MIT — contributed to the 62Days-CodeSprint-WebDev-Challenge (SSoC'26).
