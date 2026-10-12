# Zerodha-MySQL — Deployment Milestone Plan

Educational resume project. Keep the existing UI. Do not overengineer. Complete work **one milestone at a time** and wait for confirmation before starting the next.

**Deployment targets**

- `frontend/` → Vercel
- `dashboard/` → Vercel
- `backendWithNeon/` → Render
- Database → Neon PostgreSQL
- Authentication → Clerk
- Stock data → existing backend `GET /api/stocks` (Neon catalogue; no third-party market API in the repo)

---

## Roadmap

| # | Milestone | Status | Completion criteria |
|---|---|---|---|
| 1 | Project audit and setup | In progress — audit done; local tools/env still needed | Project state understood; missing config known |
| 2 | Fix responsive UI | Not started | Existing UI works on mobile, tablet, laptop, desktop |
| 3 | Fix Clerk authentication | Not started | Local sign-up, sign-in, refresh, logout, protected dashboard |
| 4 | Fix dashboard and stock data | Not started | Core dashboard features work; stock data comes from the API |
| 5 | Verify backend and database | Not started | Required backend and Neon features work locally |
| 6 | Deploy backend to Render | Not started | Backend has a verified public URL |
| 7 | Deploy frontend to Vercel | Not started | Frontend has a verified public URL |
| 8 | Deploy dashboard to Vercel | Not started | Dashboard has a verified public URL |
| 9 | Connect and verify everything | Not started | Deployed apps work together |
| 10 | Final resume readiness | Not started | Public demo link + README + resume text |

---

## Milestone 1 — Project audit and setup

**Objective:** Inspect the real repo, list bugs and missing config, confirm how to run and deploy later.

**Current status (from repo inspection)**

- Three apps: `frontend/` (React 19 + Clerk), `dashboard/` (React 18 + Clerk), `backendWithNeon/` (Express + Neon).
- Deploy config already present: `frontend/vercel.json`, `dashboard/vercel.json`, `render.yaml`, `.github/workflows/validate.yml`.
- Dashboard already loads stocks, watchlist, holdings, positions, and orders from the backend (not from `dashboard/src/data/data.js`).
- Prices are **seeded Neon values**, not a live market-data provider.
- Only `.env.example` files exist. Real `.env` files must be created locally and never committed.
- README mentions a `backend/` folder that is **not** in this repo.
- This agent could not run `node` / `git` / builds (tools missing from that environment). Builds must be confirmed on the developer machine.

**Confirmed issues (to fix in later milestones)**

1. No local `.env` files; Node/Git must be available on the developer machine.
2. Dashboard `ClerkProvider` has no missing-key fallback; auth gate can show a blank screen while loading.
3. Homepage and Pricing embed `<SignUp path="/singup">` on the wrong route.
4. Mobile navbar has no Sign in / Sign up; extra unused Clerk packages.
5. Buy window defaults price to `0` (backend rejects it).
6. Holdings/Summary/Funds/TopBar use hardcoded totals; watchlist class `itemInfo` vs CSS `.item-info`.
7. Weak loading/error/empty states on several dashboard pages.
8. No CSS `@media` queries; dashboard layout will overflow on small screens.
9. Windows-style image paths (`media\...`) on some landing pages.
10. No third-party stock API; label data as demo/delayed unless a provider is added later.

**Environment variable names**

`frontend/.env`

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_AFTER_SIGN_UP_URL=http://localhost:3001/
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

`dashboard/.env`

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_AFTER_SIGN_UP_URL=http://localhost:3001/
REACT_APP_FRONTEND_URL=http://localhost:3000
```

`backendWithNeon/.env`

```env
PORT=8080
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**Developer actions to finish Milestone 1**

```powershell
node -v
npm -v
git --version

cd D:\Projects\Intermediate\suresh\Zerodha-MySQL
Copy-Item backendWithNeon\.env.example backendWithNeon\.env
Copy-Item dashboard\.env.example dashboard\.env
Copy-Item frontend\.env.example frontend\.env
```

Fill Clerk and Neon values locally. Then:

```powershell
cd backendWithNeon
npm test

cd ..\frontend
npm run build

cd ..\dashboard
npm run build
```

**Skills (from skills.sh, used only where they fit this CRA project)**

- `web-design-guidelines` — Milestone 2 (responsive/overflow), keep existing look
- `neon-postgres` — Milestone 5
- `vercel-react-best-practices` — overlapping React advice only; do **not** migrate to Next.js
- Do **not** use redesign / new-UI skills

**Milestone 1 criteria:** passed for the audit; still waiting on local Node/Git, `.env` files, and build confirmation.

---

## Milestone 2 — Fix responsive UI

Preserve colors, typography, layout, charts, cards, and navigation. Fix overflow, overlapping, nav, tables, charts, dialogs, and forms on mobile through desktop. No visual redesign.

---

## Milestone 3 — Fix Clerk authentication

Keep `@clerk/clerk-react`. Fix sign-up/sign-in, redirects, session after refresh, logout, protected dashboard routes, and misplaced SignUp widgets. Document Clerk Dashboard settings (origins and redirect URLs).

---

## Milestone 4 — Fix dashboard and dynamic stock data

Fix real bugs on stocks, watchlist, holdings, positions, orders. Serve prices through the existing backend GET API. Keep secrets off the frontend. Add loading/error/empty states and last-updated labeling. Do not add a new market API unless the current catalogue cannot meet the demo need.

---

## Milestone 5 — Verify backend and database

Check Express routes, Clerk token checks, CORS, Neon connectivity, `schema.sql` / `seed.sql`. Keep the current schema unless a real bug requires a small change.

---

## Milestone 6 — Deploy the backend to Render

Use `render.yaml`: root `backendWithNeon`, `npm ci`, `npm start`, health `/status`. Set Render env vars. Verify the public health URL before calling this done.

---

## Milestone 7 — Deploy the frontend to Vercel

Root directory `frontend/`. Set Clerk and dashboard URL env vars. Test landing and auth entry.

---

## Milestone 8 — Deploy the dashboard to Vercel

Root directory `dashboard/`. Set API URL, Clerk, and frontend URL. Test routing and auth.

---

## Milestone 9 — Connect and verify everything

Production CORS, Clerk allowed origins and redirects, Neon, stock API. Full user journey in a fresh browser. Do not claim success without tested URLs.

---

## Milestone 10 — Final resume readiness

Fix remaining important bugs. Update README (setup, architecture, stack, live links). Provide a short accurate resume blurb and a verification checklist.

---

## How each milestone is executed

1. Objective  
2. Current status  
3. Code changes (if needed)  
4. Commands  
5. Clerk / Neon / Vercel / Render steps  
6. Environment variables (never paste secrets into chat or Git)  
7. Verification  
8. Expected result  
9. Troubleshooting  
10. Git checkpoint when appropriate  

Stop after each milestone and wait for confirmation.

---

## Rules

- Do not redesign the UI.
- Do not add Kubernetes, payments, real-money trading, or extra paid services.
- Do not replace working libraries without a real need.
- Do not delete seed data or files without checking their purpose.
- Do not invent passing tests or successful deployments.
- Prefer the shortest path to a working public demo.
