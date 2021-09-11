"use strict";

//selecting elements
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Local Vriables
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

//support functions
function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
}


//Handlers
const rollDice = function () {
    if (playing) {
        //generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //display the corrispondig dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
};

const holdScore = function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] < 100) {
            switchPlayer();
        } else {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }
    }
};

const newGame = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add("hidden");
    current0El.textContent = 0;
    current1El.textContent = 0;
    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    player1.classList.add("player--active");
    activePlayer = 0;
};

//starting conditions
newGame();

//Rolling dice functionality
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);
btnNew.addEventListener("click", newGame);
