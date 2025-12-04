# Mini Task Management — Backend

Node.js + Express backend API for the Mini Task Management application.

Features

- JWT authentication (access tokens)
- Password hashing with `bcryptjs`
- Task CRUD (user-scoped)
- Input validation with `express-validator`
- Pagination, filtering and sorting for tasks

Prerequisites

- Node.js 16+
- MongoDB (local or remote)

Quick start (development)

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env` and set values:

   - `PORT` (default 5001)
   - `MONGODB_URI` (e.g. `mongodb://localhost:27017/mini-task-mgmt`)
   - `JWT_SECRET` (a long random secret)
   - `JWT_EXPIRE` (e.g. `7d`)

3. Run in development:

   ```bash
   npm run dev
   ```

Environment variables

- `PORT` — port to run the server on (default 5000)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs
- `JWT_EXPIRE` — token expiry (e.g. `7d`)
- `NODE_ENV` — `development` or `production`

API Reference

Base URL: `/api`

Auth

- POST `/api/auth/signup`

  - Description: Create a new user and return a JWT
  - Body: `{ "name": "string", "email": "user@example.com", "password": "secret" }`
  - Response (201): `{ "token": "<jwt>", "user": { "id": "...", "name": "...", "email": "..." } }`
  - Errors: 400 if user exists or validation fails

- POST `/api/auth/login`
  - Description: Authenticate a user
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Response (200): `{ "token": "<jwt>", "user": { "id": "...", "name": "...", "email": "..." } }`
  - Errors: 400 on invalid credentials

Tasks (protected — require `Authorization: Bearer <token>` header)

- GET `/api/tasks`

  - Query params:
    - `status` — filter by status (`Pending`, `In Progress`, `Done`)
    - `sortBy` — field to sort by (default `deadline`)
    - `order` — `asc` or `desc`
    - `page` — page number (pagination)
    - `limit` — page size
    - `deadline_from` — ISO date string to filter tasks with `deadline >= deadline_from`
    - `deadline_to` — ISO date string to filter tasks with `deadline <= deadline_to`
  - Response (200): `{ "tasks": [ ... ] }`

- POST `/api/tasks`

  - Body: `{ "title": "...", "description": "...", "status": "Pending", "deadline": "2025-01-15T00:00:00.000Z" }`
  - Response (201): `{ "task": { ... } }`

- PUT `/api/tasks/:id`

  - Body: Partial or full task fields to update
  - Response (200): `{ "task": { ... } }`

- DELETE `/api/tasks/:id`
  - Response (200): `{ "message": "Task deleted" }`

Error handling

Errors return JSON with a `message` field and appropriate HTTP status codes. In development the error `stack` is also returned.

Docker

You can run the backend together with MongoDB using the provided `docker-compose.yml` at the repository root. The compose file will build the backend image and start a MongoDB service.
