const boardContainer = document.getElementById("boardContainer");
import { renderBoard,saveBoardData } from "./storage.js";

export function createListElement(list, listIndex,boardData) {
  
   
    const listElement = document.createElement("div");
    listElement.classList.add("list");
    listElement.setAttribute("data-list-index", listIndex);
    listElement.setAttribute("draggable", "true");

    // List header
    const listHeader = document.createElement("div");
    listHeader.classList.add("list-header");
    const editButtonList =  
    `<button class="edit-button" title="Edit" id="edit-list-button">
              <i class="fas fa-edit"></i>
     </button>`;
     const deleteButtonList = 
     `<button class="delete-button" title="Delete" id="delete-list-button">
          <i class = "fas fa-trash"></i>
        </button>`;
        const listIcon=
        `<button class="list-menu" title="list" id="list-menu">
           <i class="fas fa-ellipsis-h"></i>
      </button>`;
    listHeader.innerHTML = `
        <h3>${list.name}</h3>
        <div class="list-icons">
        
          ${listIcon}
        </div>
    `;

    // Edit and delete functionality for lists
   
   
    function editList(){
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = list.name;
        inputField.classList.add("edit-input");
        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                confirmEditButton.click();
            }
        }
        );
        const confirmEditButton = document.createElement("button");
        confirmEditButton.textContent = "Save";
        confirmEditButton.classList.add("confirm");
        confirmEditButton.addEventListener("click", () => {
            const newListName = inputField.value.trim();
            if (newListName) {
                boardData[listIndex].name = newListName;
                saveBoardData(boardData);
                renderBoard(boardData);
            }
        });

        const cancelEditButton = document.createElement("button");
        cancelEditButton.textContent = "Cancel";
        cancelEditButton.classList.add("cancel");
        cancelEditButton.addEventListener("click", () => renderBoard(boardData));

        listHeader.innerHTML = "";
        listHeader.appendChild(inputField);
        listHeader.appendChild(confirmEditButton);
        listHeader.appendChild(cancelEditButton);
        inputField.focus();
    }
    function deleteList(){
        if (confirm("Are you sure you want to delete this list?")) {
            boardData.splice(listIndex, 1);
            saveBoardData(boardData);
            renderBoard(boardData);
        }

    }



   
    const modal = document.createElement("div");
    modal.classList.add("list-actions-modal", "hidden");
    modal.innerHTML = `
        <div class="modal-header">
            <h4>List actions</h4>
            <button class="modal-close-button">&times;</button>
        </div>
        <ul class="modal-actions">
            <li class="modal-action-item" data-action="edit-list">Edit List</li>
            <li class="modal-action-item" data-action="delete-list">Delete List</li>
        </ul>
    `;

    document.body.appendChild(modal);


 
//const modal = document.querySelector(".list-actions-modal");
const menuButton = listHeader.querySelector(".list-menu");


menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const rect = menuButton.getBoundingClientRect();
    modal.style.top = `${rect.bottom + window.scrollY}px`;
    modal.style.left = `${rect.left + window.scrollX}px`;
    modal.classList.remove("hidden");
});

// Close modal when clicking outside
document.addEventListener("click", (event) => {
    if (!event.target.closest(".list-menu") && !event.target.closest(".list-actions-modal")) {
        modal.classList.add("hidden");
    }
});

// Close button inside the modal
modal.querySelector(".modal-close-button").addEventListener("click", () => {
    modal.classList.add("hidden");
});



modal.addEventListener("click", (event) => {
    const action = event.target.getAttribute("data-action");
    if (action) {
        switch (action) {
            case "edit-list":
               editList();
                  break;
           case "delete-list":
               deleteList();
                break;
         default:
                break;
        }
        modal.classList.add("hidden");
    }
});


    listElement.appendChild(listHeader);

   
    const cardsContainer = document.createElement("ul");
    cardsContainer.classList.add("cards-container");

    list.cards.forEach((card, cardIndex) => {
        const cardElement = document.createElement("li");
        cardElement.classList.add("card");
        cardElement.setAttribute("draggable", "true");
        cardElement.setAttribute("data-card-index", cardIndex);
        const editButtonCard =
        `<button class="edit-button" title="Edit" id="edit-card-button">
              <i class="fas fa-edit"></i>
              </button>`;
        const deleteButtonCard =
        `<button class="delete-button" title="Delete" id="delete-card-button">
                <i class="fas fa-trash"></i>
            </button>`;
        cardElement.innerHTML = `
            <div class="card-content">
                <h3>${card}</h3>
              
                <div class="card-icons">
                 ${editButtonCard}
                   ${deleteButtonCard}
                </div>
            </div>
        `;

        // Edit card functionality
        const editIcon = cardElement.querySelector("#edit-card-button");
        editIcon.addEventListener("click", () => {
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.value = card;
            inputField.classList.add("edit-input");
            inputField.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    confirmEditButton.click();
                }
            }
            );

            
            const confirmEditButton = document.createElement("button");
            confirmEditButton.textContent = "Save";
            confirmEditButton.classList.add("confirm");
            confirmEditButton.addEventListener("click", () => {
                const newCardName = inputField.value.trim();
                if (newCardName) {
                    list.cards[cardIndex] = newCardName;
                    saveBoardData(boardData);
                    renderBoard(boardData);
                }
            });

            const cancelEditButton = document.createElement("button");
            cancelEditButton.textContent = "Cancel";
            cancelEditButton.classList.add("cancel");
            cancelEditButton.addEventListener("click", () => renderBoard(boardData));

            cardElement.innerHTML = "";
            cardElement.appendChild(inputField);
            cardElement.appendChild(confirmEditButton);
            cardElement.appendChild(cancelEditButton);
            inputField.focus();
        });

        // Delete card functionality
        const deleteIcon = cardElement.querySelector("#delete-card-button");
        deleteIcon.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this card?")) {
                list.cards.splice(cardIndex, 1);
                saveBoardData(boardData);
                renderBoard(boardData);
            }
        });

        // Drag-and-drop functionality for cards
        
        cardElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify({ fromList: listIndex, fromCard: cardIndex }));
            e.dataTransfer.effectAllowed = "move";
        });

        cardsContainer.appendChild(cardElement);
    });

    listElement.appendChild(cardsContainer);

   
    const addCardContainer = document.createElement("button");
    addCardContainer.classList.add("add-card");
    addCardContainer.textContent = "+ Add a new card";

    addCardContainer.addEventListener("click", () => {
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Enter card title...";
        inputField.required=true;
        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                confirmButton.click();
            }
        }
        );
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Add Card";
        confirmButton.classList.add("confirm");
        confirmButton.addEventListener("click", () => {
            const cardName = inputField.value.trim();
            if (cardName) {
                list.cards.push(cardName);
                saveBoardData(boardData);
                renderBoard(boardData);
            }
            else{
                alert("Please enter a card name!"); 
               
            }
        });

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel");
        cancelButton.addEventListener("click", () => renderBoard(boardData));

        buttons.appendChild(confirmButton);
        buttons.appendChild(cancelButton);
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(buttons);
     

        listElement.appendChild(inputContainer);
        listElement.removeChild(addCardContainer);
        inputField.focus();
    });



    listElement.appendChild(addCardContainer);
    listElement.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    listElement.addEventListener("drop", (e) => {
        e.preventDefault();

        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        const fromListIndex = data.fromList;
        const fromCardIndex = data.fromCard;

        // Prevent the drop within the same list
        if (fromListIndex === listIndex) return;

        // Get the dragged card and remove it from the original list
        const draggedCard = boardData[fromListIndex].cards.splice(fromCardIndex, 1)[0];

        // Add the dragged card to the new list
        list.cards.push(draggedCard);

        // Save and re-render the board
        saveBoardData(boardData);
        renderBoard(boardData);
    });


    // Drag-and-drop functionality for lists
 
    boardContainer.appendChild(listElement);
}
