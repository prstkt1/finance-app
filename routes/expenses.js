const express = require("express");
const router = express.Router();
const expenseService = require("../services/expenseService");

router.post("/", (req, res) => {
  const { email, name, amount, date } = req.body;
  expenseService.createOrUpdateExpense(email, name, amount, date, (err) => {
    if (err) return res.status(500).json({ message: "Error saving expense" });
    res.json({ message: "Expense saved or updated" });
  });
});

router.get("/", (req, res) => {
  const { email } = req.query;
  expenseService.getExpensesByEmail(email, (err, rows) => {
    if (err)
      return res.status(500).json({ message: "Error fetching expenses" });
    res.json(rows);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  expenseService.deleteExpenseById(id, function (err) {
    if (err) return res.status(500).json({ message: "Error deleting expense" });
    res.json({ message: "Expense deleted" });
  });
});

module.exports = router;
