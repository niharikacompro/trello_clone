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
        confirmEditButton.addEventListener("keydown",(event)=>{
            if (event.key === "Enter") {
                confirmEditButton.click();
            }
        })

        const cancelEditButton = document.createElement("button");
        cancelEditButton.textContent = "Cancel";
        cancelEditButton.classList.add("cancel");
        cancelEditButton.addEventListener("click", () => renderBoard(boardData));
        cancelEditButton.addEventListener("keydown",(event)=>{
            if (event.key === "Enter") {
                cancelEditButton.click();
            }
        }
        );

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
      
        <ul class="modal-actions">
            <li class="modal-action-item" data-action="edit-list" tabindex="0" role='button'>Edit List</li>
            <li class="modal-action-item" data-action="delete-list" role='button' tabindex='0'>Delete List</li>
        </ul>
    `;

    const menuButton = listHeader.querySelector(".list-menu");

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();
    
        // Append the modal inside the list header if not already appended
        if (!listHeader.contains(modal)) {
            listHeader.appendChild(modal);
        }
    
        // Get menu button position
        const rect = menuButton.getBoundingClientRect();
        const listHeaderRect = listHeader.getBoundingClientRect();
    
        // Position the modal right below the menu button
        modal.style.top = `${menuButton.offsetHeight}px`; // Below the button
        modal.style.left = `${menuButton.offsetLeft}px`; // Align with the button
        modal.classList.remove("hidden");
    });


   
   
  


 
//const modal = document.querySelector(".list-actions-modal");



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
modal.addEventListener("keydown", (event) => {
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
      
        const isLongContent = card.length > 60;
      
        const cardIcon = `<button class="card-menu" title="Card Menu" id="card-menu-${listIndex}-${cardIndex}">
        <i class="fas fa-ellipsis-h"></i>
    </button>`;
    

    cardElement.innerHTML = `
    
        <h3 class="card-title" title='${card}'>${isLongContent ? `${card.slice(0, 40)}...` : card}</h3>
        <div class="card-icons">
            ${cardIcon}
        </div>
   
    `;
    const menuButton = cardElement.querySelector(`#card-menu-${listIndex}-${cardIndex}`);
    

    menuButton.addEventListener("click", (event) => {
        
        event.stopPropagation();

        // Remove any existing modals
        const existingModal = document.querySelector(".card-actions-modal");
        if (existingModal) existingModal.remove();

        // Create a new modal
        const cardModal = document.createElement("div");
        cardModal.classList.add("card-actions-modal");
        cardModal.setAttribute("data-card-index", cardIndex);
        const editcard = document.createElement("button");
        editcard.textContent="Edit Card";
        editcard.classList.add("modal-action-item");
        editcard.setAttribute("data-action","edit-card");

        cardModal.innerHTML = `
       <ul class="modal-actions">
                <li class="modal-action-item" data-action="edit-card" role="button" tabindex="0">Edit Card</li>
                <li class="modal-action-item" data-action="delete-card" role="button" tabindex="0">Delete Card</li>
            </ul>
           
          
        
           
        `;

        cardElement.appendChild(cardModal);

        // Calculate position
        const rect = menuButton.getBoundingClientRect();
        const modalWidth = cardModal.offsetWidth;
        const modalHeight = cardModal.offsetHeight;

        let top = rect.bottom + window.scrollY + 10; // Position below the button by default
        let left = rect.left + window.scrollX ;

        // Adjust for viewport boundaries
        if (top + modalHeight > window.innerHeight) {
            top = rect.top + window.scrollY - modalHeight - 10; // Position above if it overflows below
        }

        if (left + modalWidth > window.innerWidth) {
            left = window.innerWidth - modalWidth - 10; // Adjust if it overflows to the right
        }

        cardModal.style.position = "absolute";
        cardModal.style.top = `${  rect.bottom + window.scrollY - modalHeight + 10}px`;
        cardModal.style.left = `${rect.left + window.scrollX}px`;
        cardModal.classList.add("visible");

        // Add event listener to close modal
      

        // Close modal when clicking outside
        document.addEventListener("click", (e) => {
            if (!cardModal.contains(e.target) && e.target !== menuButton) {
                cardModal.remove();
            }
        }, { once: true });
         


            // Modal actions
            cardModal.addEventListener("click", (event) => {
                const action = event.target.getAttribute("data-action");
                if (action) {
                    switch (action) {
                        case "edit-card":
                            const inputField = document.createElement("input");
                            inputField.type = "text";
                            inputField.value = card;
                            inputField.classList.add("edit-input");
                            inputField.addEventListener("keydown", (e) => {
                                if (e.key === "Enter") {
                                    confirmEditButton.click();
                                }
                            });

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
                            break;

                        case "delete-card":
                            if (confirm("Are you sure you want to delete this card?")) {
                                list.cards.splice(cardIndex, 1);
                                saveBoardData(boardData);
                                renderBoard(boardData);
                            }
                            break;

                        default:
                            break;
                    }
                    cardModal.remove();
                }
            });
            cardModal.addEventListener("keydown", (event) => {
                const action = event.target.getAttribute("data-action");
                if (action) {
                    switch (action) {
                        case "edit-card":
                            const inputField = document.createElement("input");
                            inputField.type = "text";
                            inputField.value = card;
                            inputField.classList.add("edit-input");
                            inputField.addEventListener("keydown", (e) => {
                                if (e.key === "Enter") {
                                    confirmEditButton.click();
                                }
                            });

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
                            break;

                        case "delete-card":
                            if (confirm("Are you sure you want to delete this card?")) {
                                list.cards.splice(cardIndex, 1);
                                saveBoardData(boardData);
                                renderBoard(boardData);
                            }
                            break;

                        default:
                            break;
                    }
                    cardModal.remove();
                }
            });
      
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
