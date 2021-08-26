"use strict";
const name0 = document.getElementById("name--0");
const name1 = document.getElementById("name--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const currentEl0 = document.getElementById("current--0");
const currentEl1 = document.getElementById("current--1");
const playerField0 = document.querySelector(".player--0");
const playerField1 = document.querySelector(".player--1");
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add("hidden");
  newBtn.classList.add("hidden");
  name0.textContent = "Player 1";
  name1.textContent = "Player 2";
  playerField0.classList.remove("player--winner");
  playerField1.classList.remove("player--winner");
  playerField0.classList.add("player--active");
  playerField1.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerField0.classList.toggle("player--active");
  playerField1.classList.toggle("player--active");
};

rollBtn.addEventListener("click", function () {
  const randomRoll = Math.trunc(Math.random() * 6) + 1;
  console.log(randomRoll);
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${randomRoll}.png`;
  if (randomRoll !== 1) {
    currentScore += randomRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document.getElementById(
        `name--${activePlayer}`
      ).textContent = `🎉WINNER😉`;

      newBtn.classList.remove("hidden");
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
    console.log(scores);
  }
});

newBtn.addEventListener("click", init);
