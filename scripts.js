// Log in button
function toggleForm() {
  let loginForm = document.getElementById("log-in");
  let loginButton = document.getElementById("login-button");
  loginForm.style.display =
    loginForm.style.display === "block" ? "none" : "block";
  loginButton.style.display =
    loginButton.style.display === "none" ? "block" : "none";
}
// Login-Registration
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    showAlert("Такой пользователь уже существует!");
  } else {
    users[email] = {
      password: password,
      expenses: [],
    };
    localStorage.setItem("users", JSON.stringify(users));
    showAlert("Регистрация успешна!");
    localStorage.setItem("currentUser", email);
    toggleForm();
    showExpenses();
  }
}

function showAlert(message) {
  const alert = document.getElementById("better_alert");
  alert.textContent = message;
  alert.classList.remove("hidden");
  alert.classList.add("show");

  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hidden");
  }, 3000);
}

// Авторизация
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email] && users[email].password === password) {
    showAlert("Вход выполнен!");
    localStorage.setItem("currentUser", email);
    toggleForm();
    showExpenses();
  } else {
    showAlert("Неверный логин или пароль!");
  }
}

// Проверка авторизации
document.addEventListener("DOMContentLoaded", function () {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    showExpenses();
  }
});

function showExpenses() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  let expensesList = document.getElementById("expenses");
  expensesList.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    let item = document.createElement("li");
    item.textContent = `${expense.name} - ${expense.amount} usd.`;
    expensesList.appendChild(item);
  }
}

function addExpense() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;

  expenses.push({ name: name, amount: amount });
  localStorage.setItem("users", JSON.stringify(users));
  showExpenses();
}
