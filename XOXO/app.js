const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const numText = document.querySelector("#numText");
const cellContainer = document.querySelector("#cellContainer");
const increaseSize = document.querySelector("#increaseSize");
const decreaseSize = document.querySelector("#decreaseSize");
const minSize = document.querySelector("#minSize");
const maxSize = document.querySelector("#maxSize");

// const winScore = document.querySelector("winScore");

let winConditions = [];
let numTab = 3;
let options = Array(numTab * numTab).fill("");
let currentPlayer = "X";
let running = false;

// let winX = 0;
// let winO = 0;

initializeGame();

function initializeGame(){
    createGrid(numTab);
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `It ${currentPlayer}'s turn`;
    running = true;
    numText.textContent = `${numTab}x${numTab}`;
    increaseSize.addEventListener("click", tabSizeIn);
    decreaseSize.addEventListener("click", tabSizeDe);
    minSize.addEventListener("click",tabSizeMin);
    maxSize.addEventListener("click",tabSizeMax);

    // winScore.textContent = `${winX}:${winO}`;
}

function createGrid(size) {
    cellContainer.innerHTML = '';
    const cellSize = 400 / size;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('cellIndex', i);
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cellContainer.appendChild(cell);
    }
    cellContainer.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    options = Array(size * size).fill("");
    updateWinConditions(size);
}

function updateWinConditions(size) {
    winConditions = [];
    for (let i = 0; i < size; i++) {
        const rowCondition = [];
        const colCondition = [];
        for (let j = 0; j < size; j++) {
            rowCondition.push(i * size + j);
            colCondition.push(j * size + i);
        }
        winConditions.push(rowCondition);
        winConditions.push(colCondition);
    }
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(i * size + i);
        diag2.push(i * size + (size - 1 - i));
    }
    winConditions.push(diag1);
    winConditions.push(diag2);
}

function tabSizeIn(){
    numTab++;
    if(numTab > 7){
        numTab = 7;
    }
    numText.textContent = `${numTab}x${numTab}`;
    createGrid(numTab);
    restartGame();
}

function tabSizeDe(){
    numTab--;
    if(numTab < 3){
        numTab = 3;
    }
    numText.textContent = `${numTab}x${numTab}`;
    createGrid(numTab);
    restartGame();
}

function tabSizeMin(){
    numTab = 3;
    numText.textContent = `${numTab}x${numTab}`;
    createGrid(numTab);
    restartGame();
}

function tabSizeMax(){
    numTab = 7;
    numText.textContent = `${numTab}x${numTab}`;
    createGrid(numTab);
    restartGame();
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `It ${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        let win = true;
        for (let j = 1; j < condition.length; j++) {
            if (cellA == "" || cellA !== options[condition[j]]) {
                win = false;
                break;
            }
        }
        if (win) {
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        // if (currentPlayer === "X") {
        //     winX++;
        // } else if (currentPlayer === "O") {
        //     winO++;
        // }
        // // winScore.textContent = `${winX}:${winO}`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = Array(numTab * numTab).fill("");
    statusText.textContent = `It ${currentPlayer}'s turn`;
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


