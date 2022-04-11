"use strict";

let winningScore;

const modalFunction = function () {
  const playButton = document.querySelector('.modal-play-button');
  const winningScoreInputField = document.querySelector('.input-field');
  const modal = document.querySelector('.modal');
  const modalWrap = document.querySelector('.modal-wrap');
  const modalContainer = document.querySelector('.modal-container');
  const inputFieldContainer = document.querySelector('.modal-input-field-container');
  const modalRulesHeading = document.querySelector('.modal-rules-heading');
  const rulesButton = document.querySelector('.rules-button');
  const closeModalButton = document.querySelector('.modal-close-button');
  const modalCloseButtonContainer = document.querySelector('.modal-close-button-container');

  const closeModal = function () {
    winningScore = winningScoreInputField.value;
    modalContainer.classList.add('invisible');
    setTimeout(() => {
      modal.classList.add('shrink');
    }, 300);
    setTimeout(() => {
      modal.classList.add('invisible');
      modalWrap.classList.add('invisible');
      inputFieldContainer.classList.add('hidden');
      if (modalCloseButtonContainer.classList.contains('hidden')) {
        modalCloseButtonContainer.classList.remove('hidden');
      }
    }, 500);
    return winningScore;
  }

  const openModal = function () {
    modal.classList.remove('shrink');
    modal.classList.remove('invisible');
    modalWrap.classList.remove('invisible');
    setTimeout(() => {
      modalContainer.classList.remove('invisible');
    }, 200);
  }
  playButton.addEventListener('click', closeModal);
  rulesButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);
}
modalFunction();


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

  let buttonRoll = document.querySelector(".pig-game-board-roll-button");
  let buttonHold = document.querySelector(".pig-game-board-hold-button");
  let buttonPlayAgain = document.querySelector(".play-again-button");

  let boardPlayerOne = document.querySelector(".board-1");
  let boardPlayerTwo = document.querySelector(".board-2");

  const switchPlayers = function () {
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
    if (activePlayer === 0 && totalScorePlayerOne.value >= winningScore) {
      totalScorePlayerOne.textContent = "🎉";
      totalScorePlayerTwo.textContent = "❌";
      buttonRoll.disabled = true;
      buttonHold.disabled = true;
    } else if (
      activePlayer === 1 &&
      totalScorePlayerTwo.value >= winningScore
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
      if (totalScorePlayerOne.value >= winningScore) return;
      switchPlayers();
    } else if (activePlayer === 1) {
      totalScorePlayerTwo.value += currentScorePlayerTwo.value;
      totalScorePlayerTwo.textContent = totalScorePlayerTwo.value;
      currentScorePlayerTwo.value = currentScorePlayerTwo.textContent = 0;
      checkWinner();
      if (totalScorePlayerTwo.value >= winningScore) return;
      switchPlayers();
    }
  };

  const playAgain = function () {
    activePlayer = 0;
    boardPlayerOne.classList.remove("inactive-player");
    boardPlayerTwo.classList.add("inactive-player");
    currentScorePlayerOne.value = 0;
    currentScorePlayerOne.textContent = 0;
    currentScorePlayerTwo.value = 0;
    currentScorePlayerTwo.textContent = 0;
    totalScorePlayerOne.value = 0;
    totalScorePlayerOne.textContent = 0;
    totalScorePlayerTwo.value = 0;
    totalScorePlayerTwo.textContent = 0;
    buttonRoll.disabled = false;
    buttonHold.disabled = false;
  };

  buttonRoll.addEventListener("click", rollDice);
  buttonHold.addEventListener("click", holdScore);
  buttonPlayAgain.addEventListener("click", playAgain);
};
playGameFunction();