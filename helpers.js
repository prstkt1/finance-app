document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clearAllBtn").addEventListener("click", clearAll);
});
const clearAll = () => {
  localStorage.clear();
  location.reload();
};
export { clearAll };
