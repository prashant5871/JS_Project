let board = document.querySelector('.board');
let status = document.querySelector('.status');

let turn = 0;

let grid = [
    [],
    [],
    []
];

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        grid[i][j] = "";
    }
}

let notWin = false;

const RedBackground = (x1, y1, x2, y2, x3, y3) => {
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        if ((cell.dataset.x == x1 && cell.dataset.y == y1) || (cell.dataset.x == x2 && cell.dataset.y == y2) || (cell.dataset.x == x3 && cell.dataset.y == y3)) {
            // cell.style.backgroundColor = "rgb(241, 94, 94)";
            cell.style.backgroundColor = "#27ae60";
            cell.style.color = "white";
        }
    })
}
const checkWin = (x, y) => {
    if (!turn) {
        let cnt = 0;
        for (let j = 0; j < 3; j++) {
            if (grid[x][j] == 'O') {
                cnt++;
            }
        }

        if (cnt == 3) {
            notWin = false;
            RedBackground(x, 0, x, 1, x, 2);
            setTimeout(() => {
                alert("O-Win");
                Reset();
            }, 500);
            return;
        }

        cnt = 0;

        for (let i = 0; i < 3; i++) {
            if (grid[i][y] == 'O') {
                cnt++;
            }
        }

        if (cnt == 3) {
            notWin = false;
            RedBackground(0, y, 1, y, 2, y);
            setTimeout(() => {
                alert("O-Win");
                Reset();
            }, 500);
            return;
        }


        if ((grid[0][0] == 'O' && grid[1][1] == 'O' && grid[2][2] == 'O')) {
            notWin = false;
            RedBackground(0, 0, 1, 1, 2, 2);
            setTimeout(() => {
                alert("O-Win");
                Reset();
            }, 500);
        } else if (grid[0][2] == 'O' && grid[2][0] == 'O' && grid[1][1] == 'O') {
            RedBackground(2, 0, 1, 1, 0, 2);
            notWin = false;
            setTimeout(() => {
                alert("O-Win");
                Reset();
            }, 500);
        }


    } else {

        let cnt = 0;
        for (let j = 0; j < 3; j++) {
            if (grid[x][j] == 'X') {
                cnt++;
            }
        }

        if (cnt == 3) {
            notWin = false;
            RedBackground(x, 0, x, 1, x, 2);
            setTimeout(() => {
                alert("X-Win");
                Reset();
            }, 500);
            return;
        }

        cnt = 0;

        for (let i = 0; i < 3; i++) {
            if (grid[i][y] == 'X') {
                cnt++;
            }
        }

        if (cnt == 3) {
            notWin = false;
            // const audio = new Audio('../music/music-2.mp3');
            // audio.play();
            RedBackground(2, y, 1, y, 0, y);
            setTimeout(() => {
                alert("X-Win");
                Reset();
                // audio.pause();
            }, 500);
            return;
        }


        if (grid[0][0] == 'X' && grid[1][1] == 'X' && grid[2][2] == 'X') {
            RedBackground(0, 0, 1, 1, 2, 2);
            notWin = false;
            setTimeout(() => {
                alert("X-Win");
                Reset();
            }, 500);
        } else if (grid[0][2] == 'X' && grid[2][0] == 'X' && grid[1][1] == 'X') {
            RedBackground(2, 0, 1, 1, 0, 2);
            notWin = false;
            setTimeout(() => {
                alert("X-Win");
                Reset();
            }, 500);
        }

    }
}

const chekTie = () => {
    let cnt = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] != "") {
                cnt++;
            }
        }
    }

    if (cnt == 9) {
        alert("Match Tie!!");
        Reset();
    }
}

board.addEventListener('click', (e) => {
    // console.log(e.target.dataset.x, e.target.dataset.y);
    if (e.target.classList[0] == "cell") {
        if (e.target.innerHTML == '') {
            notWin = true;
            if (!turn) {
                // console.log(turn);
                e.target.innerHTML = "O";
                let x = e.target.dataset.x;
                let y = e.target.dataset.y;
                grid[x][y] = "O";
                // console.table(grid);
                status.innerHTML = "Player X's Turn";
                setTimeout(() => {
                    checkWin(x, y);
                    turn = 1;
                }, 50);

            } else {
                // console.log(turn);
                e.target.innerHTML = "X";
                let x = e.target.dataset.x;
                let y = e.target.dataset.y;
                grid[x][y] = "X";
                // console.table(grid);
                setTimeout(() => {
                    checkWin(x, y);
                    turn = 0;
                }, 50);
                status.innerHTML = "Player O's Turn";

            }
            setTimeout(() => {
                if (notWin) {

                    chekTie();
                }
            }, 100);


        } else {
            // console.log("Please select other cell");
            return;
        }
    }
})

let reset = document.querySelector('.reset-button');

const Reset = () => {
    turn = 0;
    status.innerHTML = "Player O's Turn"
    let cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "#f0f0f0";
        cell.style.color = "black";
    })

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[i][j] = "";
        }
    }

}

reset.addEventListener('click', Reset)
