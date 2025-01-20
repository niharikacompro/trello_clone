
let boardData = JSON.parse(localStorage.getItem("boardData")) || [];

const boardContainer = document.getElementById("boardContainer");
const addListContainer = document.getElementById("addListContainer");
const addlistbutton =document.getElementById('addListButton');

function saveBoardData() {
    localStorage.setItem("boardData", JSON.stringify(boardData));
}

function renderBoard() {
    boardContainer.innerHTML = "";
    boardData.forEach((list, listIndex) => createListElement(list, listIndex));
    resetAddListButton(); // Ensure the "Add a List" button is reset every time
}


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

    // Edit and delete functionality for lists
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

    const deleteIcon = listHeader.querySelector(".fa-trash");
    deleteIcon.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this list?")) {
            boardData.splice(listIndex, 1);
            saveBoardData();
            renderBoard();
        }
    });

    listElement.appendChild(listHeader);

    // Cards container (as an unordered list)
    const cardsContainer = document.createElement("ul");
    cardsContainer.classList.add("cards-container");

    list.cards.forEach((card, cardIndex) => {
        const cardElement = document.createElement("li");
        cardElement.classList.add("card");
        cardElement.setAttribute("draggable", "true");
        cardElement.setAttribute("data-card-index", cardIndex);

        cardElement.innerHTML = `
            <div class="card-content">
                <h3>${card}</h3>
                <div class="card-icons">
                    <button class="edit-button" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-button" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        // Edit card functionality
        const editIcon = cardElement.querySelector(".fa-edit");
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

            cardElement.innerHTML = "";
            cardElement.appendChild(inputField);
            cardElement.appendChild(confirmEditButton);
            cardElement.appendChild(cancelEditButton);
        });

        // Delete card functionality
        const deleteIcon = cardElement.querySelector(".fa-trash");
        deleteIcon.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this card?")) {
                list.cards.splice(cardIndex, 1);
                saveBoardData();
                renderBoard();
            }
        });

        // Drag-and-drop functionality for cards
        cardElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify({ fromList: listIndex, fromCard: cardIndex }));
            e.dataTransfer.effectAllowed = "move";
        });

        cardElement.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        cardElement.addEventListener("drop", (e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData("text/plain"));
            if (data.fromList !== listIndex || data.fromCard !== cardIndex) {
                const draggedCard = boardData[data.fromList].cards.splice(data.fromCard, 1)[0];
                list.cards.splice(cardIndex, 0, draggedCard);
                saveBoardData();
                renderBoard();
            }
        });

        cardsContainer.appendChild(cardElement);
    });

    listElement.appendChild(cardsContainer);

    // Add card button
    const addCardContainer = document.createElement("button");
    addCardContainer.classList.add("add-card");
    addCardContainer.textContent = "+ Add a new card";

    addCardContainer.addEventListener("click", () => {
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
        listElement.removeChild(addCardContainer);
    });

    listElement.appendChild(addCardContainer);

    // Drag-and-drop functionality for lists
    listElement.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    listElement.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        if (data.fromList !== listIndex) {
            const draggedCard = boardData[data.fromList].cards.splice(data.fromCard, 1)[0];
            boardData[listIndex].cards.push(draggedCard);
            saveBoardData();
            renderBoard();
        }
    });

    boardContainer.appendChild(listElement);
}



// Function to reset the "Add a new list" button to its original state
function resetAddListButton() {
    // Set the original state of the container
    while (addListContainer.firstChild) {
        addListContainer.removeChild(addListContainer.firstChild);
    }
    console.log("vvvv" ,addListContainer.innerHTML); 
    const addList = document.createElement("button");
    addList.textContent = "+ Add a List";
    addList.id = "addListButton"; // Set the ID for the new button
    addListContainer.appendChild(addList);
    console.log("vvvv" ,addListContainer.innerHTML); 
    

    // Reattach the click event listener to the new "Add a new list" button
    addList.addEventListener("click", handleAddList);
}

// Function to handle the "Add a new list" button click
function handleAddList() {
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
            boardData.push({ name: listName, cards: [] });
            saveBoardData();

            renderBoard();
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

// Attach the initial event listener to the "Add a new list" button
addlistbutton.addEventListener("click", handleAddList);



renderBoard();
