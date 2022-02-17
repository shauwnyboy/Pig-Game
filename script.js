`use strict`;

// **** DOM Variables ****

// Buttons/Clickables
let buttonRoll1 = document.querySelector("#button-roll-1");
let buttonHold1 = document.querySelector("#button-hold-1");
let buttonRoll2 = document.querySelector("#button-roll-2");
let buttonHold2 = document.querySelector("#button-hold-2");
let buttons = document.querySelectorAll(".buttons");
let rules = document.querySelector(".rules-tab");
let playAgain = document.querySelector(".play-again-tab");
let buttonCloseModal = document.querySelector(".close-rules-button");

// Scores
let currentScorePlayerOne = document.querySelector("#current-score-1");
currentScorePlayerOne.value = 0;
let currentScorePlayerTwo = document.querySelector("#current-score-2");
currentScorePlayerTwo.value = 0;
let totalScorePlayerOne = document.querySelector("#total-score-1");
totalScorePlayerOne.value = 0;
let totalScorePlayerTwo = document.querySelector("#total-score-2");
totalScorePlayerTwo.value = 0;

// Boards
let boardPlayerOne = document.querySelector("#player-board-1");
let boardPlayerTwo = document.querySelector("#player-board-2");

// Dice Images
let dicePlayerOne = document.querySelector("#img-1");
let dicePlayerTwo = document.querySelector("#img-2");

// **** Player Variables ****
let playerOne = 0;
let playerTwo = 1;
let activePlayer = 0;

// **** Functions ****

// Reset Game
const reset = function () {
  activePlayer = 0;

  currentScorePlayerOne.value = 0;
  totalScorePlayerOne.value = 0;
  currentScorePlayerOne.textContent = "0";
  totalScorePlayerOne.textContent = "0";

  currentScorePlayerTwo.value = 0;
  totalScorePlayerTwo.value = 0;
  currentScorePlayerTwo.textContent = "0";
  totalScorePlayerTwo.textContent = "0";

  buttonRoll1.disabled = false;
  buttonHold1.disabled = false;
  buttonRoll2.disabled = true;
  buttonHold2.disabled = true;

  document.querySelectorAll(".current-score-title p").forEach((text) => text.style.color = "black");
  document.querySelectorAll(".current-score-title p").forEach((text) => text.textContent = "Current Score");
  document.querySelectorAll(".current-score p").forEach((text) => text.textContent = "0");
  document.querySelectorAll(".button-container").forEach((buttons) => buttons.style.display = "flex");
  checkActivePlayer();
};

// Check Active Player and Disable/Enable Player Buttons
const checkActivePlayer = function () {
  if (activePlayer === 0) {
    buttonRoll2.disabled = true;
    buttonHold2.disabled = true;
    buttonRoll1.disabled = false;
    buttonHold1.disabled = false;
    boardPlayerOne.style.backgroundColor = "#ffffffb0";
    boardPlayerTwo.style.backgroundColor = "#ffffff60";
  } else if (activePlayer === 1) {
    buttonRoll1.disabled = true;
    buttonHold1.disabled = true;
    buttonRoll2.disabled = false;
    buttonHold2.disabled = false;
    boardPlayerOne.style.backgroundColor = "#ffffff60";
    boardPlayerTwo.style.backgroundColor = "#ffffffb0";
  }
}

// Switch Active Player
const switchPlayers = function () {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else if (activePlayer === 1) {
    activePlayer = 0;
  };
}

// Dice Roll & Update Current Score
const rollDice = function () {
  let number = Math.floor(Math.random() * 6 + 1);
  if (activePlayer === 0) {
    dicePlayerOne.src = `images/dice-${number}.jpg`;
    currentScorePlayerOne.value = currentScorePlayerOne.value + number;
    currentScorePlayerOne.textContent = currentScorePlayerOne.value;
    if (number === 1) {
      switchPlayers();
      currentScorePlayerOne.value = 0;
      currentScorePlayerOne.textContent = "0";
    }
  } else if (activePlayer === 1) {
    dicePlayerTwo.src = `images/dice-${number}.jpg`;
    currentScorePlayerTwo.value = currentScorePlayerTwo.value + number;
    currentScorePlayerTwo.textContent = currentScorePlayerTwo.value;
    if (number === 1) {
      switchPlayers();
      currentScorePlayerTwo.value = 0;
      currentScorePlayerTwo.textContent = "0";
    }
  }
  checkActivePlayer();
}

// Check Winner and Update Board
const checkWinner = function () {
  if (totalScorePlayerOne.value >= 100) {
    boardPlayerOne.style.backgroundColor = "#008000c0";
    boardPlayerTwo.style.backgroundColor = "#000000c0";
    document.querySelector(".current-score-title-2 p").style.color = "white";
    document.querySelector(".current-score-title-1 p").textContent = "You Won";
    document.querySelector(".current-score-title-2 p").textContent = "You Lost"
    document.querySelector("#current-score-1").textContent = "🎉"
    document.querySelector("#current-score-2").textContent = "❌"
    document.querySelectorAll(".button-container").forEach((buttons) => buttons.style.display = "none")
  } else if (totalScorePlayerTwo.value >= 100) {
    boardPlayerTwo.style.backgroundColor = "#008000c0"
    boardPlayerOne.style.backgroundColor = "#000000c0";
    document.querySelector(".current-score-title-1 p").style.color = "white";
    document.querySelector(".current-score-title-2 p").textContent = "You Won"
    document.querySelector(".current-score-title-1 p").textContent = "You Lost";
    document.querySelector("#current-score-2").textContent = "🎉"
    document.querySelector("#current-score-1").textContent = "❌"
    document.querySelectorAll(".button-container").forEach((buttons) => buttons.style.display = "none")
  }
}

// Hold and Update Total Score
const hold = function () {
  if (activePlayer === 0) {
    totalScorePlayerOne.value = totalScorePlayerOne.value + currentScorePlayerOne.value;
    totalScorePlayerOne.textContent = totalScorePlayerOne.value;
    currentScorePlayerOne.value = 0;
    currentScorePlayerOne.textContent = "0";
    switchPlayers();
  } else if (activePlayer === 1) {
    totalScorePlayerTwo.value = totalScorePlayerTwo.value + currentScorePlayerTwo.value;
    totalScorePlayerTwo.textContent = totalScorePlayerTwo.value;
    currentScorePlayerTwo.value = 0;
    currentScorePlayerTwo.textContent = "0";
    switchPlayers();
  }
  checkActivePlayer();
  checkWinner();
};
checkActivePlayer();

// Open Rules
const openRules = function () {
  document.querySelectorAll(".modal-item").forEach((element) => element.classList.remove("hidden-modal"));
}

// Close rules
const closeRules = function () {
  document.querySelectorAll(".modal-item").forEach((element) => element.classList.add("hidden-modal"));
}

// **** Event Listeners ****

// Buttons
buttonRoll1.addEventListener("click", rollDice);
buttonRoll2.addEventListener("click", rollDice);
buttonHold1.addEventListener("click", hold);
buttonHold2.addEventListener("click", hold);

// Clickables
playAgain.addEventListener("click", reset);
rules.addEventListener("click", openRules);
buttonCloseModal.addEventListener("click", closeRules);