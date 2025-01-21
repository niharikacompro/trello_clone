import {saveBoardData,loadBoardData,renderBoard} from './scripts/storage.js'
import {handleAddList} from './scripts/lists.js';

let boardData = loadBoardData();
console.log("mmmm",boardData);
if (!Array.isArray(boardData)) {
    console.warn("boardData is not an array. Resetting to an empty array.");
    boardData = [];
}
console.log("Loaded boardData:", boardData);

const boardContainer = document.getElementById("boardContainer");
const addListContainer = document.getElementById("addListContainer");
const addlistbutton =document.getElementById('addListButton');

saveBoardData(boardData);








// Function to reset the "Add a new list" button to its original state

// Attach the initial event listener to the "Add a new list" button
addlistbutton.addEventListener("click", ()=>handleAddList(boardData));



renderBoard(boardData);