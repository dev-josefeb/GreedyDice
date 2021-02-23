'use strict';
let currentPlayer = 0;
let scores = [0, 0];
let activeScore = 0;
const WINNING_SCORE = 50;

let playerEl = document.querySelector(`.player--${currentPlayer}`);
let scorePlayerEl = document.getElementById(`score--${currentPlayer}`);
let currentPlayerEl = document.getElementById(`current--${currentPlayer}`);

let diceEl = document.querySelector('.dice');
let buttonNewGame = document.querySelector('.btn--new');
let buttonRollDice = document.querySelector('.btn--roll');
let buttonHold = document.querySelector('.btn--hold');

// Adding Event Listeners
buttonNewGame.addEventListener('click', setStartConditions);
buttonRollDice.addEventListener('click', onRollClicked);
buttonHold.addEventListener('click', onHoldClicked);

// Starting Conditions
setStartConditions();

function onRollClicked() {
  let diceValue = generateRandomNumber();
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `images/dice-${diceValue}.png`);

  if (diceValue === 1) {
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    switchPlayers();
  } else {
    activeScore += diceValue;
    document.getElementById(
      `current--${currentPlayer}`
    ).textContent = activeScore;
  }
}

function generateRandomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function onHoldClicked() {
  scores[currentPlayer] += activeScore;

  if (scores[currentPlayer] >= WINNING_SCORE) {
    alert(`Congratulations player ${currentPlayer === 0 ? 1 : 2} won!`);
    setStartConditions();
    return;
  }

  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  switchPlayers();
}

function setStartConditions() {
  diceEl.classList.add('hidden');
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  scores[0] = scores[1] = activeScore = 0;
  if (currentPlayer === 1) switchPlayers();
}

function switchPlayers() {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
  activeScore = 0;
}
