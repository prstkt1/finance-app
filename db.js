const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "data.sqlite"), (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite.");
});

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

module.exports = db;
