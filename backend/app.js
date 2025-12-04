const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./utils/errorHandler");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const app = express();
// Debugging middleware: log incoming requests and Origin header to help diagnose CORS/preflight issues.
app.use((req, res, next) => {
  try {
    console.log(
      "[CORS DEBUG]",
      req.method,
      req.originalUrl,
      "Origin:",
      req.headers.origin || "<none>"
    );
  } catch (e) {
    // ignore
  }
  next();
});
// Simple explicit CORS headers for development. Restrict to your frontend origin when possible.
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // respond to preflight
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Configure cors middleware as well (keeps compatibility with CORS package)
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Note: preflight (OPTIONS) is handled by the middleware above.

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

module.exports = app;
