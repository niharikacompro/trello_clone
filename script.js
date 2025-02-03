import { saveBoardData, loadBoardData } from "./scripts/storage.js";
import { handleAddList } from "./scripts/lists.js";
import { createListElement } from "./scripts/card.js";
const boardContainer = document.getElementById("boardContainer");

let boardData = loadBoardData();
const addlistbutton = document.getElementById("addListButton");

saveBoardData(boardData);
addlistbutton.addEventListener("click", function () {
  handleAddList(boardData);
});
function renderBoard(boardData) {
  boardContainer.innerHTML = "";
  boardData.forEach((list, listIndex) =>
    createListElement(list, listIndex, boardData)
  );
}

renderBoard(boardData);
