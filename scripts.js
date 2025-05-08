"use strict";

import {
  showExpenses,
  addExpense,
  prevMonth,
  nextMonth,
  displayExpenses,
} from "./expenses.js";
import {
  loadCustomSelectOptions,
  toggleAddExpenseForm,
  updateMonthDisplay,
  closeAddExpenseForm,
  toggleForm,
  showAlert,
} from "./ui.js";
import { register, login, logout } from "./auth.js";
import { clearAll } from "./helpers.js";
import { updateChart } from "./chart.js";

// Authorization check
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    document.getElementById("login-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    showExpenses();
  } else {
    document.getElementById("login-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";
  }
  loadCustomSelectOptions();
  updateMonthDisplay();
  updateChart();
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("registerBtn").addEventListener("click", register);
  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("logout-button").addEventListener("click", logout);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("openLoginBtn").addEventListener("click", toggleForm);
  document.getElementById("closeLogin").addEventListener("click", showAlert);
  document.getElementById("clearAllBtn").addEventListener("click", clearAll);
});
//Event listeners for month navigation
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prev-month").addEventListener("click", prevMonth);
  document.getElementById("next-month").addEventListener("click", nextMonth);
  document
    .getElementById("toggle-add-expense")
    .addEventListener("click", toggleAddExpenseForm);
  document
    .getElementById("addExpenseBtn")
    .addEventListener("click", addExpense);
  updateMonthDisplay();

  document
    .getElementById("closeAddExpense")
    .addEventListener("click", closeAddExpenseForm);
});
// Filter expenses by month
export const filterExpensesByMonth = async (month, year) => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/expenses?email=${encodeURIComponent(
        currentUser
      )}&month=${month}&year=${year}`
    );
    const filteredExpenses = await response.json();
    displayExpenses(filteredExpenses);
  } catch (error) {
    console.error("Error fetching filtered expenses:", error);
  }
};
