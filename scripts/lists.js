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
export function handleAddList(boardData) {
  // Remove existing "Add a new list" button if already present

  addListButton.style.display = "none";

  // Create input container
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  // Input field for list name
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter list name...";
  inputField.required = true;
  inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      confirmButton.click();
    }
  });

  // Buttons container
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  // Confirm button
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Add List";
  confirmButton.classList.add("confirm");
  confirmButton.addEventListener("click", () => {
    const listName = inputField.value.trim();
    if (listName) {
      boardData.push({ name: listName, cards: [] });
      saveBoardData(boardData);
      renderBoard(boardData);
      inputContainer.style.display = "none";
      addListButton.style.display = "block";
    } else {
      alert("Please enter a list name!"); // Validation alert
    }
  });

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("cancel");
  cancelButton.addEventListener("click", () => {
    inputContainer.style.display = "none";
    addListButton.style.display = "block";
  }); // Simply reset without action

  // Append buttons to the buttons container
  buttons.appendChild(confirmButton);
  buttons.appendChild(cancelButton);

  // Append input and buttons to the input container
  inputContainer.appendChild(inputField);
  inputContainer.appendChild(buttons);

  // Append input container to `addListContainer`
  addListFixedButton.appendChild(inputContainer);

  // Focus on the input field when the input container is rendered
  inputField.focus();
}
