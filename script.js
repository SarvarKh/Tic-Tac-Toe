const boxElements = document.querySelectorAll(".box");
const player1 = "player1";
const player2 = "player2";
let currentTurn;
let currentPlayer;
let winningMessage = document.querySelector("#winning-message-text");


document.querySelector("#restartButton").addEventListener("click", startGame);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();
function startGame() {
    boxElements.forEach(box => {
        currentTurn = true;
        box.classList.remove(player1);
        box.classList.remove(player2);
        box.addEventListener("click", play, {once: true});
        winningMessage.innerHTML = "";
    })
}

function play(e, currentPlayer) {
    let box = e.target;
    currentPlayer = currentTurn ? player1 : player2;
    placeMark(box, currentPlayer);
    if(checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
    }
}

function endGame(draw) {
    if(draw) {
        winningMessage.innerHTML = `Draw`;
    } else {
        winningMessage.innerHTML = `${currentTurn ? player1 : player2} won!`
    }
}

function isDraw() {
    return Array.from(boxElements).every(box => {
            return box.classList.contains(player1) || box.classList.contains(player2);
        })
}
function placeMark(box, currentPlayer) {
    box.classList.add(`${currentPlayer}`)
}

function swapTurn() {
    currentTurn = !currentTurn;
}


function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boxElements[index].classList.contains(currentPlayer)
        })
    })
}