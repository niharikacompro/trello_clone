addListContainer.addEventListener("click", () => {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Enter list name...";

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Add List";
    confirmButton.classList.add("confirm");
    confirmButton.addEventListener("click", () => {
        const listName = inputField.value.trim();
        if (listName) {
            boardData.push({ name: listName, cards: [] });
            saveBoardData();
            renderBoard();
        }
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel");
    cancelButton.addEventListener("click", () => renderBoard());

    inputContainer.appendChild(inputField);
    inputContainer.appendChild(confirmButton);
    inputContainer.appendChild(cancelButton);

    addListContainer.innerHTML = "";
    addListContainer.appendChild(inputContainer);
});