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

// Красивый алерт
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
  loadCustomSelectOptions();
});

// Вывод списка расходов
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

// Добавление расхода
function addExpense() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  const name = document.getElementById("customInput").value;
  const amount = Math.abs(document.getElementById("amount").value);

  expenses.push({ name: name, amount: amount });
  localStorage.setItem("users", JSON.stringify(users));
  showExpenses();
  totalExpense();

  customSelect(name);
  clearForm();
}

// Кастомный select
function customSelect(newValue) {
  const dataList = document.getElementById("customSelect");

  if (
    newValue &&
    !Array.from(dataList.options).some((opt) => opt.value === newValue)
  ) {
    let newOption = document.createElement("option");
    newOption.value = newValue;
    dataList.appendChild(newOption);

    // Сохранение нового значения в localStorage
    let customOptions = JSON.parse(localStorage.getItem("customOptions")) || [];
    customOptions.push(newValue);
    localStorage.setItem("customOptions", JSON.stringify(customOptions));
  }
}

// Загрузка кастомных опций
function loadCustomSelectOptions() {
  const dataList = document.getElementById("customSelect");
  let customOptions = JSON.parse(localStorage.getItem("customOptions")) || [];

  customOptions.forEach((optionValue) => {
    let newOption = document.createElement("option");
    newOption.value = optionValue;
    dataList.appendChild(newOption);
  });
}

// Подсчет общей суммы
function totalExpense() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses;

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += parseInt(expenses[i].amount);
  }

  let totalElement = document.getElementById("total");
  totalElement.textContent = `Total: ${total} usd.`;
}

// Clear all
function clearAll() {
  localStorage.clear();
  location.reload();
}

// Очистка ввода
function clearForm() {
  document.getElementById("customInput").value = "";
  document.getElementById("amount").value = "";
}
