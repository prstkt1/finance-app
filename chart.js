import { currentMonth, currentYear } from "./expenses.js";

// update chart
export const updateChart = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/expenses?email=${encodeURIComponent(currentUser)}`
    );
    const expenses = await response.json();

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
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};
// Extract amounts from user's expenses
export const getUserAmounts = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return [];
  }

  try {
    const response = await fetch(
      `http://localhost:3000/expenses?email=${encodeURIComponent(currentUser)}`
    );
    const expenses = await response.json();
    return expenses.map((expense) => expense.amount);
  } catch (error) {
    console.error("Error fetching user amounts:", error);
    return [];
  }
};
// Extract names from user's expenses
export const getUserNames = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return [];
  }

  try {
    const response = await fetch(
      `http://localhost:3000/expenses?email=${encodeURIComponent(currentUser)}`
    );
    const expenses = await response.json();
    return expenses.map((expense) => expense.name);
  } catch (error) {
    console.error("Error fetching user names:", error);
    return [];
  }
};
// Expense chart
export const ctx = document.getElementById("expenseChart").getContext("2d");
export let chart;

// Initialize chart data
export const initializeChart = async () => {
  const pieData = await getUserAmounts();
  const pieLabels = await getUserNames();

  chart = new Chart(ctx, {
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
};
