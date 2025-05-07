"use strict";

import {
  currentMonth,
  currentYear,
  showExpenses,
  addExpense,
  prevMonth,
  nextMonth,
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

// update chart
const updateChart = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses || [];

  // Filter expenses by the current month and year
  let filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Update chart data
  chart.data.labels = filteredExpenses.map((expense) => expense.name);
  chart.data.datasets[0].data = filteredExpenses.map(
    (expense) => expense.amount
  );
  chart.update();
};

// Filter expenses by month
const filterExpensesByMonth = (month, year) => {
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

// Display expenses
const displayExpenses = (expenses) => {
  let expensesList = document.getElementById("expenses");
  expensesList.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    let item = document.createElement("li");
    item.textContent = `${expense.name} - ${expense.amount} usd.`;
    expensesList.appendChild(item);
  }
};

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

// Extract amounts from user's expenses
const getUserAmounts = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return [];
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses || [];

  return expenses.map((expense) => expense.amount);
};

// Extract names from user's expenses
const getUserNames = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return [];
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses || [];

  return expenses.map((expense) => expense.name);
};

// Expense chart
const ctx = document.getElementById("expenseChart").getContext("2d");
let pieData = getUserAmounts();
let pieLabels = getUserNames();
export const chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [...pieLabels],
    datasets: [
      {
        label: "Расходы",
        data: [...pieData],
        backgroundColor: ["red"],
      },
    ],
  },
});

export {
  // showExpenses,
  // addExpense,
  updateChart,
  // customSelect,
  // loadCustomSelectOptions,
  // totalExpense,
  // toggleAddExpenseForm,
  // clearForm,
  // prevMonth,
  // nextMonth,
  filterExpensesByMonth,
  displayExpenses,
  getUserAmounts,
  getUserNames,
  // updateMonthDisplay,
  // closeAddExpenseForm,
};
