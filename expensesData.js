export async function fetchExpenses(email) {
  const response = await fetch(
    `http://localhost:3000/expenses?email=${encodeURIComponent(email)}`
  );
  return response.json();
}

export function calculateTotal(expenses, month, year) {
  return expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, e) => sum + parseInt(e.amount), 0);
}

export function getChartData(expenses, month, year) {
  const filtered = expenses.filter((expense) => {
    const d = new Date(expense.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  return {
    labels: filtered.map((e) => e.name),
    data: filtered.map((e) => e.amount),
  };
}

export function filterExpensesByMonth(expenses, month, year) {
  return expenses.filter(
    (expense) =>
      new Date(expense.date).getMonth() === month &&
      new Date(expense.date).getFullYear() === year
  );
}
