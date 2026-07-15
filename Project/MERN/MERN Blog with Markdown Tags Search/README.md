# MERN Blog with Markdown + Tags + Search

A full-stack blog platform with JWT authentication, Markdown posts, tags, and MongoDB full-text search.

## Features

- User authentication (register / login / JWT)
- CRUD blog posts with protected routes
- Markdown editor with live preview
- Tag system with filtering
- Full-text search across title, content, excerpt, and tags
- Responsive clean UI

## Tech Stack

- **MongoDB** + Mongoose
- **Express.js** + JWT + bcrypt
- **React** (Vite) + React Router
- **react-markdown** + remark-gfm
- Tailwind CSS v4

## Folder Structure

```text
MERN Blog with Markdown Tags Search/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── .env.example
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

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

## Environment Variables

**Backend (`.env`)**

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mern-blog-markdown
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

**Frontend (`.env`)**

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit real secrets or `.env` files.

## API Overview

| Method | Endpoint | Auth | Description |
| ------ | -------- | ---- | ----------- |
| POST | `/api/auth/register` | No | Register |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/posts` | No | List/search posts (`?q=&tag=&page=`) |
| GET | `/api/posts/tags/all` | No | Popular tags |
| GET | `/api/posts/:idOrSlug` | No | Single post |
| POST | `/api/posts` | Yes | Create post |
| PUT | `/api/posts/:id` | Yes | Update own post |
| DELETE | `/api/posts/:id` | Yes | Delete own post |
| GET | `/api/posts/mine/list` | Yes | Current user's posts |

## Issue

Resolves #180
