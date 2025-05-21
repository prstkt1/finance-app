import { filterExpensesByMonth } from "./scripts.js";
import { currentYear } from "./expenses-ui.js";
import { currentMonth } from "./expenses-ui.js";
import { fetchExpenses, calculateTotal } from "./expensesData.js";

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

export const clearForm = () => {
  document.getElementById("customInput").value = "";
  document.getElementById("amount").value = "";
};
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
export const updateMonthDisplay = async () => {
  document.getElementById(
    "month-name"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;
  await filterExpensesByMonth(currentMonth, currentYear);
  await totalExpense();
};
export const toggleAddExpenseForm = () => {
  const addExpenseForm = document.querySelector(".add-expense");
  addExpenseForm.style.display =
    addExpenseForm.style.display === "block" ? "none" : "block";
};
export const totalExpense = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  try {
    const expenses = await fetchExpenses(currentUser);
    const total = calculateTotal(expenses, currentMonth, currentYear);
    document.getElementById("total").textContent = `Total: ${total} USD`;
  } catch (error) {
    console.error("Error calculating total expenses:", error);
  }
};

export const buttonSwap = () => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    document.getElementById("login-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
  } else {
    document.getElementById("login-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";
  }
};
