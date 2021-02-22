'use strict';

let scorePlayer1El = document.getElementById('score--0');
let scorePlayer2El = document.getElementById('score--1');

let diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

scorePlayer1El.textContent = 0;
scorePlayer2El.textContent = 0;
