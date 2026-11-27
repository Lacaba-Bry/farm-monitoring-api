# Greenfield Farm — UI refresh

This is the refreshed React + Vite frontend for your existing farm monitoring application.

## What changed
- Reworked the sign-in screen and authenticated dashboard UI.
- Added responsive sidebar navigation, summary cards, and clearer crop, inventory, and notification layouts.
- Added client-side crop-name filtering and refresh controls.
- Improved empty states, form feedback, spacing, typography, and mobile layouts.

## What was intentionally kept
- The existing NestJS API base URL remains `http://localhost:3000/api/v1`.
- Login still calls `POST /auth/login` with the same `{ email, password }` body.
- JWT storage and the `Authorization: Bearer ...` header are unchanged.
- Dashboard data still loads from `GET /crops`, `GET /supplies`, and `GET /notifications`.
- Crop creation still calls `POST /crops` with the same request fields: `cropName`, `plantingDate`, `cropStatus`, and `userId`.
- No backend, database, endpoint, or request schema changes were made.

## Run locally
1. Make sure your NestJS backend is running at `http://localhost:3000`.
2. Open a terminal in this project folder.
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Start Vite:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

The archive intentionally excludes `node_modules`; `npm install` recreates dependencies for your operating system.
