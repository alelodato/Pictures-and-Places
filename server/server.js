import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// Connection to Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Creates a Table if it doesn't exists
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        score INT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ Table 'scores' ready");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
})();

app.use(cors());
app.use(express.json());

// GET - Get the table
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

// POST - Save a New Score
app.post("/scores", async (req, res) => {
  const { name, score } = req.body;

  if (!name || score === undefined) {
    return res.status(400).json({ error: "Name and score required" });
  }

  try {
    await pool.query("INSERT INTO scores (name, score) VALUES ($1, $2)", [
      name,
      score
    ]);
    res.status(201).json({ message: "Score saved!" });
  } catch (err) {
    console.error("❌ Error saving score:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
