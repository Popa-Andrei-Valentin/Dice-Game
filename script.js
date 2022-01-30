'use strict';

// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);




const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting Conditions
let playing = true;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing == true) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1, if true switch to next player
    if (dice !== 1) {
      // Add dice to curent score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // resetare curent score - afisare -
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      // switch to next player
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle(`player--active`);
      player1El.classList.toggle(`player--active`);
      // reset curent score
      currentScore = 0;
      current0El.textContent = currentScore;
      current1El.textContent = currentScore;
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing == true) {
    // add to players score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // check if any win
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      current0El.textContent = currentScore;
      current1El.textContent = currentScore;
      player0El.classList.toggle(`player--active`);
      player1El.classList.toggle(`player--active`);
    }
  }
});

btnNew.addEventListener(`click`, function () {
  // playing = true
  playing = true;

  // scorurile resetate
  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  score[0] = 0;
  score[1] = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;

  // sa inceapa de la player 1 (0)
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  if (activePlayer === 1) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);
    document.querySelector(`.player--0`).classList.add(`player--active`);
  } else {
    document.querySelector(`.player--0`).classList.add(`player--active`);
  }

  activePlayer = 0;
  // facem zarurile sa apara
  diceEl.classList.remove(`hidden`);
});
