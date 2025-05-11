import { updateChart } from "./chart.js";
import { showExpenses } from "./expenses.js";
import { showAlert, toggleForm } from "./ui.js";

export const register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      showAlert(message || "Registration failed!");
      return;
    }

    showAlert("Registration successful!");
    localStorage.setItem("currentUser", email);
    toggleForm();
    showExpenses();
  } catch (error) {
    showAlert("An error occurred during registration!");
  }
};

export const login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      showAlert(message || "Login failed!");
      return;
    } else {
      console.log("Login via database successful!");
      showAlert("Login successful!");
      localStorage.setItem("currentUser", email);
      toggleForm();
      showExpenses();
      updateChart();
    }
  } catch (error) {
    showAlert("An error occurred during login!");
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  location.reload();
};
