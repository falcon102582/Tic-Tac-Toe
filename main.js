const grids = document.querySelectorAll(".grid");
const result = document.querySelector("#result");
const reminder = document.querySelector("#reminder");
const reset = document.querySelector("#reset");
const humanMode = document.querySelector("#human-mode");
const computerMode = document.querySelector("#computer-mode");

let count = 0;
let xList = [];
let oList = [];
let gameover = false;
let game = false;

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

let remainingGrids = [0,1,2,3,4,5,6,7,8];

for(let i = 0; i < grids.length; i++){
    grids[i].addEventListener("click", ()=>{
        if(grids[i].textContent === '' && gameover === false && game === true){
            if(count%2 === 0){
                count++;
                grids[i].innerHTML = "O";
                oList.push(i);
                updateRemainingGrid(remainingGrids, i);
                if(remainingGrids.length === 0){
                    reminder.textContent = "Draw!"
                    gameover = true;
                }else{
                    reminder.textContent = "It's X turn!";
                }
                if(checkWin(oList)){
                    reminder.textContent = "Congratulations! O win the game!"
                    reset.style.backgroundColor = "red";
                    gameover = true;
                }

            }else{
                count++;
                grids[i].innerHTML = "X";
                xList.push(i);
                reminder.textContent = "It's O turn!"
                updateRemainingGrid(remainingGrids, i);
                if(checkWin(xList)){
                    reminder.textContent = "Congratulations! X win the game!"
                    reset.style.backgroundColor = "red";
                    gameover = true;
                }
            }
            
            if(gameover === false && computerMode.value === "on"){
                setTimeout(smartComputerPlay, 800);
            }

        }
    })


}

reset.addEventListener("click", resetGame)

function resetGame(){
    for(const grid of grids){
        grid.textContent = '';
    }
    count = 0;
    reminder.textContent = "Start the game!"
    reset.style.backgroundColor = "";
    gameover = false;
    oList = [];
    xList = [];
    remainingGrids = [0,1,2,3,4,5,6,7,8];
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
}

//Gamemode
computerMode.addEventListener("click", ()=>{
    chooseMode(computerMode);
    resetGame();
})

humanMode.addEventListener("click", ()=>{
    chooseMode(humanMode);
    resetGame();
})

function random(num){
    return Math.floor(Math.random()*num)
}

function computerPlay(){
    count++;
    const computerDecision = random(remainingGrids.length);
    grids[remainingGrids[computerDecision]].innerHTML = "X";
    xList.push(remainingGrids[computerDecision]);
    reminder.textContent = "It's O turn!"
    updateRemainingGrid(remainingGrids, remainingGrids[computerDecision]);
    if(checkWin(xList)){
        reminder.textContent = "Congratulations! X win the game!"
        reset.style.backgroundColor = "red";
    }
}

function smartComputerPlay(){
    count++;
    let computerDecision = random(remainingGrids.length);
    for(const i of remainingGrids){
        oList.push(i);
        xList.push(i);
        if(checkWin(xList)){
            computerDecision = remainingGrids.indexOf(i);
            break;
        }
        if(checkWin(oList)){
            computerDecision = remainingGrids.indexOf(i);
        }
        oList.pop();
        xList.pop();
    }
    grids[remainingGrids[computerDecision]].innerHTML = "X";
    xList.push(remainingGrids[computerDecision]);
    reminder.textContent = "It's O turn!"
    updateRemainingGrid(remainingGrids, remainingGrids[computerDecision]);
    if(checkWin(xList)){
        reminder.textContent = "Congratulations! X win the game!"
        reset.style.backgroundColor = "red";
    }
}


function updateRemainingGrid(arr, index){
    return arr.splice(arr.indexOf(index),1);
}

function chooseMode(mode){
    game = true;
    if(mode === humanMode){
        humanMode.value = "on";
        humanMode.style.backgroundColor = "red";
        computerMode.value = "off";
        computerMode.style.backgroundColor = "";
    }else{
        computerMode.value = "on";
        computerMode.style.backgroundColor = "red";
        humanMode.value = "off";
        humanMode.style.backgroundColor = "";
    }
}