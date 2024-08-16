let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player X // player O
let gameActive = true; // flag to check if the game is active
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameActive = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive || !turnO) return; // prevent clicks if the game is over or not player's turn
        playerMove(box);
        if (gameActive) computerMove(); // computer moves if the game is still active
    });
});

const playerMove = (box) => {
    box.innerText = "O";
    box.disabled = true;
    turnO = false;
    checkWinner();
}

const computerMove = () => {
    let availableBoxes = [...boxes].filter(box => box.innerText === "");
    if (availableBoxes.length === 0) return;
    let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turnO = true;
    checkWinner();
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    if(winner === "X"){
        msg.innerText = `Sorry You Lose Retry!`
    }else{
        msg.innerText = `Congratulations, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameActive = false; // stop the game
};

const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    if (checkDraw()) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        gameActive = false; // stop the game
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
