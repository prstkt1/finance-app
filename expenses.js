import { updateChart } from "./chart.js";
import {
  clearForm,
  closeAddExpenseForm,
  customSelect,
  showAlert,
  totalExpense,
  updateMonthDisplay,
} from "./ui.js";

export let currentMonth = new Date().getMonth();
export let currentYear = new Date().getFullYear();

export const showExpenses = () => {
  updateMonthDisplay();
};
// Add expense
export const addExpense = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    showAlert("Please log in first");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  const name = document.getElementById("customInput").value;
  const amount = Math.abs(document.getElementById("amount").value);
  if (amount === 0) {
    showAlert("Amount cannot be zero!");
    return;
  }
  const date = new Date(currentYear, currentMonth, new Date().getDate())
    .toISOString()
    .split("T")[0];

  let existingExpense = expenses.find(
    (expense) => expense.name === name && expense.date === date
  );
  if (existingExpense) {
    existingExpense.amount = amount + parseInt(existingExpense.amount);
  } else {
    expenses.push({ name: name, amount: amount, date: date });
  }
  localStorage.setItem("users", JSON.stringify(users));
  filterExpensesByMonth(currentMonth, currentYear);
  totalExpense();

  customSelect(name);
  clearForm();
  closeAddExpenseForm();
  updateChart();
};
// Navigate to previous month
export const prevMonth = () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  updateMonthDisplay();
  updateChart();
};
// Navigate to next month
export const nextMonth = () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  updateMonthDisplay();
  updateChart();
};
// Display expenses
export const displayExpenses = (expenses) => {
  let expensesList = document.getElementById("expenses");
  expensesList.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    let item = document.createElement("li");
    item.textContent = `${expense.name} - ${expense.amount} usd.`;
    expensesList.appendChild(item);
  }
};
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
