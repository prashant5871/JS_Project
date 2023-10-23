let inputdir = { x: 0, y: 0 };
let speed = 5;
const bite_music = new Audio('bite.mp3');
const game_over_music = new Audio('game_over.wav');
const moveSound = new Audio('move.mp3');
const music = new Audio('music.mp3');
let lastPaint = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 8 }
];
let food = { x: 6, y: 8 };
let score_board = document.getElementsByClassName('scoreboard')[0];

    
    
    // Game functions 
    let main = (ctime) => {
        window.requestAnimationFrame(main);
        if ((ctime - lastPaint) / 1000 < 1 / speed) {
            return;
        }
        lastPaint = ctime;
        game_engine();
    }
    
let iscolide =(snakeArr)=>{
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }
    }
    if(snakeArr[0].x <=0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18){
        return true;
    }
    return false;
}




let game_engine = () => {
    music.play();
    if(iscolide(snakeArr)){
        music.pause();
        game_over_music.play();
        inputdir = {x : 0, y : 0};
        alert("Game is over");
        foodArr = [{x : 6 , y : 8}];
        score = 0;
        score_board.innerHTML = "Score : " + score;
        snakeArr = [{x : 13, y : 8}];
       game_over_music.pause();
       music.play();
    }    

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        bite_music.play();
        score++;
        score_board.innerHTML = "Score : " + score;
        let a = 1;
        let b = 17;
        snakeArr.unshift({x : snakeArr[0].x + inputdir.x, y : snakeArr[0].y + inputdir.y});
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    for(let i= snakeArr.length - 2 ; i >= 0; i--){
        snakeArr[i+1] = {... snakeArr[i]};
    }

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;


    let board = document.getElementById('board');
    board.innerHTML = "";
    snakeArr.forEach((ele, index) => {
        let snake_ele = document.createElement('div');
        snake_ele.style.gridRowStart = ele.y;
        snake_ele.style.gridColumnStart = ele.x;
        if (index === 0) {
            snake_ele.classList.add('head');
        }
        else {
            snake_ele.classList.add('body');
        }
        board.appendChild(snake_ele);
    })

    let food_ele = document.createElement('div');
    food_ele.style.gridRowStart = food.y;
    food_ele.style.gridColumnStart = food.x;
    food_ele.classList.add('food');
    board.appendChild(food_ele);

}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();
    inputDir = {x: 0, y: 1} // Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log('u');
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default : 
            break;
    }
});