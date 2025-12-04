# Mini Task Management — Frontend

Next.js 13+ + Tailwind CSS frontend for the Mini Task Management application.

Main pages

- `/` — Landing / redirect to `/dashboard` when authenticated
- `/login` — Login page
- `/signup` — Signup page
- `/dashboard` — Protected task dashboard (list, filter, create/edit/delete)

Authentication

The frontend stores the JWT token in a cookie (`token`) and also stores the `user` JSON in a cookie to allow restoring session on refresh. Requests include the `Authorization: Bearer <token>` header via an axios interceptor.

Configuration

- `NEXT_PUBLIC_API_URL` — base API URL (e.g., `http://localhost:5000/api`)

Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`
3. `npm run dev`

Tailwind & Dark mode

Tailwind is configured in `tailwind.config.js`. Dark mode uses the `class` strategy and the `ThemeContext` toggles the `dark` class on `document.documentElement`.

Deployment

You can deploy the frontend to Vercel. Ensure `NEXT_PUBLIC_API_URL` is set in the Vercel environment variables.
