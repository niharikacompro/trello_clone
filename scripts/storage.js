import { createListElement } from "./card.js";
import { resetAddListButton } from "./lists.js";
const boardContainer = document.getElementById("boardContainer");
const STORAGE_KEY = {
    BOARD_DATA:'boardData',
};
export function saveBoardData(boardData) {
    console.log("Data being saved:", boardData);
    console.log("Is array:", Array.isArray(boardData));
    localStorage.setItem("boardData", JSON.stringify(boardData));
}

/*export function saveBoardData(boardData) {
    console.log("mmmm",boardData);
    localStorage.setItem("boardData", JSON.stringify(boardData));
}*/

/*export function loadBoardData() {
    return JSON.parse(localStorage.getItem('boardData') )|| [];
}*/

export function loadBoardData() {
    const data = JSON.parse(localStorage.getItem('boardData')) || [];
    console.log("Loaded data from localStorage:", data);
    console.log("Is array:", Array.isArray(data));
    return data;
}

export function renderBoard(boardData) {
    console.log("mmmm",boardData);
    boardContainer.innerHTML = "";
    boardData.forEach((list, listIndex) => createListElement(list, listIndex));
    resetAddListButton(); // Ensure the "Add a List" button is reset every time
}
