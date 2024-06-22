const board = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");
const turnIndicator = document.getElementById("turnIndicator");

let currentPlayer = "🧙‍♂️";
let boardState = Array(9).fill(null);
let winningCombination = [];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Create the board cells dynamically
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

// Handle a cell click
function handleClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] !== null || checkWinner()) {
        return;
    }

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        result.textContent = `${currentPlayer} wins! 🎉`;
        result.style.color = "gold";
        turnIndicator.textContent = "";
        highlightWinningCombination();
    } else if (boardState.every((cell) => cell !== null)) {
        result.textContent = "It's a draw!";
        result.style.color = "white"; 
        turnIndicator.textContent = "";
    } else {
        currentPlayer = currentPlayer === "🧙‍♂️" ? "🧙‍♀️" : "🧙‍♂️";
        turnIndicator.textContent = `${currentPlayer}'s turn`;
    }
}

// Check if there is a winner
function checkWinner() {
    return winningCombinations.some((combination) => {
        const isWinningCombination = combination.every((index) => boardState[index] === currentPlayer);
        if (isWinningCombination) {
            winningCombination = combination;
        }
        return isWinningCombination;
    });
}

// Highlight the winning combination
function highlightWinningCombination() {
    winningCombination.forEach((index) => {
        const cell = board.children[index];
        cell.classList.add("winning");
    });
}

// Reset the game
function resetGame() {
    boardState.fill(null);
    currentPlayer = "🧙‍♂️";
    winningCombination = [];
    Array.from(board.children).forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("winning");
    });
    result.textContent = "";
    turnIndicator.textContent = "🧙‍♂️'s turn";
}

// Initialize the game
createBoard();
resetButton.addEventListener("click", resetGame);
