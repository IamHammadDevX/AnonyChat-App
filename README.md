# Anonymous One-to-One Random Chat Website

Anonymous chat application that pairs two visitors instantly for a private, real-time text conversation. Includes a simple admin dashboard to monitor rooms, queue, and ban/unban IPs.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, `socket.io-client`
- Backend: Node.js, Express, Socket.io, SQLite via `better-sqlite3`

## Repository Structure

```
Anonymous_Chat_Website/
  backend/
    server.js
    db.js
    .env
    .env.example
    package.json
  frontend/
    src/
      App.jsx
      Admin.jsx
      main.jsx
      index.css
    index.html
    .env.example
    package.json
    tailwind.config.js
    vite.config.js
  README.md
  .gitignore
```

## Prerequisites

- Node.js 18+ (LTS recommended)

## Environment Variables

### Backend (`backend/.env`)

- `PORT` – desired port (fallback will automatically use the next free port if busy)
- `ADMIN_SECRET` – admin key for protected routes
- `ENABLE_LOGS` – `true`/`false` to store chat logs in SQLite
- `FRONTEND_ORIGIN` – frontend origin for CORS (e.g., `http://localhost:5173`)

Example:

```
PORT=3000
ADMIN_SECRET=supersecret123
ENABLE_LOGS=false
FRONTEND_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)

- `VITE_BACKEND_URL` – backend base URL (including port);

Example:

```
VITE_BACKEND_URL=http://localhost:3000
```

## Installation

1) Backend

```
cd backend
npm install
copy .env.example .env   # create and edit the .env
npm start
```

Startup prints `Backend listening on http://localhost:<port>`.

2) Frontend

```
cd frontend
npm install
copy .env.example .env   # create and edit the .env
npm run dev
```

Visit `http://localhost:5173/` (default Vite port).

## Usage

- Landing page: click `Start Chat` to be paired with a random stranger.
- Chat screen: send messages in real time; your messages appear right (blue), partner’s appear left (black). Timestamps are displayed on every message.
- Disconnect: ends the chat for both participants and returns to the landing page with an alert.

## Admin Dashboard

- Open: `http://localhost:5173/admin?key=<ADMIN_SECRET>`
- Features:
  - Counters for Active Rooms, Waiting Queue, and Banned IPs
  - Ban IP with optional reason
  - Unban IP from list
  - Auto-refresh toggle (3s) and manual refresh
- Backend endpoints:
  - `GET /admin` – status object with active rooms, waiting queue, banned IPs
  - `POST /admin/ban` – body `{ ip, reason? }`
  - `POST /admin/unban` – body `{ ip }`

## Security

- HTTP rate limiting via `express-rate-limit`
- Per-socket message throttling with token bucket
- Input sanitization and React’s safe rendering prevent XSS
- Admin routes protected by `ADMIN_SECRET`
- SQLite accessed server-side only

## Deployment

1) Build frontend:

```
cd frontend
npm run build
```

2) Run backend (serve API and sockets):

```
cd backend
npm start
```

3) Serve the built frontend (options):

- Use any static host (e.g., Nginx) to serve `frontend/dist`.
- Ensure `VITE_BACKEND_URL` points to the publicly accessible backend URL.

## Troubleshooting

- Port in use (`EADDRINUSE`): backend auto-retries the next port (e.g., `3001`). Update `frontend/.env` to match the actual backend port.
- Admin shows forbidden: verify the `ADMIN_SECRET` and URL key; ensure backend `FRONTEND_ORIGIN` matches the frontend origin.
- Messages not delivering: confirm both tabs are connected and `VITE_BACKEND_URL` is correct; check browser console/network.

## Acceptance Checklist

- Instant anonymous pairing; no login, no profile
- Real-time chat (Socket.io), message timestamps
- Queue, room creation/destruction, disconnect handling
- Admin monitoring and banning
- SQLite storage for bans; optional chat logs
- React + Tailwind + Node.js + Socket.io + SQLite

