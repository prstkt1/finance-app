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
  buttonSwap,
} from "./ui.js";
import { register, login, logout } from "./auth.js";
import { clearAll } from "./helpers.js";
import { updateChart, initializeChart } from "./chart.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await initializeChart();
    await updateChart();
  } catch (error) {
    console.error("Error initializing chart:", error);
  }

  loadCustomSelectOptions();
  updateMonthDisplay();

  document.getElementById("registerBtn").addEventListener("click", register);
  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("logout-button").addEventListener("click", logout);

  document.getElementById("openLoginBtn").addEventListener("click", toggleForm);
  document.getElementById("closeLogin").addEventListener("click", showAlert);
  document.getElementById("clearAllBtn").addEventListener("click", clearAll);

  document.getElementById("prev-month").addEventListener("click", prevMonth);
  document.getElementById("next-month").addEventListener("click", nextMonth);
  document
    .getElementById("toggle-add-expense")
    .addEventListener("click", toggleAddExpenseForm);
  document
    .getElementById("addExpenseBtn")
    .addEventListener("click", addExpense);
  document
    .getElementById("closeAddExpense")
    .addEventListener("click", closeAddExpenseForm);
  buttonSwap();
});

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
