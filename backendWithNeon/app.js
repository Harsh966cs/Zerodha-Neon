import "dotenv/config";
import cors from "cors";
import express from "express";
import { neon } from "@neondatabase/serverless";
import { clerkMiddleware, getAuth } from "@clerk/express";

const {
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PORT = 8080,
  ALLOWED_ORIGINS = "http://localhost:3000,http://localhost:3001",
} = process.env;

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
  throw new Error("PGHOST, PGDATABASE, PGUSER, and PGPASSWORD are required.");
}

const app = express();
const allowedOrigins = ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());
const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`,
);

async function ensureSchemaCompatibility() {
  await sql`
    ALTER TABLE stocks
    ADD COLUMN IF NOT EXISTS current_price NUMERIC(18, 4) NOT NULL DEFAULT 0
  `;
  await sql`
    ALTER TABLE stocks
    ADD COLUMN IF NOT EXISTS day_change NUMERIC(10, 4) NOT NULL DEFAULT 0
  `;
  await sql`
    ALTER TABLE holdings
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  `;
  await sql`
    ALTER TABLE positions
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  `;
}

async function seedDefaultStocks() {
  await sql`
    INSERT INTO stocks (symbol, name, current_price, day_change)
    VALUES
      ('INFY', 'INFY', 1555.45, -1.60),
      ('ONGC', 'ONGC', 116.80, -0.09),
      ('TCS', 'TCS', 3194.80, -0.25),
      ('KPITTECH', 'KPITTECH', 266.45, 3.54),
      ('QUICKHEAL', 'QUICKHEAL', 308.55, -0.15),
      ('WIPRO', 'WIPRO', 577.75, 0.32),
      ('M&M', 'M&M', 779.80, -0.01),
      ('RELIANCE', 'RELIANCE', 2112.40, 1.44),
      ('HUL', 'HUL', 512.40, 1.04),
      ('BHARTIARTL', 'BHARTIARTL', 541.15, 0),
      ('HDFCBANK', 'HDFCBANK', 1522.35, 0),
      ('HINDUNILVR', 'HINDUNILVR', 2417.40, 0),
      ('ITC', 'ITC', 207.90, 0),
      ('SBIN', 'SBIN', 430.20, 0),
      ('SGBMAY29', 'SGBMAY29', 4719.00, 0),
      ('TATAPOWER', 'TATAPOWER', 124.15, 0),
      ('EVEREADY', 'EVEREADY', 312.35, -1.24),
      ('JUBLFOOD', 'JUBLFOOD', 3082.65, -1.35)
    ON CONFLICT (symbol) DO UPDATE
    SET name = EXCLUDED.name,
        current_price = CASE
          WHEN stocks.current_price = 0 THEN EXCLUDED.current_price
          ELSE stocks.current_price
        END,
        day_change = CASE
          WHEN stocks.day_change = 0 THEN EXCLUDED.day_change
          ELSE stocks.day_change
        END
  `;
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS."));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(clerkMiddleware());

const getUserDetails = (req) => {
  const claims = req.auth?.sessionClaims ?? {};
  return {
    clerkId: getAuth(req).userId,
    email: claims.email ?? `${getAuth(req).userId}@clerk.local`,
    name: claims.name ?? null,
  };
};

function authenticated(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Authentication required." });
  }
  return next();
};

async function ensureUser({ clerkId, email, name }) {
  await sql`
    INSERT INTO users (clerk_id, email, name)
    VALUES (${clerkId}, ${email}, ${name})
    ON CONFLICT (clerk_id) DO UPDATE
    SET email = COALESCE(EXCLUDED.email, users.email),
        name = COALESCE(EXCLUDED.name, users.name)
  `;
}

function parsePositiveNumber(value, field) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    const error = new Error(`${field} must be a positive number.`);
    error.status = 400;
    throw error;
  }
  return number;
}

async function findStock(stockId, symbol) {
  const rows = stockId
    ? await sql`SELECT id, symbol FROM stocks WHERE id = ${stockId}`
    : await sql`SELECT id, symbol FROM stocks WHERE symbol = ${symbol}`;
  if (rows.length === 0) {
    const error = new Error("Stock was not found.");
    error.status = 404;
    throw error;
  }
  return rows[0];
}

app.get("/status", async (_req, res) => {
  const result = await sql`SELECT 1 AS ok`;
  res.json({ ok: result[0].ok === 1 });
});

app.get("/api/me", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  await ensureUser(user);
  res.json({ clerk_id: user.clerkId });
});

app.get("/api/stocks", authenticated, async (_req, res) => {
  const rows = await sql`
    SELECT id, symbol, name, exchange, current_price AS price, day_change
    FROM stocks
    ORDER BY symbol
  `;
  res.json(rows);
});

app.get("/api/watchlist", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  await ensureUser(user);
  const rows = await sql`
    SELECT s.id, s.symbol, s.name, s.current_price AS price, s.day_change
    FROM watchlist w
    JOIN stocks s ON s.id = w.stock_id
    WHERE w.clerk_id = ${user.clerkId}
    ORDER BY w.created_at DESC
  `;
  res.json(rows);
});

app.post("/api/watchlist", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  const stock = await findStock(req.body.stockId, req.body.symbol);
  await ensureUser(user);
  await sql`
    INSERT INTO watchlist (clerk_id, stock_id)
    VALUES (${user.clerkId}, ${stock.id})
    ON CONFLICT (clerk_id, stock_id) DO NOTHING
  `;
  res.status(201).json({ ok: true });
});

app.delete("/api/watchlist/:stockId", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  await sql`
    DELETE FROM watchlist
    WHERE clerk_id = ${user.clerkId} AND stock_id = ${req.params.stockId}
  `;
  res.json({ ok: true });
});

app.get("/api/holdings", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  await ensureUser(user);
  const rows = await sql`
    SELECT s.id, s.symbol AS name, h.qty, h.avg_price AS avg,
           s.current_price AS price,
           ROUND(((s.current_price - h.avg_price) / NULLIF(h.avg_price, 0) * 100)::numeric, 2) AS net,
           s.day_change AS day
    FROM holdings h
    JOIN stocks s ON s.id = h.stock_id
    WHERE h.clerk_id = ${user.clerkId}
    ORDER BY s.symbol
  `;
  res.json(rows);
});

app.get("/api/positions", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  await ensureUser(user);
  const rows = await sql`
    SELECT s.id, p.product, s.symbol AS name, p.qty, p.avg_price AS avg,
           s.current_price AS price,
           ROUND(((s.current_price - p.avg_price) / NULLIF(p.avg_price, 0) * 100)::numeric, 2) AS net,
           s.day_change AS day,
           (s.current_price < p.avg_price) AS "isLoss"
    FROM positions p
    JOIN stocks s ON s.id = p.stock_id
    WHERE p.clerk_id = ${user.clerkId}
    ORDER BY s.symbol
  `;
  res.json(rows);
});

app.post("/api/positions", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  const qty = parsePositiveNumber(req.body.qty, "qty");
  const price = parsePositiveNumber(req.body.price, "price");
  const product = String(req.body.product || "CNC").trim().toUpperCase();
  if (!["CNC", "MIS", "NRML"].includes(product)) {
    return res.status(400).json({ error: "product must be CNC, MIS, or NRML." });
  }

  const stock = await findStock(req.body.stockId, req.body.symbol);
  await ensureUser(user);
  const rows = await sql`
    INSERT INTO positions (clerk_id, stock_id, product, qty, avg_price, updated_at)
    VALUES (${user.clerkId}, ${stock.id}, ${product}, ${qty}, ${price}, now())
    ON CONFLICT (clerk_id, stock_id, product) DO UPDATE
    SET qty = positions.qty + EXCLUDED.qty,
        avg_price = ((positions.qty * positions.avg_price) +
          (EXCLUDED.qty * EXCLUDED.avg_price)) /
          (positions.qty + EXCLUDED.qty),
        updated_at = now()
    RETURNING qty, avg_price, product
  `;
  res.status(201).json({ ok: true, position: rows[0] });
});

app.post("/api/buy", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  const qty = parsePositiveNumber(req.body.qty, "qty");
  const price = parsePositiveNumber(req.body.price, "price");
  const stock = await findStock(req.body.stockId, req.body.symbol);
  await ensureUser(user);

  const rows = await sql`
    WITH new_transaction AS (
      INSERT INTO transactions (clerk_id, stock_id, type, qty, price)
      VALUES (${user.clerkId}, ${stock.id}, 'BUY', ${qty}, ${price})
    )
    INSERT INTO holdings (clerk_id, stock_id, qty, avg_price, updated_at)
    VALUES (${user.clerkId}, ${stock.id}, ${qty}, ${price}, now())
    ON CONFLICT (clerk_id, stock_id) DO UPDATE
    SET qty = holdings.qty + EXCLUDED.qty,
        avg_price = ((holdings.qty * holdings.avg_price) +
          (EXCLUDED.qty * EXCLUDED.avg_price)) /
          (holdings.qty + EXCLUDED.qty),
        updated_at = now()
    RETURNING qty, avg_price
  `;
  res.status(201).json({ ok: true, holding: rows[0] });
});

app.get("/api/orders", authenticated, async (req, res) => {
  const user = getUserDetails(req);
  const rows = await sql`
    SELECT t.id, s.symbol, t.type, t.qty, t.price, t.created_at
    FROM transactions t
    JOIN stocks s ON s.id = t.stock_id
    WHERE t.clerk_id = ${user.clerkId}
    ORDER BY t.created_at DESC
  `;
  res.json(rows);
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status ?? 500).json({ error: error.message ?? "Internal server error." });
});

async function start() {
  await sql`SELECT 1`;
  await ensureSchemaCompatibility();
  await seedDefaultStocks();
  app.listen(PORT, () => {
    console.log(`Neon backend is listening on port ${PORT}`);
});
}

start().catch((error) => {
  console.error("Unable to start Neon backend:", error);
  process.exit(1);
});
