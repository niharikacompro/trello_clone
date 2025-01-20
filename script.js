
let boardData = JSON.parse(localStorage.getItem("boardData")) || [];

const boardContainer = document.getElementById("boardContainer");
const addListContainer = document.getElementById("addListContainer");
<<<<<<< HEAD
const addlistbutton =document.getElementById('addListButton');
=======
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96

function saveBoardData() {
    localStorage.setItem("boardData", JSON.stringify(boardData));
}

function renderBoard() {
    boardContainer.innerHTML = "";
    boardData.forEach((list, listIndex) => createListElement(list, listIndex));
<<<<<<< HEAD
    resetAddListButton(); // Ensure the "Add a List" button is reset every time
}


=======
}

>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
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
<<<<<<< HEAD
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
=======
            <i class="fas fa-edit" title="Edit"></i>
            <i class="fas fa-trash" title="Delete"></i>
        </div>
    `;

    // Edit list functionality
    const editIcon = listHeader.querySelector(".fa-edit");
    editIcon.addEventListener("click", () => {
        const listButton= document.getElementById('addListButton')
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
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
<<<<<<< HEAD
=======
               
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
            }
        });

        const cancelEditButton = document.createElement("button");
        cancelEditButton.textContent = "Cancel";
        cancelEditButton.classList.add("cancel");
<<<<<<< HEAD
        cancelEditButton.addEventListener("click", () => renderBoard());
=======
        cancelEditButton.addEventListener("click", () => {
            renderBoard();
          
        });
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96

        listHeader.innerHTML = "";
        listHeader.appendChild(inputField);
        listHeader.appendChild(confirmEditButton);
        listHeader.appendChild(cancelEditButton);
    });

<<<<<<< HEAD
=======
    // Delete list functionality
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
    const deleteIcon = listHeader.querySelector(".fa-trash");
    deleteIcon.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this list?")) {
            boardData.splice(listIndex, 1);
            saveBoardData();
            renderBoard();
        }
    });

    listElement.appendChild(listHeader);

<<<<<<< HEAD
    // Cards container (as an unordered list)
    const cardsContainer = document.createElement("ul");
    cardsContainer.classList.add("cards-container");

    list.cards.forEach((card, cardIndex) => {
        const cardElement = document.createElement("li");
=======
    // Cards
    list.cards.forEach((card, cardIndex) => {
        const cardElement = document.createElement("div");
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
        cardElement.classList.add("card");
        cardElement.setAttribute("draggable", "true");
        cardElement.setAttribute("data-card-index", cardIndex);

<<<<<<< HEAD
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
=======
        const cardContent = document.createElement("div");
        cardContent.textContent = card;
        cardContent.classList.add("card-content");

        const cardIcons = document.createElement("div");
        cardIcons.classList.add("card-icons");

        // Edit icon
        const editCardIcon = document.createElement("i");
        editCardIcon.classList.add("fas", "fa-edit");
        editCardIcon.title = "Edit";
        editCardIcon.addEventListener("click", () => {
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
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
<<<<<<< HEAD
            cancelEditButton.addEventListener("click", () => renderBoard());
=======
            cancelEditButton.addEventListener("click", () => {
                renderBoard();
            });
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96

            cardElement.innerHTML = "";
            cardElement.appendChild(inputField);
            cardElement.appendChild(confirmEditButton);
            cardElement.appendChild(cancelEditButton);
        });

<<<<<<< HEAD
        // Delete card functionality
        const deleteIcon = cardElement.querySelector(".fa-trash");
        deleteIcon.addEventListener("click", () => {
=======
        // Delete icon
        const deleteCardIcon = document.createElement("i");
        deleteCardIcon.classList.add("fas", "fa-trash");
        deleteCardIcon.title = "Delete";
        deleteCardIcon.addEventListener("click", () => {
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
            if (confirm("Are you sure you want to delete this card?")) {
                list.cards.splice(cardIndex, 1);
                saveBoardData();
                renderBoard();
            }
        });

<<<<<<< HEAD
        // Drag-and-drop functionality for cards
        cardElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify({ fromList: listIndex, fromCard: cardIndex }));
            e.dataTransfer.effectAllowed = "move";
=======
        cardIcons.appendChild(editCardIcon);
        cardIcons.appendChild(deleteCardIcon);
        cardElement.appendChild(cardContent);
        cardElement.appendChild(cardIcons);

        listElement.appendChild(cardElement);

        // Make cards draggable between lists
        cardElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", `${listIndex}-${cardIndex}`);
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
        });

        cardElement.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        cardElement.addEventListener("drop", (e) => {
<<<<<<< HEAD
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
=======
            const [draggedListIndex, draggedCardIndex] = e.dataTransfer.getData("text").split("-");
            const draggedCard = boardData[draggedListIndex].cards.splice(draggedCardIndex, 1)[0];
            list.cards.push(draggedCard);
            saveBoardData();
            renderBoard();
        });
    });

    // Add card functionality
    const addCardContainer = document.createElement("div");
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
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
<<<<<<< HEAD
        cancelButton.addEventListener("click", () => renderBoard());
=======
        cancelButton.addEventListener("click", () => {
            renderBoard();
        });
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96

        buttons.appendChild(confirmButton);
        buttons.appendChild(cancelButton);
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(buttons);

        listElement.appendChild(inputContainer);
        listElement.removeChild(addCardContainer);
    });

    listElement.appendChild(addCardContainer);

<<<<<<< HEAD
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

=======
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96
    boardContainer.appendChild(listElement);
}



<<<<<<< HEAD
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


=======
addListContainer.addEventListener("click", function handleAddList() {
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
    resetAddListButton(); // Reset the "Add a new list" button
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

// Function to reset the "Add a new list" button to its original state
function resetAddListButton() {
// Set the original state of the container
addListContainer.innerHTML = `<div class="add-list" id="addListButton">+ Add a new list</div>`;
// Reattach the click event listener to the new "Add a new list" button
const addListButton = document.getElementById("addListButton");
if (addListButton) {
    addListButton.addEventListener("click", handleAddList);
}
}
});
>>>>>>> 526629f228814d54d2b80dc03fff93fd5c8cfd96

renderBoard();
