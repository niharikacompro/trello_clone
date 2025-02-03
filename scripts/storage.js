import { createListElement } from "./card.js";
const boardContainer = document.getElementById("boardContainer");
const STORAGE_KEY = {
  BOARD_DATA: "boardData",
};

export function saveBoardData(boardData) {
  if (!Array.isArray(boardData)) {
    console.warn("boardData is not an array. Resetting to an empty array.");
    boardData = [];
  }
  localStorage.setItem(STORAGE_KEY.BOARD_DATA, JSON.stringify(boardData));
}

export function loadBoardData() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY.BOARD_DATA) || "[]");
  if (!Array.isArray(data)) {
    console.warn(
      "boardData loaded is not an array. Resetting to an empty array."
    );
    return [];
  }
  return data;
}

export function renderBoard(boardData) {
  boardContainer.innerHTML = "";
  boardData.forEach((list, listIndex) =>
    createListElement(list, listIndex, boardData)
  );
}
