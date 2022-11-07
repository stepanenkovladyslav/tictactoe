class User {
    #name
    #sign

    constructor(name, sign) {
            this.#name = name;
            this.#sign = sign
    }

    get name () {
        return this.#name
    }
    set sign (sign) {
        return this.#sign = sign;
    }
    get sign () {
        return this.#sign
    }
}

class Statistics {
    #users
    #history
    
    constructor () {
        this.#users = [];
        this.#history = []
    }

    get users () {
        return this.#users;
    }
    get history () {
        return this.#history;
    }
}

const crossIndex = [];
const zeroIndex = [];
const crossComb = [];
const zeroComb = [];
const winnerResults = ["123", "456", "789", "147", "258", "369", "159", "357"]
const stats = new Statistics();
const input = document.querySelector('#nameinput');
const form = document.querySelector(".form")
const container = document.querySelector('.container');
const button = document.querySelector("#button");
const allSquares = document.querySelectorAll(".squares .sq");
const game = document.querySelector('.squares');
document.body.style.cssText = `height: 100vh; width: 100vw; position: absolute; box-sizing: border-box`
let move = document.querySelector(".directions");
let historyDiv = document.querySelector(".history");
let gameHistory = document.querySelector(".history > .content")
let breakout = 1
let firstMove = Math.round(Math.random());
let winner;

let firstMover = (firstMove) => {
    if (firstMove == 1) {
        let user = stats.users[0].name
        stats.users[0].sign = "O";
        stats.users[1].sign = "X"
        move.textContent = `Move: ${user}`;
    } else {
        let user = stats.users[1].name;
        stats.users[1].sign = "O"
        stats.users[0].sign = "X"
        move.textContent = `Move: ${user}`;
    }
}

function createHistoryHeading() {
    historyDiv.firstElementChild.textContent = `History:`
}

function clearData (crossIndex, zeroIndex, crossComb, zeroComb) {
    crossIndex.length = 0;
    zeroIndex.length = 0;
    crossComb.length = 0;
    zeroComb.length = 0;
    Game.i = 0;
    winner = undefined;
    for (let sq of allSquares) {
        sq.textContent = ""
    }
}

class Game {
    static i = 1
    static play(sq, i) {
        if (i % 2 == 0) {
            if (sq.textContent != "X" && sq.textContent != "O") {
            sq.textContent = "X";
            sq.style.cssText = 'display: flex; justify-content: center; \
            height: 200px; align-items: center; font-size: 200px; \
            padding: 0px; border-top: 2px solid black; border-left: 2px solid black; border-right: 2px solid black; border-bottom: 2px solid black;border-collapse: collapse;';
            crossIndex.push(Number(sq.id));
            } else {
                Game.i--
            }
        } else {
            if (sq.textContent != "X" && sq.textContent != "O") {
            sq.textContent = "O";
            sq.style.cssText = 'display: flex; justify-content: center; \
            height: 200px; align-items: center; font-size: 200px;\
            padding: 0px; border-top: 2px solid black; border-left: 2px solid black; border-right: 2px solid black; border-bottom: 2px solid black;border-collapse: collapse;'
            zeroIndex.push(Number(sq.id));
            } else {
                Game.i--
            }
        }
    }
    static combine(arr) {
        arr.sort();
        arr.forEach(element => String(element))
        for (let i = 0; i <= arr.length -1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                for (let x = j + 1; x < arr.length; x++) {
                    if (arr == crossIndex) {
                        crossComb.push(`${crossIndex[i]}${crossIndex[j]}${crossIndex[x]}`)
                    } else {
                        zeroComb.push(`${zeroIndex[i]}${zeroIndex[j]}${zeroIndex[x]}`);
                    }
                }
            }
        }
    }
}

function checkWinner(result, arr1, arr2) {
    res1 = arr1.find((comp, idx, arr) => arr.includes(result));   
    if (res1) {
        return `O`
    }
    res2 = arr2.find((comp, idx, arr) => arr.includes(result));
    if (res2) {
        return 'X'
    }
}


function nextMove(sq) {
    if (sq.textContent == "X") {
        let nextUser = stats.users.find(user => user.sign == "O");
        move.textContent = `Move: ${nextUser.name}`;
    } else if (sq.textContent == "O") {
        let nextUser = stats.users.find(user => user.sign == "X");
        move.textContent = `Move: ${nextUser.name}`;
    } else {
        let nextUser = stats.users.find(user => user.sign == "O");
        move.textContent = `Move: ${nextUser.name}`;
    }
}

    

// Основной код

//Форма для двух юзеров
form.style.cssText = `display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; height: 100%`
input.style.cssText = `height:fit-content; margin-bottom: 20px`
button.style.heght = `fit-content`
button.onclick = () => {
    let user = new User(input.value);
    stats.users.push(user);
    input.value = "";
    input.placeholder = "Enter the name of second user";
    if (stats.users.length == 2) {
        form.remove()
        // Визуал после удаления формы
        container.style.cssText = `display: grid; grid-template-columns: 65% 25%; justify-content: center; align-items: center; position: relative; height: 100%`
        game.style.cssText = `display: grid; grid-template-columns: repeat(3, 200px);\
        grid-template-rows: repeat(3, 200px); grid-gap: 0px;\ 
        align-content: center; justify-content: center; z-index = 1; width: 100% `;
        historyDiv.style.cssText = `display: flex; height: 50%; background-color: #FBE9E9; border: 2px solid #c9b9b7; align-items: center; flex-direction: column;`
        gameHistory.style.cssText = `height: 100%; justify-items: center; display: flex; flex-direction: column; align-items: center;`
        for (let square of allSquares) {
            square.style.cssText = `padding: 0px; border-top: 2px solid black; border-left: 2px solid black; border-right: 2px solid black; border-bottom: 2px solid black; border-collapse: collapse;`;
        }
        firstMover (firstMove);
        createHistoryHeading()
        do {
            for (let sq of allSquares) {
                sq.onclick = () => {
                    console.log(Game.i);
                    Game.play(sq, Game.i);
                    Game.combine(crossIndex);
                    Game.combine(zeroIndex);
                    for (result of winnerResults) {
                        let winsign = checkWinner(result, zeroComb, crossComb);
                        if (winsign) {
                            winner = stats.users.find(user => user.sign == winsign);
                            alert(`The winner is: ${winner.name}`)
                            stats.history.push(winner)
                            let newWin = stats.history.find(win => winner == win);
                            let newWinner = document.createElement("p");
                            newWinner.textContent = `The winner is: ${newWin.name}`
                            gameHistory.append(newWinner)
                            clearData(crossIndex, zeroIndex, crossComb, zeroComb, winner);  
                        }
                    }
                    if (Game.i == 9 && winner === undefined) {
                        alert("Draw")
                        stats.history.push(`Draw`)
                        let newWinner = document.createElement("p");
                        newWinner.textContent = `Draw` 
                        gameHistory.append(newWinner)
                        clearData(crossIndex, zeroIndex, crossComb, zeroComb);
                    }
                    
                    Game.i++;
                    nextMove(sq)
                } 
            }
            breakout = 2; 
        } while (breakout == 1); 
                
    }
}