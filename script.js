
const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleClick(event) {
    const index = Array.from(board.children).indexOf(event.target);
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            statusText.textContent = currentPlayer + " wins!";
            gameActive = false;
        } else if (!gameBoard.includes("")) {
            statusText.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = currentPlayer + "'s turn";
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = currentPlayer + "'s turn";
    Array.from(board.children).forEach(cell => cell.textContent = "");
}

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
    statusText.textContent = currentPlayer + "'s turn";
}

createBoard();
