let board = [];

function startGame() {

    board = [
        [2, 0, 0, 2],
        [0, 4, 0, 0],
        [0, 0, 8, 0],
        [2, 0, 0, 4]
    ];

    drawBoard();
}

function drawBoard() {

    let boardDiv = document.getElementById("board");

    boardDiv.innerHTML = "";

    for (let r = 0; r < 4; r++) {

        for (let c = 0; c < 4; c++) {

            let tile = document.createElement("div");

            tile.className = "tile";

            tile.innerText = board[r][c] === 0 ? "" : board[r][c];

            boardDiv.appendChild(tile);
        }
    }
}

window.onload = startGame;