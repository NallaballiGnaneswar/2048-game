let board;
let score = 0;

function startGame() {

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    score = 0;

    document.getElementById("score").innerText = score;

    addRandomTile();
    addRandomTile();

    drawBoard();
}

function drawBoard() {

    const boardDiv = document.getElementById("board");

    boardDiv.innerHTML = "";

    for(let r=0;r<4;r++) {

        for(let c=0;c<4;c++) {

            const tile = document.createElement("div");

            tile.classList.add("tile");

            const value = board[r][c];

            if(value !== 0) {

                tile.innerText = value;

                tile.classList.add("tile-" + value);
            }

            boardDiv.appendChild(tile);
        }
    }
}

function addRandomTile() {

    let empty = [];

    for(let r=0;r<4;r++) {

        for(let c=0;c<4;c++) {

            if(board[r][c] === 0) {

                empty.push({r,c});
            }
        }
    }

    if(empty.length === 0) return;

    let random = empty[Math.floor(Math.random() * empty.length)];

    board[random.r][random.c] =
        Math.random() < 0.9 ? 2 : 4;
}

function slide(row) {

    row = row.filter(v => v);

    for(let i=0;i<row.length-1;i++) {

        if(row[i] === row[i+1]) {

            row[i] *= 2;

            score += row[i];

            row[i+1] = 0;
        }
    }

    row = row.filter(v => v);

    while(row.length < 4) {

        row.push(0);
    }

    return row;
}

function moveLeft() {

    for(let r=0;r<4;r++) {

        board[r] = slide(board[r]);
    }

    addRandomTile();

    updateBoard();
}

function moveRight() {

    for(let r=0;r<4;r++) {

        let row = board[r].slice().reverse();

        row = slide(row);

        board[r] = row.reverse();
    }

    addRandomTile();

    updateBoard();
}

function moveUp() {

    for(let c=0;c<4;c++) {

        let col = [];

        for(let r=0;r<4;r++) {

            col.push(board[r][c]);
        }

        col = slide(col);

        for(let r=0;r<4;r++) {

            board[r][c] = col[r];
        }
    }

    addRandomTile();

    updateBoard();
}

function moveDown() {

    for(let c=0;c<4;c++) {

        let col = [];

        for(let r=0;r<4;r++) {

            col.push(board[r][c]);
        }

        col.reverse();

        col = slide(col);

        col.reverse();

        for(let r=0;r<4;r++) {

            board[r][c] = col[r];
        }
    }

    addRandomTile();

    updateBoard();
}

function updateBoard() {

    document.getElementById("score").innerText = score;

    drawBoard();

    checkWin();
}

function checkWin() {

    for(let r=0;r<4;r++) {

        for(let c=0;c<4;c++) {

            if(board[r][c] === 2048) {

                setTimeout(() => {

                    alert("You Win!");

                }, 100);

                return;
            }
        }
    }
}

document.addEventListener("keydown", function(e) {

    switch(e.key) {

        case "ArrowLeft":
            moveLeft();
            break;

        case "ArrowRight":
            moveRight();
            break;

        case "ArrowUp":
            moveUp();
            break;

        case "ArrowDown":
            moveDown();
            break;
    }
});

/* Mobile Swipe Support */

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", function(e) {

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", function(e) {

    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let dx = endX - startX;
    let dy = endY - startY;

    if(Math.abs(dx) > Math.abs(dy)) {

        if(dx > 30) {

            moveRight();

        } else if(dx < -30) {

            moveLeft();
        }

    } else {

        if(dy > 30) {

            moveDown();

        } else if(dy < -30) {

            moveUp();
        }
    }
});

window.onload = startGame;