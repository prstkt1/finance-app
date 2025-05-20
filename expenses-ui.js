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

export const addExpense = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    showAlert("Please log in first");
    return;
  }

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
    const response = await fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: currentUser, name, amount, date }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      showAlert(message || "Failed to add expense!");
      return;
    }

    await filterExpensesByMonth(currentMonth, currentYear);
    await totalExpense();
    customSelect(name);
    clearForm();
    closeAddExpenseForm();
    await updateChart();
    showAlert("Expense added successfully!");
  } catch (error) {
    showAlert("An error occurred while adding the expense!");
  }
};

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

export const displayExpenses = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    showAlert("Please log in first");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/expenses?email=${encodeURIComponent(currentUser)}`
    );
    const expenses = await response.json();

    let expensesList = document.getElementById("expenses");
    expensesList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
      let expense = expenses[i];
      let item = document.createElement("li");
      item.textContent = `${expense.name} - ${expense.amount} usd.`;

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "✖";
      deleteButton.classList.add("delete-expense-btn");

      deleteButton.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this expense?")) return;

        try {
          const deleteResponse = await fetch(
            `http://localhost:3000/expenses/${expense.id}`,
            { method: "DELETE" }
          );

          if (!deleteResponse.ok) {
            showAlert("Failed to delete expense!");
            return;
          }

          showAlert("Expense deleted successfully!");
          displayExpenses();
        } catch (error) {
          showAlert("An error occurred while deleting the expense!");
        }
      });

      item.appendChild(deleteButton);
      expensesList.appendChild(item);
    }
  } catch (error) {
    showAlert("An error occurred while fetching expenses!");
  }
};
