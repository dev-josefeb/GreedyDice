'use strict';

let currentPlayer = 0;
let scores = [0, 0];
let activeScore = 0;
const WINNING_SCORE = 100;
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

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn--modal');

setStartConditions();

// Adding Event Listeners
buttonNewGame.addEventListener('click', setStartConditions);
buttonRollDice.addEventListener('click', onRollClicked);
buttonHold.addEventListener('click', onHoldClicked);
buttonReplay.addEventListener('click', setStartConditions);
btnCloseModal.addEventListener('click', closeModal);
btnOpenModal.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden'))
    closeModal();
});

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
    setWinningUI();
    isPlaying = false;
    return;
  }

  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  switchPlayers();
}

function setStartConditions() {
  isPlaying = true;
  scorePlayer1El.textContent = 0;
  scorePlayer2El.textContent = 0;
  currentScorePlayer1El.textContent = 0;
  currentScorePlayer2El.textContent = 0;
  scores[0] = scores[1] = activeScore = currentPlayer = 0;
  setStartupUI();
}

function switchPlayers() {
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  activeScore = 0;
}

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function setWinningUI() {
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');

  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');

  buttonHold.classList.add('hidden');
  buttonRollDice.classList.add('hidden');

  document.querySelector('.snackbar').classList.remove('hidden');
  document.querySelector(
    '.snackbar'
  ).textContent = `🎊 Congratulations to Player ${
    currentPlayer === 0 ? 1 : 2
  } for winning! 🎊`;
}

function setStartupUI() {
  diceEl.classList.add('hidden');
  buttonRollDice.classList.remove('hidden');
  buttonHold.classList.remove('hidden');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  document.querySelector('.snackbar').classList.add('hidden');
}
