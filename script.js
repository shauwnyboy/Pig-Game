"use strict";

const playGameFunction = function () {
  const totalScorePlayerOne = document.querySelector(".total-score-player-1");
  const totalScorePlayerTwo = document.querySelector(".total-score-player-2");
  const currentScorePlayerOne = document.querySelector(
    ".current-score-player-1"
  );
  const currentScorePlayerTwo = document.querySelector(
    ".current-score-player-2"
  );

  totalScorePlayerOne.value = 0;
  totalScorePlayerTwo.value = 0;
  currentScorePlayerOne.value = 0;
  currentScorePlayerTwo.value = 0;

  let activePlayer = 0;

  const victoryScore = 10;

  let buttonRoll = document.querySelector(".pig-game-board-roll-button");
  let buttonHold = document.querySelector(".pig-game-board-hold-button");

  const switchPlayers = function () {
    let boardPlayerOne = document.querySelector(".board-1");
    let boardPlayerTwo = document.querySelector(".board-2");
    if (activePlayer === 0) {
      activePlayer = 1;
      boardPlayerOne.classList.add("inactive-player");
      boardPlayerTwo.classList.remove("inactive-player");
    } else if (activePlayer === 1) {
      activePlayer = 0;
      boardPlayerOne.classList.remove("inactive-player");
      boardPlayerTwo.classList.add("inactive-player");
    }
  };

  const checkWinner = function () {
    if (activePlayer === 0 && totalScorePlayerOne.value >= victoryScore) {
      totalScorePlayerOne.textContent = "🎉";
      totalScorePlayerTwo.textContent = "❌";
      buttonRoll.disabled = true;
      buttonHold.disabled = true;
    } else if (
      activePlayer === 1 &&
      totalScorePlayerTwo.value >= victoryScore
    ) {
      totalScorePlayerOne.textContent = "❌";
      totalScorePlayerTwo.textContent = "🎉";
      buttonRoll.disabled = true;
      buttonHold.disabled = true;
    }
  };

  const rollDice = function () {
    let diceImg = document.querySelector(".pig-game-board-dice-img");
    const randomNumber = Number(Math.floor(1 + Math.random() * 6));
    diceImg.classList.add("invisible");
    setTimeout(() => {
      diceImg.classList.remove("invisible");
    }, 200);
    diceImg.src = `imgs/dice-${randomNumber}.jpg`;
    if (activePlayer === 0) {
      currentScorePlayerOne.value += randomNumber;
      setTimeout(() => {
        currentScorePlayerOne.textContent = currentScorePlayerOne.value;
      }, 200);
    }
    if (activePlayer === 1) {
      currentScorePlayerTwo.value += randomNumber;
      setTimeout(() => {
        currentScorePlayerTwo.textContent = currentScorePlayerTwo.value;
      }, 200);
    }
    if (randomNumber === 1 && activePlayer === 0) {
      currentScorePlayerOne.value = 0;
      currentScorePlayerOne.textContent = 0;
      switchPlayers();
    } else if (randomNumber === 1 && activePlayer === 1) {
      currentScorePlayerTwo.value = 0;
      currentScorePlayerTwo.textContent = 0;
      switchPlayers();
    }
  };

  const holdScore = function () {
    if (activePlayer === 0) {
      totalScorePlayerOne.value += currentScorePlayerOne.value;
      totalScorePlayerOne.textContent = totalScorePlayerOne.value;
      currentScorePlayerOne.value = currentScorePlayerOne.textContent = 0;
      checkWinner();
      if (totalScorePlayerOne.value >= victoryScore) return;
      switchPlayers();
    } else if (activePlayer === 1) {
      totalScorePlayerTwo.value += currentScorePlayerTwo.value;
      totalScorePlayerTwo.textContent = totalScorePlayerTwo.value;
      currentScorePlayerTwo.value = currentScorePlayerTwo.textContent = 0;
      checkWinner();
      if (totalScorePlayerTwo.value >= victoryScore) return;
      switchPlayers();
    }
  };

  buttonRoll.addEventListener("click", rollDice);
  buttonHold.addEventListener("click", holdScore);
};

playGameFunction();
