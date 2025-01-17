function createListElement(list, listIndex) {
    const listElement = document.createElement("div");
    listElement.classList.add("list");
    listElement.setAttribute("data-list-index", listIndex);
    listElement.setAttribute("draggable", "true");

    // List header
    const listHeader = document.createElement("div");
    listHeader.classList.add("list-header");
    listHeader.innerHTML = `
    <h3>${list.name}</h3>
    <div class="list-icons">
        <button class="edit-button" title="Edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete-button" title="Delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;

    // Edit list functionality
    const editIcon = listHeader.querySelector(".fa-edit");
    editIcon.addEventListener("click", () => {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = list.name;
        inputField.classList.add("edit-input");

        const confirmEditButton = document.createElement("button");
        confirmEditButton.textContent = "Save";
        confirmEditButton.classList.add("confirm");
        confirmEditButton.addEventListener("click", () => {
            const newListName = inputField.value.trim();
            if (newListName) {
                boardData[listIndex].name = newListName;
                saveBoardData();
                renderBoard();
            }
        });

        const cancelEditButton = document.createElement("button");
        cancelEditButton.textContent = "Cancel";
        cancelEditButton.classList.add("cancel");
        cancelEditButton.addEventListener("click", () => renderBoard());

        listHeader.innerHTML = "";
        listHeader.appendChild(inputField);
        listHeader.appendChild(confirmEditButton);
        listHeader.appendChild(cancelEditButton);
    });

    // Delete list functionality
    const deleteIcon = listHeader.querySelector(".fa-trash");
    deleteIcon.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this list?")) {
            boardData.splice(listIndex, 1);
            saveBoardData();
            renderBoard();
        }
    });

    listElement.appendChild(listHeader);

    // Cards
    list.cards.forEach((card, cardIndex) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("draggable", "true");
        cardElement.setAttribute("data-card-index", cardIndex);

        const cardContent = document.createElement("div");
        cardContent.innerHTML = `
        <h3>${card}</h3>
        <div class="card-icons">
          <button class="edit-button" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-button" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
    `;
        cardContent.classList.add("card-content");

        const editIcon = cardContent.querySelector(".fa-edit");
        editIcon.addEventListener("click", () => {
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.value = card;
            inputField.classList.add("edit-input");

            const confirmEditButton = document.createElement("button");
            confirmEditButton.textContent = "Save";
            confirmEditButton.classList.add("confirm");
            confirmEditButton.addEventListener("click", () => {
                const newCardName = inputField.value.trim();
                if (newCardName) {
                    list.cards[cardIndex] = newCardName;
                    saveBoardData();
                    renderBoard();
                }
            });

            const cancelEditButton = document.createElement("button");
            cancelEditButton.textContent = "Cancel";
            cancelEditButton.classList.add("cancel");
            cancelEditButton.addEventListener("click", () => renderBoard());

            cardContent.innerHTML = "";
            cardContent.appendChild(inputField);
            cardContent.appendChild(confirmEditButton);
            cardContent.appendChild(cancelEditButton);
        });

        const deleteIcon = cardContent.querySelector(".fa-trash");
        deleteIcon.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this card?")) {
                list.cards.splice(cardIndex, 1);
                saveBoardData();
                renderBoard();
            }
        });

        cardElement.appendChild(cardContent);
        listElement.appendChild(cardElement);
    });

    // Add card functionality
    const addCardButton = document.createElement("button");
    addCardButton.classList.add("add-card");
    addCardButton.textContent = "+ Add a new card";

    addCardButton.addEventListener("click", () => {
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Enter card title...";

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Add Card";
        confirmButton.classList.add("confirm");
        confirmButton.addEventListener("click", () => {
            const cardName = inputField.value.trim();
            if (cardName) {
                list.cards.push(cardName);
                saveBoardData();
                renderBoard();
            }
        });

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel");
        cancelButton.addEventListener("click", () => renderBoard());

        buttons.appendChild(confirmButton);
        buttons.appendChild(cancelButton);
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(buttons);

        listElement.appendChild(inputContainer);
        listElement.removeChild(addCardButton);
    });

    listElement.appendChild(addCardButton);

    boardContainer.appendChild(listElement);
}