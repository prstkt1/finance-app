import { clearAll } from "./helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("openLoginBtn").addEventListener("click", toggleForm);
  document.getElementById("closeLogin").addEventListener("click", showAlert);
  document.getElementById("clearAllBtn").addEventListener("click", clearAll);
});

export const toggleForm = () => {
  let loginForm = document.getElementById("log-in");
  let loginButton = document.getElementById("login-button");
  let logoutButton = document.getElementById("logout-button");

  loginForm.style.display =
    loginForm.style.display === "block" ? "none" : "block";
  loginButton.style.display =
    loginButton.style.display === "none" ? "block" : "none";
  logoutButton.style.display =
    logoutButton.style.display === "none" ? "block" : "none";
};
export const showAlert = (message) => {
  const alert = document.getElementById("better_alert");
  alert.textContent = message;
  alert.classList.remove("hidden");
  alert.classList.add("show");

  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hidden");
  }, 3000);
};
