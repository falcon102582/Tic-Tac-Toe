const grids = document.querySelectorAll(".grid");
const result = document.querySelector("#result");
const reminder = document.querySelector("#reminder");
const reset = document.querySelector("#reset");
const playAiBtn = document.querySelector("#playAi");
const playHumanBtn = document.querySelector("#playHuman");

let count = 0;
let xList = [];
let oList = [];
let game = false;
let gameOver = false;
let ai = false;

const winFormula = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let remainingGirds = [0,1,2,3,4,5,6,7,8];


for(let i = 0; i < grids.length; i++){
    grids[i].addEventListener("click", ()=>{
        if(grids[i].textContent !== '' || gameOver === true || game === false){
            return true
        }
        if(count%2 === 0){
            count++;
            grids[i].innerHTML = "O";
            reminder.textContent = "It's X turn!";
            remainingGirds.splice(remainingGirds.indexOf(i), 1);
            oList.push(i);
            if(checkWin(oList)){
                gameOver = true;
                reminder.textContent = "Congratulations! O win the game!"
                reset.style.backgroundColor = "red";
            }
        }else{
            count++;
            grids[i].innerHTML = "X";
            remainingGirds.splice(remainingGirds.indexOf(i), 1);
            xList.push(i);
            reminder.textContent = "It's O turn!"
            if(checkWin(xList)){
                gameOver = true;
                reminder.textContent = "Congratulations! X win the game!"
                reset.style.backgroundColor = "red";
            }
        }

        if(ai === true && gameOver ===false){
            setTimeout(()=> computerPlay(), 1000) ;
        }
    })
}

reset.addEventListener("click", resetGame);

function resetGame(){
    for(const grid of grids){
        grid.textContent = '';
    }
    count = 0;
    reminder.textContent = "Start the game!"
    reset.style.backgroundColor = "";
    oList = [];
    xList = [];
    gameOver = false;
    remainingGirds = [0,1,2,3,4,5,6,7,8];
}

function check(arr, target){
    return target.every(v => arr.includes(v))
}

function checkWin(arr){
    for(const formula of winFormula){
        if(check(arr, formula)){
            return true
        }
    }
    if(remainingGirds.length === 0){
        reminder.innerHTML = "Draw!"
        gameOver = true;
    }
}
// choose mode
playHumanBtn.addEventListener("click", ()=>{
    resetGame();
    playHumanBtn.style.border = "black solid 3px";
    playHumanBtn.style.fontWeight = "900";
    playAiBtn.style.border = "";
    playAiBtn.style.fontWeight = "";
    ai=false
    game = true;
})

playAiBtn.addEventListener("click", ()=>{
    resetGame();
    playAiBtn.style.border = "black solid 3px";
    playAiBtn.style.fontWeight = "900";
    playHumanBtn.style.border = "";
    playHumanBtn.style.fontWeight = "";
    ai = true;
    game = true;
})
// computerplay
function random(num){
    return Math.floor(Math.random()*num);
}
// easy mode
// function computerPlay(){
//     let decision = remainingGirds[random(remainingGirds.length)];
//     count++;
//     grids[decision].innerHTML = "X";
//     remainingGirds.splice(remainingGirds.indexOf(decision), 1);
//     xList.push(decision);
//     reminder.textContent = "It's O turn!"
//     if(checkWin(xList)){
//         reminder.textContent = "Congratulations! X win the game!"
//         reset.style.backgroundColor = "red";
//     }
// }



function computerPlay(){
    let decision = remainingGirds[random(remainingGirds.length)];
    for(const i of remainingGirds){
        oList.push(i);
        xList.push(i);
        if(checkWin(xList)){
         decision = i;
         break;
        }else if(checkWin(oList)){
         decision = i;
        }
        oList.pop();
        xList.pop();
    }
    count++;
    grids[decision].innerHTML = "X";
    remainingGirds.splice(remainingGirds.indexOf(decision), 1);
    xList.push(decision);
    reminder.textContent = "It's O turn!"
    if(checkWin(xList)){
        gameOver = true;
        reminder.textContent = "Congratulations! X win the game!"
        reset.style.backgroundColor = "red";
    }
}