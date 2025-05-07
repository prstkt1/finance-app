"use strict";

import { showExpenses, addExpense, prevMonth, nextMonth } from "./expenses.js";
import {
  loadCustomSelectOptions,
  toggleAddExpenseForm,
  updateMonthDisplay,
  closeAddExpenseForm,
} from "./ui.js";

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
