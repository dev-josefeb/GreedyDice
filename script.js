'use strict';
let rolledDiceValue;
let activePlayer = 'player1';
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let activeScore = 0;
const WINNING_SCORE = 50;

let player1El = document.querySelector('.player--0');
let player2El = document.querySelector('.player--1');
let scorePlayer1El = document.getElementById('score--0');
let scorePlayer2El = document.getElementById('score--1');

let currentPlayer1El = document.getElementById('current--0');
let currentPlayer2El = document.getElementById('current--1');

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
  rolledDiceValue = generateRandomNumber();
  console.log(rolledDiceValue);
  diceEl.setAttribute('src', `images/dice-${rolledDiceValue}.png`);
  diceEl.classList.remove('hidden');

  if (rolledDiceValue === 1) {
    if (activePlayer === 'player1') currentPlayer1El.textContent = 0;
    else currentPlayer2El.textContent = 0;

    switchPlayers();
  } else {
    activeScore += rolledDiceValue;
    if (activePlayer === 'player1') currentPlayer1El.textContent = activeScore;
    else currentPlayer2El.textContent = activeScore;
  }
}

function generateRandomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function onNewClicked() {
  setStartConditions();
}

function onHoldClicked() {
  if (activePlayer === 'player1') {
    scorePlayer1 += activeScore;

    if (scorePlayer1 >= WINNING_SCORE) {
      alert('Congratulations player 1 won!');
      setStartConditions();
      return;
    }

    scorePlayer1El.textContent = scorePlayer1;
    currentPlayer1El.textContent = 0;
  } else {
    scorePlayer2 += activeScore;

    if (scorePlayer2 >= WINNING_SCORE) {
      alert('Congratulations player 2 won!');
      setStartConditions();
      return;
    }

    scorePlayer2El.textContent = scorePlayer2;
    currentPlayer2El.textContent = 0;
  }

  activeScore = 0;
  switchPlayers();
}

function setStartConditions() {
  diceEl.classList.add('hidden');
  scorePlayer1El.textContent = 0;
  scorePlayer2El.textContent = 0;
  currentPlayer1El.textContent = 0;
  currentPlayer2El.textContent = 0;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  activeScore = 0;
  activePlayer = 'player1';
}

function switchPlayers() {
  if (activePlayer === 'player1') {
    player1El.classList.remove('player--active');
    player2El.classList.add('player--active');
    activePlayer = 'player2';
    currentPlayer1El.textContent = 0;
  } else {
    player2El.classList.remove('player--active');
    player1El.classList.add('player--active');
    activePlayer = 'player1';
    currentPlayer2El.textContent = 0;
  }

  activeScore = 0;
}
