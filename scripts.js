"use strict";
// Log in button
const toggleForm = () => {
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

// Registration
const register = () => {
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

// Show alert
const showAlert = (message) => {
  const alert = document.getElementById("better_alert");
  alert.textContent = message;
  alert.classList.remove("hidden");
  alert.classList.add("show");

  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hidden");
  }, 3000);
};

// Login
const login = () => {
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

// Show expenses list
const showExpenses = () => {
  updateMonthDisplay();
};

// Add expense
const addExpense = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    showAlert("Please log in first");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  const name = document.getElementById("customInput").value;
  const amount = Math.abs(document.getElementById("amount").value);
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

// Custom select
const customSelect = (newValue) => {
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
const loadCustomSelectOptions = () => {
  const dataList = document.getElementById("customSelect");
  let customOptions = JSON.parse(localStorage.getItem("customOptions")) || [];

  customOptions.forEach((optionValue) => {
    let newOption = document.createElement("option");
    newOption.value = optionValue;
    dataList.appendChild(newOption);
  });
};

// Total expense calculation
const totalExpense = () => {
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

// Toggle add expense form
const toggleAddExpenseForm = () => {
  const addExpenseForm = document.querySelector(".add-expense");
  addExpenseForm.style.display =
    addExpenseForm.style.display === "block" ? "none" : "block";
};

// Clear all
const clearAll = () => {
  localStorage.clear();
  location.reload();
};

// Clear input form
const clearForm = () => {
  document.getElementById("customInput").value = "";
  document.getElementById("amount").value = "";
};

// Logout
const logout = () => {
  localStorage.removeItem("currentUser");
  location.reload();
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = [
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
const updateMonthDisplay = () => {
  document.getElementById(
    "month-name"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;
  filterExpensesByMonth(currentMonth, currentYear);
  totalExpense();
};

// Navigate to previous month
const prevMonth = () => {
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
const nextMonth = () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  updateMonthDisplay();
  updateChart();
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

// Add event listeners for month navigation
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prev-month").addEventListener("click", prevMonth);
  document.getElementById("next-month").addEventListener("click", nextMonth);
  document
    .getElementById("toggle-add-expense")
    .addEventListener("click", toggleAddExpenseForm);
  updateMonthDisplay();
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
const chart = new Chart(ctx, {
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

const closeAddExpenseForm = () => {
  const addExpenseForm = document.querySelector(".add-expense");
  addExpenseForm.style.display = "none";
};
