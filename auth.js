import { showExpenses } from "./expenses.js";
import { showAlert, toggleForm } from "./ui.js";

export const register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    showAlert("User already exists!");
  } else {
    users[email] = {
      password: password,
      expenses: [],
    };
    localStorage.setItem("users", JSON.stringify(users));
    showAlert("Registration successful!");
    localStorage.setItem("currentUser", email);
    toggleForm();
    showExpenses();
  }
};

export const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email] && users[email].password === password) {
    showAlert("Login successful!");
    localStorage.setItem("currentUser", email);
    toggleForm();
    showExpenses();
  } else {
    showAlert("Invalid email or password!");
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  location.reload();
};
