const db = require("../db");

exports.createOrUpdateExpense = (email, name, amount, date, cb) => {
  db.get(
    "SELECT id, amount FROM expenses WHERE email = ? AND name = ? AND date = ?",
    [email, name, date],
    function (err, row) {
      if (err) return cb(err);
      if (row) {
        const newAmount = row.amount + amount;
        db.run(
          "UPDATE expenses SET amount = ? WHERE id = ?",
          [newAmount, row.id],
          cb
        );
      } else {
        db.run(
          "INSERT INTO expenses (email, name, amount, date) VALUES (?, ?, ?, ?)",
          [email, name, amount, date],
          cb
        );
      }
    }
  );
};

exports.getExpensesByEmail = (email, cb) => {
  db.all("SELECT * FROM expenses WHERE email = ?", [email], cb);
};

exports.deleteExpenseById = (id, cb) => {
  db.run("DELETE FROM expenses WHERE id = ?", [id], cb);
};
