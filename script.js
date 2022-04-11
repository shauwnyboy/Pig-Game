"use strict";

let winningScore;


// This function handles all operations related to the rules modal (e.g. open/close & hide/reveal buttons)
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

      // Hides score-input field so the winningScore cannot be changed in the middle of the game
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



// This function handles all operations related to game function (e.g. dice rolling, score tracking, player turns, switching players,)
const playGameFunction = function () {
  const totalScorePlayerOne = document.querySelector(".total-score-player-1");
  const totalScorePlayerTwo = document.querySelector(".total-score-player-2");
  const currentScorePlayerOne = document.querySelector(
    ".current-score-player-1"
  );
  const currentScorePlayerTwo = document.querySelector(
    ".current-score-player-2"
  );
  const buttonRoll = document.querySelector(".pig-game-board-roll-button");
  const buttonHold = document.querySelector(".pig-game-board-hold-button");
  const buttonPlayAgain = document.querySelector(".play-again-button");

  const boardPlayerOne = document.querySelector(".board-1");
  const boardPlayerTwo = document.querySelector(".board-2");

  totalScorePlayerOne.value = 0;
  totalScorePlayerTwo.value = 0;
  currentScorePlayerOne.value = 0;
  currentScorePlayerTwo.value = 0;

  // activePlayer value changes between 0 and 1 to represent player 1 and 2. When activePlayer = 0, player 1 is active. When activePlayer = 1, player 2 is active
  let activePlayer = 0;

  // This function Changes activePlayer value and adjusts game display to reflect whose turn it is.
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

  // This functions checks to see if any players total score is greater than the winningScore that was set at the start of the game.
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

  // This function handles dice rolls
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

  // This function handles all 
  const holdScore = function () {
    if (activePlayer === 0) {
      totalScorePlayerOne.value += currentScorePlayerOne.value;
      totalScorePlayerOne.textContent = totalScorePlayerOne.value;
      currentScorePlayerOne.value = currentScorePlayerOne.textContent = 0;
      checkWinner();
      if (totalScorePlayerOne.value >= winningScore) return; // ensures game ends if there is a winner
      switchPlayers();
    } else if (activePlayer === 1) {
      totalScorePlayerTwo.value += currentScorePlayerTwo.value;
      totalScorePlayerTwo.textContent = totalScorePlayerTwo.value;
      currentScorePlayerTwo.value = currentScorePlayerTwo.textContent = 0;
      checkWinner();
      if (totalScorePlayerTwo.value >= winningScore) return; // ensures game ends if there is a winner
      switchPlayers();
    }
  };

  // Resets game to initial conditions
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


  // Game event handlers
  buttonRoll.addEventListener("click", rollDice);
  buttonHold.addEventListener("click", holdScore);
  buttonPlayAgain.addEventListener("click", playAgain);
};
playGameFunction();