const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite (the file already exists or will be created)
const db = new sqlite3.Database(path.join(__dirname, "data.sqlite"), (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite.");
});

// Create tables if they do not exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    password TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    name TEXT,
    amount INTEGER,
    date TEXT,
    FOREIGN KEY(email) REFERENCES users(email)
  )
`);

// Registration
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    function (err) {
      if (err) {
        return res
          .status(400)
          .json({ message: "User already exists or error." });
      }
      res.json({ message: "User registered" });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err || !row) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ message: "Successful login" });
    }
  );
});

// Adding an expense
app.post("/expense", (req, res) => {
  const { email, name, amount, date } = req.body;
  db.run(
    "INSERT INTO expenses (email, name, amount, date) VALUES (?, ?, ?, ?)",
    [email, name, amount, date],
    function (err) {
      if (err) return res.status(500).json({ message: "Error saving expense" });
      res.json({ message: "Expense saved" });
    }
  );
});

// Get all user expenses
app.get("/expenses", (req, res) => {
  const { email } = req.query;
  db.all("SELECT * FROM expenses WHERE email = ?", [email], (err, rows) => {
    if (err)
      return res.status(500).json({ message: "Error fetching expenses" });
    res.json(rows);
  });
});

app.get("/debug/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(rows);
  });
});

app.get("/debug/expenses", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    if (err)
      return res.status(500).json({ message: "Error fetching expenses" });
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
