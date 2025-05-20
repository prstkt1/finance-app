const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
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

router.get("/", (req, res) => {
  const { email } = req.query;
  db.all("SELECT * FROM expenses WHERE email = ?", [email], (err, rows) => {
    if (err)
      return res.status(500).json({ message: "Error fetching expenses" });
    res.json(rows);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM expenses WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ message: "Error deleting expense" });
    if (this.changes === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  });
});

router.get("/debug", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    if (err)
      return res.status(500).json({ message: "Error fetching expenses" });
    res.json(rows);
  });
});

module.exports = router;
