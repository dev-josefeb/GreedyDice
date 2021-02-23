'use strict';

let currentPlayer = 0;
let scores = [0, 0];
let activeScore = 0;
const WINNING_SCORE = 20;
let isPlaying = true;

const player1El = document.querySelector(`.player--0`);
const player2El = document.querySelector(`.player--1`);
const scorePlayer1El = document.getElementById(`score--0`);
const scorePlayer2El = document.getElementById(`score--1`);
const currentScorePlayer1El = document.getElementById(`current--0`);
const currentScorePlayer2El = document.getElementById(`current--1`);

const diceEl = document.querySelector('.dice');
const buttonNewGame = document.querySelector('.btn--new');
const buttonRollDice = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const buttonReplay = document.querySelector('.btn--replay');

setStartConditions();

// Adding Event Listeners
buttonNewGame.addEventListener('click', setStartConditions);
buttonRollDice.addEventListener('click', onRollClicked);
buttonHold.addEventListener('click', onHoldClicked);
buttonReplay.addEventListener('click', setStartConditions);

function onRollClicked() {
  if (!isPlaying) return;

  let diceValue = generateRandomNumber();
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `images/dice-${diceValue}.png`);

  if (diceValue === 1) {
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    switchPlayers();
    return;
  }

  activeScore += diceValue;
  document.getElementById(
    `current--${currentPlayer}`
  ).textContent = activeScore;
}

function generateRandomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function onHoldClicked() {
  if (!isPlaying) return;

  scores[currentPlayer] += activeScore;

  if (scores[currentPlayer] >= WINNING_SCORE) {
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');

    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');

    document.querySelector('.snackbar').classList.remove('hidden');
    document.querySelector(
      '.snackbar'
    ).textContent = `🎊 Congratulations Player ${
      currentPlayer === 0 ? 1 : 2
    } for winning! 🎊`;

    isPlaying = false;
    return;
  }

  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  switchPlayers();
}

function setStartConditions() {
  diceEl.classList.add('hidden');
  document.querySelector('.snackbar').classList.add('hidden');
  isPlaying = true;
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  scorePlayer1El.textContent = 0;
  scorePlayer2El.textContent = 0;
  currentScorePlayer1El.textContent = 0;
  currentScorePlayer2El.textContent = 0;
  scores[0] = scores[1] = activeScore = currentPlayer = 0;
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
}

function switchPlayers() {
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  activeScore = 0;
}
