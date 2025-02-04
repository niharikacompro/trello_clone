const addListContainer = document.getElementById("addListContainer");
const addListFixedButton = document.getElementById("addListFixedContainer");
const addListButton = document.getElementById("addListButton");
import { saveBoardData, renderBoard } from "./storage.js";

// Function to reset the "Add a new list" button to its original state
export function resetAddListButton(boardData, inputContainer) {
  inputContainer.style.display = "none";
  // Set the original state of the container

  addListButton.style.display = "block";
}

// Function to handle the "Add a new list" button click
export function handleAddList(boardData, e) {
  e.stopPropagation();
  e.preventDefault(); // Ensure default behavior is blocked

  // Prevent multiple instances
  if (document.querySelector(".input-container")) return;

  // Hide the "Add a new list" button
  addListButton.style.display = "none";

  // Create input container
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  // Input field for list name
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter list name...";
  inputField.required = true;

  // Prevent Enter key from triggering additional actions
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Stop Enter key default behavior
      confirmButton.click();  // Manually trigger the confirm button
    }
  });

  // Buttons container
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  // Confirm button
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Add List";
  confirmButton.classList.add("confirm");

  confirmButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop propagation to prevent unintended behavior
    const listName = inputField.value.trim();
    if (listName) {
      boardData.push({ name: listName, cards: [] });
      saveBoardData(boardData);
      renderBoard(boardData);
      resetAddListButton(boardData, inputContainer);
    } else {
      alert("Please enter a list name!"); // Validation alert
    }
  });

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("cancel");

  cancelButton.addEventListener("click", (event) => {
    event.stopPropagation();
    resetAddListButton(boardData, inputContainer);
  });

  // Append buttons to the buttons container
  buttons.appendChild(confirmButton);
  buttons.appendChild(cancelButton);

  // Append input and buttons to the input container
  inputContainer.appendChild(inputField);
  inputContainer.appendChild(buttons);

  // Append input container to `addListContainer`
  addListFixedButton.appendChild(inputContainer);

  // Focus on the input field when the input container is rendered
  setTimeout(() => {
    inputField.focus();
  }, 0);
}

