import { updateScore, updateStatusElement } from "./score.js";
import { saveGameObjectToLocalStorage } from "./localStorage.js";
import { outputChoiceFeedBack } from "./score.js";
import { flipCard } from "./dealCards.js";
import { flipCards } from "./dealCards.js";
import { endRound } from "./startGame.js";
import {
  aceId,
  currentGameStatusElem,
  primaryColor,
  cardsRevealed,
  shufflingInProgress,
} from "./variables.js";

function chooseCard(card) {
  if (canChooseCard()) {
    flipCard(card, false);

    evaluateCardChoice(card);
    saveGameObjectToLocalStorage(score, roundNum);

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        "Card positions revealed"
      );

      endRound();
    }, 1000);
    window.cardsRevealed = true;
  }
}

function canChooseCard() {
  return (
    window.gameInProgress == true && !shufflingInProgress && !cardsRevealed
  );
}

function evaluateCardChoice(card) {
  if (card.id == aceId) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

export { chooseCard };
