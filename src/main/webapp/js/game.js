let board = [];
let score = 0;
const size = 4;

function startGame() {

    board = Array(size)
        .fill()
        .map(() => Array(size).fill(0));

    score = 0;

    addNumber();
    addNumber();

    render();
}

function addNumber() {

    let empty = [];

    for(let r=0;r<size;r++) {
        for(let c=0;c<size;c++) {

            if(board[r][c]===0) {
                empty.push({r,c});
            }
        }
    }

    if(empty.length===0) return;

    let spot =
        empty[Math.floor(Math.random()*empty.length)];

    board[spot.r][spot.c] =
        Math.random()<0.9 ? 2 : 4;
}

function render() {

    let gameBoard =
        document.getElementById("board");

    gameBoard.innerHTML="";

    for(let r=0;r<size;r++) {

        for(let c=0;c<size;c++) {

            let tile =
                document.createElement("div");

            tile.className="tile";

            if(board[r][c]!==0) {

                tile.innerText =
                    board[r][c];
            }

            gameBoard.appendChild(tile);
        }
    }

    document.getElementById("score")
        .innerText = score;
}

function slide(row){

    row=row.filter(v=>v);

    for(let i=0;i<row.length-1;i++){

        if(row[i]===row[i+1]){

            row[i]*=2;

            score += row[i];

            row[i+1]=0;
        }
    }

    row=row.filter(v=>v);

    while(row.length<size){

        row.push(0);
    }

    return row;
}

function moveLeft(){

    let changed=false;

    for(let r=0;r<size;r++){

        let old=board[r].toString();

        board[r]=slide(board[r]);

        if(old!==board[r].toString()){

            changed=true;
        }
    }

    return changed;
}

document.addEventListener("keydown",e=>{

    let moved=false;

    if(e.key==="ArrowLeft"){

        moved=moveLeft();
    }

    if(moved){

        addNumber();

        render();
    }
});

startGame();