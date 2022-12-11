const grids = document.querySelectorAll(".grid");
const result = document.querySelector("#result");
const reminder = document.querySelector("#reminder");
const reset = document.querySelector("#reset");

let count = 0;
let xList = [];
let oList = [];

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


for(let i = 0; i < grids.length; i++){
    grids[i].addEventListener("click", ()=>{
        if(grids[i].textContent !== '' || reminder.textContent === "Congratulations! O win the game!" || reminder.textContent === "Congratulations! X win the game!"){
            return true
        }
        if(count%2 === 0){
            count++;
            grids[i].innerHTML = "O";
            reminder.textContent = "It's X turn!"
            oList.push(i);
            if(checkWin(oList)){
                reminder.textContent = "Congratulations! O win the game!"
                reset.style.backgroundColor = "red";
            }
        }else{
            count++;
            grids[i].innerHTML = "X";
            xList.push(i);
            reminder.textContent = "It's O turn!"
            if(checkWin(xList)){
                reminder.textContent = "Congratulations! X win the game!"
                reset.style.backgroundColor = "red";
            }
        }
    })
}

reset.addEventListener("click", () =>{
    for(const grid of grids){
        grid.textContent = '';
    }
    count = 0;
    reminder.textContent = "Start the game!"
    reset.style.backgroundColor = "";
    oList = [];
    xList = [];
})

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
