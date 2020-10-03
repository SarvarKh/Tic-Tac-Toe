const player1 = "player1";
const player2 = "player2";
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

const boxELements = document.querySelectorAll(".box");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.querySelector("#restartButton");
const winningMessageTextElement = document.querySelector("#winning-message-text");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    circleTurn = false;
    boxELements.forEach(box => {
        box.classList.remove(player1);
        box.classList.remove(player2);
        box.removeEventListener("click", play);
        box.addEventListener("click", play, {once: true});
    })
    winningMessageTextElement.innerText = "";
}

function play(e) {
    const box = e.target;
    const currentPlayer = circleTurn ? player2 : player1;
    placeMark(box, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();   
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "player2" : "player1"} Wins!`;
    }
}

function isDraw() {
    return [...boxELements].every(box => {
        return box.classList.contains(player1) || box.classList.contains(player2)
    })
}


function placeMark(box, currentPlayer) {
    box.classList.add(currentPlayer);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combinaiton => {
        return combinaiton.every(index => {
            return boxELements[index].classList.contains(currentPlayer);
        })
    })
}

