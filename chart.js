import { currentMonth, currentYear } from "./expenses.js";

// update chart
export const updateChart = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses || [];

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
// Extract amounts from user's expenses
export const getUserAmounts = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return [];
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses || [];

  return expenses.map((expense) => expense.amount);
};
// Extract names from user's expenses
export const getUserNames = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return [];
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let expenses = users[currentUser].expenses || [];

  return expenses.map((expense) => expense.name);
};
// Expense chart
export const ctx = document.getElementById("expenseChart").getContext("2d");
export let pieData = getUserAmounts();
export let pieLabels = getUserNames();
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
