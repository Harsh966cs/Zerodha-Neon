# Zerodha Trading Dashboard Clone

A portfolio project that recreates a Zerodha-style trading platform with a React landing page, Clerk authentication, a React trading dashboard, and a Neon PostgreSQL backend.

> This is an educational clone. It is not the official Zerodha application and does not connect to a real stock exchange.

## Current architecture

```text
frontend (React, port 3000)
        |
        | Clerk sign-in/sign-up
        v
dashboard (React, port 3001)
        |
        | Bearer token + REST API
        v
backendWithNeon (Express, port 8080)
        |
        v
Neon PostgreSQL
```

### Applications

| Folder | Purpose | Technology |
|---|---|---|
| `frontend` | Public landing pages, pricing, products, sign-in, and sign-up | React, React Router, Material UI, Clerk |
| `dashboard` | Authenticated watchlist and portfolio dashboard | React, React Router, Axios, Chart.js, Clerk |
| `backendWithNeon` | Active API and database integration | Node.js, Express, Neon PostgreSQL, Clerk |
| `render.yaml` | Render service definition for the active backend | Render |

The active application uses `backendWithNeon`. The `backend` folder is not used by the current dashboard and is retained only as a migration reference. It can be removed later after the Neon deployment is stable and backed up.

## Features

- Clerk authentication shared between the landing page and dashboard.
- User records associated with the Clerk user ID.
- Seeded stock catalogue with symbol, name, current price, and day change.
- User-specific watchlists.
- User-specific holdings with weighted-average buy price.
- User-specific positions with CNC, MIS, and NRML product types.
- Transaction/order history for buy actions.
- Dashboard stock table with:
  - stock selection
  - quantity and price input
  - add to holdings
  - add to positions
  - add to watchlist
- Holdings and positions pages loaded from Neon.

## Prerequisites

- Node.js 18 or newer
- npm
- A Neon PostgreSQL database
- A Clerk development application

## Configuration

Never commit real `.env` files or secret keys. Copy the example files and fill them locally:

```powershell
Copy-Item backendWithNeon\.env.example backendWithNeon\.env
Copy-Item dashboard\.env.example dashboard\.env
Copy-Item frontend\.env.example frontend\.env
```

### `backendWithNeon/.env`

```env
PORT=8080
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
# Optional comma-separated extra origins
ALLOWED_ORIGINS=
```

### `dashboard/.env`

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_AFTER_SIGN_UP_URL=http://localhost:3001/
REACT_APP_FRONTEND_URL=http://localhost:3000
```

### `frontend/.env`

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_AFTER_SIGN_UP_URL=http://localhost:3001/
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

If a secret key has ever been committed or shared, revoke and rotate it in Clerk/Neon before deployment. Removing a file does not invalidate a credential that was already exposed or stored in Git history.

## Database setup

Open the Neon SQL Editor and run these files in order:

1. `backendWithNeon/schema.sql`
2. `backendWithNeon/seed.sql`

The schema contains:

- `users`
- `stocks`
- `watchlist`
- `holdings`
- `positions`
- `transactions`

The backend also performs small compatibility migrations at startup for columns added during development. The SQL files remain the source of truth for a fresh database.

Verify the stock catalogue:

```sql
SELECT id, symbol, name, current_price, day_change
FROM stocks
ORDER BY symbol;
```

## Deploying a resume-ready demo

The repository includes deployment configuration for the three applications:

- Deploy `frontend/` as a Vercel project.
- Deploy `dashboard/` as a separate Vercel project.
- Deploy the repository with `render.yaml` to Render for `backendWithNeon/`.

For both Vercel projects, set the project root directory to the matching folder and configure:

### Frontend Vercel variables

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_DASHBOARD_URL=https://zerodha-neon-2w2u.vercel.app
REACT_APP_AFTER_SIGN_UP_URL=https://zerodha-neon-2w2u.vercel.app/
REACT_APP_AFTER_SIGN_IN_URL=https://zerodha-neon-2w2u.vercel.app/
```

### Dashboard Vercel variables

```env
REACT_APP_API_URL=https://<backend-domain>
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_AFTER_SIGN_UP_URL=https://zerodha-neon-2w2u.vercel.app/
REACT_APP_FRONTEND_URL=https://zerodha-neon-five.vercel.app
```

### Render variables

```env
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
FRONTEND_URL=https://zerodha-neon-five.vercel.app
DASHBOARD_URL=https://zerodha-neon-2w2u.vercel.app
# Optional comma-separated extra origins, such as Vercel preview domains
ALLOWED_ORIGINS=
```

Run `schema.sql` and `seed.sql` in Neon before opening the deployed dashboard. In Clerk, use the same Clerk application and publishable key for both projects. Set the landing page domain as the primary domain and add `zerodha-neon-2w2u.vercel.app` as a satellite domain in Clerk's domain settings. Add both deployed URLs to Clerk's allowed origins and allowed redirect URLs. Cross-domain session sharing in production requires Clerk's multi-domain/satellite domain feature, which Clerk currently requires a paid production plan for. Never commit real keys or database credentials.

This is an educational demo with static seeded prices. It does not connect to a stock exchange, place real orders, or manage real funds.

## Running locally

Install dependencies:

```powershell
cd backendWithNeon
npm install

cd ..\frontend
npm install

cd ..\dashboard
npm install
```

Start each application in a separate terminal:

```powershell
cd backendWithNeon
npm run dev
```

```powershell
cd frontend
npm start
```

```powershell
cd dashboard
npm start
```

Open:

- Landing page: `http://localhost:3000`
- Dashboard: `http://localhost:3001`
- Backend health check: `http://localhost:8080/status`

Sign in through Clerk before using protected dashboard APIs.

## API

All `/api/*` routes require a Clerk bearer token:

```http
Authorization: Bearer <Clerk session token>
```

| Method | Route | Description |
|---|---|---|
| `GET` | `/status` | Backend/database health check |
| `GET` | `/api/me` | Creates/returns the current Clerk user |
| `GET` | `/api/stocks` | Lists available stocks |
| `GET` | `/api/watchlist` | Lists the current user's watchlist |
| `POST` | `/api/watchlist` | Adds a stock to the current user's watchlist |
| `DELETE` | `/api/watchlist/:stockId` | Removes a stock from the watchlist |
| `GET` | `/api/holdings` | Lists the current user's holdings |
| `GET` | `/api/positions` | Lists the current user's positions |
| `POST` | `/api/positions` | Adds or updates a position |
| `POST` | `/api/buy` | Records a buy and updates weighted-average holdings |
| `POST` | `/api/sell` | Records a sell and reduces the current user's holdings |
| `GET` | `/api/orders` | Lists the current user's transactions |

The backend never trusts a user ID from the request body. It gets the user identity from the verified Clerk token.

## Important implementation details

### Holdings

When a buy is submitted:

1. A `BUY` transaction is recorded.
2. A new holding is created if the user does not own the stock.
3. Otherwise, quantity and average price are recalculated:

```text
new average =
  (old quantity × old average + new quantity × new price)
  / (old quantity + new quantity)
```

### User isolation

Every user-owned query filters by the current Clerk `userId`. A user can only read or modify their own watchlist, holdings, positions, and transactions.

### Prices

The current prices in `seed.sql` are demo values. They are not live market data. A production version should update `stocks.current_price` and `stocks.day_change` from a licensed market-data provider.

## Troubleshooting

### `401 Authentication required`

- Confirm the user is signed in.
- Confirm `REACT_APP_CLERK_PUBLISHABLE_KEY` is set in `dashboard/.env`.
- Confirm the dashboard and backend use the same Clerk application.
- Restart the dashboard after changing `.env`.

### `column does not exist`

Run `backendWithNeon/schema.sql` in Neon, then restart the backend.

### No stocks in the dashboard

- Restart `backendWithNeon`.
- Check `http://localhost:8080/status`.
- Verify the `stocks` table:

```sql
SELECT COUNT(*) FROM stocks;
```

- Refresh the dashboard after signing in.

### CORS error

Set the frontend and dashboard's exact origins in `backendWithNeon/.env` (or Render's environment settings):

```env
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
ALLOWED_ORIGINS=
```

For production, set these to the deployed frontend and dashboard origins. Add any extra allowed origins as a comma-separated list in `ALLOWED_ORIGINS`. Origins are compared without trailing slashes. Restart or redeploy the backend after changing environment variables.

## Validation

```powershell
cd backendWithNeon
npm test

cd ..\frontend
npm run build

cd ..\dashboard
npm run build
```

The React builds currently complete with warnings from unused legacy imports and the deprecated Create React App toolchain.

## Resume description for a fresher

### Project title

**Zerodha-Style Trading Dashboard | React, Node.js, Express, Neon PostgreSQL, Clerk**

### Resume bullets

- Built a full-stack stock-trading dashboard clone with React, Express, Neon PostgreSQL, and Clerk authentication.
- Implemented user-specific watchlists, holdings, positions, and transaction history using Clerk identity and PostgreSQL foreign-key relationships.
- Developed REST APIs for stock discovery, watchlist management, buy transactions, holdings, positions, and order history.
- Implemented weighted-average price calculation when users purchase the same stock multiple times.
- Added authenticated frontend API requests using Clerk bearer tokens and protected backend routes.
- Designed PostgreSQL tables and constraints for users, stocks, watchlists, holdings, positions, and transactions.
- Added a dashboard stock catalogue where users can select a stock and add it to holdings, positions, or watchlist.

### Short project explanation for interviews

“I built a Zerodha-style educational trading platform. The public React app handles the landing pages and Clerk sign-in. After authentication, the user enters a separate React dashboard. The dashboard sends Clerk bearer tokens to an Express API. The API extracts the verified Clerk user ID and uses it to scope all PostgreSQL queries in Neon, so users only see their own watchlist and portfolio. For repeated buys, I calculate the weighted-average purchase price and store the transaction separately from the aggregate holding.”

## Interview preparation

Be ready to explain:

1. **Authentication:** how Clerk authenticates the user, how the frontend obtains a token, and how Express verifies it.
2. **Authorization:** why the backend uses the Clerk user ID instead of accepting a user ID from the client.
3. **Database design:** why stocks are global, while watchlists, holdings, positions, and transactions belong to a user.
4. **Weighted average:** how multiple buys update quantity and average price.
5. **Indexes and constraints:** unique stock symbols, unique user-stock holdings, foreign keys, and positive quantity/price checks.
6. **Transactions:** why transaction history should be kept separate from current holdings.
7. **Consistency:** why buy operations should eventually use a database transaction for strict atomicity.
8. **Security:** secret management, CORS restrictions, input validation, rate limiting, and avoiding client-provided ownership IDs.
9. **Scalability:** pagination, caching, background price updates, and connection pooling.
10. **Limitations:** demo prices are static, sell flow and funds are incomplete, and the application is not connected to a real exchange.

## Future improvements

- Add sell orders with quantity validation and holding reduction.
- Wrap transaction and holding updates in an atomic database transaction.
- Add order status and order history UI.
- Add live market-data integration.
- Add admin-only stock management.
- Add automated API and component tests.
- Add deployment configuration for frontend, dashboard, backend, Clerk, and Neon.
- Consider adding automated API and component tests after the public demo is stable.
#
