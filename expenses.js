import { updateChart } from "./chart.js";
import { filterExpensesByMonth } from "./scripts.js";
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
export const addExpense = async () => {
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

  try {
    // Send data to the server
    const response = await fetch("http://localhost:3000/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: currentUser, name, amount, date }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      showAlert(message || "Failed to add expense!");
      return;
    }

    // Save to localStorage if server addition is successful
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
    showAlert("Expense added successfully!");
  } catch (error) {
    showAlert("An error occurred while adding the expense!");
  }
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

    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "✖";
    deleteButton.classList.add("delete-expense-btn");

    //delete functionality
    deleteButton.addEventListener("click", () => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) return;
      if (!confirm("Are you sure you want to delete this expense?")) return;
      let users = JSON.parse(localStorage.getItem("users")) || {};
      let userExpenses = users[currentUser].expenses;

      users[currentUser].expenses = userExpenses.filter(
        (e) => !(e.name === expense.name && e.date === expense.date)
      );

      localStorage.setItem("users", JSON.stringify(users));
      filterExpensesByMonth(currentMonth, currentYear);
      totalExpense();
      updateChart();
    });

    item.appendChild(deleteButton);
    expensesList.appendChild(item);
  }
};
