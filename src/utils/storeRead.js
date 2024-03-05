// Function to save data into localStorage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Function to retrieve data from localStorage
function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// Exporting functions to make them accessible from other files
export { saveToLocalStorage, getFromLocalStorage };
