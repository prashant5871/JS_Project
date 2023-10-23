console.log("tic tac toe");

let bgm = new Audio('bgm.mp3');
let click_audio = new Audio('click.mp3');
let game_over = new Audio('game_over.wav');
let isgameover = false;
let turn = "X";

bgm.loop = true; // Make the BGM loop
bgm.volume = 0.5; // Adjust the volume if needed
bgm.play();

let changTurn = () =>{
    return turn === "X" ? "0" : "X";
}

let checkWin = () =>{
    let boxText = document.getElementsByClassName('boxtext');
    let win = [
        [0,1,2,5,5,0], // others 3 are for lining
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,5,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135]
    ]

    win.forEach(e=>{
        if((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText) && (boxText[e[0]].innerText !== '')){
            document.getElementsByClassName('info')[0].innerText = boxText[e[0]].innerText + " Won";
            isgameover = true
            bgm.pause();
            game_over.play();
            document.getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector('.line').style.width = "20vw";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
        
    })
}

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(ele=>{

    let boxText = ele.querySelector('.boxtext');
    ele.addEventListener('click', ()=>{
        if(boxText.innerText === ''){
            boxText.innerText = turn;
            turn = changTurn();
            click_audio.play();
            checkWin();
            if(!isgameover){
                document.getElementsByClassName('info')[0].innerText = `Turn of ${turn}`;
            }
            else{
                ele.removeEventListener('click',()=>{
                    if(boxText.innerText === ''){
                        boxText.innerText = '';
                    }
                });
            }
        }
    })
})

let btn = document.getElementById('reset');

btn.addEventListener('click',()=>{
    let boxes = document.getElementsByClassName('box');
    Array.from(boxes).forEach(ele =>{
        let boxText = ele.querySelector('.boxtext');
        boxText.innerText = '';
    })
    document.getElementsByTagName('img')[0].style.width = "0px";
    turn = "X";
    document.getElementsByClassName('info')[0].innerText = `Turn of ${turn}`;
    isgameover = false;
    document.querySelector('.line').style.width = "0";
    bgm.play();
})