import {saveBoardData,loadBoardData,renderBoard} from './scripts/storage.js'
import {handleAddList} from './scripts/lists.js';

let boardData = loadBoardData();
const addlistbutton =document.getElementById('addListButton');

saveBoardData(boardData);








addlistbutton.addEventListener("click", function() {
    handleAddList(boardData);  // Pass boardData explicitly here
});

renderBoard(boardData);