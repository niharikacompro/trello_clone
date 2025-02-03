const boardContainer = document.getElementById("boardContainer");
import { renderBoard, saveBoardData } from "./storage.js";
function editListName(list,listHeader,boardData,listIndex) {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = list.name;
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
      const newListName = inputField.value.trim();
      if (newListName) {
        boardData[listIndex].name = newListName;
        saveBoardData(boardData);
        renderBoard(boardData);
      }
    });
    confirmEditButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        confirmEditButton.click();
      }
    });

    const cancelEditButton = document.createElement("button");
    cancelEditButton.textContent = "Cancel";
    cancelEditButton.classList.add("cancel");
    cancelEditButton.addEventListener("click", () => renderBoard(boardData));
    cancelEditButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        cancelEditButton.click();
      }
    });

    listHeader.innerHTML = "";
    listHeader.appendChild(inputField);
    listHeader.appendChild(confirmEditButton);
    listHeader.appendChild(cancelEditButton);
    inputField.focus();
  }
  function deleteListName(boardData,listIndex) {
    if (confirm("Are you sure you want to delete this list?")) {
      boardData.splice(listIndex, 1);
      saveBoardData(boardData);
      renderBoard(boardData);
    }
  }
  function createListModal(){
    const modal = document.createElement("div");
    modal.classList.add("list-actions-modal", "hidden");
    const modalList = document.createElement("ul");
      modalList.classList.add("modal-actions");
      const editList = document.createElement("li");
      editList.classList.add("modal-action-item");
      editList.setAttribute("data-action", "edit-list");
      editList.setAttribute("role", "button");
      editList.setAttribute("tabindex", "0");
      editList.textContent = "Edit List Name";
      const deleteList = document.createElement("li");
      deleteList.classList.add("modal-action-item");
      deleteList.setAttribute("data-action", "delete-list");
      deleteList.setAttribute("role", "button");
      deleteList.setAttribute("tabindex", "0");
      deleteList.textContent = "Delete List";
      modalList.appendChild(editList);
      modalList.appendChild(deleteList);
      modal.innerHTML = `
          ${modalList.outerHTML}
      `;
      return modal;
  }
  function createCard(card, cardIndex, list, listIndex, boardData, cardsContainer){
        const cardElement = document.createElement("li");
        cardElement.classList.add("card");
        cardElement.setAttribute("draggable", "true");
        cardElement.setAttribute("data-card-index", cardIndex);
        const isLongContent = card.length > 60;
        const cardIcon = document.createElement('button');
        cardIcon.classList.add('card-menu');
        cardIcon.title="Card Menu";
        cardIcon.id=`card-menu-${listIndex}-${cardIndex}`;
        cardIcon.innerHTML=`<i class="fas fa-ellipsis-h"></i>`;
        const cardHeading=document.createElement('h3');
        cardHeading.textContent=isLongContent ? `${card.slice(0, 40)}...` : card;
        const cardIcons=document.createElement('div');
        cardIcons.classList.add('card-icons');
        cardIcons.appendChild(cardIcon);
        cardElement.appendChild(cardHeading);
        cardElement.appendChild(cardIcons);
        const menuButton = cardElement.querySelector(
          `#card-menu-${listIndex}-${cardIndex}`
        );
    
        menuButton.addEventListener("click", (event) => {
          event.stopPropagation();
    
          const existingModal = document.querySelector(".card-actions-modal");
          if (existingModal) existingModal.remove();
    
          // Create a new modal
          const cardModal = document.createElement("div");
          cardModal.classList.add("card-actions-modal");
          cardModal.setAttribute("data-card-index", cardIndex);
        
          const cardModalList = document.createElement("ul");
            cardModalList.classList.add("modal-actions");
            const editcard = document.createElement("li");
            editcard.classList.add("modal-action-item");
            editcard.setAttribute("data-action", "edit-card");
            editcard.setAttribute("role", "button");
            editcard.setAttribute("tabindex", "0");
            editcard.textContent = "Edit Card";
            const deletecard = document.createElement("li");
            deletecard.classList.add("modal-action-item");
            deletecard.setAttribute("data-action", "delete-card");
            deletecard.setAttribute("role", "button");
            deletecard.setAttribute("tabindex", "0");
            deletecard.textContent = "Delete Card";
            cardModalList.appendChild(editcard);
            cardModalList.appendChild(deletecard);
            cardModal.appendChild(cardModalList);
          cardElement.appendChild(cardModal);
    
          // Calculate position
          const rect = menuButton.getBoundingClientRect();
          const modalWidth = cardModal.offsetWidth;
          const modalHeight = cardModal.offsetHeight;
    
          let top = rect.bottom + window.scrollY + 10; // Position below the button by default
          let left = rect.left + window.scrollX;
    
          // Adjust for viewport boundaries
          if (top + modalHeight > window.innerHeight) {
            top = rect.top + window.scrollY - modalHeight - 10; // Position above if it overflows below
          }
    
          if (left + modalWidth > window.innerWidth) {
            left = window.innerWidth - modalWidth - 10; // Adjust if it overflows to the right
          }
    
          cardModal.style.position = "absolute";
          cardModal.style.top = `${
            rect.bottom + window.scrollY - modalHeight + 80
          }px`;
          cardModal.style.left = `${rect.left + window.scrollX}px`;
          cardModal.classList.add("visible");
    
          // Add event listener to close modal
    
          // Close modal when clicking outside
          document.addEventListener(
            "click",
            (e) => {
              if (!cardModal.contains(e.target) && e.target !== menuButton) {
                cardModal.remove();
              }
            },
            { once: true }
          );
    
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
                  cancelEditButton.addEventListener("click", () =>
                    renderBoard(boardData)
                  );
    
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
            if(event.key === "Enter"){
                const action = event.target.getAttribute("data-action");
                if (action) {
                  switch (action) {
                    case "edit-card":
                      const editCardContainer = document.createElement("div");
                      editCardContainer.classList.add("edit-card-container");
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
                      cancelEditButton.addEventListener("click", () =>
                        renderBoard(boardData)
                      );
        
                      cardElement.innerHTML = "";
                      cardElement.appendChild(editCardContainer);
                      const editcard = document.createElement("div");
                      editcard.classList.add("edit-card");
                      editcard.appendChild(confirmEditButton);
                      editcard.appendChild(cancelEditButton);
                      editCardContainer.appendChild(inputField);
                        editCardContainer.appendChild(editcard);
                    
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
    
            }
           
          });
        });
    
        // Drag-and-drop functionality for cards
    
        cardElement.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ fromList: listIndex, fromCard: cardIndex })
          );
          e.dataTransfer.effectAllowed = "move";
        });
    
        cardsContainer.appendChild(cardElement);
    }
function createAddCardContainer(list, listIndex, boardData, listElement) {
        const addCardContainer = document.createElement("button");
  addCardContainer.classList.add("add-card");
  addCardContainer.textContent = "+ Add a new card";

  addCardContainer.addEventListener("click", () => {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Enter card title...";
    inputField.required = true;
    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        confirmButton.click();
      }
    });
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
      } else {
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
  return addCardContainer
        
        
    }
export function createListElement(list, listIndex, boardData) {
//new list element
  const listElement = document.createElement("div");
  listElement.classList.add("list");
  listElement.setAttribute("data-list-index", listIndex);
  listElement.setAttribute("draggable", "true");

  // List header
  const listHeader = document.createElement("div");
  listHeader.classList.add("list-header");
  const listIcon=document.createElement('button');
    listIcon.classList.add('list-menu');
    listIcon.innerHTML=`<i class="fas fa-ellipsis-h"></i>`;
    listIcon.title="list";
 
    listIcon.id="list-menu";
    const listHeading=document.createElement('h3');
    listHeading.textContent=list.name;
    const listicons=document.createElement('div');
    listicons.classList.add('list-icons');
    listicons.appendChild(listIcon);
    listHeader.appendChild(listHeading);
    listHeader.appendChild(listicons);
  const modal = createListModal();

  const menuButton = listHeader.querySelector(".list-menu");

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    // Append the modal inside the list header if not already appended
    if (!listHeader.contains(modal)) {
      listHeader.appendChild(modal);
    }
    // Position the modal right below the menu button
    modal.style.top = `${menuButton.offsetHeight}px`; // Below the button
    modal.style.left = `${menuButton.offsetLeft}px`; // Align with the button
    modal.classList.remove("hidden");
  });
  menuButton.addEventListener("click", (event) => {
    //event.stopPropagation();
    const rect = menuButton.getBoundingClientRect();
    modal.style.top = `${rect.bottom + window.scrollY}px`;
    modal.style.left = `${rect.left + window.scrollX}px`;
    modal.classList.remove("hidden");
  });

  // Close modal when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".list-menu") &&
      !event.target.closest(".list-actions-modal")
    ) {
      modal.classList.add("hidden");
    }
  });

  // Close button inside the modal

  modal.addEventListener("click", (event) => {
   
        const action = event.target.getAttribute("data-action");
        if (action) {
          switch (action) {
            case "edit-list":
              editListName(list,listHeader,boardData,listIndex);
              break;
            case "delete-list":
              deleteListName(boardData,listIndex);
              break;
            default:
              break;
          }
          modal.classList.add("hidden");
        }
    
   
  });
  modal.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
    const action = event.target.getAttribute("data-action");
    if (action) {
      switch (action) {
        case "edit-list":
          editListName(list,listHeader,boardData,listIndex);
          break;
        case "delete-list":
          deleteListName(boardData,listIndex);
          break;
        default:
          break;
      }
      modal.classList.add("hidden");
    }
}

  });

  listElement.appendChild(listHeader);

  const cardsContainer = document.createElement("ul");
  cardsContainer.classList.add("cards-container");

  list.cards.forEach((card, cardIndex) => {
  createCard(card, cardIndex, list, listIndex, boardData, cardsContainer);
  });

  listElement.appendChild(cardsContainer);

  const addCardContainer = createAddCardContainer(list, listIndex, boardData, listElement);

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
    const draggedCard = boardData[fromListIndex].cards.splice(
      fromCardIndex,
      1
    )[0];

    // Add the dragged card to the new list
    list.cards.push(draggedCard);

    // Save and re-render the board
    saveBoardData(boardData);
    renderBoard(boardData);
  });

  // Drag-and-drop functionality for lists

  boardContainer.appendChild(listElement);
}
