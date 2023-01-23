import { updateStatusElement } from "./score.js";
import { checkForIncompleteGame } from "./localStorage.js";
import { flipCards } from "./dealCards.js";
import { shuffleCards } from "./shuffleCards.js";
import { createCards } from "./createCards.js";
import {
  playGameButtonElement,
  scoreContainerElem,
  roundContainerElem,
  scoreElem,
  primaryColor,
  roundElem,
  currentGameStatusElem,
} from "./variables.js";

import { collectCards } from "./transformGrid.js";
function loadGame() {
  createCards();
  window.cards = document.querySelectorAll(".card");

  playGameButtonElement.addEventListener("click", () => startGame());
}

export default function startGame() {
  resetNewGameSettings();
  initialiseNewGame();
  startRound();
  collectCards();
}

function resetNewGameSettings() {
  updateStatusElement(scoreContainerElem, "flex");
  updateStatusElement(roundContainerElem, "flex");
  playGameButtonElement.style.display = "none";
  window.gameInProgress = true;
}

function initialiseNewGame() {
  window.score = 0;
  window.roundNum = 0;

  checkForIncompleteGame();

  window.shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, "flex");
  updateStatusElement(roundContainerElem, "flex");

  updateStatusElement(
    scoreElem,
    "block",
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initializeNewRound() {
  window.roundNum++;
  playGameButtonElement.disabled = true;

  window.gameInProgress = true;
  window.shufflingInProgress = true;
  window.cardsRevealed = false;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    "Shuffling..."
  );

  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function gameOver() {
  const gameOverMessage = `Game Over! Final Score - <span class = 'badge'>${score}</span> Click 'Play Game' button to play again`;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    gameOverMessage
  );

  gameInProgress = false;
  playGameButtonElement.disabled = false;

  playGameButtonElement.style.display = "flex";
  roundNum = 0;
  deleteCards();
}

function endRound() {
  setTimeout(() => {
    if (roundNum == maxRounds) {
      gameOver();
      return;
    } else {
      startRound();
    }
  }, 3000);
}

export { loadGame, endRound };
