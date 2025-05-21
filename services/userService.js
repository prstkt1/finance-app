const db = require("../db");

exports.createUser = (email, password, cb) => {
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    cb
  );
};

exports.findUser = (email, password, cb) => {
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    cb
  );
};

exports.getAllUsers = (cb) => {
  db.all("SELECT * FROM users", [], cb);
};
