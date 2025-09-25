import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;

const allowList = new Set([
  "http://localhost:8080",
  "https://alelodato.github.io",
]);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (origin.endsWith(".vercel.app") || allowList.has(origin)) {
      return cb(null, true);
    }
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET leaderboard
app.get("/scores", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT name, score, createdAt FROM scores ORDER BY score DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching scores:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST score
app.post("/scores", async (req, res) => {
  const { name, score } = req.body;
  console.log("📩 Ricevuto:", req.body);

  if (!name || score === undefined) {
    return res.status(400).json({ error: "Name and score required" });
  }

  try {
    await pool.query("INSERT INTO scores (name, score) VALUES ($1, $2)", [name, score]);
    res.status(201).json({ message: "✅ Score saved!", player: { name, score } });
  } catch (err) {
    console.error("❌ Error saving score:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
