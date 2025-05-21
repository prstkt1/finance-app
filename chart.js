import { fetchExpenses, getChartData } from "./expensesData.js";
import { currentMonth, currentYear } from "./expenses-ui.js";

export const updateChart = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
    return;
  }

  try {
    const expenses = await fetchExpenses(currentUser);
    const { labels, data } = getChartData(expenses, currentMonth, currentYear);

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

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

export const ctx = document.getElementById("expenseChart").getContext("2d");
export let chart;

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
