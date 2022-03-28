let canvas = document.querySelector(".canvas");             //bind canvas to canvas variable
let start = document.getElementById("start");               //bind start id(start button) to start variable
let timeResult = document.getElementById("timeResult");     //bind timeResult to timeResult variable

/**
 * gameState dictionary for modifying gameState.
*/
let gameState = {
    STOP: 1,
    START: 2,
}

/**
 * Bind gameState of STOP to stateOfGame (how we begin).
*/
let stateOfGame = gameState.STOP;

/**
 * Gets a random number between min and max then multiplies it by 1000.
 * @param lower is the lowerbound.
 * @param upper is the upperbound.
 * @return result -> the random number.
*/
function getRandomNumber(lower, upper){                 
    let result = (Math.floor(Math.random() * Math.floor(upper) + lower)) * 1000;
    return result;
}

/**
 * Clears timeouts previously set because game ends, all states return to their original state.
*/
function endGame(){
    clearTimeout(firstTimeout);
    clearTimeout(secondTimeout);
    canvas.style.background = "rgb(125, 125, 125)";
    start.innerHTML = "Start"
    stateOfGame = gameState.STOP;
}

/**
 * firstTimeoutFunction uses setTimeout that sets a timer which executes the following code block once the timer expires.
 * @param time Number given that determines when setTimeout expires.
 * EventListener for canvas click, which changes the html element with id="timeResult" to the resulting number
 * from when the canvas turned green to when the user clicked the canvas in milliseconds.
*/
function firstTimeoutFunction(time) {
    firstTimeout = setTimeout(function(){
        canvas.style.background = "rgb(0, 175, 0)";
        let firstDate = new Date();
        currentTime = firstDate.getTime();

        canvas.addEventListener("click", function(){
            let secondDate = new Date();
            laterTime = secondDate.getTime();
            responseTime = (laterTime - currentTime)
            timeResult.innerHTML = responseTime + " ms";
        })
    }, time);
}


/**
 * secondTimeoutFunction uses setTimeout that sets a timer which executes endGame() once the timer expires.
 * @param time Number given that determines when setTimeout expires.
*/
function secondTimeoutFunction(time) {
    secondTimeout = setTimeout(function(){
        endGame();
    }, time);
}


/**
 * Gets a random number, changes state of game to START, canvas background color to red.
*/
function startGame(){
    let flashTime = getRandomNumber(2, 8);
    let quitTime = flashTime + 5000;
    stateOfGame = gameState.START;
    canvas.style.background = "rgb(255, 0, 0)";

    firstTimeoutFunction(flashTime);
    secondTimeoutFunction(quitTime);
}

/**
 * EventListener for when the start button is pressed, depending on current state, starts or stops game.
*/
start.addEventListener("click", function(){
    if(stateOfGame === gameState.START){
        endGame();
    }else{
        startGame();
        this.innerHTML = "Stop";
    }
});

/**
 * EventListener for when canvas is clicked on which ends the game.
*/
canvas.addEventListener("click", function(){
    endGame();
});