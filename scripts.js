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
// Filter expenses by month
export const filterExpensesByMonth = (month, year) => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  let filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === month && expenseDate.getFullYear() === year
    );
  });

  displayExpenses(filteredExpenses);
};
