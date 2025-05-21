import { updateChart } from "./chart.js";
import { showExpenses } from "./expenses-ui.js";
import { showAlert, toggleForm } from "./ui.js";
import { registerUser, loginUser } from "./authApi.js";

export const register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {
    const response = await registerUser(email, password);

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
    const response = await loginUser(email, password);

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
