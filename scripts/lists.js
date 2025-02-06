
const addListFixedButton = document.getElementById("addListFixedContainer");
const addListButton = document.getElementById("addListButton");
import { saveBoardData} from "./storage.js";
 import { renderBoard } from "../script.js";
 

 

// Function to reset the "Add a new list" button to its original state
export function resetAddListButton( inputContainer) {
 
  inputContainer.style.display = "none";
  // Set the original state of the container

  addListButton.style.display = "block";
}

export function handleAddList(boardData) {
  // Remove existing "Add a new list" button if already present
  addListButton.style.display = "none";

  // Remove any existing input container to prevent duplicates
  const existingInputContainer = document.querySelector(".input-container");
  if (existingInputContainer) {
    existingInputContainer.remove();
  }

  // Create input container
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  // Input field for list name
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter list name...";
  inputField.required = true;

  function handleInputKeydown(e) {
    if (e.key === "Enter") {
      confirmButton.click();
    }
  }
  inputField.addEventListener("keydown", handleInputKeydown);

  // Buttons container
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  // Confirm button
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Add List";
  confirmButton.classList.add("confirm");

  function handleConfirmClick() {
    const listName = inputField.value.trim();
    if (listName) {
      boardData.push({ name: listName, cards: [] });
    
      saveBoardData(boardData);
      renderBoard(boardData);
      cleanUp();
    
    } else {
      alert("Please enter a list name!"); // Validation alert
    }
  }
  confirmButton.addEventListener("click", handleConfirmClick);

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("cancel");

  function handleCancelClick() {
    cleanUp();
  }
  cancelButton.addEventListener("click", handleCancelClick);

  // Function to remove event listeners and clean up the input container
  function cleanUp() {
    inputField.removeEventListener("keydown", handleInputKeydown);
    confirmButton.removeEventListener("click", handleConfirmClick);
    cancelButton.removeEventListener("click", handleCancelClick);

    inputContainer.remove();
    addListButton.style.display = "block";
  }

  // Append buttons to the buttons container
  buttons.appendChild(confirmButton);
  buttons.appendChild(cancelButton);

  // Append input and buttons to the input container
  inputContainer.appendChild(inputField);
  inputContainer.appendChild(buttons);

  // Append input container to `addListFixedButton`
  addListFixedButton.appendChild(inputContainer);

  // Focus on the input field when the input container is rendered
  inputField.focus();
}
