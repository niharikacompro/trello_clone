const addListContainer = document.getElementById("addListContainer");
const addlistbutton =document.getElementById('addListButton');
import { saveBoardData,renderBoard } from "./storage.js";



export function resetAddListButton() {
    // Set the original state of the container
    while (addListContainer.firstChild) {
        addListContainer.removeChild(addListContainer.firstChild);
    }

    const addList = document.createElement("button");
    addList.textContent = "+ Add a List";
    addList.id = "addListButton"; // Set the ID for the new button
    addListContainer.appendChild(addList);
  

    // Reattach the click event listener to the new "Add a new list" button
    addList.addEventListener("click", handleAddList);
}

// Function to handle the "Add a new list" button click
export function handleAddList(boardData) {
    // Remove existing "Add a new list" button if already present
    addListContainer.innerHTML = "";

    // Create input container
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    // Input field for list name
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Enter list name...";
    inputField.required = true;

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
            console.log("mmm", boardData);
            boardData.push({ name: listName, cards: [] });
            saveBoardData(boardData);

            renderBoard(boardData);
            resetAddListButton(); // Reset the button to its original state
        } else {
            alert("Please enter a list name!"); // Validation alert
        }
    });

    // Cancel button
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel");
    cancelButton.addEventListener("click", resetAddListButton); // Simply reset without action

    // Append buttons to the buttons container
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);

    // Append input and buttons to the input container
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(buttons);

    // Append input container to `addListContainer`
    addListContainer.appendChild(inputContainer);

    // Focus on the input field when the input container is rendered
    inputField.focus();
}