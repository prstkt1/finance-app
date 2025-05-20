const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
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

router.get("/debug", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(rows);
  });
});

module.exports = router;
