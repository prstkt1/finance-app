import { clearAll } from "./helpers.js";
import { filterExpensesByMonth } from "./scripts.js";
import { currentYear } from "./expenses.js";
import { currentMonth } from "./expenses.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("openLoginBtn").addEventListener("click", toggleForm);
  document.getElementById("closeLogin").addEventListener("click", showAlert);
  document.getElementById("clearAllBtn").addEventListener("click", clearAll);
});

export const toggleForm = () => {
  let loginForm = document.getElementById("log-in");
  let loginButton = document.getElementById("login-button");
  let logoutButton = document.getElementById("logout-button");

  loginForm.style.display =
    loginForm.style.display === "block" ? "none" : "block";
  loginButton.style.display =
    loginButton.style.display === "none" ? "block" : "none";
  logoutButton.style.display =
    logoutButton.style.display === "none" ? "block" : "none";
};
export const showAlert = (message) => {
  const alert = document.getElementById("better_alert");
  alert.textContent = message;
  alert.classList.remove("hidden");
  alert.classList.add("show");

  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hidden");
  }, 3000);
};
// Clear input form
export const clearForm = () => {
  document.getElementById("customInput").value = "";
  document.getElementById("amount").value = "";
};
// Custom select
export const customSelect = (newValue) => {
  const dataList = document.getElementById("customSelect");

  if (
    newValue &&
    !Array.from(dataList.options).some((opt) => opt.value === newValue)
  ) {
    let newOption = document.createElement("option");
    newOption.value = newValue;
    dataList.appendChild(newOption);

    let customOptions = JSON.parse(localStorage.getItem("customOptions")) || [];
    customOptions.push(newValue);
    localStorage.setItem("customOptions", JSON.stringify(customOptions));
  }
};
// Load custom options
export const loadCustomSelectOptions = () => {
  const dataList = document.getElementById("customSelect");
  let customOptions = JSON.parse(localStorage.getItem("customOptions")) || [];

  customOptions.forEach((optionValue) => {
    let newOption = document.createElement("option");
    newOption.value = optionValue;
    dataList.appendChild(newOption);
  });
};

export const closeAddExpenseForm = () => {
  const addExpenseForm = document.querySelector(".add-expense");
  addExpenseForm.style.display = "none";
};
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Update month display
export const updateMonthDisplay = () => {
  document.getElementById(
    "month-name"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;
  filterExpensesByMonth(currentMonth, currentYear);
  totalExpense();
};
// Toggle add expense form
export const toggleAddExpenseForm = () => {
  const addExpenseForm = document.querySelector(".add-expense");
  addExpenseForm.style.display =
    addExpenseForm.style.display === "block" ? "none" : "block";
};
// Total expense calculation
export const totalExpense = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    const expenseDate = new Date(expenses[i].date);
    if (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    ) {
      total += parseInt(expenses[i].amount);
    }
  }

  let totalElement = document.getElementById("total");
  totalElement.textContent = `Total: ${total} USD`;
};
